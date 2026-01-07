'use client';
import { useEffect, useRef } from 'react';
// import paper from 'paper';
// import opentype from 'opentype.js';
import { scalePow, scaleSqrt } from 'd3';
// import type { Item, Point, MouseEvent } from 'paper';

export default function TextEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    let paper: any;
    let opentype: any;
    let project: any;
    
    // Variables to store state
    let glyphs: any[] = []; 
    let originalPos: any[] = []; // paper.Point
    
    // Scales (d3 scales are pure JS, safe)
    const blurAmountScale = scalePow().domain([0, 300]).clamp(true).range([0, 10]);
    const offsetScale = scaleSqrt().domain([0, 400]).clamp(true).range([0, 100]);

    const init = async () => {
        try {
            paper = (await import('paper')).default;
            opentype = (await import('opentype.js')).default;
        } catch (e) {
            console.error("Failed to load libraries", e);
            return;
        }

        // Initialize Paper.js
        paper.setup(canvasRef.current);
        const view = paper.view;
        project = paper.project;

        const riseAndBlur = {
            point: new paper.Point(view.center),
            tPoint: new paper.Point(view.center),
            lgCenter: new paper.Point(view.center),
        };

        const loadFont = () => {
        opentype.load('/fonts/Roboto-Bold.ttf', (err: any, font: any) => {
            if (err || !font) {
            console.error('Font loading error:', err);
            return;
            }

            const text = "ULYSSE MERCADAL";
            // Responsive font size
            const fontSize = Math.min(view.bounds.width / 10, 150); 
            const y = view.center.y;
            
            // Initial X (will center later)
            let currentX = 0;

            const fontGlyphs = font.stringToGlyphs(text);

            // Convert glyphs to Paper.js paths
            fontGlyphs.forEach((glyphData: any) => {
            const pathData = glyphData.getPath(currentX, y, fontSize);
            const path = new paper.CompoundPath(pathData.toPathData(2));
            path.fillColor = new paper.Color('#ffffff'); // White text
            
            glyphs.push(path);
            originalPos.push(path.position.clone());

            if (glyphData.advanceWidth) {
                currentX += glyphData.advanceWidth * (1/font.unitsPerEm * fontSize);
            }
            });

            // Group to center
            const group = new paper.Group(glyphs);
            group.position = view.center;
            
            // Update original positions after centering
            glyphs.forEach((g: any, i: number) => {
            originalPos[i] = g.position.clone();
            });
            
            riseAndBlur.lgCenter = group.bounds.center;
        });
        };

        loadFont();

        // Interactions
        view.onMouseMove = (event: any) => {
        riseAndBlur.tPoint = event.point;
        };

        view.onFrame = () => {
        // Smooth mouse follow
        riseAndBlur.point = riseAndBlur.point.add(
            riseAndBlur.tPoint.subtract(riseAndBlur.point).multiply(0.1)
        );

        // Effect Logic (Rise and Blur)
        // Calculate distance from text center Y
        const dist = riseAndBlur.lgCenter.y - riseAndBlur.point.y;
        
        // Apply CSS Blur
        if (canvasRef.current) {
            // Only blur if distance is significant to avoid constant repaint
            const blurVal = blurAmountScale(Math.abs(dist));
            canvasRef.current.style.filter = `blur(${blurVal}px)`;
        }

        // Move Glyphs
        const len = glyphs.length - 1;
        const middle = len / 2;

        glyphs.forEach((g: any, i: number) => {
            let offsetNum;
            if (dist > 0) {
                // Mouse above text
                offsetNum = middle - i;  
            } else {
                // Mouse below text
                offsetNum = i - middle;    
            }
            
            const offset = offsetNum * offsetScale(Math.abs(dist));
            
            // Reset to original X, update Y
            g.position = new paper.Point(
                originalPos[i].x, 
                originalPos[i].y + offset
            );
        });
        };

        // Handle Resize
        const handleResize = () => {
            project.clear();
            glyphs = [];
            originalPos = [];
            loadFont();
        };
        view.onResize = handleResize;
    };

    init();

    return () => {
      if (project) project.remove();
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
