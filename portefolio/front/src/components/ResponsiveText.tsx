'use client';

import React from 'react';

interface ResponsiveTextProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  variant?: 'normal' | 'large' | 'small';
}

export const ResponsiveText = ({ children, className = '', style = {}, variant = 'normal' }: ResponsiveTextProps) => {
  const baseClass = 'responsive-text';
  const variantClass = variant === 'large' ? 'responsive-text-large' :
    variant === 'small' ? 'responsive-text-small' : '';

  return (
    <div
      className={`${baseClass} ${variantClass} ${className}`}
      style={{
        fontSize: variant === 'large' ? 'clamp(1.2rem, 3vw, 1.8rem)' :
          variant === 'small' ? 'clamp(0.8rem, 2vw, 1.1rem)' :
            'clamp(1rem, 2.5vw, 1.4rem)',
        lineHeight: '1.6',
        boxSizing: 'border-box',
        textAlign: 'justify',
        width: '100%',
        ...style
      }}
    >
      {children}
    </div>
  );
};
