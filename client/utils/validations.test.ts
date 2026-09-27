import { describe, it, expect } from "vitest";
import { validateNewUserData, validateUserData } from "./validations";

describe("validateNewUserData", () => {
  it("rechaza password de 5 caracteres", () => {
    const result = validateNewUserData({
      username: "nuevo",
      email: "nuevo@example.com",
      password: "12345",
    });
    expect(typeof result).toBe("string");
    expect(result as string).toContain("Validation errors");
  });

  it("acepta password de 6 caracteres", () => {
    const result = validateNewUserData({
      username: "nuevo",
      email: "nuevo@example.com",
      password: "123456",
    });
    expect(result).toMatchObject({ username: "nuevo" });
  });

  it("acepta payload sin phone", () => {
    const result = validateNewUserData({
      username: "nuevo",
      email: "nuevo@example.com",
      password: "123456",
    });
    expect((result as Record<string, unknown>)["phone"]).toBeUndefined();
  });

  it("trata phone vacio como ausente", () => {
    const result = validateNewUserData({
      username: "nuevo",
      email: "nuevo@example.com",
      password: "123456",
      phone: "",
    });
    expect(result).toMatchObject({ phone: undefined });
  });

  it("rechaza email invalido", () => {
    const result = validateNewUserData({
      username: "nuevo",
      email: "no-es-email",
      password: "123456",
    });
    expect(typeof result).toBe("string");
  });
});

describe("validateUserData (login, sin cambios)", () => {
  it("sigue exigiendo password de 8+ con complejidad", () => {
    const result = validateUserData({ email: "a@b.com", password: "123456" });
    expect(typeof result).toBe("string");
  });
});
