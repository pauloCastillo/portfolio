// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import MarkdownEditor from "./MarkdownEditor";

afterEach(() => cleanup());

function setup(onChange = vi.fn()) {
  const utils = render(<MarkdownEditor value="" onChange={onChange} />);
  const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
  return { ...utils, textarea, onChange };
}

describe("MarkdownEditor", () => {
  it("propagates typed text via onChange", () => {
    const { textarea, onChange } = setup();
    fireEvent.change(textarea, { target: { value: "hello" } });
    expect(onChange).toHaveBeenLastCalledWith("hello");
  });

  it("inserts bold placeholder and notifies", () => {
    const { textarea, onChange } = setup();
    fireEvent.click(screen.getByTitle("Bold"));
    expect(textarea.value).toBe("**bold text**");
    expect(onChange).toHaveBeenLastCalledWith("**bold text**");
  });

  it("wraps selection with bold", () => {
    const { textarea, onChange } = setup();
    fireEvent.change(textarea, { target: { value: "hello" } });
    textarea.selectionStart = 0;
    textarea.selectionEnd = 5;
    fireEvent.click(screen.getByTitle("Bold"));
    expect(textarea.value).toBe("**hello**");
    expect(onChange).toHaveBeenLastCalledWith("**hello**");
  });

  it("inserts italic placeholder and notifies", () => {
    const { textarea, onChange } = setup();
    fireEvent.click(screen.getByTitle("Italic"));
    expect(textarea.value).toBe("*italic text*");
    expect(onChange).toHaveBeenLastCalledWith("*italic text*");
  });

  it("inserts link placeholder and notifies", () => {
    const { textarea, onChange } = setup();
    fireEvent.click(screen.getByTitle("Link"));
    expect(textarea.value).toBe("[link text](http://)");
    expect(onChange).toHaveBeenLastCalledWith("[link text](http://)");
  });

  it("inserts image placeholder and notifies", () => {
    const { textarea, onChange } = setup();
    fireEvent.click(screen.getByTitle("Image"));
    expect(textarea.value).toBe("![alt text](http://)");
    expect(onChange).toHaveBeenLastCalledWith("![alt text](http://)");
  });

  it("inserts code block placeholder and notifies", () => {
    const { textarea, onChange } = setup();
    fireEvent.click(screen.getByTitle("Code Block"));
    expect(textarea.value).toContain("```");
    expect(onChange).toHaveBeenCalledWith(textarea.value);
  });

  it("tracks line count", () => {
    const { textarea } = setup();
    fireEvent.change(textarea, { target: { value: "one\ntwo\nthree" } });
    expect(screen.getByText("3 lines")).toBeTruthy();
  });
});
