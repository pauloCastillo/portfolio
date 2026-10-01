import { describe, it, expect, vi, beforeEach } from "vitest";
import { GET } from "./route";
import { api } from "@/api/config";
import { getAuthorizationHeaders } from "~/utils/helpers";

vi.mock("@/api/config", () => ({ api: { get: vi.fn() } }));
vi.mock("~/utils/helpers", () => ({ getAuthorizationHeaders: vi.fn() }));

const mockedGet = vi.mocked(api.get);
const mockedHeaders = vi.mocked(getAuthorizationHeaders);

const AUTH = { Authorization: "Bearer test-token" };

describe("GET /api/admin/visits/stats", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("responde 401 sin token de sesión", async () => {
    mockedHeaders.mockResolvedValue({});
    const res = await GET();
    expect(res.status).toBe(401);
  });

  it("reenvía las estadísticas en el camino feliz", async () => {
    mockedHeaders.mockResolvedValue(AUTH);
    const stats = { today: 3, last_7d: 10, last_30d: 25, series: [] };
    mockedGet.mockResolvedValue({ status: 200, data: stats });
    const res = await GET();
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual(stats);
    expect(mockedGet).toHaveBeenCalledWith("visits/stats", {
      headers: AUTH,
    });
  });
});
