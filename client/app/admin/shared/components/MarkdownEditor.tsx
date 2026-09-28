"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBold, faItalic, faLink, faCode, faImage } from "@fortawesome/free-solid-svg-icons"
import { useState, useRef, useEffect } from "react"

type MarkdownEditorProps = {
  value?: string
  onChange?: (markdown: string) => void
}

export default function MarkdownEditor({
  value = "",
  onChange}: Readonly<MarkdownEditorProps>) {
  const [markdown, setMarkdown] = useState(value)
  const [lineCount, setLineCount] = useState(1)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    setMarkdown(value)
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    setMarkdown(newValue)
    onChange?.(newValue)
    const lines = newValue.split('\n')
    setLineCount(lines.length)
  }

  const insertAtCursor = (text: string) => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const current = textarea.value
    const updated = current.substring(0, start) + text + current.substring(end)

    // Escribe en el DOM para preservar el cursor y sincroniza el estado
    // para que el padre reciba la inserción vía onChange.
    textarea.value = updated
    const cursorPos = start + text.length
    textarea.selectionStart = cursorPos
    textarea.selectionEnd = cursorPos
    textarea.focus()
    setMarkdown(updated)
    onChange?.(updated)
    setLineCount(updated.split('\n').length)
  }

  const handleBold = () => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selected = textarea.value.substring(start, end)

    if (selected) {
      insertAtCursor(`**${selected}**`)
    } else {
      insertAtCursor('**bold text**')
      textarea.selectionStart = start + 2
      textarea.selectionEnd = start + 2
    }
  }

  const handleItalic = () => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selected = textarea.value.substring(start, end)

    if (selected) {
      insertAtCursor(`*${selected}*`)
    } else {
      insertAtCursor('*italic text*')
      textarea.selectionStart = start + 1
      textarea.selectionEnd = start + 1
    }
  }

  const handleLink = () => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selected = textarea.value.substring(start, end)

    if (selected) {
      insertAtCursor(`[${selected}](http://)`)
      const urlStart = start + `[${selected}](`.length
      textarea.selectionStart = urlStart
      textarea.selectionEnd = urlStart
    } else {
      insertAtCursor('[link text](http://)')
      const urlStart = start + '[link text]('.length
      textarea.selectionStart = urlStart
      textarea.selectionEnd = urlStart
    }
  }

  const handleImage = () => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selected = textarea.value.substring(start, end)

    if (selected) {
      insertAtCursor(`![${selected}](http://)`)
      const urlStart = start + `![${selected}](`.length
      textarea.selectionStart = urlStart
      textarea.selectionEnd = urlStart
    } else {
      insertAtCursor('![alt text](http://)')
      const urlStart = start + '![alt text]('.length
      textarea.selectionStart = urlStart
      textarea.selectionEnd = urlStart
    }
  }

  const handleCodeBlock = () => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selected = textarea.value.substring(start, end)

    if (selected) {
      insertAtCursor(`\`\`\`\n${selected}\n\`\`\``)
    } else {
      insertAtCursor('\`\`\`\n\n\`\`\`')
      textarea.selectionStart = start + 4
      textarea.selectionEnd = start + 4
    }
  }

  return (
    <div className="glass-panel rounded-xl overflow-hidden flex flex-col min-h-1/2 border border-surface-border">
      <div
        className="bg-black/40 px-4 py-2 flex items-center justify-between border-b border-surface-border"
      >
        <div className="flex items-center gap-1">
          <button
            className="p-1.5 rounded hover:bg-white/10 text-gray-400 hover:text-white hover:cursor-pointer transition-colors"
            title="Bold"
            onClick={handleBold}
          >
            <FontAwesomeIcon icon={faBold} className="text-sm transition-colors text-primary" />
          </button>
          <button
            className="p-1.5 rounded hover:bg-white/10 text-gray-400 hover:text-white hover:cursor-pointer transition-colors"
            title="Italic"
            onClick={handleItalic}
          >
            <FontAwesomeIcon icon={faItalic} className="text-sm transition-colors text-primary" />
          </button>
          <button
            className="p-1.5 rounded hover:bg-white/10 text-gray-400 hover:text-white hover:cursor-pointer transition-colors"
            title="Link"
            onClick={handleLink}
          >
            <FontAwesomeIcon icon={faLink} className="text-sm transition-colors text-primary" />
          </button>
          <div className="w-px h-4 bg-gray-700 mx-1"></div>
          <button
            className="p-1.5 rounded hover:bg-white/10 text-gray-400 hover:text-white hover:cursor-pointer transition-colors"
            title="Code Block"
            onClick={handleCodeBlock}
          >
            <FontAwesomeIcon icon={faCode} className="text-sm transition-colors text-primary" />
          </button>
          <button
            className="p-1.5 rounded hover:bg-white/10 text-gray-400 hover:text-white hover:cursor-pointer transition-colors"
            title="Image"
            onClick={handleImage}
          >
            <FontAwesomeIcon icon={faImage} className="text-sm transition-colors text-primary" />
          </button>
        </div>
        <span className="text-xs font-mono text-gray-600">MARKDOWN_MODE</span>
        <span className="text-xs font-mono text-gray-600">{lineCount} lines</span>
      </div>
      <div className="flex-1 flex relative">
        <div
          className="w-12 bg-black/20 text-right pr-3 pt-4 text-gray-700 font-mono text-sm select-none border-r border-surface-border hidden sm:block"
        >
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i}>
              {String(i + 1).padStart(2, '0')} <br />
            </div>
          ))}
        </div>
        <textarea
          ref={textareaRef}
          className="flex-1 bg-transparent border-none focus:ring-0 p-4 text-gray-300 font-mono text-sm leading-relaxed resize-none"
          spellCheck={true}
          value={markdown}
          onChange={handleChange}
        ></textarea>
      </div>
    </div>
  )
}
