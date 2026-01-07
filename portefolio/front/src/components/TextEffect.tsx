'use client';
import { useEffect, useRef } from 'react';
import { scaleLinear } from 'd3';

export default function TextEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const paperRef = useRef<any>(null);
  const fontRef = useRef<any>(null);
  const projectRef = useRef<any>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    let paper: any;
    let opentype: any;

    const init = async () => {
        if (!paperRef.current) {
            try {
                paper = (await import('paper')).default;
                opentype = (await import('opentype.js')).default;
                paperRef.current = paper;
                paper.setup(canvasRef.current);
                projectRef.current = paper.project;
            } catch (e) {
                console.error("Failed to load libraries", e);
                return;
            }
        } else {
            paper = paperRef.current;
        }

        if (!fontRef.current) {
             opentype = (await import('opentype.js')).default;
             return new Promise((resolve) => {
                 opentype.load('/fonts/Roboto-Bold.ttf', (err: any, font: any) => {
                     if (err || !font) {
                         console.error('Font loading error:', err);
                         return;
                     }
                     fontRef.current = font;
                     runEffect();
                     resolve(true);
                 });
             });
        } else {
            runEffect();
        }
    };

    const runEffect = () => {
        if (!paperRef.current || !fontRef.current || !projectRef.current) return;
        const paper = paperRef.current;
        const font = fontRef.current;
        const view = paper.view;

        projectRef.current.clear();
        view.onFrame = null;
        view.onMouseMove = null;

        // Base Text Setup
        const text = "ULYSSE MERCADAL";
        const fontSize = Math.min(view.bounds.width / 10, 150) / 3; 
        const y = view.center.y;
        let currentX = 0;
        const fontGlyphs = font.stringToGlyphs(text);
        const glyphs: any[] = [];
        const originalPos: any[] = [];

        fontGlyphs.forEach((glyphData: any) => {
            const pathData = glyphData.getPath(currentX, y, fontSize);
            const path = new paper.CompoundPath(pathData.toPathData(2));
            path.fillColor = new paper.Color('#ffffff');
            
            glyphs.push(path);
            
            if (glyphData.advanceWidth) {
                currentX += glyphData.advanceWidth * (1/font.unitsPerEm * fontSize);
            }
        });

        const group = new paper.Group(glyphs);
        group.position = view.center;
        
        glyphs.forEach((g: any, i: number) => {
           originalPos[i] = g.position.clone();
        });

        applyBezierBubble(paper, view, glyphs, originalPos, group);
    };

    // Effect 0: Bezier Bubble
    const applyBezierBubble = (paper: any, view: any, glyphs: any[], originalPos: any[], group: any) => {
        if (canvasRef.current) canvasRef.current.style.filter = 'none';

        // Prepare Bubble Elements
        const points = new paper.Group();
        const maskedGlyphs: any[] = [];
        
        // Setup tiny rectangles on path segments
        glyphs.forEach((glyph) => {
            // Need to handle CompoundPath children or Path segments
            const parts = glyph.children ? glyph.children : [glyph];
            
            parts.forEach((part: any) => {
               if(part.segments) {
                   part.segments.forEach((seg: any) => {
                       const p = new paper.Path.Rectangle(seg.point.subtract(new paper.Point(2,2)), 4);
                       p.fillColor = 'white';
                       points.addChild(p);
                   });
               }
            });

            // Dashed Clone for Mask
            const clone = glyph.clone();
            clone.fillColor = 'black'; // Background color (inverted logic from white theme)
            clone.strokeColor = 'white';
            clone.dashArray = [1, 3];
            clone.strokeWidth = 1;
            maskedGlyphs.push(clone);
            
            // Hide original
            glyph.visible = false; 
        });

        // Bubble State
        const bubble = {
            point: new paper.Point(view.center),
            tPoint: new paper.Point(view.center),
            prevPoint: new paper.Point(view.center),
            size: 10,
            tSize: 10,
            firstMoved: false
        };

        const sizeScale = scaleLinear().domain([0, 300]).clamp(true).range([180, 1]);

        const maskCircle = new paper.Path.Circle({ center: view.center,WB: 10, fillColor: 'green' }); // Mask (color doesn't matter)
        const circleOutline = new paper.Path.Circle({ center: view.center, radius: 10, strokeColor: 'white' });

        const bubbleGroup = new paper.Group([maskCircle, ...maskedGlyphs, points]);
        bubbleGroup.clipped = true;
        
        // Hide initially
        bubbleGroup.visible = false;
        circleOutline.visible = false;

        let theta = 0;

        view.onMouseMove = (e: any) => {
            bubble.firstMoved = true;
            bubble.tPoint = e.point;
            const dist = Math.abs(bubble.point.y - group.bounds.center.y);
            bubble.tSize = sizeScale(dist);
        };

        view.onFrame = () => {
             theta += 0.06;
             bubble.point = bubble.point.add(bubble.tPoint.subtract(bubble.point).multiply(0.2));
             
             bubble.size += (bubble.tSize - bubble.size) * 0.2;
             bubble.size += Math.sin(theta + Math.PI * 2) * (bubble.tSize / 100);

             if (bubble.firstMoved) {
                 bubbleGroup.visible = true;
                 circleOutline.visible = true;
             }
             
             const radius = maskCircle.bounds.width / 2;
             // Avoid division by zero or negative scaling if size is 0
             const s = (bubble.size / radius) || 0.1;
             
             maskCircle.position = bubble.point;
             circleOutline.position = bubble.point;
             
             maskCircle.scale(s);
             circleOutline.scale(s);
        };
    };

    init();

    // Resize handler
    const handleResize = () => {
        init();
    };
    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('resize', handleResize);
        if(projectRef.current) projectRef.current.clear();
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-screen block bg-black"
      data-paper-resize="true"
    />
  );
}