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
import { ZigZagDivider } from '../components/ZigZagDivider';
import { Repetition3DText } from '../components/Repetition3DText';
import { ResponsiveText } from '../components/ResponsiveText';
import { AnimatedText } from '../components/AnimatedText';
import { ProjectCard } from '../components/ProjectCard';
import { ResumeTimeline } from '../components/ResumeTimeline';
import { Header } from '../components/Header';

const ANIMATIONS = [
  { name: 'Wireframe (Bezier Bubble)', animation: bezierBubble },
  { name: 'Repetition 3D (Size Waterfall)', animation: sizeWaterfall },
  { name: 'Cross 3D (Shadow Skew)', animation: shadowSkew },
  { name: 'Rise and Blur (Cascade Effect)', animation: riseAndBlur },
];
const FONT_URL = "https://fonts.gstatic.com/s/nanummyeongjo/v6/9Bty3DZF0dXLMZlywRbVRNhxy2pLVGA5r_c.woff";

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
    const sizeScale = scaleLinear().domain([320, 768, 2560]).clamp(true).range([30, 70, 250]); // Reduced middle value from 100 to 70 for tablets
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
      width: '100%',
      minHeight: '100vh',
      backgroundColor: backgroundMode === 'white' ? '#ffffff' : '#000000',
      color: backgroundMode === 'white' ? '#000000' : '#ffffff',
      position: 'relative',
      fontFamily: 'serif',
      boxSizing: 'border-box'
    }}>
      <Header backgroundMode={backgroundMode} setBackgroundMode={setBackgroundMode} />
      <section style={{ height: '120vh', width: '100%', position: 'relative', overflow: 'hidden', boxSizing: 'border-box' }}>
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
          </div>
        )}
      </section>
      <section id="about" style={{
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
        backgroundColor: backgroundMode === 'white' ? '#000000' : '#ffffff',
        color: backgroundMode === 'white' ? '#ffffff' : '#000000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '100px 20px 10rem 20px', // Added 10rem bottom padding
        margin: 0,
        boxSizing: 'border-box',
      }}>
        {/* <ZigZagDivider color={backgroundMode === 'white' ? '#000000' : '#ffffff'} /> */}
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
          margin: 0,
          marginLeft: 'auto',
          marginRight: 'auto',
          marginBottom: "20rem"
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
              marginLeft: -5,
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
              text="As a computer science student at Epitech Lyon, I thrive in a project-based learning environment that has fostered my adaptability and autonomy."
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
              borderTop: `0.5px solid ${backgroundMode === 'white' ? '#ffffff' : '#000000'} `,
              borderBottom: `0.5px solid ${backgroundMode === 'white' ? '#ffffff' : '#000000'} `,
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
              marginLeft: -5,
              right: 0,
              borderLeft: `0.5px solid ${backgroundMode === 'white' ? '#ffffff' : '#000000'} `,
              borderRight: `0.5px solid ${backgroundMode === 'white' ? '#ffffff' : '#000000'} `,
              maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
              opacity: 0.4,
              pointerEvents: 'none'
            }} />
            <AnimatedText
              text="My expertise spans graphical programming (OpenGL, Vulkan), low-level development (Zig, C), the modern Web ecosystem (NestJS, Next.js... and much more!), and mobile development (Flutter, React Native)."
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
              marginLeft: -5,
              borderLeft: `0.5px solid ${backgroundMode === 'white' ? '#ffffff' : '#000000'}`,
              borderRight: `0.5px solid ${backgroundMode === 'white' ? '#ffffff' : '#000000'}`,
              maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
              opacity: 0.4,
              pointerEvents: 'none'
            }} />
            <AnimatedText
              text="I am particularly passionate about designing complex back-end and low level logic and constantly pushing my own boundaries."
              style={{ position: 'relative', zIndex: 1 }}
              animationType="wave-effect"
              delay={500}
            />
          </div>
        </ResponsiveText>
      </section>
      <section id="projects" style={{
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
        backgroundColor: backgroundMode === 'white' ? '#ffffff' : '#000000',
        color: backgroundMode === 'white' ? '#000000' : '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '100px 20px',
        margin: 0,
        boxSizing: 'border-box'
      }}>
        {/* <ZigZagDivider color={backgroundMode === 'white' ? '#ffffff' : '#000000'}/> */}
        <Repetition3DText
          text="Projects"
          color={backgroundMode === 'white' ? '#000000' : '#ffffff'} />

        <div style={{
          width: '100%',
          maxWidth: '800px',
          marginTop: '4rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3rem',
          padding: '0 20px',
          margin: '4rem auto 2rem auto',
          boxSizing: 'border-box',
          marginBottom: "20rem"

        }}>
          <ProjectCard
            title="R-TYPE"
            description="A networked 3D version of the famous R-Type space shooter, built with a custom engine and featuring a highly optimized, flexible TCP/UDP network protocol designed for any game type. The project is fully Windows and linux compatible thanks to a robust cross-compilation pipeline. (macos is not supported because of opengl)"
            technologies={['C++', 'OpenGL', 'CMake', 'Asio']}
            duration="6 weeks"
            teamSize={4}
            githubUrl="https://github.com/nicolasnny/R-TYPE"
            backgroundMode={backgroundMode as 'white' | 'black'}
          />
          <ProjectCard
            title="AREA"
            description="A workflow automation tool for web and mobile featuring a custom-built workflow editor that handles complex node interactions. We re-implemented a system similar to n8n, including conditional nodes and seamless integration between 6+ online services via OAuth, all within a microservice architecture."
            technologies={['Next.js', 'NestJS', 'PostgreSQL', 'Prisma', 'React', 'Flutter', 'Docker']}
            duration="5 weeks"
            teamSize={5}
            githubUrl="https://github.com/ulysse-mercadal/area"
            backgroundMode={backgroundMode as 'white' | 'black'}
          />
          <ProjectCard
            title="Raytracer"
            description="A high-performance Raytracer engine developed in C++ only four months after discovering the language. It features advanced optical effects like transparency, reflection, diffraction, and refraction, alongside drop shadows and numerous primitives, all implemented using modern C++ design patterns."
            technologies={['C++']}
            duration="4 weeks"
            teamSize={3}
            githubUrl="https://github.com/ulysse-mercadal/raytracer"
            backgroundMode={backgroundMode as 'white' | 'black'}
          />
        </div>
      </section>
      <section id="experiences" style={{
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
        backgroundColor: backgroundMode === 'white' ? '#000000' : '#ffffff',
        color: backgroundMode === 'white' ? '#ffffff' : '#000000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '100px 20px',
        margin: 0,
        boxSizing: 'border-box'
      }}>
        {/* <ZigZagDivider color={backgroundMode === 'white' ? '#000000' : '#ffffff'} /> */}
        <Repetition3DText
          text="Experiences"
          color={backgroundMode === 'white' ? '#ffffff' : '#000000'}
        />
        <div style={{ marginTop: '4rem', width: '100%' }}>
          <ResumeTimeline backgroundMode={backgroundMode as 'white' | 'black'} />
        </div>
      </section>
    </div>
  );
}
