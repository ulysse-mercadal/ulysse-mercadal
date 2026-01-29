'use client';

import React, { useEffect, useState } from 'react';

interface Repetition3DTextProps {
  text: string;
  color: string;
}

export const Repetition3DText = ({ text, color }: Repetition3DTextProps) => {
  const [mousePos, setMousePos] = useState({ x: 1, y: -1 });
  const [fontSize, setFontSize] = useState('6rem');
  const [letterSpacing, setLetterSpacing] = useState('8px');
  const [movementFactor, setMovementFactor] = useState(10);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let newSize;
      if (width < 480) {
        newSize = '2.5rem';
      } else if (width < 768) {
        newSize = '3.5rem';
      } else if (width < 1200) {
        newSize = '5rem';
      } else {
        newSize = '6rem';
      }
      setFontSize(newSize);
      setLetterSpacing(width < 768 ? '4px' : '8px');
      setMovementFactor(width < 768 ? 5 : 10);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div style={{
      position: 'relative',
      fontSize: fontSize,
      fontWeight: '900',
      textTransform: 'uppercase',
      letterSpacing: letterSpacing,
      lineHeight: 1,
      textAlign: 'center',
      maxWidth: '100%',
      overflow: 'visible',
      marginTop: '10rem', // Added top margin
      marginBottom: '7rem'
    }}>
      {[...Array(40)].map((_, i) => (
        <span
          key={i}
          style={{
            position: i === 0 ? 'relative' : 'absolute',
            top: 0,
            left: '50%',
            transform: `translate(calc(-50% + ${i * mousePos.x * movementFactor}px), ${i * mousePos.y * movementFactor}px) scale(${1 - i * 0.01})`,
            zIndex: 40 - i,
            color: i === 0 ? color : 'transparent',
            WebkitTextStroke: `1px ${color}`,
            whiteSpace: 'nowrap',
            display: 'block',
            transition: 'transform 0.1s ease-out',
            opacity: 1 - i / 15,
            maxWidth: '100%',
            overflow: 'visible'
          }}
        >
          {text}
        </span>
      ))}
    </div>
  );
};
