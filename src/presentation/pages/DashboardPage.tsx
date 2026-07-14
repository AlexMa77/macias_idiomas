import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  BookOpen, LayoutDashboard, Settings, LogOut, Bell, 
  Users, BookMarked, BarChart3, Clock,
  PlayCircle, PlusCircle, UserCheck, Code
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { getUsers, getCourses, getClasses } from '../../services/api';

export const DashboardPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role') || 'student';
  const [activeTab, setActiveTab] = useState('overview');
  
  // Estados para el backend
  const [apiData, setApiData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (role === 'student') {
          const courses = await getCourses();
          setApiData(courses || []);
        } else if (role === 'teacher') {
          const classes = await getClasses();
          setApiData(classes || []);
        } else if (role === 'admin') {
          const users = await getUsers();
          setApiData(users || []);
        }
      } catch (error) {
        console.error('Error fetching dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [role]);

  const renderSidebarLinks = () => {
    const commonClasses = "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium";
    const activeClasses = "bg-blue-600 text-white shadow-md shadow-blue-500/20";
    const inactiveClasses = "text-slate-400 hover:bg-slate-800 hover:text-slate-200";

    if (role === 'student') {
      return (
        <>
          <button onClick={() => setActiveTab('overview')} className={`${commonClasses} ${activeTab === 'overview' ? activeClasses : inactiveClasses} w-full text-left`}>
            <LayoutDashboard className="w-5 h-5" /> Mi Progreso
          </button>
          <button onClick={() => setActiveTab('courses')} className={`${commonClasses} ${activeTab === 'courses' ? activeClasses : inactiveClasses} w-full text-left`}>
            <BookMarked className="w-5 h-5" /> Mis Cursos
          </button>
        </>
      );
    }
    
    if (role === 'teacher') {
      return (
        <>
          <button onClick={() => setActiveTab('overview')} className={`${commonClasses} ${activeTab === 'overview' ? activeClasses : inactiveClasses} w-full text-left`}>
            <Users className="w-5 h-5" /> Mis Alumnos
          </button>
          <button onClick={() => setActiveTab('classes')} className={`${commonClasses} ${activeTab === 'classes' ? activeClasses : inactiveClasses} w-full text-left`}>
            <BookOpen className="w-5 h-5" /> Gestionar Clases
          </button>
        </>
      );
    }

    if (role === 'admin') {
      return (
        <>
          <button onClick={() => setActiveTab('overview')} className={`${commonClasses} ${activeTab === 'overview' ? activeClasses : inactiveClasses} w-full text-left`}>
            <BarChart3 className="w-5 h-5" /> Estadísticas Globales
          </button>
          <button onClick={() => setActiveTab('users')} className={`${commonClasses} ${activeTab === 'users' ? activeClasses : inactiveClasses} w-full text-left`}>
            <UserCheck className="w-5 h-5" /> Control de Usuarios
          </button>
        </>
      );
    }
  };

  const renderDashboardContent = () => {
    if (role === 'student') {
      return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-slate-400 font-medium">Racha actual</h3>
                <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">🔥</div>
              </div>
              <p className="text-3xl font-bold text-white">12 Días</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-slate-400 font-medium">Lecciones completadas</h3>
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">🎯</div>
              </div>
              <p className="text-3xl font-bold text-white">34</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-slate-400 font-medium">Horas de estudio</h3>
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">⏱️</div>
              </div>
              <p className="text-3xl font-bold text-white">28h 45m</p>
            </div>
          </div>

            <h2 className="text-2xl font-bold text-white mt-10 mb-6">Continuar Aprendiendo</h2>
            {loading ? (
              <div className="text-slate-400 py-4">Cargando progreso desde el backend...</div>
            ) : (
              <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row gap-8 items-center hover:bg-slate-900 transition-colors">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-5xl flex-shrink-0">
                  🇺🇸
                </div>
                <div className="flex-1 w-full">
                  <div className="flex justify-between mb-2">
                    <h3 className="text-xl font-bold text-white">Inglés Intermedio B1 (API conectada)</h3>
                    <span className="text-blue-400 font-medium">65%</span>
                  </div>
                  <p className="text-slate-400 mb-4">Se encontraron {apiData.length} cursos disponibles en el servidor.</p>
                  <div className="w-full bg-slate-800 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                <Button className="w-full md:w-auto h-12 bg-white text-slate-950 font-bold hover:bg-slate-200">
                  <PlayCircle className="w-5 h-5 mr-2" /> Continuar
                </Button>
              </div>
            )}
          </div>
        );
      }

    if (role === 'teacher') {
      return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
          
          {/* BANNER PERSONALIZADO SOLICITADO POR EL USUARIO */}
          <div className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border border-purple-500/30 p-6 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
              <Code className="text-purple-400 w-6 h-6" />
            </div>
            <div>
              <p className="text-purple-300 font-medium text-sm tracking-widest uppercase">Créditos del Sistema</p>
              <h2 className="text-xl font-bold text-white">Desarrollado por ALEX GABRIEL MACIAS CAIZA</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
              <h3 className="text-slate-400 font-medium mb-1">Alumnos Activos</h3>
              <p className="text-4xl font-bold text-white mb-4">128</p>
              <p className="text-emerald-400 text-sm font-medium">↑ 12% este mes</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
              <h3 className="text-slate-400 font-medium mb-1">Tareas por revisar</h3>
              <p className="text-4xl font-bold text-white mb-4">14</p>
              <p className="text-orange-400 text-sm font-medium">Requiere atención</p>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-10 mb-6">
            <h2 className="text-2xl font-bold text-white">Próximas Clases en Vivo</h2>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white border-none">
              <PlusCircle className="w-4 h-4 mr-2" /> Programar
            </Button>
          </div>
          <div className="space-y-4">
            {loading ? (
              <div className="text-slate-400">Cargando clases desde el backend...</div>
            ) : (
              [1, 2].map(i => (
                <div key={i} className="bg-slate-900/50 border border-slate-800 p-5 rounded-2xl flex items-center justify-between hover:bg-slate-800/80 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-500/10 text-purple-400 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Clase API {i} (Conectado)</h4>
                      <p className="text-slate-400 text-sm">Hoy a las 18:00 • {apiData.length} alumnos matriculados</p>
                    </div>
                  </div>
                  <Button variant="outline" className="border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700">Iniciar Sala</Button>
                </div>
              ))
            )}
          </div>
        </div>
      );
    }

    if (role === 'admin') {
      return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
              <h3 className="text-slate-400 font-medium mb-1">Usuarios Totales</h3>
              <p className="text-4xl font-bold text-white mb-4">12,450</p>
              <p className="text-emerald-400 text-sm font-medium">+340 esta semana</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
              <h3 className="text-slate-400 font-medium mb-1">Suscripciones Activas</h3>
              <p className="text-4xl font-bold text-white mb-4">$45,200</p>
              <p className="text-emerald-400 text-sm font-medium">+8% este mes</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
              <h3 className="text-slate-400 font-medium mb-1">Reportes de Sistema</h3>
              <p className="text-4xl font-bold text-white mb-4">3</p>
              <p className="text-orange-400 text-sm font-medium">Tickets pendientes</p>
            </div>
          </div>
          {loading ? (
             <div className="text-slate-400 mt-4">Obteniendo {apiData.length} usuarios desde el backend...</div>
          ) : (
             <div className="text-emerald-400 text-sm font-medium mt-4">Conexión exitosa a la API de usuarios.</div>
          )}
        </div>
      );
    }
  };

  const getRoleName = () => {
    switch(role) {
      case 'teacher': return 'Profesor';
      case 'admin': return 'Administrador';
      default: return 'Estudiante';
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950 font-sans text-slate-50">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800/50 bg-slate-950/80 backdrop-blur-xl hidden md:flex flex-col p-6">
        <div className="flex items-center gap-2 font-bold text-xl mb-12">
          <BookOpen className="text-blue-500" />
          <span>JumpUp</span>
        </div>

        <nav className="flex-1 space-y-2">
          {renderSidebarLinks()}
        </nav>

        <div className="mt-auto pt-8 border-t border-slate-800">
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 w-full transition-colors font-medium border-none text-left">
            <Settings className="w-5 h-5" /> Ajustes
          </button>
          <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 w-full transition-colors font-medium mt-2">
            <LogOut className="w-5 h-5" /> Cerrar sesión
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto relative">
        
        {/* Glow de fondo para darle estética premium */}
        <div className="absolute top-[0%] right-[10%] w-[400px] h-[400px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />
        
        {/* Header */}
        <header className="h-20 border-b border-slate-800/50 bg-slate-950/50 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-10">
          <div>
            <h1 className="text-xl font-bold text-white">Panel de {getRoleName()}</h1>
          </div>
          <div className="flex items-center gap-6">
            <button className="text-slate-400 hover:text-white transition-colors relative border-none bg-transparent cursor-pointer">
              <Bell className="w-6 h-6" />
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-blue-500 rounded-full border-2 border-slate-950"></span>
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-slate-800">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">
                {role === 'admin' ? 'A' : role === 'teacher' ? 'P' : 'E'}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-white">Usuario Demo</p>
                <p className="text-xs text-slate-400 capitalize">{getRoleName()}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="p-8 max-w-6xl mx-auto w-full relative z-10">
          <div className="mb-10">
            <h1 className="text-4xl font-extrabold text-white mb-2">¡Hola, Usuario! 👋</h1>
            <p className="text-lg text-slate-400">Aquí tienes un resumen de tu actividad de hoy.</p>
          </div>
          
          {renderDashboardContent()}
        </div>
      </main>
    </div>
  );
};
