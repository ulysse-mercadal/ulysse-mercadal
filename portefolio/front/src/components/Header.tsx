'use client';
import Link from 'next/link';
import Image from 'next/image';

interface HeaderProps {
  currentEffect: number;
  setCurrentEffect: (effect: number) => void;
}

export default function Header({ currentEffect, setCurrentEffect }: HeaderProps) {
  const effects = [
    { id: 0, icon: 'ef1' },
    { id: 1, icon: 'ef2' },
    { id: 2, icon: 'ef4' },
    { id: 3, icon: 'ef5' },
    { id: 4, icon: 'ef6' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-40 mix-blend-difference text-white">
      <div className="flex items-center gap-8">
        <div className="font-bold text-xl tracking-tight">
          <Link href="/">Ulysse Mercadal</Link>
        </div>
        
        <div className="flex items-center gap-4">
          {effects.map((effect) => (
            <button
              key={effect.id}
              onClick={() => setCurrentEffect(effect.id)}
              className="hover:opacity-70 transition-opacity"
            >
              <Image
                src={`/assets/${effect.icon}_black${currentEffect === effect.id ? '_selected' : ''}.svg`}
                alt={`Effect ${effect.id}`}
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </button>
          ))}
        </div>
      </div>

      <nav className="flex space-x-6 text-sm uppercase tracking-widest">
        <Link href="#work" className="hover:opacity-50 transition-opacity">Work</Link>
        <Link href="#about" className="hover:opacity-50 transition-opacity">About</Link>
        <Link href="#contact" className="hover:opacity-50 transition-opacity">Contact</Link>
      </nav>
    </header>
  );
}
