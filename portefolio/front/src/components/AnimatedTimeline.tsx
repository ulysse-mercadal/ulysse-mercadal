'use client';

import { useRef } from 'react';
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
    title: 'Fullstack Developer - BPCE IT',
    date: 'juillet / decembre 2014',
    description:
      "During my 6-month internship at BPCE IT, I actively applied Epitech's project-based pedagogy in a professional setting. I contributed to the entire application lifecycle, from backend to frontend, utilizing TypeScript, React, Node.js, and NestJS.",
  },
  {
    id: 2,
    title: 'Epitech Paris',
    date: 'January 2024',
    description:
      'Began my journey at Epitech Paris, immersing myself in a project-based pedagogy that emphasizes practical skills and autonomous learning.',
  },
  {
    id: 3,
    title: 'Zappy Project (Epitech)',
    date: 'Early 2025',
    description:
      'Developed "Zappy," a multiplayer AI strategy game in a networked environment, featuring a 3D client built with OpenGL.',
  },
  {
    id: 4,
    title: 'Area Project (Epitech)',
    date: 'Late 2025',
    description:
      'Created "Area," a microservices-based automation platform, akin to n8n, with a modular architecture for seamless service integration.',
  },
];

const ITEM_HEIGHT = 200; // Height of each item + margin
const TOTAL_ITEMS = timelineData.length;

interface ExperienceItemProps {
  item: TimelineItem;
  index: number;
  scrollYProgress: MotionValue<number>;
}

const ExperienceItem = ({ item, index, scrollYProgress }: ExperienceItemProps) => {
  const start = index / TOTAL_ITEMS;
  const end = (index + 1) / TOTAL_ITEMS;

  // Animate from left when it's its turn
  const x = useTransform(scrollYProgress, [start, start + 0.1], ['-100%', '0%']);
  const opacity = useTransform(scrollYProgress, [start, start + 0.1], [0, 1]);

  // Stick to top and then get pushed up by subsequent items
  const y = useTransform(scrollYProgress, [end, 1], [0, -(TOTAL_ITEMS - 1 - index) * ITEM_HEIGHT]);

  return (
    <motion.div
      style={{ y, x, opacity, position: 'absolute', top: `calc(50% - ${ITEM_HEIGHT / 2}px)` }}
      className="w-full p-8"
    >
      <div className="p-8 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
        <h3 className="text-2xl font-bold text-white">{item.title}</h3>
        <p className="text-indigo-300 italic">{item.date}</p>
        <p className="text-slate-300 mt-4">{item.description}</p>
      </div>
    </motion.div>
  );
};


const AnimatedTimeline = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <div ref={containerRef} className="relative h-[600vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="relative max-w-3xl mx-auto flex h-full">
          <div className="w-3/4 relative">
            {timelineData.map((item, index) => (
              <ExperienceItem 
                key={item.id}
                item={item}
                index={index}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
          <div className="w-1/4 flex justify-center items-center">
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