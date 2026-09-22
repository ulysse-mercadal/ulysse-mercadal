'use client';

import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';

interface HeaderProps {
  backgroundMode: string;
  setBackgroundMode: React.Dispatch<React.SetStateAction<string>>;
}

export const Header = ({ backgroundMode, setBackgroundMode }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

  const navItems = ['About', 'Projects', 'Experiences'];

  const headerStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: isMobile ? '0 20px' : '0 40px',
    borderBottom: `0.5px solid ${backgroundMode === 'white' ? '#000000' : '#ffffff'}`,
    backgroundColor: backgroundMode === 'white' ? '#ffffff' : '#000000',
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
    backgroundColor: backgroundMode === 'white' ? '#ffffff' : '#000000',
    borderBottom: `0.5px solid ${backgroundMode === 'white' ? '#000000' : '#ffffff'}`,
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
              left: '20px',
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
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}

        <nav style={navStyle}>
          {navItems.map(item => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              style={{
                color: 'inherit',
                textDecoration: 'none',
                fontSize: '0.9rem',
                letterSpacing: '1px',
                textTransform: 'uppercase'
              }}
            >
              {item}
            </a>
          ))}
        </nav>

        <button
          onClick={() => setBackgroundMode(prev => prev === 'white' ? 'black' : 'white')}
          style={{
            position: 'absolute',
            right: isMobile ? '20px' : '40px',
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
          {backgroundMode === 'white' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </header>

      {isMobile && (
        <div style={mobileMenuStyle}>
          {navItems.map(item => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setIsMenuOpen(false)}
              style={{
                color: 'inherit',
                textDecoration: 'none',
                fontSize: '1.2rem',
                letterSpacing: '1px',
                textTransform: 'uppercase'
              }}
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </>
  );
};
