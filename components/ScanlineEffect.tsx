export default function ScanlineEffect() {
  return (
    <>
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[5] scanline-effect" />
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[5] vignette-effect" />
    </>
  );
}
