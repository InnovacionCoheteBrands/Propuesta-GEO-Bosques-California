import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Layout/Navbar';
import CustomCursor from './components/Layout/CustomCursor';
import Home from './components/Pages/Home';
import Models from './components/Pages/Models';
import Gallery from './components/Pages/Gallery';
import Location from './components/Pages/Location';
import { ContactPage, ReferralPage } from './components/Pages/Forms';
import ChatWidget from './components/Chat/ChatWidget';
import IntroOverlay from './components/Layout/IntroOverlay';
import { motion, AnimatePresence } from 'framer-motion';

// Register GSAP Plugin outside of component to avoid re-registration
gsap.registerPlugin(ScrollTrigger);

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const lenisRef = useRef<Lenis | null>(null);

  // Force scroll to top on mount/reload
  useLayoutEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  // Initialize Lenis and Sync with GSAP
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Synchronize Lenis with ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Use GSAP's ticker to drive Lenis for perfect sync
    // This is crucial for pinned elements to not jitter or lock
    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0); // Prevents jumps during heavy loads

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  // Handle Page Navigation with Scroll Reset and Trigger Refresh
  const handleNavigate = (page: string) => {
    if (page === currentPage) return;

    // Scroll to top immediately to prevent layout shifts
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }

    setCurrentPage(page);
  };

  // Effect to refresh ScrollTrigger after page transition
  // This ensures new DOM elements are calculated correctly
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000); // Allow time for exit/enter animations to complete

    return () => clearTimeout(timer);
  }, [currentPage]);

  // Intro Logic
  const [showIntro, setShowIntro] = useState(true); // Forced true for dev/review

  const handleIntroComplete = () => {
    setShowIntro(false);
    // sessionStorage.setItem('hasVisited', 'true'); // Disabled for testing
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home onNavigate={handleNavigate} isIntroPlaying={showIntro} />; // Pass prop for sync
      case 'modelos': return <Models />;
      case 'galeria': return <Gallery />;
      case 'ubicacion': return <Location />;
      case 'refiere': return <ReferralPage />;
      case 'contacto': return <ContactPage />;
      default: return <Home onNavigate={handleNavigate} isIntroPlaying={showIntro} />;
    }
  };

  return (
    <div className="antialiased text-text-main selection:bg-gold selection:text-white w-full min-h-screen overflow-x-hidden">
      <CustomCursor />

      {showIntro && (
        <React.Suspense fallback={null}>
          <IntroOverlay onComplete={handleIntroComplete} />
        </React.Suspense>
      )}

      <Navbar onNavigate={handleNavigate} currentPage={currentPage} />

      {/* Page Transition Wrapper */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          // Radial reveal logic
          // Initial: Closed circle (hidden)
          // Animate: Open circle (reveal)
          // Exit: Fade out to let next page 'open'
          initial={{ clipPath: 'circle(0% at 50% 50%)' }}
          animate={{
            clipPath: 'circle(150% at 50% 50%)',
            transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] }
          }}
          exit={{ opacity: 1 }} // We keep it visible while mask closes or new one opens? Actually, better to just let new one open ON TOP.
          className="min-h-screen w-full relative z-[10]"
          style={{ backgroundColor: 'var(--off-white)' }} // Ensure background to cover previous page
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>

      <ChatWidget />
    </div>
  );
}

export default App;