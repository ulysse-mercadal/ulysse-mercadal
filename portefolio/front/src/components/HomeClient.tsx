'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Cursor from '@/components/Cursor';

const TextEffect = dynamic(() => import('@/components/TextEffect'), { ssr: false });

export default function HomeClient() {
  const [currentEffect, setCurrentEffect] = useState(4); // Default to Rise and Blur (index 4)

  return (
    <div className="w-full h-screen overflow-hidden bg-black text-white selection:bg-white selection:text-black">
      <Cursor />
      <Header currentEffect={currentEffect} setCurrentEffect={setCurrentEffect} />
      <div className="relative w-full h-full flex items-center justify-center">
        <TextEffect currentEffect={currentEffect} />
      </div>
    </div>
  );
}
