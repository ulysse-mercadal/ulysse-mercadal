'use client';

import { useRef } from 'react';
import { Sparkles, Briefcase, Target, ArrowRight, User, Search, Plane, Lightbulb } from 'lucide-react';
import AnimatedTimeline from '@/components/AnimatedTimeline';
import Starfield from '@/components/Starfield'; // Import the new Starfield component
import SimpleWorldMap from '@/components/simple-world-map';

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
                <User className="w-10 h-10 text-fuchsia-400" /> Who I Am
              </h2>
              <div className="relative mx-auto max-w-7xl overflow-hidden group">
                <div className="flex gap-6 transition-transform duration-500">
                  {/* Carte principale - masquée en dessous de 1280px */}
                  <div className="hidden min-[1280px]:block rounded-xl bg-white/5 border border-white/10 p-6 md:p-10 backdrop-blur-sm h-[400px] md:h-[500px] lg:h-[580px] w-full shrink-0 transition-all duration-500 min-[1280px]:group-hover:scale-50 min-[1280px]:group-hover:-translate-x-[180px] xl:group-hover:-translate-x-[220px] overflow-hidden">
                    <SimpleWorldMap />
                  </div>
                  {/* Volet à droite qui slide depuis l'extérieur */}
                  <div className="w-full min-[1280px]:w-112.5 shrink-0 transition-transform duration-500 min-[1280px]:group-hover:-translate-x-[420px] xl:group-hover:-translate-x-[500px]">
                    <div className="rounded-xl bg-white/5 border border-fuchsia-500/50 backdrop-blur-sm p-6 md:p-8 h-full flex flex-col justify-center shadow-2xl shadow-fuchsia-500/20">
                      <p className="text-slate-300 leading-relaxed text-base md:text-lg mb-4">
                        I am Ulysse Mercadal, a French student developer from Epitech Paris and Lyon, driven by a project-based pedagogy that fosters concrete problem-solving. My passion lies in crafting innovative and impactful solutions through clean code and a user-centric approach.
                      </p>
                      <p className="text-slate-300 leading-relaxed text-base md:text-lg">
                        Constantly exploring new technologies, I transform complex ideas into intuitive applications, always focusing on code quality and user experience. My journey is about continuous learning and pushing technological boundaries.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section id="my-experience" className="mb-20 mt-32">
              <h2 className="text-4xl font-bold text-center mb-10 text-white inline-flex items-center gap-4">
                <Briefcase className="w-10 h-10 text-indigo-400" /> My Experience
              </h2>
              <AnimatedTimeline />
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