export default function Footer() {
  return (
    <footer className="py-12 px-4 bg-[#050508] border-t border-[#0fa]/10 relative overflow-hidden">
      {/* Subtle glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#0fa]/30 to-transparent" />
      
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 pb-8 border-b border-[#0fa]/5">
          <div className="space-y-4">
            <div className="font-mono text-sm flex items-center gap-2">
              <span className="text-[#0fa]">$</span>
              <span className="text-white">aniket_pandey</span>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed max-w-xs">
              Full-Stack Developer and Cybersecurity enthusiast focused on building secure, scalable, and high-performance applications.
            </p>
          </div>

          <div className="space-y-4 md:text-center">
            <h4 className="font-mono text-[10px] tracking-widest text-[#0fa]/60 uppercase">Quick Links</h4>
            <div className="flex flex-wrap md:justify-center gap-4 text-xs font-mono">
              <a href="#about" className="text-gray-400 hover:text-white transition-colors">About</a>
              <a href="#skills" className="text-gray-400 hover:text-white transition-colors">Arsenal</a>
              <a href="/blogs" className="text-[#0fa] hover:text-white transition-colors underline underline-offset-4 decoration-[#0fa]/30">Blogs</a>
              <a href="#projects" className="text-gray-400 hover:text-white transition-colors">Projects</a>
            </div>
          </div>

          <div className="space-y-4 md:text-right">
            <h4 className="font-mono text-[10px] tracking-widest text-[#0fa]/60 uppercase">Tech Stack</h4>
            <div className="flex md:justify-end items-center gap-3 text-[10px] font-mono text-gray-500 italic">
              <span>Next.js 16</span>
              <span className="text-[#0fa]/20">•</span>
              <span>React 19</span>
              <span className="text-[#0fa]/20">•</span>
              <span>Tailwind v4</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[10px]">
          <div className="text-gray-600 flex items-center gap-2">
            <span className="text-[#0fa]/40">&copy; {new Date().getFullYear()}</span>
            <span>ANIKET_PANDEY.EXE</span>
          </div>

          <div className="text-gray-600 italic">
            // all systems operational.
          </div>
        </div>
      </div>
    </footer>
  );
}
