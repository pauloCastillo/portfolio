import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";

type MarkdownRendererProps = {
  content: string;
  className?: string;
};

export default function MarkdownRenderer({ content, className = "" }: Readonly<MarkdownRendererProps>) {
  return (
    <div className={`max-w-none leading-relaxed text-muted ${className}`}>
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSanitize]}
        components={{
          h1: ({ children }) => (
            <h1 className="font-display text-3xl font-bold text-white mt-8 mb-4">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="font-display text-2xl font-bold text-white mt-8 mb-4">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="font-display text-xl font-bold text-white mt-6 mb-3">{children}</h3>
          ),
          p: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
          a: ({ children, href }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {children}
            </a>
          ),
          ul: ({ children }) => <ul className="mb-4 ml-6 list-disc space-y-1">{children}</ul>,
          ol: ({ children }) => <ol className="mb-4 ml-6 list-decimal space-y-1">{children}</ol>,
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary/50 pl-4 italic my-4 text-text">
              {children}
            </blockquote>
          ),
          code: ({ children, className: codeClassName }) => {
            const isBlock = codeClassName?.includes("language-");
            if (isBlock) {
              return <code className={codeClassName}>{children}</code>;
            }
            return (
              <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-sm text-primary">
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre className="mb-4 overflow-x-auto rounded-xl border border-border-glass bg-black/40 p-4 font-mono text-sm leading-relaxed text-text">
              {children}
            </pre>
          ),
          table: ({ children }) => (
            <div className="mb-4 overflow-x-auto">
              <table className="w-full border-collapse text-sm">{children}</table>
            </div>
          ),
          thead: ({ children }) => <thead className="border-b border-border-glass">{children}</thead>,
          th: ({ children }) => (
            <th className="px-4 py-2 text-left font-mono font-bold text-white">{children}</th>
          ),
          td: ({ children }) => <td className="border-t border-white/5 px-4 py-2">{children}</td>,
          img: ({ src, alt }) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={src} alt={alt ?? ""} className="my-6 w-full rounded-xl" loading="lazy" />
          ),
          hr: () => <hr className="my-8 border-border-glass" />,
        }}
      >
        {content}
      </Markdown>
    </div>
  );
}
