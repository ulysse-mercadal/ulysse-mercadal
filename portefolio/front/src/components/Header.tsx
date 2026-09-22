import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeaderProps {
  backgroundMode: string;
  setBackgroundMode: React.Dispatch<React.SetStateAction<string>>;
}

export const Header = ({ backgroundMode, setBackgroundMode }: HeaderProps) => {
  const { language, toggleLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const isWhite = backgroundMode === 'white';

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = language === 'fr'
    ? [
        { label: 'À propos', href: '/#about' },
        { label: 'Projets', href: '/#projects' },
        { label: 'Expériences', href: '/#experiences' },
        { label: 'CV', href: '/cv' },
      ]
    : [
        { label: 'About', href: '/#about' },
        { label: 'Projects', href: '/#projects' },
        { label: 'Experiences', href: '/#experiences' },
        { label: 'Resume', href: '/cv' },
      ];

  const headerStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: isMobile ? '0 16px' : '0 40px',
    borderBottom: `0.5px solid ${isWhite ? '#000000' : '#ffffff'}`,
    backgroundColor: isWhite ? '#ffffff' : '#000000',
    zIndex: 1000,
  };

  const navStyle: React.CSSProperties = {
    display: isMobile ? 'none' : 'flex',
    gap: '30px',
  };

  const mobileMenuStyle: React.CSSProperties = {
    display: isMenuOpen ? 'flex' : 'none',
    flexDirection: 'column',
    position: 'fixed',
    top: '60px',
    left: 0,
    right: 0,
    backgroundColor: isWhite ? '#ffffff' : '#000000',
    borderBottom: `0.5px solid ${isWhite ? '#000000' : '#ffffff'}`,
    padding: '20px',
    gap: '20px',
    zIndex: 999,
    alignItems: 'center',
  };

  return (
    <>
      <header style={headerStyle}>
        {isMobile && (
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              position: 'absolute',
              left: '16px',
              background: 'transparent',
              border: 'none',
              color: 'inherit',
              cursor: 'pointer',
              padding: '5px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        )}

        <nav style={navStyle}>
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                color: 'inherit',
                textDecoration: 'none',
                fontSize: '0.85rem',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Controls: Language Switcher & Theme Toggle */}
        <div style={{
          position: 'absolute',
          right: isMobile ? '16px' : '40px',
          display: 'flex',
          alignItems: 'center',
          gap: isMobile ? '10px' : '16px',
        }}>
          <button
            onClick={toggleLanguage}
            style={{
              background: 'transparent',
              border: `1px solid ${isWhite ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.3)'}`,
              borderRadius: '2px',
              color: 'inherit',
              cursor: 'pointer',
              padding: '4px 8px',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '1px',
              display: 'flex',
              alignItems: 'center',
              gap: '3px'
            }}
            title={language === 'fr' ? 'Passer en anglais' : 'Switch to French'}
          >
            <span style={{ opacity: language === 'fr' ? 1 : 0.35 }}>FR</span>
            <span style={{ opacity: 0.3 }}>/</span>
            <span style={{ opacity: language === 'en' ? 1 : 0.35 }}>EN</span>
          </button>

          <button
            onClick={() => setBackgroundMode(prev => prev === 'white' ? 'black' : 'white')}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'inherit',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title={language === 'fr' ? 'Changer de thème' : 'Toggle theme'}
          >
            {isWhite ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>
      </header>

      {isMobile && (
        <div style={mobileMenuStyle}>
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              style={{
                color: 'inherit',
                textDecoration: 'none',
                fontSize: '1.1rem',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};
