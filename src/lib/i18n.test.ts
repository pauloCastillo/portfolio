import { describe, it, expect } from "vitest";
import {
  DEFAULT_LOCALE,
  dictionaries,
  getDictionary,
  isLocale,
} from "./i18n";

function flatKeys(value: unknown, prefix = ""): string[] {
  if (typeof value !== "object" || value === null) return [prefix];
  return Object.entries(value as Record<string, unknown>).flatMap(([key, child]) =>
    flatKeys(child, prefix ? `${prefix}.${key}` : key)
  );
}

describe("i18n dictionaries", () => {
  it("en tiene exactamente las mismas claves que es", () => {
    expect(flatKeys(dictionaries.en).sort()).toEqual(
      flatKeys(dictionaries.es).sort()
    );
  });

  it("ninguna traducción está vacía", () => {
    const leaves = (value: unknown): unknown[] =>
      typeof value !== "object" || value === null
        ? [value]
        : Object.values(value as Record<string, unknown>).flatMap(leaves);
    for (const dict of Object.values(dictionaries)) {
      for (const leaf of leaves(dict)) {
        expect(typeof leaf).toBe("string");
        expect((leaf as string).trim().length).toBeGreaterThan(0);
      }
    }
  });
});

describe("getDictionary", () => {
  it("devuelve el diccionario pedido", () => {
    expect(getDictionary("en")).toBe(dictionaries.en);
    expect(getDictionary("es")).toBe(dictionaries.es);
  });

  it("cae a español con locale desconocido", () => {
    expect(getDictionary("fr")).toBe(dictionaries[DEFAULT_LOCALE]);
  });
});

describe("isLocale", () => {
  it("acepta es/en y rechaza el resto", () => {
    expect(isLocale("es")).toBe(true);
    expect(isLocale("en")).toBe(true);
    expect(isLocale("fr")).toBe(false);
    expect(isLocale(null)).toBe(false);
  });
});
