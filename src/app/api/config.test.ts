import { describe, it, expect } from "vitest";
import { api } from "./config";

describe("api client config", () => {
  it("usa un timeout base de 10s (1s provocaba timeouts espurios)", () => {
    expect(api.defaults.timeout).toBe(10000);
  });
});
