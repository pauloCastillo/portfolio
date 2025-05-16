import { Link } from "@remix-run/react";

export default function Footer() {
  return (
    <footer className="p-4 mb-1.5 rounded-b-md">
      <h3 className="capitalize text-cyan-300">articles</h3>
      <ul className="flex items-center justify-around mb-5 text-cyan-300">
        <div>
          <li>article1</li>
          <li>article2</li>
          <li>article3</li>
        </div>
        <div>
          <li>article4</li>
          <li>article5</li>
          <li>article6</li>
        </div>
      </ul>
      <hr />
      <ul className="flex justify-around items-center text-cyan-300">
        <li>
          <Link to="http://www.linkedin.com">logo1</Link>
        </li>
        <li>
          <Link to="http://www.instagram.com">logo2</Link>
        </li>
        <li>
          <Link to="http://www.tiktok.com">logo3</Link>
        </li>
        <li>
          <Link to="http://www.facebook.com">logo4</Link>
        </li>
      </ul>
      <div className="flex flex-col justify-center items-center my-2.5">
        <Link
          to="/"
          className="text-center text-lime-300 capitalize font-light hover:cursor-pointer"
        >
          terms and conditions
        </Link>
        <p className="text-center font-medium text-amber-50 capitalize">
          &copy; 2026 paulo sergio castillo monroy
        </p>
      </div>
    </footer>
  );
}
