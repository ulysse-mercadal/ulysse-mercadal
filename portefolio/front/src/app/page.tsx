'use client';

import React, { useEffect, useRef, useState } from 'react';
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
  let d = "M0,60 ";
  const points = 40;
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

    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        // Normalize mouse position from -1 to 1
        setMousePos({
          x: (e.clientX / window.innerWidth) * 2 - 1,
          y: (e.clientY / window.innerHeight) * 2 - 1
        });
      };
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
      <div style={{
        position: 'relative',
        fontSize: '6rem',
        fontWeight: '900',
        textTransform: 'uppercase',
        letterSpacing: '8px',
        lineHeight: 1,
        textAlign: 'center'
      }}>
        {[...Array(8)].map((_, i) => (
          <span
            key={i}
            style={{
              position: i === 0 ? 'relative' : 'absolute',
              top: 0,
              left: '50%',
              transform: `translate(calc(-50% + ${i * mousePos.x * 10}px), ${i * mousePos.y * 10}px) scale(${1 - i * 0.02})`,
              zIndex: 10 - i,
              color: i === 0 ? color : 'transparent',
              WebkitTextStroke: `1px ${color}`,
              whiteSpace: 'nowrap',
              display: 'block',
              transition: 'transform 0.1s ease-out',
              opacity: 1 - i * 0.1
            }}
          >
            {text}
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
  const [message, setMessage] = useState<string>("Ulysse Mercadal");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingText, setEditingText] = useState<string>("Ulysse Mercadal");
  const [textWidth, setTextWidth] = useState<number>(0);
  const [fontSize, setFontSize] = useState<number>(0);
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
  }, [isFontLoaded, font, activeAnimationIndex, backgroundMode, message]);
  const drawText = () => {
    if (!font || !contextRef.current.project)
      return;
    contextRef.current.glyphs.forEach((g: any) => g.remove());
    contextRef.current.glyphs = [];
    const { screenWidth, screenHeight } = contextRef.current;
    const fontSizeMultiplier = 1;
    const letterSpacing = -10;
    const sizeScale = scaleLinear().domain([320, 768, 2560]).clamp(true).range([40, 100, 250]);
    const calculatedSize = sizeScale(screenWidth);
    const realFontSize = calculatedSize * fontSizeMultiplier;
    setFontSize(realFontSize);
    const fontGlyphs = font.stringToGlyphs(message);
    const fontScale = 1 / font.unitsPerEm * realFontSize;
    let totalWidth = 0;
    fontGlyphs.forEach((glyph, i) => {
      if (glyph.advanceWidth) totalWidth += glyph.advanceWidth * fontScale;
      if (i < fontGlyphs.length - 1) {
        totalWidth += font.getKerningValue(glyph, fontGlyphs[i + 1]) * fontScale;
      }
      totalWidth += letterSpacing * fontScale;
    });
    setTextWidth(totalWidth);
    let x = (screenWidth - totalWidth) / 2;
    const y = screenHeight / 2 + realFontSize / 3;
    contextRef.current.project.activate();
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
  };

  const attachAnimation = (index: number) => {
    const animation = ANIMATIONS[index].animation;
    if (animation && animation.attach)
      animation.attach(contextRef.current, backgroundMode);
  };
  const detachAnimation = (index: number) => {
    const animation = ANIMATIONS[index].animation;
    if (animation && animation.detach)
      animation.detach(contextRef.current);
  };

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
          style={{ width: '100%', height: '100%' }} />
        {!isEditing && isFontLoaded && (
          <div
            onClick={() => {
              setIsEditing(true);
              setEditingText(message);
            }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: `${textWidth}px`,
              height: `${fontSize}px`,
              cursor: 'text',
              zIndex: 5,
            }} />
        )}
        {isEditing && (
          <input
            type="text"
            autoFocus
            value={editingText}
            onChange={(e) => {
              const newText = e.target.value;
              setEditingText(newText);
              if (newText.trim() !== '')
                setMessage(newText);
            }}
            onBlur={() => {
              setIsEditing(false);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Escape')
                setIsEditing(false);
            }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: `${fontSize}px`,
              textAlign: 'center',
              border: 'none',
              outline: 'none',
              backgroundColor: 'transparent',
              color: 'transparent',
              caretColor: backgroundMode === 'white' ? 'black' : 'white',
              fontFamily: 'serif',
              pointerEvents: 'auto',
              zIndex: 10,
              width: 'fit-content',
              minWidth: '200px',
              opacity: 0,
            }} />
        )}
        {isEditing && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: `calc(50% + ${textWidth / 2}px + ${fontSize * 0.1}px)`,
              transform: 'translateY(-50%)',
              zIndex: 20,
              pointerEvents: 'none'
            }} >
            <div
              className="vertical-bar"
              style={{
                width: `${Math.max(2, fontSize * 0.04)}px`,
                height: `${fontSize * 1.2}px`,
                backgroundColor: backgroundMode === 'white' ? 'black' : 'white',
              }} />
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
        padding: '100px 20px'
      }}>
        <ZigZagDivider color={backgroundMode === 'white' ? '#000000' : '#ffffff'} />
        <Repetition3DText
          text="About"
          color={backgroundMode === 'white' ? '#ffffff' : '#000000'} />
        <div style={{
          maxWidth: '800px',
          textAlign: 'justify',
          fontSize: '1.4rem',
          marginTop: '200px',
          lineHeight: '1',
          letterSpacing: '0.5px',
          position: 'relative'
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
            <div style={{ position: 'relative', zIndex: 1 }}>
              As a computer science student at Epitech Lyon, I thrive within a project-based pedagogy which has given me strong capacities for adaptation and autonomy.
            </div>
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
              right: 0,
              borderLeft: `0.5px solid ${backgroundMode === 'white' ? '#ffffff' : '#000000'}`,
              borderRight: `0.5px solid ${backgroundMode === 'white' ? '#ffffff' : '#000000'}`,
              maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
              opacity: 0.4,
              pointerEvents: 'none'
            }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              My expertise extends from graphical programming (OpenGL, Vulkan) and low-level development (Zig, C) to the modern Web ecosystem (NestJS, Next.js... and a lot more !), and even mobile development (Flutter, React Native).
            </div>
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
              borderLeft: `0.5px solid ${backgroundMode === 'white' ? '#ffffff' : '#000000'}`,
              borderRight: `0.5px solid ${backgroundMode === 'white' ? '#ffffff' : '#000000'}`,
              maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
              opacity: 0.4,
              pointerEvents: 'none'
            }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              I am particularly passionate about designing complex back-end logic and constantly pushing my own boundaries.
            </div>
          </div>
        </div>
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
        padding: '100px 20px'
      }}>
        <ZigZagDivider color={backgroundMode === 'white' ? '#ffffff' : '#000000'} />
        <Repetition3DText
          text="Projects"
          color={backgroundMode === 'white' ? '#000000' : '#ffffff'} />
        <div style={{ maxWidth: '800px', textAlign: 'center', fontSize: '1.2rem', marginTop: '60px' }}>
          Explore my latest works and creative experiments.
        </div>
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
        padding: '100px 20px'
      }}>
        <ZigZagDivider color={backgroundMode === 'white' ? '#000000' : '#ffffff'} />
        <Repetition3DText
          text="Experiences"
          color={backgroundMode === 'white' ? '#ffffff' : '#000000'}
        />
        <div style={{ maxWidth: '800px', textAlign: 'center', fontSize: '1.2rem', marginTop: '60px' }}>
          My journey through different roles and challenges.
        </div>
      </section>
    </div>
  );
}
