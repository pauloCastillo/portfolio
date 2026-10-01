// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, cleanup, waitFor } from "@testing-library/react";
import VisitBeacon, { getOrCreateVisitorId } from "./VisitBeacon";

afterEach(() => cleanup());

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

describe("VisitBeacon", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.localStorage.clear();
    window.sessionStorage.clear();
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true }));
  });

  it("genera y persiste un visitor_id con formato UUID", () => {
    const id = getOrCreateVisitorId();

    expect(id).toMatch(UUID_RE);
    expect(window.localStorage.getItem("portfolio_visitor_id")).toBe(id);
    expect(getOrCreateVisitorId()).toBe(id);
  });

  it("envía un solo beacon por sesión aunque se monte dos veces", async () => {
    const { unmount } = render(<VisitBeacon />);
    unmount();
    render(<VisitBeacon />);

    await waitFor(() => {
      expect(vi.mocked(fetch)).toHaveBeenCalledTimes(1);
    });
    const [, options] = vi.mocked(fetch).mock.calls[0];
    const body = JSON.parse((options as RequestInit).body as string);
    expect(body.visitor_id).toMatch(UUID_RE);
    expect(typeof body.path).toBe("string");
  });

  it("no rompe la página si el beacon falla", async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new Error("offline"));

    expect(() => render(<VisitBeacon />)).not.toThrow();
    await waitFor(() => {
      expect(vi.mocked(fetch)).toHaveBeenCalledTimes(1);
    });
  });
});
