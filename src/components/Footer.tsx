export default function Footer() {
  return (
    <footer className="py-8 px-4 bg-[#050508] border-t border-[#0fa]/10">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs">
          <div className="text-gray-500">
            <span className="text-[#0fa]">$</span> echo "Built by Aniket Pandey"
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <span>React</span>
            <span className="text-[#0fa]">|</span>
            <span>TypeScript</span>
            <span className="text-[#0fa]">|</span>
            <span>Tailwind</span>
          </div>

          <div className="text-gray-600">
            &copy; {new Date().getFullYear()} <span className="text-gray-500">// all rights reserved</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
