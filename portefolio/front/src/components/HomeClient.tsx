'use client';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Cursor from '@/components/Cursor';

const TextEffect = dynamic(() => import('@/components/TextEffect'), { ssr: false });

export default function HomeClient() {
  return (
    <div className="w-full h-screen overflow-hidden bg-black text-white selection:bg-white selection:text-black">
      <Cursor />
      <Header />
      <div className="relative w-full h-full flex items-center justify-center">
        <TextEffect />
      </div>
    </div>
  );
}
