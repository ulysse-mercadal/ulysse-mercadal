'use client';

import React, { useEffect, useState } from 'react';

interface ZigZagDividerProps {
  color: string;
}

export const ZigZagDivider = ({ color }: ZigZagDividerProps) => {
  const [toothHeight, setToothHeight] = useState(60);
  const points = 30; // Fixed number of teeth

  useEffect(() => {
    const calculateHeight = () => {
      const width = typeof window !== 'undefined' ? window.innerWidth : 1200;
      // Maintain the tooth shape: at 1200px width, height is 60px.
      // 1200 / 20 = 60. So we use width / 20, capped between 20 and 60.
      return Math.max(20, Math.min(60, width / 20));
    };

    setToothHeight(calculateHeight());

    const handleResize = () => {
      setToothHeight(calculateHeight());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  let d = `M0,${toothHeight} `;
  for (let i = 0; i <= points; i++) {
    const x = (i * 100) / points;
    const y = i % 2 === 0 ? toothHeight : 0;
    d += `L${x},${y} `;
  }
  d += `L100,${toothHeight} Z`;

  return (
    <div style={{
      width: '100%',
      height: `${toothHeight}px`,
      position: 'absolute',
      top: `-${toothHeight - 1}px`, // Adjusted dynamically
      left: 0,
      zIndex: 10,
      pointerEvents: 'none'
    }}>
      <svg width="100%" height={toothHeight} viewBox={`0 0 100 ${toothHeight}`} preserveAspectRatio="none" style={{ display: 'block' }}>
        <path d={d} fill={color} />
      </svg>
    </div>
  );
};