
import Breadcrumb from "@/components/UI/Breadcrumb";
import MarkdownEditor from "./components/MarkdownEditot";
import Metadata from "./components/metadata";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

export default function EditProject() {
    return (
        <>
            {/* <!-- Top Navigation (adapted from provided component) --> 
        <header className="flex-none z-50 glass-panel border-b border-surface-border">
        <div className="px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="size-8 text-primary animate-pulse">
                    <span className="material-symbols-outlined text-3xl">deployed_code</span>
                </div>
                <h2 className="text-white text-xl font-display font-bold tracking-tight">DEV // OS</h2>
            </div>
            <nav className="hidden md:flex items-center gap-8 font-mono text-sm tracking-wide">
                <a className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2" href="#">
                    <span className="material-symbols-outlined text-[18px]">dashboard</span> Dashboard
                </a>
                <a className="text-primary flex items-center gap-2 drop-shadow-[0_0_5px_rgba(6,182,212,0.5)]" href="#">
                    <span className="material-symbols-outlined text-[18px]">view_kanban</span> Project Nexus
                </a>
                <a className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2" href="#">
                    <span className="material-symbols-outlined text-[18px]">satellite_alt</span> Signal Feed
                </a>
            </nav>
            <div className="flex items-center gap-4">
                <div
                    className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    <div className="size-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div>
                    <span className="text-xs font-mono text-emerald-400 tracking-wider">SYSTEM ONLINE</span>
                </div>
                <div className="bg-center bg-no-repeat bg-cover rounded-full size-9 ring-2 ring-surface-border"
                    data-alt="User avatar of a man with glasses"
                    style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDf-Y9yiDG5jY3W4o2vn8tqiuBlGCMMitG9wnWAs_Wq_ok_gumDZU9sG07yHAuHf_Lx9SFaeauz-BFmR7IhCxA3z4mXeYgdG8uG4lFa7yOHPaIJTCXNfdiMK5mC_VjPmlO4h1DwFbyy5j-jxe27xbgYXgNDldBXXq5cyG2C4GRKcwP_IDZcpUv41dG2xv2reRLFmcOhV6oiuwrBwvaKjvH0ZZptdGD0WlKGil0vCQ8b5WrqIg8i2lkVbNILvqwrAtxp1mUTU6ACMwsy");'>
                </div>
            </div>
        </div>
    </header> */}
            {/* <!-- Breadcrumb Bar --> */}
            <Breadcrumb />
            {/* <!-- Main Workspace --> */}
            <section className="flex-1 flex overflow-hidden relative">
                {/* <!-- Background Grid Pattern --> */}
                <div className="absolute inset-0 bg-[length:40px_40px] bg-grid-pattern opacity-5 pointer-events-none"></div>
                {/* <!-- Left Panel: Input Console (Scrollable) --> */}
                <div className="flex-1 overflow-y-auto p-8 lg:p-12 pb-32">
                    <div className="max-w-3xl mx-auto space-y-12">
                        {/* <!-- Project Metadata Section --> */}
                        <Metadata />
                        <hr className="border-surface-border" />
                        {/* <!-- Content Editor Section --> */}
                        <section className="space-y-6">
                            <div className="flex items-center gap-2 text-primary font-mono text-xs tracking-widest opacity-70">
                                <FontAwesomeIcon icon={faEdit} className="text-sm" />
                                <span>| CASE_STUDY_CONTENT</span>
                            </div>
                            {/* <!-- Holographic Dropzone --> */}
                            <div className="relative group cursor-pointer">
                                <div
                                    className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-xl blur opacity-10 group-hover:opacity-30 transition duration-500">
                                </div>
                                <div
                                    className="relative rounded-xl border-2 border-dashed border-gray-700 bg-void/50 hover:bg-void/80 hover:border-primary/50 transition-all duration-300 p-10 flex flex-col items-center justify-center gap-4 text-center">
                                    <div
                                        className="size-16 rounded-full bg-gray-800/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:bg-primary/20">
                                        <span
                                            className="material-symbols-outlined text-3xl text-gray-400 group-hover:text-primary transition-colors">cloud_upload</span>
                                    </div>
                                    <div>
                                        <h3 className="text-white font-display font-medium text-lg">Drop High-Res Assets</h3>
                                        <p className="text-gray-500 text-sm mt-1">Accepts PNG, JPG, WEBP (Max 25MB)</p>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- Markdown Editor --> */}
                            <MarkdownEditor />
                        </section>
                    </div>
                </div>
                {/* <!-- Right Panel: Live Preview (Sticky) --> */}
                {/* <div
            className="hidden xl:block w-[450px] flex-none border-l border-surface-border bg-black/20 backdrop-blur-sm relative">
            <div className="absolute inset-0 flex flex-col">
                <div className="p-4 border-b border-surface-border flex items-center justify-between">
                    <div className="flex items-center gap-2 text-primary font-mono text-xs tracking-widest opacity-70">
                        <span className="material-symbols-outlined text-sm">visibility</span>
                        // LIVE_PREVIEW
                    </div>
                    <div className="flex gap-1">
                        <div className="size-2.5 rounded-full bg-red-500/20 border border-red-500/50"></div>
                        <div className="size-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                        <div className="size-2.5 rounded-full bg-green-500/20 border border-green-500/50"></div>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center"> */}
                {/* <!-- Project Card Preview --> */}
                {/* <div
                        className="w-full bg-gray-900 rounded-xl overflow-hidden border border-surface-border shadow-2xl relative group">
                        {/* <!-- Image --> */}
                {/* <div className="h-48 w-full bg-cover bg-center relative"
                            data-alt="Abstract data dashboard interface visualization"
                            style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCuK1ZroafEvo_3gmnslroPSDxqYoIjitijZAp4h3s3VaNQuOBKt2rN7TWKSW3An9_kVU5F2JJfXtmO9PqTtVhrIX-Pk78JzgjHrPqdHz6fqKOG5Bf4zk3LVoYltcvsy65Ej0nY2yntYzbfBBMjQi0Hw6agjU_KirIAhDQNJODINHa8JR_ciidQILP6bRI47eIjM2hq_mmlnK0NpG7SD5IKZDqaTf_3M4FodLfX1zCtnbJRKvJztpJ_ifcABRtZJAGBklq6VxsehWpX");'>
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent">
                            </div>
                            <div
                                className="absolute top-3 right-3 px-2 py-1 bg-black/60 backdrop-blur rounded text-xs font-mono text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                LIVE
                            </div>
                        </div> */}
                {/* <!-- Content --> */}
                {/* <div className="p-5 space-y-4">
                            <div className="flex gap-2 mb-2">
                                <span
                                    className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-cyan-900/30 text-cyan-400 border border-cyan-500/20">React</span>
                                <span
                                    className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-purple-900/30 text-purple-400 border border-purple-500/20">TS</span>
                            </div>
                            <div>
                                <h3 className="text-white font-display font-bold text-xl leading-tight mb-1">Velocimeter X
                                </h3>
                                <p className="text-gray-400 text-sm line-clamp-2">High-performance telemetry dashboard for
                                    autonomous vehicle fleets, processing millions of data points in real-time.</p>
                            </div>
                            <div className="pt-4 border-t border-gray-800 flex justify-between items-center">
                                <span className="text-xs text-gray-500 font-mono">DEPLOYED: 2h AGO</span>
                                <button className="text-white hover:text-primary transition-colors">
                                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                                </button>
                            </div>
                        </div> */}
                {/* <!-- Hover Effect Border --> */}
                {/* <div
                            className="absolute inset-0 border border-transparent group-hover:border-primary/50 rounded-xl transition-colors pointer-events-none">
                        </div>
                    </div>
                    <div className="mt-8 text-center">
                        <p className="text-xs font-mono text-gray-600 mb-2">SIMULATION_MODE: ACTIVE</p>
                        <div className="h-1 w-32 bg-gray-800 rounded-full mx-auto overflow-hidden">
                            <div className="h-full bg-primary/50 w-2/3 animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div> */}
                {/* <!-- Footer Action Bar (Floating) --> */}
                <div className="absolute bottom-6 left-0 right-0 px-8 flex justify-center pointer-events-none">
                    <div
                        className="glass-panel px-6 py-3 rounded-2xl flex items-center gap-6 pointer-events-auto shadow-2xl border border-surface-border/50 backdrop-blur-xl">
                        <div className="flex items-center gap-2 pr-6 border-r border-white/10">
                            <span className="relative flex h-2 w-2">
                                <span
                                    className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                            </span>
                            <span className="text-amber-500 text-xs font-mono font-medium tracking-wide">DRAFT - UNSAVED
                                CHANGES</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                className="px-5 py-2 rounded-lg text-sm font-bold font-display text-gray-300 hover:text-white hover:bg-white/5 transition-all flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">save</span>
                                Save Draft
                            </button>
                            <button
                                className="relative group px-6 py-2 rounded-lg text-sm font-bold font-display text-void bg-primary overflow-hidden transition-all hover:shadow-neon hover:scale-105">
                                <div className="absolute inset-0 bg-white/20 group-hover:bg-transparent transition-colors"></div>
                                <span className="relative flex items-center gap-2 z-10">
                                    <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
                                    Execute Deploy
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}