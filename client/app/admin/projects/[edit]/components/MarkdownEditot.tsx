export default function MarkdownEditor(){
    return(
        <div className="glass-panel rounded-xl overflow-hidden flex flex-col min-h-1/2 border border-surface-border">
            <div
                className="bg-black/40 px-4 py-2 flex items-center justify-between border-b border-surface-border">
                <div className="flex items-center gap-1">
                    <button
                        className="p-1.5 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                        title="Bold"><span
                            className="material-symbols-outlined text-[18px]">format_bold</span></button>
                    <button
                        className="p-1.5 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                        title="Italic"><span
                            className="material-symbols-outlined text-[18px]">format_italic</span></button>
                    <button
                        className="p-1.5 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                        title="Link"><span
                            className="material-symbols-outlined text-[18px]">link</span></button>
                    <div className="w-px h-4 bg-gray-700 mx-1"></div>
                    <button
                        className="p-1.5 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                        title="Code Block"><span
                            className="material-symbols-outlined text-[18px]">code</span></button>
                    <button
                        className="p-1.5 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                        title="Image"><span
                            className="material-symbols-outlined text-[18px]">image</span></button>
                </div>
                <span className="text-xs font-mono text-gray-600">MARKDOWN_MODE</span>
            </div>
            <div className="flex-1 flex relative">
                {/* <!-- Line Numbers --> */}
                <div
                    className="w-12 bg-black/20 text-right pr-3 pt-4 text-gray-700 font-mono text-sm select-none border-r border-surface-border hidden sm:block">
                    01<br />02<br />03<br />04<br />05<br />06<br />07<br />08<br />09<br />10<br />11
                </div>
                {/* <!-- Text Area --> */}
                <textarea 
                    className="flex-1 bg-transparent border-none focus:ring-0 p-4 text-gray-300 font-mono text-sm leading-relaxed resize-none"
                    spellCheck={true}
                    defaultValue={`
                        # Challenge
                        The client needed a system capable of visualizing 10k+ data points per second with &lt;50ms latency. The existing legacy dashboard was built on older monolithic architecture that couldn &apos;t handle the websocket throughput.

                        # Solution
                        We re-architected the frontend using:
                        - **WebGL** for GPU-accelerated rendering
                        - **WebSockets** for real-time bidirectional communication
                        - **Rust** backend services for data normalization

                        ## The Result
                        &gt; The new system isn&apos;t just faster; it&apos;s a completely different className of tool.&quot; - CTO, AutoFleet

                        System efficiency improved by 400% while reducing server costs by half.
                        `}
                ></textarea>
            </div>
        </div>
    )
}