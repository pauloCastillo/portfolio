"use client";
import Image from "next/image";
import Link from "next/link";

export default function NavbarLayout() {
  const links = ["Home", "Proyectos", "Servicios", "Sobre Mí", "Contacto"];

  return (
    <nav className="bg-gray-950 flex items-center justify-between px-4">
      <Link href="/" className="flex items-center-safe">
        <Image src={"/vercel.svg"} alt="logo" width={35} height={35} />
        <p className="text-white text-xl">PortfolioLogo</p>
      </Link>
      <ul className="flex items-center space-x-4 p-4 text-white capitalize">
        {links.map((link) => (
          <li
            key={link}
            className={`hover:text-purple-600 transition-all ${
              link === "Contact"
                ? "bg-purple-600 px-3 py-1 rounded-md font-bold"
                : ""
            }`}
          >
            <Link href={link === "Home" ? "/" : `#${link.toLowerCase()}`}>
              {link}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
