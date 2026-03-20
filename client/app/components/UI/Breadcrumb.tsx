import Link from "next/link"

export default function Breadcrumb(){
    return(
    <div className="flex-none px-6 py-3 border-b border-surface-border bg-void/50 backdrop-blur-sm flex items-center gap-2 text-sm font-mono">
        <Link className="text-gray-500 hover:text-primary transition-colors" href="#">Project Nexus</Link>
        <span className="text-gray-600">/</span>
        <span className="text-primary">Edit Protocol: 001</span>
    </div>
    )
}