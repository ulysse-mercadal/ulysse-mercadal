'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import paper from 'paper';
import opentype from 'opentype.js';
import _ from 'lodash';
import { scaleLinear } from 'd3';
import { Sun, Moon } from 'lucide-react';
import Glyph from '../components/Glyph';
import { bezierBubble } from '../components/animations/bezierBubble';
import { sizeWaterfall } from '../components/animations/sizeWaterfall';
import { shadowSkew } from '../components/animations/shadowSkew';
import { riseAndBlur } from '../components/animations/riseAndBlur';
const ANIMATIONS = [
  { name: 'Wireframe (Bezier Bubble)', animation: bezierBubble },
  { name: 'Repetition 3D (Size Waterfall)', animation: sizeWaterfall },
  { name: 'Cross 3D (Shadow Skew)', animation: shadowSkew },
  { name: 'Rise and Blur (Cascade Effect)', animation: riseAndBlur },
];
const FONT_URL = "https://fonts.gstatic.com/s/nanummyeongjo/v6/9Bty3DZF0dXLMZlywRbVRNhxy2pLVGA5r_c.woff";

const ZigZagDivider = ({ color }: { color: string }) => {
  const [points, setPoints] = useState(40); // Default value

  useEffect(() => {
    // Calculate number of points based on container width to maintain consistent tooth size
    const calculatePoints = () => {
      // Get the container width
      const containerWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
      // Maintain a consistent tooth width (in pixels)
      const toothWidth = 25; // Each tooth will be approximately 25px wide
      // Calculate number of points based on container width
      const calculatedPoints = Math.max(10, Math.floor(containerWidth / toothWidth));
      return calculatedPoints;
    };

    // Set initial points
    setPoints(calculatePoints());

    // Update points on window resize
    const handleResize = () => {
      setPoints(calculatePoints());
    };

    window.addEventListener('resize', handleResize);

    // Cleanup event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  let d = "M0,60 ";
  for (let i = 0; i <= points; i++) {
    const x = (i * 100) / points;
    const y = i % 2 === 0 ? 60 : 0;
    d += `L${x},${y} `;
  }
  d += "L100,60 Z";
  return (
    <div style={{
      width: '100%',
      height: '60px',
      position: 'absolute',
      top: '-59px',
      left: 0,
      zIndex: 10,
      pointerEvents: 'none'
    }}>
      <svg width="100%" height="60" viewBox="0 0 100 60" preserveAspectRatio="none" style={{ display: 'block' }}>
        <path d={d} fill={color} />
      </svg>
    </div>
  );
};

const Repetition3DText = ({ text, color }: { text: string, color: string }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [fontSize, setFontSize] = useState('6rem');
  const [screenWidth, setScreenWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [letterSpacing, setLetterSpacing] = useState('8px');
  const [movementFactor, setMovementFactor] = useState(10);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenWidth(width);

      // Calculate responsive font size based on screen width
      let newSize;
      if (width < 480) {
        newSize = '2.5rem'; // Smaller screens
      } else if (width < 768) {
        newSize = '3.5rem'; // Tablets
      } else if (width < 1200) {
        newSize = '5rem'; // Medium screens
      } else {
        newSize = '6rem'; // Large screens
      }

      setFontSize(newSize);
      setLetterSpacing(width < 768 ? '4px' : '8px');
      setMovementFactor(width < 768 ? 5 : 10);
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position from -1 to 1
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      });
    };

    // Set initial values
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
      marginBottom: '7rem'
    }}>
      {[...Array(8)].map((_, i) => (
        <span
          key={i}
          style={{
            position: i === 0 ? 'relative' : 'absolute',
            top: 0,
            left: '50%',
            transform: `translate(calc(-50% + ${i * mousePos.x * movementFactor}px), ${i * mousePos.y * movementFactor}px) scale(${1 - i * 0.02})`,
            zIndex: 10 - i,
            color: i === 0 ? color : 'transparent',
            WebkitTextStroke: `1px ${color}`,
            whiteSpace: 'nowrap',
            display: 'block',
            transition: 'transform 0.1s ease-out',
            opacity: 1 - i * 0.1,
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

const ResponsiveText = ({ children, className = '', style = {}, variant = 'normal' }: { children: React.ReactNode, className?: string, style?: React.CSSProperties, variant?: 'normal' | 'large' | 'small' }) => {
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
        wordWrap: 'break-word',
        overflowWrap: 'break-word',
        hyphens: 'auto',
        ...style
      }}
    >
      {children}
    </div>
  );
};

// Enhanced animated text component with multiple animation types
const AnimatedText = ({ text, className = '', animationType = 'fade-sequence', delay = 0, style = {} }: {
  text: string,
  className?: string,
  animationType?: 'fade-sequence' | 'pulse-animation' | 'bounce-animation' | 'flip-animation' | 'wave-effect',
  delay?: number,
  style?: React.CSSProperties
}) => {
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
      className={`animated-text ${animationType} ${className} text-no-overflow`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
        maxWidth: '100%',
        overflowWrap: 'break-word',
        wordWrap: 'break-word',
        hyphens: 'auto',
        boxSizing: 'border-box',
        ...style
      }}
    >
      {text.split('').map((char, index) => (
        <span
          key={index}
          className={`char-${index}`}
          style={{
            display: 'inline-block',
            transition: 'transform 0.2s ease-out',
            maxWidth: '100%',
            overflow: 'hidden'
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
};

export default function Page() {


  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeAnimationIndex, setActiveAnimationIndex] = useState(0);
  const [isFontLoaded, setIsFontLoaded] = useState(false);
  const [font, setFont] = useState<opentype.Font | null>(null);
  const [backgroundMode, setBackgroundMode] = useState('black');
  const [message, setMessage] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingText, setEditingText] = useState<string>("Ulysse Mercadal");
  const [textWidth, setTextWidth] = useState<number>(0);
  const [prefixWidth, setPrefixWidth] = useState<number>(0);
  const [fontSize, setFontSize] = useState<number>(0);

  useEffect(() => {
    if (!isFontLoaded) return;
    
    const target = "Ulysse Mercadal";
    let i = 0;
    const interval = setInterval(() => {
      if (i <= target.length) {
        setMessage(target.substring(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isFontLoaded]);
  const contextRef = useRef<any>({
    glyphs: [],
    project: null,
    view: null,
    animationIdx: 0,
    screenWidth: 0,
    screenHeight: 0,
    props: {
      animationIdx: 0,
      backgroundMode: 'white'
    }
  });

  const attachAnimation = useCallback((index: number) => {
    const animation = ANIMATIONS[index].animation;
    if (animation && animation.attach)
      animation.attach(contextRef.current, backgroundMode);
  }, [backgroundMode]);

  const detachAnimation = useCallback((index: number) => {
    const animation = ANIMATIONS[index].animation;
    if (animation && animation.detach)
      animation.detach(contextRef.current);
  }, []);

  const drawText = useCallback(() => {
    if (!font || !contextRef.current.project)
      return;
    contextRef.current.glyphs.forEach((g: any) => g.remove());
    contextRef.current.glyphs = [];
    if (contextRef.current.staticGlyphs) {
      contextRef.current.staticGlyphs.forEach((g: any) => g.remove());
    }
    contextRef.current.staticGlyphs = [];

    const { screenWidth, screenHeight } = contextRef.current;
    const fontSizeMultiplier = 1;
    const letterSpacing = -10;
    const sizeScale = scaleLinear().domain([320, 768, 2560]).clamp(true).range([40, 100, 250]);
    const calculatedSize = sizeScale(screenWidth);
    const realFontSize = calculatedSize * fontSizeMultiplier;
    setFontSize(realFontSize);

    const fontScale = 1 / font.unitsPerEm * realFontSize;
    
    const getWidth = (str: string) => {
      const glyphs = font.stringToGlyphs(str);
      let width = 0;
      glyphs.forEach((glyph, i) => {
        if (glyph.advanceWidth) width += glyph.advanceWidth * fontScale;
        if (i < glyphs.length - 1) {
          width += font.getKerningValue(glyph, glyphs[i + 1]) * fontScale;
        }
        width += letterSpacing * fontScale;
      });
      return width;
    };

    const prefix = ">_ ";
    const prefixWidthValue = getWidth(prefix);
    const messageWidth = getWidth(message);
    const totalWidth = prefixWidthValue + messageWidth;
    
    setTextWidth(messageWidth);
    setPrefixWidth(prefixWidthValue);
    
    let x = (screenWidth - totalWidth) / 2;
    const y = screenHeight / 2;
    
    contextRef.current.project.activate();
    
    // Draw prefix (static)
    const prefixGlyphs = font.stringToGlyphs(prefix);
    prefixGlyphs.forEach((glyphData, i) => {
      const glyph = new Glyph({
        glyph: glyphData,
        x: x,
        y: y,
        fontSize: realFontSize,
        fillColor: backgroundMode === "black" ? "white" : "black",
        unitsPerEm: font.unitsPerEm
      });
      contextRef.current.staticGlyphs.push(glyph);
      glyph.init();
      if (glyphData.advanceWidth)
        x += glyphData.advanceWidth * fontScale;
      if (i < prefixGlyphs.length - 1)
        x += font.getKerningValue(glyphData, prefixGlyphs[i + 1]) * fontScale;
      x += letterSpacing * fontScale;
    });

    // Draw message (interactive/animated)
    const fontGlyphs = font.stringToGlyphs(message);
    fontGlyphs.forEach((glyphData, i) => {
      const glyph = new Glyph({
        glyph: glyphData,
        x: x,
        y: y,
        fontSize: realFontSize,
        fillColor: backgroundMode === "black" ? "white" : "black",
        unitsPerEm: font.unitsPerEm
      });
      contextRef.current.glyphs.push(glyph);
      glyph.init();
      if (glyphData.advanceWidth)
        x += glyphData.advanceWidth * fontScale;
      if (i < fontGlyphs.length - 1)
        x += font.getKerningValue(glyphData, fontGlyphs[i + 1]) * fontScale;
      x += letterSpacing * fontScale;
    });
  }, [backgroundMode, font, message]);

  useEffect(() => {
    opentype.load(FONT_URL, (err, loadedFont) => {
      if (err) {
        console.error('Font could not be loaded: ' + err);
      } else {
        setFont(loadedFont || null);
        setIsFontLoaded(true);
      }
    });
  }, []);
  useEffect(() => {
    if (!isFontLoaded || !font || !canvasRef.current)
      return;
    paper.setup(canvasRef.current);
    const project = paper.project;
    const view = paper.view;
    contextRef.current.project = project;
    contextRef.current.view = view;
    contextRef.current.screenWidth = window.innerWidth;
    contextRef.current.screenHeight = window.innerHeight;
    contextRef.current.props.animationIdx = activeAnimationIndex;
    contextRef.current.props.backgroundMode = backgroundMode;
    contextRef.current.message = message;
    contextRef.current.canvasElement = canvasRef.current;
    drawText();
    attachAnimation(activeAnimationIndex);
    const handleResize = () => {
      if (!canvasRef.current) return;
      contextRef.current.screenWidth = window.innerWidth;
      contextRef.current.screenHeight = window.innerHeight;
      view.viewSize = new paper.Size(window.innerWidth, window.innerHeight);
      detachAnimation(activeAnimationIndex);
      drawText();
      attachAnimation(activeAnimationIndex);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      detachAnimation(activeAnimationIndex);
      project.remove();
    };
  }, [isFontLoaded, font, activeAnimationIndex, backgroundMode, message, attachAnimation, detachAnimation, drawText]);

  return (
    <div style={{
      width: '100vw',
      minHeight: '100vh',
      backgroundColor: backgroundMode === 'white' ? '#ffffff' : '#000000',
      color: backgroundMode === 'white' ? '#000000' : '#ffffff',
      position: 'relative',
      fontFamily: 'serif'
    }}>
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 40px',
        borderBottom: `0.5px solid ${backgroundMode === 'white' ? '#000000' : '#ffffff'}`,
        backgroundColor: backgroundMode === 'white' ? '#ffffff' : '#000000',
        zIndex: 1000,
      }} >
        <nav style={{ display: 'flex', gap: '30px' }}>
          {['About', 'Projects', 'Experiences'].map(item => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              style={{
                color: 'inherit',
                textDecoration: 'none',
                fontSize: '0.9rem',
                letterSpacing: '1px',
                textTransform: 'uppercase'
              }} >
              {item}
            </a>
          ))}
        </nav>
        <button
          onClick={() => setBackgroundMode(prev => prev === 'white' ? 'black' : 'white')}
          style={{
            position: 'absolute',
            right: '40px',
            background: 'transparent',
            border: 'none',
            color: 'inherit',
            cursor: 'pointer',
            padding: '5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          {backgroundMode === 'white' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </header>
      <section style={{ height: '120vh', width: '100vw', position: 'relative', overflow: 'hidden' }}>
        {!isFontLoaded && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}>
            Loading the font wait a sec...
          </div>
        )}
        <canvas
          ref={canvasRef}
          style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} />

        {/* Interaction and Prefix Layer */}
        {isFontLoaded && (
          <div
            style={{
              position: 'absolute',
              top: '50vh', // Matches Paper.js y = window.innerHeight / 2
              left: `calc(50% + ${(prefixWidth - textWidth) / 2}px)`,
              height: 0,
              display: 'flex',
              alignItems: 'baseline',
              zIndex: 5,
              pointerEvents: 'none'
            }}
          >
            {/* Interaction area / Input container */}
            <div
              style={{
                position: 'relative',
                width: `${textWidth}px`,
                height: `${fontSize}px`,
                transform: 'translateY(-100%)', // Align bottom of container with baseline
                pointerEvents: 'auto',
                cursor: 'text',
              }}
              onClick={() => {
                setIsEditing(true);
                setEditingText(message);
              }}
            >
              {isEditing && (
                <input
                  type="text"
                  autoFocus
                  value={editingText}
                  onChange={(e) => {
                    const newText = e.target.value;
                    setEditingText(newText);
                    if (newText.trim() !== '') {
                      setMessage(newText);
                    }
                  }}
                  onBlur={() => {
                    setIsEditing(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape' || e.key === 'Enter') {
                      setIsEditing(false);
                    }
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    fontSize: `${fontSize}px`,
                    textAlign: 'left',
                    border: 'none',
                    outline: 'none',
                    backgroundColor: 'transparent',
                    color: 'transparent', 
                    caretColor: 'transparent', 
                    fontFamily: "'Nanum Myeongjo', serif",
                    padding: 0,
                    margin: 0,
                  }}
                />
              )}
            </div>

            {/* Custom cursor (vertical bar) */}
            {isEditing && (
              <div
                style={{
                  position: 'absolute',
                  left: `${textWidth}px`,
                  bottom: '0', // Align to the baseline
                  transform: 'translateY(15%)', // Slight adjustment for baseline offset
                  marginLeft: '4px',
                  zIndex: 20,
                  pointerEvents: 'none'
                }}
              >
                <div
                  className="vertical-bar"
                  style={{
                    width: `${Math.max(2, fontSize * 0.04)}px`,
                    height: `${fontSize * 1.1}px`,
                    backgroundColor: backgroundMode === 'white' ? 'black' : 'white',
                  }}
                />
              </div>
            )}
          </div>
        )}
      </section>
      <section id="about" style={{
        minHeight: '100vh',
        width: '100vw',
        position: 'relative',
        backgroundColor: backgroundMode === 'white' ? '#000000' : '#ffffff',
        color: backgroundMode === 'white' ? '#ffffff' : '#000000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '100px 20px',
        margin: 0,
        paddingLeft: 0,
        paddingRight: 0
      }}>
        <ZigZagDivider color={backgroundMode === 'white' ? '#000000' : '#ffffff'} />
        <Repetition3DText
          text="About"
          color={backgroundMode === 'white' ? '#ffffff' : '#000000'} />
        <ResponsiveText style={{
          maxWidth: 'min(800px, 90vw)',
          textAlign: 'justify',
          marginTop: '4rem',
          position: 'relative',
          lineHeight: '1.3',
          letterSpacing: '0.5px',
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
          margin: 0,
          marginLeft: 'auto',
          marginRight: 'auto',
          marginBottom: "2rem"
        }}>
          <div style={{ position: 'relative', width: '100%', padding: '0', marginBottom: '40px' }}>
            <div style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: '-20vw',
              right: '-20vw',
              borderTop: `0.5px solid ${backgroundMode === 'white' ? '#ffffff' : '#000000'}`,
              borderBottom: `0.5px solid ${backgroundMode === 'white' ? '#ffffff' : '#000000'}`,
              maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
              opacity: 0.4,
              pointerEvents: 'none'
            }} />
            <div style={{
              position: 'absolute',
              marginLeft:-5,
              top: '-10vh',
              bottom: '-10vh',
              left: 0,
              right: 0,
              borderLeft: `0.5px solid ${backgroundMode === 'white' ? '#ffffff' : '#000000'}`,
              borderRight: `0.5px solid ${backgroundMode === 'white' ? '#ffffff' : '#000000'}`,
              maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
              opacity: 0.4,
              pointerEvents: 'none'
            }} />
            <AnimatedText
              text="As a computer science student at Epitech Lyon, I thrive within a project-based pedagogy which has given me strong capacities for adaptation and autonomy."
              style={{ position: 'relative', zIndex: 1 }}
              animationType="fade-sequence"
              delay={100}
            />
          </div>
          <div style={{ position: 'relative', width: '100%', padding: '0', marginBottom: '40px' }}>
            <div style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: '-20vw',
              right: '-20vw',
              borderTop: `0.5px solid ${backgroundMode === 'white' ? '#ffffff' : '#000000'}`,
              borderBottom: `0.5px solid ${backgroundMode === 'white' ? '#ffffff' : '#000000'}`,
              maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
              opacity: 0.4,
              pointerEvents: 'none'
            }} />
            <div style={{
              position: 'absolute',
              top: '-10vh',
              bottom: '-10vh',
              left: 0,
              marginLeft:-5,

              right: 0,
              borderLeft: `0.5px solid ${backgroundMode === 'white' ? '#ffffff' : '#000000'}`,
              borderRight: `0.5px solid ${backgroundMode === 'white' ? '#ffffff' : '#000000'}`,
              maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
              opacity: 0.4,
              pointerEvents: 'none'
            }} />
            <AnimatedText
              text="My expertise extends from graphical programming (OpenGL, Vulkan) and low-level development (Zig, C) to the modern Web ecosystem (NestJS, Next.js... and a lot more !), and even mobile development (Flutter, React Native)."
              style={{ position: 'relative', zIndex: 1 }}
              animationType="pulse-animation"
              delay={300}
            />
          </div>
          <div style={{ position: 'relative', width: '100%', padding: '0' }}>
            <div style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: '-20vw',
              right: '-20vw',
              borderTop: `0.5px solid ${backgroundMode === 'white' ? '#ffffff' : '#000000'}`,
              borderBottom: `0.5px solid ${backgroundMode === 'white' ? '#ffffff' : '#000000'}`,
              maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
              opacity: 0.4,
              pointerEvents: 'none'
            }} />
            <div style={{
              position: 'absolute',
              top: '-10vh',
              bottom: '-10vh',
              left: 0,
              right: 0,
              marginLeft:-5,

              borderLeft: `0.5px solid ${backgroundMode === 'white' ? '#ffffff' : '#000000'}`,
              borderRight: `0.5px solid ${backgroundMode === 'white' ? '#ffffff' : '#000000'}`,
              maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
              opacity: 0.4,
              pointerEvents: 'none'
            }} />
            <AnimatedText
              text="I am particularly passionate about designing complex back-end logic and constantly pushing my own boundaries."
              style={{ position: 'relative', zIndex: 1 }}
              animationType="wave-effect"
              delay={500}
            />
          </div>
        </ResponsiveText>
      </section>
      <section id="projects" style={{
        minHeight: '100vh',
        width: '100vw',
        position: 'relative',
        backgroundColor: backgroundMode === 'white' ? '#ffffff' : '#000000',
        color: backgroundMode === 'white' ? '#000000' : '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '100px 20px',
        margin: 0,
        paddingLeft: 0,
        paddingRight: 0
      }}>
        <ZigZagDivider color={backgroundMode === 'white' ? '#ffffff' : '#000000'} />
        <Repetition3DText
          text="Projects"
          color={backgroundMode === 'white' ? '#000000' : '#ffffff'} />
        <ResponsiveText style={{
          maxWidth: 'min(800px, 90vw)',
          textAlign: 'center',
          marginTop: '250px', // Augmentation de la marge
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
          margin: 0,
          marginLeft: 'auto',
          marginRight: 'auto'
        }} variant="large">
          <AnimatedText
            text="Explore my latest works and creative experiments."
            style={{ display: 'inline-block' }}
            animationType="bounce-animation"
            delay={200}
          />
        </ResponsiveText>
      </section>
      <section id="experiences" style={{
        minHeight: '100vh',
        width: '100vw',
        position: 'relative',
        backgroundColor: backgroundMode === 'white' ? '#000000' : '#ffffff',
        color: backgroundMode === 'white' ? '#ffffff' : '#000000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '100px 20px',
        margin: 0,
        paddingLeft: 0,
        paddingRight: 0
      }}>
        <ZigZagDivider color={backgroundMode === 'white' ? '#000000' : '#ffffff'} />
        <Repetition3DText
          text="Experiences"
          color={backgroundMode === 'white' ? '#ffffff' : '#000000'}
        />
        <ResponsiveText style={{
          maxWidth: 'min(800px, 90vw)',
          textAlign: 'center',
          marginTop: '250px', // Augmentation de la marge
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
          margin: 0,
          marginLeft: 'auto',
          marginRight: 'auto'
        }} variant="large">
          <AnimatedText
            text="My journey through different roles and challenges."
            style={{ display: 'inline-block' }}
            animationType="flip-animation"
            delay={200}
          />
        </ResponsiveText>
      </section>
    </div>
  );
}
