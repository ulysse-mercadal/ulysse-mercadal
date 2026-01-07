'use client';
import { useRef, useState, useLayoutEffect } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
interface TimelineItem {
  title: string;
  date: string;
  description: string;
  id: number;
}
const timelineData: TimelineItem[] = [
  {
    id: 1,
    title: 'Epitech Paris',
    date: 'January 2024',
    description:
      'Began my journey at Epitech Paris, immersing myself in a project-based pedagogy that emphasizes practical skills and autonomous learning. This immersive environment and project-driven approach have been instrumental in shaping my problem-solving skills and passion for development.',
  },
  {
    id: 2,
    title: 'Fullstack Developer - BPCE IT',
    date: 'juillet / decembre 2024',
    description:
      "During my 6-month internship at BPCE IT, I actively applied Epitech's project-based pedagogy in a professional setting. I contributed to the entire application lifecycle, from backend to frontend, utilizing TypeScript, Reactadmin, and FastAPI",
  },
  {
    id: 3,
    title: 'Zappy Project (Epitech)',
    date: 'Early 2025',
    description:
      'Developed "Zappy," a multiplayer AI strategy game in a networked environment, featuring a 3D client built with OpenGL. This project was a deep dive into network programming, graphical rendering, and artificial intelligence.',
  },
  {
    id: 4,
    title: 'Area Project (Epitech)',
    date: 'Late 2025',
    description:
      'Created "Area," a microservices-based automation platform, akin to n8n, with a modular architecture for seamless service integration. It connects various services like Discord, Google, and more, allowing users to create powerful automated workflows.',
  },
];
const TOTAL_ITEMS = timelineData.length;
interface ExperienceItemProps {
  item: TimelineItem;
  index: number;
  scrollYProgress: MotionValue<number>;
  heights: number[];
  itemRef: (el: HTMLDivElement | null) => void;
}
const ExperienceItem = ({ item, index, scrollYProgress, heights, itemRef }: ExperienceItemProps) => {
  const itemHeight = heights[index] || 200;
  const start = index / TOTAL_ITEMS;
  const enterStart = start + 0.05;
  const enterEnd = start + 0.15;

  // Animation d'entrée depuis la gauche
  const x = useTransform(scrollYProgress, [enterStart, enterEnd], ['-100%', '0%']);
  const opacity = useTransform(scrollYProgress, [enterStart, enterEnd], [0, 1]);

  // Opacité de la ligne de connexion (apparaît après le slide)
  const lineOpacity = useTransform(scrollYProgress, [enterEnd - 0.02, enterEnd], [0, 1]);

  // Coloration synchronisée avec la ligne verticale
  // Le connecteur devient indigo quand la ligne verticale atteint ce point
  const itemProgress = (index + 0.5) / TOTAL_ITEMS; // Position du connecteur sur la timeline
  const connectionColor = useTransform(
    scrollYProgress,
    [itemProgress - 0.05, itemProgress],
    ['rgba(255, 255, 255, 0.1)', 'rgb(99, 102, 241)']
  );

  // Position Y
  const yTransforms: [number, number][] = [[enterEnd, 0]];
  for (let i = index + 1; i < TOTAL_ITEMS; i++) {
    const nextStart = i / TOTAL_ITEMS;
    const currentOffset = yTransforms[yTransforms.length - 1][1];
    const nextItemHeight = heights[i] || 200;
    yTransforms.push([nextStart, currentOffset]);
    yTransforms.push([nextStart + 0.05, currentOffset - (nextItemHeight + 80)]);
  }
  const scrollPoints = yTransforms.map(t => t[0]);
  const yPositions = yTransforms.map(t => t[1]);
  const y = useTransform(scrollYProgress, scrollPoints, yPositions);

  return (
    <motion.div
      ref={itemRef}
      style={{
        y,
        x,
        opacity,
        position: 'absolute',
        top: `calc(75vh - ${itemHeight / 2}px)`,
        left: 0,
        right: '100px'
      }}
    >
      <div className="relative">
        <div className="p-8 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
          <h3 className="text-2xl font-bold text-white">{item.title}</h3>
          <p className="text-indigo-300 italic">{item.date}</p>
          <p className="text-slate-300 mt-4">{item.description}</p>
        </div>
        {/* Ligne de connexion à la timeline */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 left-full flex items-center"
          style={{ opacity: lineOpacity }}>
          <motion.div
            className="w-24 h-px"
            style={{ backgroundColor: connectionColor }}
          />
          <motion.div
            className="w-4 h-4 rounded-full shadow-lg shadow-indigo-500/50"
            style={{ backgroundColor: connectionColor }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};
const AnimatedTimeline = () => {
  const containerRef = useRef(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [heights, setHeights] = useState<number[]>([]);
  const [totalHeight, setTotalHeight] = useState(TOTAL_ITEMS * 1000);
  useLayoutEffect(() => {
    const measuredHeights = itemRefs.current.map(el => el?.offsetHeight || 0);
    if (measuredHeights.some(h => h > 0)) {
      setHeights(measuredHeights);
      const avgHeight = measuredHeights.reduce((a, b) => a + b, 0) / measuredHeights.length;
      setTotalHeight(avgHeight * TOTAL_ITEMS * 4);
    }
  }, []);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });
  return (
    <div ref={containerRef} className="relative" style={{ height: `${totalHeight}px` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="relative max-w-5xl mx-auto flex h-full px-8">
          <div className="flex-1 relative">
            {timelineData.map((item, index) => (
              <ExperienceItem
                key={item.id}
                item={item}
                index={index}
                scrollYProgress={scrollYProgress}
                heights={heights}
                itemRef={(el) => (itemRefs.current[index] = el)}
              />
            ))}
          </div>
          {/* Ligne de timeline */}
          <div className="w-px flex justify-center items-center ml-1">
            <div className="h-full w-px bg-white/10 relative">
              <motion.div
                className="absolute top-0 left-0 h-full w-px bg-indigo-500 origin-top"
                style={{ scaleY: scrollYProgress }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AnimatedTimeline;