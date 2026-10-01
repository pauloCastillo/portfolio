"use client";

import Breadcrumb from "@/shared/breadcrumb/Breadcrumb";
import MarkdownEditor from "@/admin/shared/components/MarkdownEditor";
import MarkdownRenderer from "@/admin/shared/components/MarkdownRenderer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faCloudUpload, faRocket, faSave, faSpinner } from "@fortawesome/free-solid-svg-icons";
import Loading from "@/loading";
import { useState, useRef, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { setError } from "~/store/features/errorSlice";
import { AppDispatch } from "~/store/store";
import { useRouter, useSearchParams } from "next/navigation";
import postService from "~/services/post";
import projectService from "~/services/project";

export default function EditPost() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get("id");

  const [isDragging, setIsDragging] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const [title, setTitle] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [platforms, setPlatforms] = useState({ linkedin: false, twitter: false });

  const dispatch = useDispatch<AppDispatch>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const service = useMemo(() => postService(), []);
  const upload = useMemo(() => projectService(), []);

  useEffect(() => {
    if (!postId) return;
    const nid = parseInt(postId);
    if (isNaN(nid)) return;
    (async () => {
      try {
        setIsLoading(true);
        const p = await service.getPostById(nid);
        setTitle(p.title);
        setMarkdown(p.content || "");
        if (p.image_file) setImagePreview(p.image_file);
      } catch {
        dispatch(setError("Error al cargar post"));
      } finally {
        setIsLoading(false);
      }
    })();
  }, [postId, service, dispatch]);

  const validTypes = [
    "image/png",
    "image/jpg",
    "image/jpeg",
    "image/webp",
    "image/svg+xml",
  ];

  const processFile = (file: File) => {
    if (
      file.type.startsWith("image/") &&
      file.size <= 30 * 1024 * 1024 &&
      validTypes.includes(file.type)
    ) {
      setIsLoading(true);
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setTimeout(() => setIsLoading(false), 500);
    } else {
      dispatch(
        setError(
          "Invalid file type or size. Please upload an image (PNG, JPG, WEBP, SVG) under 30MB."
        )
      );
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    processFile(files[0]);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const files = event.dataTransfer.files;
    if (!files || files.length === 0) return;
    processFile(files[0]);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDragEnter = () => setIsDragging(true);
  const handleDragLeave = () => setIsDragging(false);
  const openFileDialog = () => fileInputRef.current?.click();

  const validateRequired = (): string | null => {
    if (!title.trim()) return "El título es obligatorio.";
    if (!markdown.trim()) return "El contenido es obligatorio.";
    return null;
  };

  const resolveActionError = (e: unknown, fallback: string): string => {
    const err = e as { response?: { status?: number } };
    if (!err?.response)
      return "Error de red o tiempo de espera. Revisa tu conexión e inténtalo de nuevo.";
    if (err.response.status === 401)
      return "Sesión expirada. Vuelve a iniciar sesión.";
    return fallback;
  };

  const buildPayload = async () => {
    let imageFileStr = imagePreview;
    if (imageFile) {
      try {
        const uploaded = await upload.uploadImage(imageFile);
        imageFileStr = uploaded.path;
      } catch {
        dispatch(setError("Error al subir imagen"));
        return null;
      }
    }
    return {
      title,
      content: markdown,
      image_file: imageFileStr,
      published: false,
    };
  };

  const openShareWindows = () => {
    const text = encodeURIComponent(title + "\n\n" + markdown);
    if (platforms.linkedin) {
      window.open(`https://linkedin.com/share?text=${text}`, "_blank");
    }
    if (platforms.twitter) {
      window.open(`https://x.com/intent/tweet?text=${text}`, "_blank");
    }
  };

  const handleSave = async () => {
    const missing = validateRequired();
    if (missing) {
      dispatch(setError(missing));
      return;
    }
    setIsSaving(true);
    try {
      const payload = await buildPayload();
      if (!payload) return;

      if (postId) {
        await service.updatePost(parseInt(postId), payload);
      } else {
        await service.createPost(payload);
      }
      dispatch(setError(""));
      router.push("/admin/blog");
    } catch (e: unknown) {
      dispatch(setError(resolveActionError(e, "Error al guardar post")));
      if ((e as { response?: { status?: number } })?.response?.status === 401) router.push("/auth");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    const missing = validateRequired();
    if (missing) {
      dispatch(setError(missing));
      return;
    }
    setIsPublishing(true);
    try {
      const payload = await buildPayload();
      if (!payload) return;

      payload.published = true;

      if (postId) {
        await service.updatePost(parseInt(postId), payload);
      } else {
        await service.createPost(payload);
      }
      openShareWindows();
      dispatch(setError(""));
      router.push("/admin/blog");
    } catch (e: unknown) {
      dispatch(setError(resolveActionError(e, "Error al publicar post")));
      if ((e as { response?: { status?: number } })?.response?.status === 401) router.push("/auth");
    } finally {
      setIsPublishing(false);
    }
  };

  if (isLoading && postId) return <Loading />;

  return (
    <>
      <Breadcrumb />
      <section className="flex-1 flex overflow-hidden relative">
        <div className="absolute inset-0 w-40 h-40 bg-grid-pattern opacity-5 pointer-events-none"></div>
        <div className="flex-1 overflow-y-auto p-8 lg:p-12 pb-32">
          <div className="max-w-3xl mx-auto space-y-12">
            <section className="space-y-6 animate-fade-in-up">
              <div className="flex items-center gap-2 text-primary font-mono text-xs tracking-widest opacity-70">
                <FontAwesomeIcon icon={faEdit} className="text-sm" />
                <span>| POST_COMPOSER</span>
              </div>
              <input
                className="w-full bg-transparent border-none text-5xl lg:text-6xl font-display font-bold text-white placeholder-gray-700 focus:ring-0 focus:outline-none focus:placeholder-gray-800 transition-all p-0 tracking-tight"
                placeholder="POST TITLE"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </section>
            <hr className="border-surface-border" />
            <section className="space-y-6">
              <div className="relative group cursor-pointer">
                <div className="absolute -inset-0.5 bg-gradient-to-right from-primary to-secondary rounded-xl blur opacity-10 group-hover:opacity-30 transition duration-500"></div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/svg+xml"
                  className="hidden"
                  onChange={handleFileChange}
                />

                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onClick={openFileDialog}
                  className={`relative rounded-xl border-2 border-dashed p-10 flex flex-col items-center justify-center gap-4 text-center transition-all duration-300 cursor-pointer

                    ${isDragging
                      ? "border-primary bg-primary/10 scale-[1.02]"
                      : "border-gray-700 bg-void/50 hover:bg-void/80 hover:border-primary/50"
                    }
                    `}
                  style={
                    imagePreview
                      ? {
                          backgroundImage: `url(${imagePreview})`,
                          backgroundSize: "contain",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                          height: "200px",
                        }
                      : { height: "220px" }
                  }
                >
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-10">
                      <Loading />
                    </div>
                  )}
                  {!imagePreview && (
                    <>
                      <div className="size-16 rounded-full bg-gray-800/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:bg-primary/20">
                        <FontAwesomeIcon
                          icon={faCloudUpload}
                          className="text-3xl text-gray-400 group-hover:text-primary transition-colors"
                        />
                      </div>
                      <div>
                        <h3 className="text-white font-display font-medium text-lg">Drop Cover Image (optional)</h3>
                        <p className="text-gray-500 text-sm mt-1">Accepts PNG, JPG, WEBP (Max 30MB)</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <MarkdownEditor
                value={markdown}
                onChange={setMarkdown}
              />
              <div className="flex items-center gap-6">
                <span className="text-xs font-mono text-text-muted uppercase tracking-wider">Share on publish:</span>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={platforms.linkedin}
                    onChange={e => setPlatforms({ ...platforms, linkedin: e.target.checked })}
                    className="accent-primary w-4 h-4"
                  />
                  <span className="text-sm font-mono text-text-muted group-hover:text-white transition-colors">LinkedIn</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={platforms.twitter}
                    onChange={e => setPlatforms({ ...platforms, twitter: e.target.checked })}
                    className="accent-primary w-4 h-4"
                  />
                  <span className="text-sm font-mono text-text-muted group-hover:text-white transition-colors">X / Twitter</span>
                </label>
              </div>
              {markdown && (
                <div className="glass-panel rounded-xl p-6">
                  <p className="text-xs font-mono text-text-muted uppercase tracking-wider mb-3">Preview</p>
                  <MarkdownRenderer content={markdown} />
                </div>
              )}
            </section>
          </div>
        </div>
        <div className="absolute bottom-6 left-0 right-0 px-8 flex justify-center pointer-events-none">
          <div className="glass-panel px-6 py-3 rounded-2xl flex items-center gap-6 pointer-events-auto shadow-2xl border border-surface-border/50 backdrop-blur-xl">
            <div className="flex items-center gap-2 pr-6 border-r border-white/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span className="text-amber-500 text-xs font-mono font-medium tracking-wide">
                {isSaving || isPublishing ? "PROCESSING..." : "DRAFT - UNSAVED CHANGES"}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                disabled={isSaving || isPublishing}
                onClick={handleSave}
                className="px-5 py-2 rounded-lg text-sm font-bold font-display text-gray-300 hover:text-white hover:bg-white/5 transition-all flex items-center gap-2 hover:cursor-pointer disabled:opacity-50"
              >
                <FontAwesomeIcon icon={isSaving ? faSpinner : faSave} className={`text-sm transition-colors text-gray-300 ${isSaving ? 'animate-spin' : ''}`} />
                {isSaving ? "Saving..." : "Save Draft"}
              </button>
              <button
                disabled={isSaving || isPublishing}
                onClick={handlePublish}
                className="relative group px-6 py-2 rounded-lg text-sm font-bold font-display text-void bg-primary overflow-hidden transition-all hover:shadow-neon hover:scale-105 hover:cursor-pointer disabled:opacity-50"
              >
                <div className="absolute inset-0 bg-white/20 group-hover:bg-transparent transition-colors"></div>
                <span className="relative flex items-center gap-2 z-10">
                  <FontAwesomeIcon icon={isPublishing ? faSpinner : faRocket} className={`text-sm transition-colors text-gray-300 ${isPublishing ? 'animate-spin' : ''}`} />
                  {isPublishing ? "Publishing..." : "Publish"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
