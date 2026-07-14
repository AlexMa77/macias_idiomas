import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Button } from '../components/ui/Button';
import { Sparkles, Globe, BrainCircuit, Users, ArrowRight } from 'lucide-react';
import { getCourses } from '../../services/api';

export const HomePage: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const backendCourses = await getCourses();
        if (backendCourses && backendCourses.length > 0) {
          // Asumiendo que el backend retorna un array de cursos
          setCourses(backendCourses);
        } else {
          // Fallback a datos simulados si la API falla o está vacía
          setCourses(mockCourses);
        }
      } catch (error) {
        setCourses(mockCourses);
      } finally {
        setLoading(false);
      }
    };
    fetchCatalog();
  }, []);

  const mockCourses = [
    {
      id: 1,
      title: "Inglés Intermedio B1",
      description: "Mejora tu fluidez y domina la gramática esencial para comunicarte con confianza.",
      level: "Intermedio",
      icon: "🇺🇸",
      color: "from-blue-500 to-cyan-400"
    },
    {
      id: 2,
      title: "Francés para Principiantes",
      description: "Empieza desde cero y aprende a desenvolverte en situaciones cotidianas en París.",
      level: "Principiante",
      icon: "🇫🇷",
      color: "from-indigo-500 to-purple-400"
    },
    {
      id: 3,
      title: "Alemán Avanzado C1",
      description: "Perfecciona tu pronunciación y vocabulario técnico para oportunidades en el extranjero.",
      level: "Avanzado",
      icon: "🇩🇪",
      color: "from-emerald-500 to-teal-400"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col font-sans text-slate-50 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
      
      {/* Glow Effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        
        {/* Hero Section */}
        <main className="flex-1">
          <section className="flex flex-col items-center text-center px-4 py-32 relative">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-700/50 backdrop-blur-md mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-slate-300">Descubre la nueva forma de aprender</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tight max-w-5xl leading-[1.1] animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
              Domina el mundo,<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                un idioma a la vez.
              </span>
            </h1>
            
            <p className="mt-8 text-xl text-slate-400 max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 leading-relaxed">
              Desbloquea tu potencial con módulos interactivos, tutores de IA en tiempo real y una comunidad global que impulsa tu aprendizaje.
            </p>
            
            <div className="mt-12 flex flex-col sm:flex-row gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
              <Button size="lg" className="bg-white text-slate-950 hover:bg-slate-200 hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)] rounded-full px-8 h-14 font-bold text-lg group border-none">
                Empezar gratis
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 h-14 font-semibold text-lg border-slate-700 text-white bg-slate-900/50 backdrop-blur-sm hover:bg-slate-800 transition-all">
                Ver Catálogo
              </Button>
            </div>
            
            {/* Features Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 pt-12 border-t border-slate-800/50 w-full max-w-5xl animate-in fade-in duration-1000 delay-500">
              <div className="flex flex-col items-center gap-2">
                <Globe className="w-6 h-6 text-blue-400" />
                <span className="text-3xl font-bold text-white">+50</span>
                <span className="text-sm text-slate-400 font-medium">Idiomas</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <BrainCircuit className="w-6 h-6 text-purple-400" />
                <span className="text-3xl font-bold text-white">24/7</span>
                <span className="text-sm text-slate-400 font-medium">Tutor IA</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Users className="w-6 h-6 text-emerald-400" />
                <span className="text-3xl font-bold text-white">100k+</span>
                <span className="text-sm text-slate-400 font-medium">Estudiantes</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Sparkles className="w-6 h-6 text-amber-400" />
                <span className="text-3xl font-bold text-white">4.9/5</span>
                <span className="text-sm text-slate-400 font-medium">Valoración</span>
              </div>
            </div>
          </section>

          {/* Catalog Section */}
          <section className="py-32 px-8 relative z-20" id="catalog">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Cursos Destacados</h2>
                  <p className="text-lg text-slate-400 max-w-xl">
                    Acelera tu carrera con nuestros programas más populares, diseñados por expertos en lingüística.
                  </p>
                </div>
                <Button variant="outline" className="rounded-full border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800">
                  Ver todos los cursos
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {loading ? (
                  <div className="col-span-3 text-center text-slate-400 py-10">Cargando cursos desde el backend...</div>
                ) : (
                  courses.map((course: any) => (
                    <div key={course.id || Math.random()} className="group relative bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 hover:border-slate-600 transition-all duration-300 hover:-translate-y-2 flex flex-col overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${course.color || 'from-slate-700 to-slate-600'} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                      
                      <div className="w-16 h-16 bg-slate-800/80 rounded-2xl flex items-center justify-center text-3xl mb-8 border border-slate-700 shadow-inner group-hover:scale-110 transition-transform duration-300">
                        {course.icon || '📚'}
                      </div>
                      
                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all">{course.title || course.nombre || 'Curso'}</h3>
                      
                      <p className="text-slate-400 mb-10 flex-1 leading-relaxed">
                        {course.description || course.descripcion || 'Sin descripción disponible.'}
                      </p>
                      
                      <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-800/80">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-300 bg-slate-800 px-4 py-2 rounded-full border border-slate-700">
                          {course.level || course.nivel || 'Nivel Vario'}
                        </span>
                        <button className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white group-hover:bg-blue-600 transition-colors cursor-pointer z-10 border-none">
                          <ArrowRight className="w-5 h-5 group-hover:-rotate-45 transition-transform" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};
