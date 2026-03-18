"use client";

import { usePathname } from "next/navigation";

export default function AppFooter() {

  const pathname = usePathname();

  if(pathname.startsWith("/admin")) {
    return null; // No renderizar la barra de navegación en rutas que comienzan con "/admin"
  }

  return (
    <footer className="bg-gray-800 text-white py-4 mt-auto">
      <p className="text-sm font-bold text-slate-100 text-center p-0.5">
        ¡Construyamos una solución digital sólida, escalable y pensada para el
        futuro!
      </p>
      <p className="text-center text-sm font-light text-gray-200">
        &copy; derechos reservados - Paulo Castillo - 2026
      </p>
    </footer>
  );
}
