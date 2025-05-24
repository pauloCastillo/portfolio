import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import Slider from "~/components/slider/Slider";

export const meta: MetaFunction = () => {
  return [
    { title: "Paulo Castillo - Portfolio" },
    { name: "description", content: "Welcome to my portfolio 100% do it by myself" },
  ];
};

export default function Index() {
    const images = [
        "https://via.assets.so/game.jpg?w=1280&h=720&fit=fill",
        "https://via.assets.so/furniture.jpg?w=1280&h=720&fit=fill",
        "https://via.assets.so/game.jpg?id=1&w=1280&h=720&fit=fill",
        "https://via.assets.so/shoe.jpg?w=1280&h=720&fit=fill",
      ]
  return (
    <>
    <Slider slides={images} />
    <div className="flex flex-col items-center justify-center py-2 bg-gray-800 bg-opacity-50 absolute inset-0">
        <h1 className="text-4xl font-bold">Welcome to my portfolio!</h1>
        <p className="text-lg mt-4">I am a web developer with a passion for creating beautiful and functional websites.</p>
        <p className="text-lg mt-4">Feel free to explore my work and get in touch!</p>
        <div className="flex flex-col items-center my-8">
          <Link to="/about" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Learn more about me</Link> 
        </div> 
    </div>
    </>
  );
}