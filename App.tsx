import React, { useState, useEffect, useRef } from 'react';
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
import { motion, AnimatePresence } from 'framer-motion';

// Register GSAP Plugin outside of component to avoid re-registration
gsap.registerPlugin(ScrollTrigger);

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const lenisRef = useRef<Lenis | null>(null);

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

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home onNavigate={handleNavigate} />;
      case 'modelos': return <Models />;
      case 'galeria': return <Gallery />;
      case 'ubicacion': return <Location />;
      case 'refiere': return <ReferralPage />;
      case 'contacto': return <ContactPage />;
      default: return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="antialiased text-text-main selection:bg-gold selection:text-white w-full min-h-screen overflow-x-hidden">
      <CustomCursor />
      
      <Navbar onNavigate={handleNavigate} currentPage={currentPage} />

      {/* Page Transition Wrapper */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen w-full"
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>

      {/* Wipe Transition Effect */}
      <motion.div
        key={`wipe-${currentPage}`}
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 bg-navy z-[9998] origin-top pointer-events-none"
      />

      <ChatWidget />
    </div>
  );
}

export default App;