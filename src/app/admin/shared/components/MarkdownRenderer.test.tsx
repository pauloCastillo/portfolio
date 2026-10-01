// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MarkdownRenderer from "./MarkdownRenderer";

const SAMPLE = `# Hello World

A paragraph with **bold** and *italic* and a [link](https://example.com).

> A quote

- item one
- [ ] todo
- [x] done

| a | b |
| - | - |
| 1 | 2 |

\`\`\`js
const x = 1;
\`\`\`

Inline \`code\` here.

![alt](https://example.com/img.png)
`;

describe("MarkdownRenderer", () => {
  it("renders markdown formatted instead of raw", () => {
    const { container } = render(<MarkdownRenderer content={SAMPLE} />);

    // Headings / emphasis become real elements, not raw characters
    expect(screen.getByRole("heading", { level: 1, name: "Hello World" })).toBeTruthy();
    expect(container.querySelector("strong")?.textContent).toBe("bold");
    expect(container.querySelector("em")?.textContent).toBe("italic");

    // No raw markdown syntax leaks into the text
    const text = container.textContent ?? "";
    expect(text).not.toContain("**bold**");
    expect(text).not.toContain("# Hello World");
    expect(text).not.toContain("[link](https://example.com)");

    // GFM: table, task list, quote, code, image
    expect(container.querySelector("table")).toBeTruthy();
    expect(container.querySelector("blockquote")).toBeTruthy();
    expect(container.querySelector("pre")).toBeTruthy();
    const img = container.querySelector("img");
    expect(img?.getAttribute("src")).toBe("https://example.com/img.png");

    // Links open in a new tab safely
    const link = container.querySelector('a[href="https://example.com"]');
    expect(link?.getAttribute("target")).toBe("_blank");
    expect(link?.getAttribute("rel")).toContain("noopener");
  });

  it("sanitizes dangerous html", () => {
    const { container } = render(
      <MarkdownRenderer content={'<script>alert("xss")</script><img src="x" onerror="alert(1)" />'} />
    );
    expect(container.querySelector("script")).toBeNull();
    expect(container.innerHTML).not.toContain("onerror");
  });
});
