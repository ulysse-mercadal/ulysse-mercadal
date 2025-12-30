"use client";

import React, { useRef, useEffect, useCallback } from "react";
import * as THREE from "three";

const Starfield: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const animationFrameId = useRef<number | null>(null);

  const scene = useRef<THREE.Scene | null>(null);
  const camera = useRef<THREE.PerspectiveCamera | null>(null);
  const renderer = useRef<THREE.WebGLRenderer | null>(null);
  const stars = useRef<THREE.Points | null>(null);

  const init = useCallback(() => {
    if (!mountRef.current) return;

    // Scene
    scene.current = new THREE.Scene();

    // Camera
    camera.current = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.current.position.z = 5;

    // Renderer
    renderer.current = new THREE.WebGLRenderer({ antialias: true });
    renderer.current.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    mountRef.current.appendChild(renderer.current.domElement);

    // Generate a round texture for stars
    const circleCanvas = document.createElement("canvas");
    circleCanvas.width = 64;
    circleCanvas.height = 64;
    const ctx = circleCanvas.getContext("2d");
    if (ctx) {
      ctx.beginPath();
      ctx.arc(32, 32, 30, 0, 2 * Math.PI);
      ctx.fillStyle = "white";
      ctx.fill();
    }
    const circleTexture = new THREE.CanvasTexture(circleCanvas);

    // Stars
    const starGeometry = new THREE.BufferGeometry();

    const REFERENCE_WIDTH = 1440; // Assumed width for "framezork 13"
    const REFERENCE_HEIGHT = 900; // Assumed height for "framezork 13"
    const BASE_STAR_COUNT = 500000; // Original star count for the reference screen size

    const referenceArea = REFERENCE_WIDTH * REFERENCE_HEIGHT;

    const currentWidth = window.innerWidth;
    const currentHeight = window.innerHeight;
    const currentArea = currentWidth * currentHeight;

    const scalingPower = 2; // Factor to make diminution/augmentation stronger

    const scaleFactor = currentArea / referenceArea;
    const starCount = Math.floor(BASE_STAR_COUNT * (scaleFactor ** scalingPower));
    console.log(`Calculated star count: ${starCount} for screen size: ${currentWidth}x${currentHeight} with scalingPower: ${scalingPower}`);

    const starVertices = [];
    const starColors = [];
    const color = new THREE.Color();

    for (let i = 0; i < starCount; i++) {
      // Generate all stars within a single, larger volume
      const x = (Math.random() - 0.5) * 500;
      const y = (Math.random() - 0.5) * 500;
      const z = (Math.random() - 0.5) * 500;
      starVertices.push(x, y, z);

      // Add some color variation
      color.setHSL(Math.random(), 0.7, 0.8); // Hue, Saturation, Lightness
      starColors.push(color.r, color.g, color.b);
    }

    starGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(starVertices, 3)
    );
    starGeometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(starColors, 3)
    );

    const starMaterial = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true, // Use colors from geometry
      transparent: true,
      opacity: 0.9, // Slightly increased opacity
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
      map: circleTexture, // Apply the round texture
    });

    stars.current = new THREE.Points(starGeometry, starMaterial);
    scene.current.add(stars.current);

    // Adjust camera position to be within the starfield
    if (camera.current) {
        camera.current.position.z = 0; // Camera inside the starfield
    }

    const animate = () => {
      if (!scene.current || !camera.current || !renderer.current || !stars.current) return;

      // Mouse-based rotation
      const targetRotationX = mouseY.current * 0.0001;
      const targetRotationY = mouseX.current * 0.0001;

      stars.current.rotation.x += (targetRotationX - stars.current.rotation.x) * 0.05;
      stars.current.rotation.y += (targetRotationY - stars.current.rotation.y) * 0.05;

      renderer.current.render(scene.current, camera.current);
      animationFrameId.current = requestAnimationFrame(animate);
    };
    animate();

    const onMouseMove = (event: MouseEvent) => {
      mouseX.current = event.clientX - window.innerWidth / 2;
      mouseY.current = event.clientY - window.innerHeight / 2;
    };

    const onWindowResize = () => {
      if (!mountRef.current || !camera.current || !renderer.current) return;
      camera.current.aspect =
        mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.current.updateProjectionMatrix();
      renderer.current.setSize(
        mountRef.current.clientWidth,
        mountRef.current.clientHeight
      );
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onWindowResize);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onWindowResize);
      if (mountRef.current && renderer.current) {
        mountRef.current.removeChild(renderer.current.domElement);
      }
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      // Dispose of Three.js objects
      if (scene.current) {
        scene.current.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            object.geometry.dispose();
            if (Array.isArray(object.material)) {
              object.material.forEach((material) => material.dispose());
            } else {
              object.material.dispose();
            }
          }
          if (object instanceof THREE.Points) {
            object.geometry.dispose();
            if (Array.isArray(object.material)) {
              object.material.forEach((material) => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        });
      }
      if (renderer.current) {
        renderer.current.dispose();
      }
    };
  }, []); // End of useCallback for init

  useEffect(() => {
    init();
  }, [init]);

  return <div ref={mountRef} className="fixed inset-0 z-0" />;
};

export default Starfield;
