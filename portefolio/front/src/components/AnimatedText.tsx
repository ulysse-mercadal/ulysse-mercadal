'use client';

import React, { useEffect, useRef, useState } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  animationType?: 'fade-sequence' | 'pulse-animation' | 'bounce-animation' | 'flip-animation' | 'wave-effect';
  delay?: number;
  style?: React.CSSProperties;
}

export const AnimatedText = ({ text, className = '', animationType = 'fade-sequence', delay = 0, style = {} }: AnimatedTextProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        },
        { threshold: 0.1 }
      );

      if (textRef.current) {
        observer.observe(textRef.current);
      }

      return () => {
        if (textRef.current) {
          observer.unobserve(textRef.current);
        }
      };
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      ref={textRef}
      className={`animated-text ${animationType} ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
        maxWidth: '100%',
        boxSizing: 'border-box',
        textAlign: 'inherit',
        ...style
      }}
    >
      {text.split(' ').map((word, wordIndex, wordsArray) => {
        const wordStartIndex = wordsArray.slice(0, wordIndex).join(' ').length + (wordIndex > 0 ? 1 : 0);
        
        return (
          <React.Fragment key={wordIndex}>
            <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
              {word.split('').map((char, charIndex) => (
                <span
                  key={wordStartIndex + charIndex}
                  className={`char-${wordStartIndex + charIndex}`}
                  style={{
                    display: 'inline-block',
                    transition: 'transform 0.2s ease-out',
                  }}
                >
                  {char}
                </span>
              ))}
            </span>
            {wordIndex < wordsArray.length - 1 && ' '}
          </React.Fragment>
        );
      })}
    </div>
  );
};
