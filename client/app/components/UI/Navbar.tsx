"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/siteConfig";

export default function NavbarLayout() {
  const pathname = usePathname();

  // Hide navbar for auth and admin routes
  if (pathname.startsWith("/auth") || pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <nav className="bg-gray-950 flex items-center justify-between px-4">
      <Link href="/" className="flex items-center-safe">
        <Image src={"/vercel.svg"} alt="logo" width={35} height={35} />
        <p className="text-white text-xl">{siteConfig.name}</p>
      </Link>
      <ul className="flex items-center space-x-4 p-4 text-white capitalize">
        {siteConfig.mainNav.map((navItem) => (
          <li
            key={navItem.title}
            className={`hover:text-purple-600 transition-all ${
              navItem.title === "Contacto"
                ? "bg-purple-600 px-3 py-1 rounded-md font-bold"
                : ""
            }`}
          >
            <Link
              href={
                navItem.title === "Home" ? "/" : `#${navItem.title.toLowerCase()}`
              }
            >
              {navItem.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
