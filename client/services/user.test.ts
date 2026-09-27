import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import userService from "./user";

vi.mock("axios");

const mockedAxios = vi.mocked(axios, true);

const fakeUser = {
  id: "u-1",
  username: "nuevo",
  email: "nuevo@example.com",
  phone: null,
  avatar_url: null,
  isActive: true,
  last_login: "2026-09-25T00:00:00Z",
};

describe("userService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("lista usuarios", async () => {
    mockedAxios.get.mockResolvedValue({ data: [fakeUser] });
    const service = userService();
    const users = await service.getAllUsers();
    expect(mockedAxios.get).toHaveBeenCalledWith("/api/admin/users");
    expect(users).toEqual([fakeUser]);
  });

  it("crea usuario", async () => {
    mockedAxios.post.mockResolvedValue({ data: fakeUser });
    const service = userService();
    const created = await service.createUser({
      username: "nuevo",
      email: "nuevo@example.com",
      password: "123456",
    });
    expect(mockedAxios.post).toHaveBeenCalledWith("/api/admin/users", {
      username: "nuevo",
      email: "nuevo@example.com",
      password: "123456",
    });
    expect(created).toEqual(fakeUser);
  });

  it("propaga el 401 del backend", async () => {
    const backendError = {
      response: { status: 401, data: { error: "No autorizado" } },
    };
    mockedAxios.get.mockRejectedValue(backendError);
    const service = userService();
    await expect(service.getAllUsers()).rejects.toMatchObject({
      response: { status: 401 },
    });
  });
});
