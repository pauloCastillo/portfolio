// @vitest-environment jsdom
import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import VisitorTrend from "./VisitorTrend";

afterEach(() => cleanup());

describe("VisitorTrend", () => {
  it("renderiza una barra por día con su conteo", () => {
    render(
      <VisitorTrend
        series={[
          { date: "2026-09-28", uniques: 2 },
          { date: "2026-09-29", uniques: 0 },
          { date: "2026-09-30", uniques: 5 },
        ]}
      />
    );

    expect(screen.getByTestId("trend-bar-2026-09-28")).toBeDefined();
    expect(screen.getByTestId("trend-bar-2026-09-29")).toBeDefined();
    expect(screen.getByTestId("trend-bar-2026-09-30")).toBeDefined();
    expect(screen.queryByText(/No visits recorded yet/)).toBeNull();
  });

  it("muestra estado vacío sin datos", () => {
    render(<VisitorTrend series={[]} />);

    expect(screen.getByText(/No visits recorded yet/)).toBeDefined();
    expect(screen.queryByTestId(/trend-bar-/)).toBeNull();
  });

  it("muestra estado vacío cuando todo es cero", () => {
    render(
      <VisitorTrend
        series={[
          { date: "2026-09-29", uniques: 0 },
          { date: "2026-09-30", uniques: 0 },
        ]}
      />
    );

    expect(screen.getByText(/No visits recorded yet/)).toBeDefined();
  });
});
