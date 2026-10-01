"use client";

import { useEffect } from "react";

const VISITOR_KEY = "portfolio_visitor_id";
const SESSION_KEY = "portfolio_visit_sent";

function newVisitorId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  // Fallback con formato UUID v4 para entornos sin randomUUID.
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
    const rand = Math.floor(Math.random() * 16);
    const val = char === "x" ? rand : (rand & 0x3) | 0x8;
    return val.toString(16);
  });
}

export function getOrCreateVisitorId(): string {
  const stored = window.localStorage.getItem(VISITOR_KEY);
  if (stored) return stored;
  const created = newVisitorId();
  window.localStorage.setItem(VISITOR_KEY, created);
  return created;
}

/**
 * Beacon anónimo de visitas: envía como máximo un POST por sesión
 * (guardia en sessionStorage) con el visitor_id persistido en
 * localStorage. Fire-and-forget: nunca afecta a la UX.
 */
export default function VisitBeacon() {
  useEffect(() => {
    if (window.sessionStorage.getItem(SESSION_KEY)) return;
    window.sessionStorage.setItem(SESSION_KEY, "1");
    const visitorId = getOrCreateVisitorId();
    fetch("/api/visits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        visitor_id: visitorId,
        path: window.location.pathname,
      }),
      keepalive: true,
    }).catch(() => {
      // Silencioso: analítica nunca rompe la página.
    });
  }, []);

  return null;
}
