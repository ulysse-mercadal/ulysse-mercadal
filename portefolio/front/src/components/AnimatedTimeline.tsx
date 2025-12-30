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

interface ExperienceItemProps {
  item: TimelineItem;
  index: number;
  scrollYProgress: MotionValue<number>;
}

const ExperienceItem = ({ item, index, scrollYProgress }: ExperienceItemProps) => {
  const itemOpacity = useTransform(
    scrollYProgress,
    [index * 0.2, index * 0.2 + 0.1, (index + 1) * 0.2 - 0.1, (index + 1) * 0.2],
    [0, 1, 1, 0]
  );
  const itemX = useTransform(
    scrollYProgress,
    [index * 0.2, index * 0.2 + 0.1],
    ['100%', '0%']
  );

  return (
    <motion.div
      key={item.id}
      style={{
        opacity: itemOpacity,
        x: itemX,
        position: 'absolute',
      }}
      className="p-8 rounded-lg bg-white/5 border border-white/10 w-full"
    >
      <h3 className="text-2xl font-bold text-white">{item.title}</h3>
      <p className="text-indigo-300 italic">{item.date}</p>
      <p className="text-slate-300 mt-4">{item.description}</p>
    </motion.div>
  );
};

const AnimatedTimeline = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center start'],
  });

  return (
    <div ref={ref} className="relative max-w-3xl mx-auto flex">
      <div className="w-3/4">
        {timelineData.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold text-white">{item.title}</h3>
            <p className="text-indigo-300 italic">{item.date}</p>
            <p className="text-slate-300 mt-4">{item.description}</p>
          </motion.div>
        ))}
      </div>
      <div className="w-1/4 flex justify-center">
        <svg width="20" height="100%" className="h-full">
          <motion.path
            d="M 10 0 L 10 1000"
            stroke="white"
            strokeWidth="2"
            strokeDasharray="5 5"
            style={{ pathLength: scrollYProgress }}
          />
        </svg>
      </div>
    </div>
  );
};

export default AnimatedTimeline;