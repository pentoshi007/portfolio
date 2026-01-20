import { skills } from '../data/portfolioData';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const categories = [
  {
    key: 'frontend',
    label: 'CLIENT',
    desc: 'What users see',
    color: '#0fa'
  },
  {
    key: 'backend',
    label: 'SERVER',
    desc: 'What users don\'t',
    color: '#0af'
  },
  {
    key: 'databases',
    label: 'DATA',
    desc: 'Where it lives',
    color: '#fa0'
  },
  {
    key: 'cybersecurity',
    label: 'OFFENSE',
    desc: 'Breaking things',
    color: '#f55'
  },
  {
    key: 'securityTools',
    label: 'ARSENAL',
    desc: 'Weapons of choice',
    color: '#f0a'
  },
  {
    key: 'devops',
    label: 'OPS',
    desc: 'Making it live',
    color: '#5f5'
  },
];

export default function Skills() {
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { elementRef: gridRef, isVisible: gridVisible } = useScrollAnimation();

  return (
    <section id="skills" className="py-24 px-4 md:px-8 bg-[#080810]">
      <div className="max-w-5xl mx-auto">
        <div ref={titleRef as React.RefObject<HTMLDivElement>} className={`mb-16 ${titleVisible ? 'slide-in-left' : 'opacity-0'}`}>
          <h2 className="section-title text-2xl md:text-3xl font-bold text-white mb-2">arsenal</h2>
          <p className="text-gray-500 font-mono text-sm mt-4">/* tools of the trade */</p>
        </div>

        <div ref={gridRef as React.RefObject<HTMLDivElement>} className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map(({ key, label, desc, color }, index) => (
            <div
              key={key}
              className={`hacker-card p-5 group transition-all duration-300 ${gridVisible ? `scale-in stagger-${(index % 6) + 1}` : 'opacity-0'}`}
              style={{ '--accent': color } as React.CSSProperties}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-mono text-xs tracking-wider" style={{ color }}>{label}</h3>
                  <p className="text-gray-500 text-xs mt-0.5">{desc}</p>
                </div>
                <div
                  className="w-2 h-2 rounded-full opacity-60"
                  style={{ background: color, boxShadow: `0 0 10px ${color}` }}
                />
              </div>

              <div className="flex flex-wrap gap-1.5">
                {skills[key as keyof typeof skills].map((skill) => (
                  <span
                    key={skill}
                    className="tag"
                    style={{
                      borderColor: `${color}33`,
                      color: color,
                      background: `${color}10`
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-5 border border-[#0fa]/10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <p className="font-mono text-xs text-[#0fa]/60 mb-1">$ echo $LANGUAGES</p>
              <p className="text-gray-400 text-sm">
                <span className="text-white">English</span> (Professional) |
                <span className="text-white ml-1">Hindi</span> (Native)
              </p>
            </div>
            <div>
              <p className="font-mono text-xs text-[#0fa]/60 mb-1">$ echo $SOFT_SKILLS</p>
              <p className="text-gray-500 text-xs">
                Problem Solving | Analytical | Self-Learning | Detail-Oriented
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
