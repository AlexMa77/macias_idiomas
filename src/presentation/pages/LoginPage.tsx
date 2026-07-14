import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowLeft, Mail, Lock, ShieldCheck, KeyRound, User, GraduationCap, Briefcase } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const LoginPage: React.FC = () => {
  const [role, setRole] = useState<'student' | 'teacher' | 'admin'>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{type: 'success'|'error', text: string} | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setPreviewUrl(null);
    
    setTimeout(() => {
      setLoading(false);
      setMessage({ type: 'success', text: `¡Sesión iniciada como ${role}! Redirigiendo...` });
      setTimeout(() => {
        window.location.href = `/dashboard?role=${role}`;
      }, 1000);
    }, 1500);
  };

  const handleRecover = async () => {
    if (!email) {
      setMessage({ type: 'error', text: 'Por favor, ingresa tu correo primero.' });
      return;
    }
    setLoading(true);
    setMessage(null);
    setPreviewUrl(null);

    try {
      const response = await fetch('http://localhost:3001/api/recover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      
      setLoading(false);
      if (response.ok) {
        setMessage({ type: 'success', text: 'Se ha enviado un código a tu correo electrónico. Revisa tu bandeja de entrada o spam.' });
        if (data.previewUrl) {
          setPreviewUrl(data.previewUrl);
        }
      } else {
        setMessage({ type: 'error', text: data.error || 'Ocurrió un error al enviar el correo.' });
      }
    } catch (error) {
      setLoading(false);
      setMessage({ type: 'error', text: 'Error de red. Asegúrate de que el servidor local esté corriendo.' });
    }
  };

  return (
    <div className="flex min-h-screen font-sans bg-slate-950 text-slate-50">
      {/* Panel Izquierdo: Formulario */}
      <div className="w-full lg:w-1/2 flex flex-col px-8 py-8 md:px-24 relative z-10 bg-slate-950/80 backdrop-blur-xl border-r border-slate-800/50">
        
        {/* Textura de fondo sutil */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
        
        <div className="mb-12 relative z-10">
          <Link to="/" className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Volver al inicio
          </Link>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <div className="flex items-center gap-2 font-bold text-2xl mb-12 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Sparkles size={20} className="text-white" />
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">JumpUp Idiomas</span>
          </div>

          <div className="max-w-md w-full animate-in fade-in slide-in-from-bottom-4 duration-500 relative z-10">
            <h1 className="text-4xl font-extrabold text-white mb-3 tracking-tight">Bienvenido de vuelta</h1>
            <p className="text-slate-400 mb-8 text-lg">
              ¿No tienes una cuenta? <Link to="/register" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">Regístrate gratis</Link>
            </p>

            <form onSubmit={handleLogin} className="space-y-5">
              
              {/* Selector de Rol */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <button type="button" onClick={() => setRole('student')} className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${role === 'student' ? 'border-blue-500 bg-blue-500/10 text-blue-400' : 'border-slate-800 bg-slate-900/50 text-slate-500 hover:border-slate-700 hover:text-slate-300'}`}>
                  <User className="w-5 h-5 mb-1" />
                  <span className="text-xs font-semibold">Estudiante</span>
                </button>
                <button type="button" onClick={() => setRole('teacher')} className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${role === 'teacher' ? 'border-purple-500 bg-purple-500/10 text-purple-400' : 'border-slate-800 bg-slate-900/50 text-slate-500 hover:border-slate-700 hover:text-slate-300'}`}>
                  <GraduationCap className="w-5 h-5 mb-1" />
                  <span className="text-xs font-semibold">Profesor</span>
                </button>
                <button type="button" onClick={() => setRole('admin')} className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${role === 'admin' ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400' : 'border-slate-800 bg-slate-900/50 text-slate-500 hover:border-slate-700 hover:text-slate-300'}`}>
                  <Briefcase className="w-5 h-5 mb-1" />
                  <span className="text-xs font-semibold">Admin</span>
                </button>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Correo electrónico</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input 
                    type="email" 
                    placeholder="estudiante@correo.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Contraseña</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="w-4 h-4 rounded border border-slate-700 bg-slate-900/50 group-hover:border-blue-500 transition-colors flex items-center justify-center">
                    <input type="checkbox" className="opacity-0 absolute" />
                    <ShieldCheck className="w-3 h-3 text-transparent group-hover:text-blue-500 transition-colors" />
                  </div>
                  <span className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors">Recordarme</span>
                </label>
                <button type="button" onClick={handleRecover} className="text-xs text-blue-400 font-semibold hover:text-blue-300 transition-colors">
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              {message && (
                <div className={`p-4 rounded-xl text-sm font-medium animate-in fade-in flex flex-col gap-2 border ${message.type === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-green-500/10 border-green-500/20 text-green-400'}`}>
                  <div className="flex items-start gap-3">
                    {message.type === 'success' ? <ShieldCheck className="w-5 h-5 flex-shrink-0" /> : <KeyRound className="w-5 h-5 flex-shrink-0" />}
                    {message.text}
                  </div>
                  {previewUrl && (
                    <a href={previewUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                      Ver correo de prueba generado
                    </a>
                  )}
                </div>
              )}

              <Button type="submit" className="w-full h-12 text-base mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-all border-none font-bold" disabled={loading}>
                {loading ? 'Procesando...' : 'Ingresar a la plataforma'}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Panel Derecho */}
      <div className="hidden lg:flex w-1/2 bg-slate-950 relative items-center justify-center p-12 overflow-hidden">
        {/* Decoración de fondo */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900/30 via-slate-950 to-purple-900/30 pointer-events-none" />
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
        
        <div className="relative z-10 text-center max-w-lg">
          <div className="mb-10 flex justify-center">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-blue-500/20 to-purple-500/20 backdrop-blur-xl border border-white/10 flex items-center justify-center p-1 shadow-2xl">
              <div className="w-full h-full rounded-2xl bg-slate-900/80 flex items-center justify-center">
                <Sparkles className="w-10 h-10 text-blue-400" />
              </div>
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-[1.1] tracking-tight">
            Tu viaje hacia el dominio comienza aquí.
          </h2>
          <p className="text-lg text-slate-400 mb-12 leading-relaxed">
            Accede a tu panel, retoma tus lecciones y continúa construyendo tu futuro con la guía de nuestros expertos y tecnología IA de vanguardia.
          </p>
          
          <div className="grid grid-cols-2 gap-6 text-left">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
              <div className="text-3xl font-black text-blue-400 mb-1">+50</div>
              <div className="text-sm text-slate-300 font-medium">Cursos interactivos</div>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
              <div className="text-3xl font-black text-purple-400 mb-1">10k</div>
              <div className="text-sm text-slate-300 font-medium">Estudiantes activos</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
