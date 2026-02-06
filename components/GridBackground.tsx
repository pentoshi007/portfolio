export default function GridBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(0deg, transparent 24%, rgba(0, 255, 170, 0.05) 25%, rgba(0, 255, 170, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 255, 170, 0.05) 75%, rgba(0, 255, 170, 0.05) 76%, transparent 77%, transparent),
              linear-gradient(90deg, transparent 24%, rgba(0, 255, 170, 0.05) 25%, rgba(0, 255, 170, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 255, 170, 0.05) 75%, rgba(0, 255, 170, 0.05) 76%, transparent 77%, transparent)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0fa] opacity-15 rounded-full blur-[60px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#0fa] opacity-15 rounded-full blur-[60px]" />
    </div>
  );
}
