import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "./route";
import { api } from "@/api/config";
import { getAuthorizationHeaders } from "~/utils/helpers";

vi.mock("@/api/config", () => ({ api: { post: vi.fn() } }));
vi.mock("~/utils/helpers", () => ({ getAuthorizationHeaders: vi.fn() }));

const mockedPost = vi.mocked(api.post);
const mockedHeaders = vi.mocked(getAuthorizationHeaders);

const AUTH = { Authorization: "Bearer test-token" };

function makeRequest(body: unknown) {
  return new NextRequest("http://localhost/api/admin/projects", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

describe("POST /api/admin/projects", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("responde 401 sin token de sesión", async () => {
    mockedHeaders.mockResolvedValue({});
    const res = await POST(makeRequest({ title: "T" }));
    expect(res.status).toBe(401);
  });

  it("propaga el 422 y el detail del backend", async () => {
    mockedHeaders.mockResolvedValue(AUTH);
    const detail = [
      { type: "missing", loc: ["body", "title"], msg: "Field required" },
    ];
    mockedPost.mockRejectedValue({
      response: { status: 422, data: { detail } },
    });
    const res = await POST(makeRequest({ description: "Sin título" }));
    expect(res.status).toBe(422);
    const body = await res.json();
    expect(body.error).toBe("Error al crear proyecto");
    expect(body.detail).toEqual(detail);
  });

  it("reenvía el proyecto creado en el camino feliz", async () => {
    mockedHeaders.mockResolvedValue(AUTH);
    mockedPost.mockResolvedValue({
      status: 201,
      data: { id: 1, title: "Nuevo" },
    });
    const res = await POST(makeRequest({ title: "Nuevo" }));
    expect(res.status).toBe(201);
    expect(await res.json()).toEqual({ id: 1, title: "Nuevo" });
  });
});
