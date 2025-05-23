import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
export const meta: MetaFunction = () => {
  return [
    { title: "Portfolio - Paulo Castillo" },
    { name: "description", content: "Welcome to my portfolio 100% do it by myself" },
  ];
};

export default function Index() {
    

  return (
   <div className="flex flex-col items-center justify-center py-2 absolute z-10 bg-slate-900 bg-opacity-50 w-full h-full">
      <h1 className="text-4xl font-bold">Welcome to my portfolio!</h1>
      <p className="text-lg mt-4">I am a web developer with a passion for creating beautiful and functional websites.</p>
      <p className="text-lg mt-4">Feel free to explore my work and get in touch!</p>
      <div className="flex flex-col items-center my-8">
        <Link to="/about" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Learn more about me</Link> 
      </div> 
   </div>
  );
}