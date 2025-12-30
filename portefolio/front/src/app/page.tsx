import Starfield from "@/components/Starfield";

export default function Home() {
  return (
    <div className="bg-[#0d1117] text-white min-h-screen font-sans">
      <Starfield />
      <div className="relative z-10">
        <header className="py-8">
          <nav className="flex justify-center space-x-12 text-xl">
            <a
              href="#education"
              className="hover:text-blue-400 transition-colors"
            >
              Education
            </a>
            <a
              href="#projects"
              className="hover:text-blue-400 transition-colors"
            >
              Projects
            </a>
            <a
              href="#work-experience"
              className="hover:text-blue-400 transition-colors"
            >
              Work Experience
            </a>
          </nav>
        </header>

        <main className="flex flex-col items-center justify-center text-center pt-32">
          <div className="relative grain-effect bg-white/2 backdrop-blur-xl rounded-2xl border-2 border-white/20 p-12 shadow-[0_0_80px_rgba(0,0,0,0.3)]">
            <div className="space-y-6">
              <h2 className="text-4xl text-gray-300">
                Welcome to my portfolio
              </h2>
              <h1 className="text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                Ulysse Mercadal
              </h1>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}