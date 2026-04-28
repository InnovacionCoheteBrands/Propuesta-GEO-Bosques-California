import React, { useState, useEffect } from 'react';
import { NAV_ITEMS } from '../../constants';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onNavigate?: (pageId: string) => void;
  currentPage: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = currentPage === 'home';
  const showSolidNav = scrolled || !isHome || mobileMenuOpen;

  const textClass = showSolidNav ? 'text-forest' : 'text-white';
  const shadowClass = showSolidNav ? '' : 'drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]';

  const handleNavClick = (id: string) => {
    if (onNavigate) {
      onNavigate(id);
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-500 px-6 py-4 md:px-12 flex justify-between items-center">
      {/* Background Layers for smooth transition */}
      {/* 1. Gradient Scrim Layer (Transparent Header) */}
      <div
        className={`absolute inset-0 z-0 bg-gradient-to-b from-black/60 to-transparent transition-opacity duration-700 pointer-events-none ${showSolidNav ? 'opacity-0' : 'opacity-100'}`}
      />

      {/* 2. Solid White Layer (Scrolled/Other Pages) */}
      <div
        className={`absolute inset-0 z-0 bg-off-white/95 backdrop-blur-md shadow-sm border-b border-forest/5 transition-opacity duration-700 pointer-events-none ${showSolidNav ? 'opacity-100' : 'opacity-0'}`}
      />

      <div className="relative z-10 flex justify-between items-center w-full">
        <a
          href="/"
          className="cursor-pointer z-50"
          onClick={() => setMobileMenuOpen(false)}
        >
          <img
            src="/assets/logo-bosques.png"
            alt="Bosques California"
            className="h-20 w-auto object-contain"
          />
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 items-center">
          {NAV_ITEMS.map((item) => {
            let href = `/${item.id}`;
            if (item.id === 'home') href = '/';

            return (
              <li key={item.id}>
                <a
                  href={href}
                  className={`text-xs font-sans font-semibold uppercase tracking-widest hover:text-gold transition-colors duration-500 ${item.isSpecial ? 'text-gold' : textClass} ${shadowClass}`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Mobile Hamburger */}
        <button
          className={`md:hidden z-50 transition-colors duration-500 ${textClass}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 left-0 w-full h-screen bg-off-white flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {NAV_ITEMS.map((item) => {
              let href = `/${item.id}`;
              if (item.id === 'home') href = '/';

              return (
                <a
                  key={item.id}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-xl font-serif font-medium uppercase tracking-widest ${item.isSpecial ? 'text-gold' : textClass} ${shadowClass}`}
                >
                  {item.label}
                </a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

