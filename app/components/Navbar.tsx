import { Link } from "@remix-run/react"
import Button from "./Button";

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between bg-[#2F81EE] p-2 rounded-t-md shadow-lg sticky top-0 z-30">
            <Link to="/" className="h-14">
                <img src="/horizontal_logo.svg" alt="logo" className="h-14" />
            </Link>
            <ul className="flex space-x-4 items-center justify-center">
                <li><Link to="/" className="nav-item">home</Link></li>
                <li><Link to="/about" className="nav-item">about</Link></li>
                <li><Link to="/work" className="nav-item">work</Link></li>
                <li><Link to="/blog" className="nav-item">blog</Link></li>
                <li><Link to="/contact" className="nav-item">contact me</Link></li>
                <Button text="hire me!" onClick={() => alert("Button clicked!")} />
            </ul>
        </nav>
    );
}