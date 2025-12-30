'use client';

import { useRef } from 'react';
import { Sparkles, Briefcase, Target, ArrowRight, User, Search, Plane, Lightbulb } from 'lucide-react';
import SimpleWorldMap from '@/components/simple-world-map';
import Starfield from '@/components/Starfield'; // Import the new Starfield component

export default function Home() {
  return (
    <div className="bg-slate-950 text-white min-h-screen font-sans">
      <Starfield />

      <div className="relative z-10">
        {/* Header - Projects Chip */}
        <header className="py-6 px-8 flex justify-center mt-8">
          <a href="/project" className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 font-semibold shadow-lg shadow-blue-500/30 text-white text-lg">
            Voir mes projets <ArrowRight className="w-5 h-5" />
          </a>
        </header>

        {/* Hero Section */}
        <main className="px-8 pt-10 pb-20">
          <div className="max-w-6xl mx-auto">
            {/* Introduction */}
            <section className="mb-32 text-center">
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30">
                <span className="text-blue-300 text-sm">Welcome to my portfolio</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
                Ulysse Mercadal
              </h1>

              <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-8">
                A passionate developer with expertise in various technologies, building robust and scalable applications.
                I love transforming complex problems into elegant, user-friendly solutions through continuous learning and innovation.
              </p>

              <div className="flex gap-4 justify-center">
                <button className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 font-semibold shadow-lg shadow-blue-500/30">
                  Get In Touch
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button className="px-8 py-3 rounded-lg border border-blue-400/30 hover:bg-blue-500/10 transition-all duration-300 font-semibold">
                  View Work
                </button>
              </div>
            </section>

            {/* Cards Grid */}
            <section className="grid md:grid-cols-3 gap-8 mb-20">
              {/* Card 1: Who I Am */}
              <a href="#who-i-am" className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-fuchsia-500/10 to-fuchsia-500/10 border border-fuchsia-400/30 p-8 hover:border-fuchsia-400/50 transition-all duration-300 cursor-pointer">
                <div className="absolute top-0 right-0 w-24 h-24 bg-fuchsia-500/20 rounded-full blur-2xl"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-fuchsia-500/20 to-fuchsia-500/20 flex items-center justify-center mb-6 group-hover:scale-125 transition-all duration-300">
                    <Sparkles className="w-6 h-6 text-fuchsia-300" />
                  </div>

                  <h3 className="text-2xl font-bold mb-3 text-white">Who I Am</h3>
                  <p className="text-fuchsia-300 text-sm uppercase tracking-wider mb-4">Self Introduction</p>
                  <p className="text-slate-300 leading-relaxed">
                    A brief introduction about my skills, passions, and what drives me in the world of development.
                  </p>
                                </div>
                              </a>
                              {/* Card 2: My Experience */}
              <a href="#my-experience" className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500/10 to-indigo-500/10 border border-indigo-400/30 p-8 hover:border-indigo-400/50 transition-all duration-300 cursor-pointer">
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/20 rounded-full blur-2xl"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500/20 to-indigo-500/20 flex items-center justify-center mb-6 group-hover:scale-125 transition-all duration-300">
                    <Briefcase className="w-6 h-6 text-indigo-300" />
                  </div>

                  <h3 className="text-2xl font-bold mb-3 text-white">My Experience</h3>
                  <p className="text-indigo-300 text-sm uppercase tracking-wider mb-4">Professional Path</p>
                  <p className="text-slate-300 leading-relaxed">
                    Details about my past roles, key projects, and the technologies I've mastered.
                  </p>
                                </div>
                              </a>
                              {/* Card 3: What I'm Looking For */}
              <a href="#what-im-looking-for" className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/10 border border-blue-400/30 p-8 hover:border-blue-400/50 transition-all duration-300 cursor-pointer">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-500/20 flex items-center justify-center mb-6 group-hover:scale-125 transition-all duration-300">
                    <Target className="w-6 h-6 text-blue-300" />
                  </div>

                  <h3 className="text-2xl font-bold mb-3 text-white">What I'm Looking For</h3>
                  <p className="text-blue-300 text-sm uppercase tracking-wider mb-4">Future Goals</p>
                  <p className="text-slate-300 leading-relaxed">
                    My career aspirations, ideal projects, and the kind of team I'm eager to join.
                  </p>
                </div>
              </a>
            </section>

            {/* Who I Am Section */}
            <section id="who-i-am" className="mb-20">
              <h2 className="text-4xl font-bold text-center mb-10 text-white inline-flex items-center gap-4">
                <User className="w-10 h-10 text-blue-400" /> Who I Am
              </h2>
              <div className="rounded-xl bg-white/5 border border-white/10 p-8 backdrop-blur-sm mx-auto max-w-3xl transform hover:scale-[1.01] transition-transform duration-300 relative overflow-hidden group">
                <div className="absolute inset-0 border border-transparent rounded-xl group-hover:border-blue-500 transition-all duration-300 pointer-events-none"></div>
                <p className="text-slate-300 leading-relaxed text-lg mb-4">
                  I am Ulysse Mercadal, a <span className="text-blue-300 font-semibold">French student developer</span> from Epitech Paris and Lyon, driven by a <span className="text-blue-300 font-semibold">project-based pedagogy</span> that fosters concrete problem-solving. My passion lies in crafting <span className="text-blue-300 font-semibold">innovative and impactful solutions</span> through clean code and a user-centric approach.
                </p>
                <p className="text-slate-300 leading-relaxed text-lg mb-4">
                  Constantly <span className="text-blue-300 font-semibold">exploring new technologies</span>, I transform complex ideas into intuitive applications, always focusing on <span className="text-blue-300 font-semibold">code quality and user experience</span>. My journey is about continuous learning and pushing technological boundaries.
                </p>
                <SimpleWorldMap />
              </div>
            </section>

            {/* My Experience Section */}
            <section id="my-experience" className="mb-20">
              <h2 className="text-4xl font-bold text-center mb-10 text-white inline-flex items-center gap-4">
                <Briefcase className="w-10 h-10 text-indigo-400" /> My Experience
              </h2>
              <div className="rounded-xl bg-white/5 border border-white/10 p-8 backdrop-blur-sm mx-auto max-w-3xl transform hover:scale-[1.01] transition-transform duration-300 relative overflow-hidden group">
                <div className="absolute inset-0 border border-transparent rounded-xl group-hover:border-indigo-500 transition-all duration-300 pointer-events-none"></div>
                <div className="relative border-l-2 border-indigo-500 pl-8 ml-4"> {/* Timeline container */}
                  {/* BPCE IT Experience */}
                  <div className="mb-8 relative">
                    <div className="absolute -left-4 top-1 w-3 h-3 rounded-full bg-indigo-500 border-2 border-slate-950 z-10"></div> {/* Dot */}
                    <h3 className="text-xl font-semibold text-white mb-2">Fullstack Developer - BPCE IT</h3>
                    <p className="text-slate-400 text-sm italic mb-4">September 2023 - February 2024 (6 months)</p>
                    <p className="text-slate-300 leading-relaxed text-lg">
                      During my 6-month internship at BPCE IT, I actively applied Epitech's <span className="text-indigo-300 font-semibold">project-based pedagogy</span> in a professional setting. I contributed to the <span className="text-indigo-300 font-semibold">entire application lifecycle</span>, from backend to frontend, utilizing <span className="text-indigo-300 font-semibold">TypeScript, React, Node.js, and NestJS</span>. This experience enhanced my skills in <span className="text-indigo-300 font-semibold">collaboration, technical rigor, and adaptation</span> to new requirements, involving the <span className="text-indigo-300 font-semibold">design, development, and maintenance</span> of critical software solutions.
                    </p>
                  </div>

                  {/* Epitech Entry */}
                  <div className="mb-8 relative">
                    <div className="absolute -left-4 top-1 w-3 h-3 rounded-full bg-indigo-500 border-2 border-slate-950 z-10"></div> {/* Dot */}
                    <h3 className="text-xl font-semibold text-white mb-2">Epitech Paris</h3>
                    <p className="text-slate-400 text-sm italic mb-4">January 2024</p>
                    <p className="text-slate-300 leading-relaxed text-lg">
                      Began my journey at <span className="text-indigo-300 font-semibold">Epitech Paris</span>, immersing myself in a <span className="text-indigo-300 font-semibold">project-based pedagogy</span> that emphasizes practical skills and autonomous learning.
                    </p>
                  </div>

                  {/* Zappy Project */}
                  <div className="mb-8 relative">
                    <div className="absolute -left-4 top-1 w-3 h-3 rounded-full bg-indigo-500 border-2 border-slate-950 z-10"></div> {/* Dot */}
                    <h3 className="text-xl font-semibold text-white mb-2">Zappy Project (Epitech)</h3>
                    <p className="text-slate-400 text-sm italic mb-4">Early 2025</p>
                    <p className="text-slate-300 leading-relaxed text-lg">
                      Developed "Zappy," a <span className="text-indigo-300 font-semibold">multiplayer AI strategy game</span> in a networked environment. Key features included a <span className="text-indigo-300 font-semibold">3D client built with OpenGL</span>, leveraging an improved engine that now supports <span className="text-indigo-300 font-semibold">animations with bones, complex textures, and 3D file formats like GLTF/FBX</span>.
                    </p>
                  </div>

                  {/* Area Project */}
                  <div className="mb-8 relative">
                    <div className="absolute -left-4 top-1 w-3 h-3 rounded-full bg-indigo-500 border-2 border-slate-950 z-10"></div> {/* Dot */}
                    <h3 className="text-xl font-semibold text-white mb-2">Area Project (Epitech)</h3>
                    <p className="text-slate-400 text-sm italic mb-4">Late 2025</p>
                    <p className="text-slate-300 leading-relaxed text-lg">
                      Created "Area," a <span className="text-indigo-300 font-semibold">microservices-based automation platform</span>, akin to n8n. This <span className="text-indigo-300 font-semibold">modular architecture</span> allowed seamless integration with services like <span className="text-indigo-300 font-semibold">Discord, Google Mail/Sheets, YouTube, Twitch, and Spotify</span>.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* What I'm Looking For Section */}
            <section id="what-im-looking-for" className="mb-20">
              <h2 className="text-4xl font-bold text-center mb-10 text-white inline-flex items-center gap-4">
                <Target className="w-10 h-10 text-blue-400" /> What I'm Looking For
              </h2>
              <div className="rounded-xl bg-white/5 border border-white/10 p-8 backdrop-blur-sm mx-auto max-w-3xl transform hover:scale-[1.01] transition-transform duration-300 relative overflow-hidden group">
                <div className="absolute inset-0 border border-transparent rounded-xl group-hover:border-blue-500 transition-all duration-300 pointer-events-none"></div>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Search className="w-8 h-8 text-blue-400 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">6-Month Internship (April Start)</h3>
                      <p className="text-slate-300 leading-relaxed text-lg">
                        Seeking a <span className="text-blue-300 font-semibold">6-month internship from April</span> to apply project-based learning in a professional, stimulating environment. Eager to contribute to innovative solutions within a dynamic team.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Plane className="w-8 h-8 text-blue-400 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">Full Remote & Travel Enthusiasm</h3>
                      <p className="text-slate-300 leading-relaxed text-lg">
                        As a <span className="text-blue-300 font-semibold">travel enthusiast</span>, I'm highly interested in <span className="text-blue-300 font-semibold">full remote opportunities</span>. This setup allows me to explore new cultures while developing skills, fostering autonomy and discipline.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Lightbulb className="w-8 h-8 text-blue-400 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">Challenging Projects & Growth</h3>
                      <p className="text-slate-300 leading-relaxed text-lg">
                        Open to diverse, challenging projects that deepen my <span className="text-blue-300 font-semibold">Fullstack development knowledge</span>. My adaptability and <span className="text-blue-300 font-semibold">thirst for knowledge</span> ensure quick and effective integration into your team.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-24 h-1 bg-blue-500 mx-auto mt-8 rounded-full"></div> {/* Decorative line */}
            </section>

          </div>
        </main>

        {/* Footer */}
        <footer className="py-8 px-8 text-center text-slate-500 text-sm border-t border-white/5">
          <p>© 2024 Ulysse Mercadal. Crafted with passion.</p>
        </footer>
      </div>
    </div>
  );
}