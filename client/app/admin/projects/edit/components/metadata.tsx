import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTerminal } from "@fortawesome/free-solid-svg-icons";
import StackChips from "./chips";
import { useState } from "react";

type MetadataProps = {
  title: string;
  description: string;
  techStack: string[];
  onTitleChange: (v: string) => void;
  onDescriptionChange: (v: string) => void;
  onTechStackChange: (v: string[]) => void;
};

export default function Metadata({ title, description, techStack, onTitleChange, onDescriptionChange, onTechStackChange }: MetadataProps) {
  const [inputValue, setInputValue] = useState("");

  const addTech = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !techStack.includes(trimmed)) {
      onTechStackChange([...techStack, trimmed]);
    }
    setInputValue("");
  };

  const removeTech = (tech: string) => {
    onTechStackChange(techStack.filter((t) => t !== tech));
  };

  return (
    <section className="space-y-6 animate-fade-in-up">
      <div className="flex items-center gap-2 text-primary font-mono text-xs tracking-widest opacity-70">
        <FontAwesomeIcon icon={faTerminal} className="text-sm" />
        <span>| PROJECT_METADATA</span>
      </div>
      <div className="space-y-4">
        <input
          className="w-full bg-transparent border-none text-5xl lg:text-6xl font-display font-bold text-white placeholder-gray-700 focus:ring-0 focus:outline-none focus:placeholder-gray-800 transition-all p-0 tracking-tight"
          placeholder="PROJECT CODENAME"
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
        />
        <textarea
          className="w-full bg-transparent border-0 border-l-2 border-gray-800 focus:border-primary text-gray-400 text-lg focus:ring-0 resize-none py-2 px-4 transition-colors font-body leading-relaxed"
          placeholder="Brief mission abstract..."
          rows={2}
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
        />
      </div>
      <div className="space-y-3">
        <label className="block text-xs font-mono text-gray-500 uppercase tracking-wider">Tech Stack Modules</label>
        <div className="relative group">
          <div className="glass-panel rounded-lg p-2 min-h-10 flex flex-wrap gap-2 items-center cursor-text border transition-colors hover:border-primary/50 focus-within:border-primary focus-within:shadow-neon-sm">
            {techStack.map((tech) => (
              <StackChips key={tech} title={tech} onRemove={() => removeTech(tech)} />
            ))}
            <input
              className="bg-transparent border-none focus:ring-0 text-sm font-mono text-white min-w-32"
              placeholder="Add module..."
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTech(); } }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
