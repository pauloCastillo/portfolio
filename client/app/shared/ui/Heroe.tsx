"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Typewriter from "./Typewriter";

const words = ["cobran vida", "se despliegan", "escalan", "innovan"];

export default function HeroePage() {
  return (
    <section id="heroe" className="max-w-full mx-auto px-10 max-md:px-5 pt-28 max-md:pt-20 pb-28 max-md:pb-20">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="font-mono text-[13px] text-cyan tracking-wider mb-6 flex items-center gap-4"
      >
        <span className="block w-8 h-px bg-cyan" />
        Fullstack Developer
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
        className="text-[clamp(2rem,6vw,4.5rem)] font-semibold leading-[1.08] tracking-[-0.02em] mb-6 max-w-full"
      >
        Construyo ideas<br />que <Typewriter words={words} className="text-cyan" />
        <br />para tu proyecto.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
        className="text-base max-md:text-sm text-muted max-w-full md:max-w-1/2 mb-10 leading-relaxed"
      >
        Aplicaciones web elegantes, eficientes y escalables. De la interfaz al servidor — y de vuelta al usuario.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.45 }}
        className="flex gap-3.5 flex-wrap"
      >
        <Link
          href="#proyectos"
          className="font-mono text-sm font-medium bg-cyan text-[#0f1117] px-7 py-3 rounded-lg no-underline transition-opacity duration-200 hover:opacity-85"
        >
          Ver proyectos
        </Link>
        <Link
          href="#contacto"
          className="font-mono text-sm text-text border border-border px-7 py-3 rounded-lg no-underline transition-colors duration-200 hover:border-cyan hover:text-cyan"
        >
          Trabajemos juntos
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
        className="mt-16 bg-surface border border-border rounded-xl p-6 max-md:p-4 max-w-full md:max-w-1/2 font-mono text-[13px] max-md:text-[11px] leading-[1.9] overflow-x-auto"
      >
        <div className="flex gap-2 mb-4 pb-4 border-b border-border">
          <span className="w-3 h-3 rounded-full bg-[#ef4444]" />
          <span className="w-3 h-3 rounded-full bg-[#f59e0b]" />
          <span className="w-3 h-3 rounded-full bg-[#22c55e]" />
          <span className="text-[12px] max-md:text-[10px] text-[#3a4060] ml-2">kastidev.ts</span>
        </div>
        <div>
          <span className="text-[#3a4060] mr-6 max-md:mr-3 select-none">1</span>
          <span className="text-cyan">const</span> <span className="text-text">kastidev</span> = {'{'}
        </div>
        <div>
          <span className="text-[#3a4060] mr-6 max-md:mr-3 select-none">2</span>
          &nbsp;&nbsp;role: <span className="text-[#86efac]">&quot;Fullstack Developer&quot;</span>,
        </div>
        <div>
          <span className="text-[#3a4060] mr-6 max-md:mr-3 select-none">3</span>
          &nbsp;&nbsp;stack: [<span className="text-[#86efac]">&quot;React&quot;</span>, <span className="text-[#86efac]">&quot;Next.js&quot;</span>,<span className="text-[#86efac]">&quot;Vue&quot;</span>,<span className="text-[#86efac]">&quot;Nuxt.js&quot;</span>,<span className="text-[#86efac]">&quot;Typescript&quot;</span>,<span className="text-[#86efac]">&quot;Node&quot;</span>],
        </div>
        <div>
          <span className="text-[#3a4060] mr-6 max-md:mr-3 select-none">4</span>
          &nbsp;&nbsp;otherStack: [<span className="text-[#86efac]">&quot;Express&quot;</span>, <span className="text-[#86efac]">&quot;Nest.js&quot;</span>,<span className="text-[#86efac]">&quot;Python&quot;</span>,<span className="text-[#86efac]">&quot;Django&quot;</span>],
        </div>
        <div>
          <span className="text-[#3a4060] mr-6 max-md:mr-3 select-none">5</span>
          &nbsp;&nbsp;mobile: [<span className="text-[#86efac]">&quot;React Native&quot;</span>, <span className="text-[#86efac]">&quot;Android&quot;</span>],
        </div>
        <div>
          <span className="text-[#3a4060] mr-6 max-md:mr-3 select-none">6</span>
          &nbsp;&nbsp;status: <span className="text-[#86efac]">&quot;always learning&quot;</span> <span className="text-muted">+<span className="text-[#86efac]"> &quot;🚀 always deploying real projects&quot;</span></span>,
        </div>
        <div>
          <span className="text-[#3a4060] mr-6 max-md:mr-3 select-none">7</span>
          {'}'}<span className="inline-block w-0.5 h-5 bg-gradient-to-cyan from-cyan to-indigo ml-1 align-middle" style={{ animation: 'blink 1.1s step-end infinite, gradient-shift 3s ease-in-out infinite', backgroundSize: '200% 200%' }} />
        </div>
      </motion.div>
    </section>
  );
}
