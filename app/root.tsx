import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import "./styles/tailwind.css";
import Slider from "~/components/slider/Slider";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
   const images = [
        "https://static.vecteezy.com/system/resources/previews/021/495/985/non_2x/facebook-social-media-logo-icon-free-png.png",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2F1000marcas.net%2Ftik-tok-logo%2F&psig=AOvVaw0gBa_AHutN8NzgylNJOtXY&ust=1747964953588000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLikgIP7tY0DFQAAAAAdAAAAABAE",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHP2W0X8Bj9Wwou8Y5Iv2q_Aa-nME9SMwEAA&s"
    ]

  return(
    <div className="container mx-auto w-full-screen">
         <Navbar />
          <main className="flex flex-col items-center justify-center min-h-screen relative">
            <Slider slides={images} />
            <Outlet />
          </main>  
          <Footer />
    </div>
  );
}
