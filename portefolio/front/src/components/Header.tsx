'use client';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-40 mix-blend-difference text-white">
      <div className="font-bold text-xl tracking-tight">
        <Link href="/">Ulysse Mercadal</Link>
      </div>
      <nav className="flex space-x-6 text-sm uppercase tracking-widest">
        <Link href="#work" className="hover:opacity-50 transition-opacity">Work</Link>
        <Link href="#about" className="hover:opacity-50 transition-opacity">About</Link>
        <Link href="#contact" className="hover:opacity-50 transition-opacity">Contact</Link>
      </nav>
    </header>
  );
}
