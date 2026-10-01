import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "./route";
import { api } from "@/api/config";

vi.mock("@/api/config", () => ({ api: { post: vi.fn() } }));

const mockedPost = vi.mocked(api.post);

function makeRequest(body: unknown) {
  return new NextRequest("http://localhost/api/visits", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

describe("POST /api/visits", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("reenvía el beacon sin pedir autenticación", async () => {
    mockedPost.mockResolvedValue({ status: 201, data: { id: 1 } });
    const res = await POST(
      makeRequest({ visitor_id: "123e4567-e89b-12d3-a456-426614174000", path: "/" })
    );
    expect(res.status).toBe(201);
    expect(await res.json()).toEqual({ id: 1 });
    expect(mockedPost).toHaveBeenCalledWith(
      "visits/",
      { visitor_id: "123e4567-e89b-12d3-a456-426614174000", path: "/" }
    );
  });

  it("propaga el 422 del backend con detail", async () => {
    const detail = [{ loc: ["body", "visitor_id"], msg: "Field required" }];
    mockedPost.mockRejectedValue({
      response: { status: 422, data: { detail } },
    });
    const res = await POST(makeRequest({ path: "/" }));
    expect(res.status).toBe(422);
    const body = await res.json();
    expect(body.error).toBe("Error al registrar visita");
    expect(body.detail).toEqual(detail);
  });
});
