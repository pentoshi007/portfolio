import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MatrixRain from './components/MatrixRain';
import FloatingParticles from './components/FloatingParticles';
import ScanlineEffect from './components/ScanlineEffect';
import GridBackground from './components/GridBackground';
import HexGrid from './components/HexGrid';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={`min-h-screen bg-[#0a0a0f] relative ${isLoaded ? 'fade-in' : 'opacity-0'}`}>
      <GridBackground />
      <HexGrid />
      <MatrixRain />
      <FloatingParticles />
      <ScanlineEffect />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Certifications />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
