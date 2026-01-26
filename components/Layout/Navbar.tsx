import React, { useState, useEffect } from 'react';
import { NAV_ITEMS } from '../../constants';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onNavigate: (pageId: string) => void;
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
  const navClass = scrolled || !isHome || mobileMenuOpen
    ? 'bg-off-white/95 backdrop-blur-md shadow-sm border-b border-navy/5'
    : 'bg-transparent';

  const textClass = scrolled || !isHome || mobileMenuOpen ? 'text-navy' : 'text-white';

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 px-6 py-6 md:px-12 flex justify-between items-center ${navClass}`}>
      <div
        onClick={() => handleNavClick('home')}
        className="cursor-pointer z-50"
      >
        <img
          src="/assets/logo-bosques.png"
          alt="Bosques California"
          className={`h-12 w-auto object-contain transition-all duration-300`}
        />
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-8 items-center">
        {NAV_ITEMS.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => handleNavClick(item.id)}
              className={`text-xs font-sans font-semibold uppercase tracking-widest hover:text-gold transition-colors duration-300 ${item.isSpecial ? 'text-gold' : textClass}`}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>

      {/* Mobile Hamburger */}
      <button
        className={`md:hidden z-50 ${textClass}`}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 left-0 w-full h-screen bg-off-white flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-xl font-serif font-medium uppercase tracking-widest ${item.isSpecial ? 'text-gold' : 'text-navy'}`}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
