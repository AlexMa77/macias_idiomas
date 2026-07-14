import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, ArrowLeft, Mail, Lock, User, ShieldCheck } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{type: 'success'|'error', text: string} | null>(null);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    
    // Simular registro exitoso
    setTimeout(() => {
      setLoading(false);
      setMessage({ type: 'success', text: '¡Cuenta creada con éxito! Redirigiendo al panel...' });
      setTimeout(() => {
        navigate('/dashboard?role=student');
      }, 1500);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen font-sans bg-slate-950 text-slate-50">
      {/* Panel Izquierdo: Formulario */}
      <div className="w-full lg:w-1/2 flex flex-col px-8 py-8 md:px-24 relative z-10 bg-slate-950/80 backdrop-blur-xl border-r border-slate-800/50">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
        
        <div className="mb-8 relative z-10">
          <Link to="/" className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Volver al inicio
          </Link>
        </div>

        <div className="flex items-center gap-2 font-bold text-2xl mb-12 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-emerald-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Sparkles size={20} className="text-white" />
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">JumpUp Idiomas</span>
        </div>

        <div className="max-w-md w-full animate-in fade-in slide-in-from-bottom-4 duration-500 relative z-10">
          <h1 className="text-4xl font-extrabold text-white mb-3 tracking-tight">Comienza tu viaje</h1>
          <p className="text-slate-400 mb-8 text-lg">
            ¿Ya tienes una cuenta? <Link to="/login" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">Inicia sesión aquí</Link>
          </p>

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Nombre completo</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="Ej. Juan Pérez" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required 
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
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
                  placeholder="Crea una contraseña segura" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              <p className="text-xs text-slate-500 mt-2">Debe contener al menos 8 caracteres, números y símbolos.</p>
            </div>

            {message && (
              <div className={`p-4 rounded-xl text-sm font-medium animate-in fade-in flex items-start gap-3 border ${message.type === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-green-500/10 border-green-500/20 text-green-400'}`}>
                {message.type === 'success' && <ShieldCheck className="w-5 h-5 flex-shrink-0" />}
                {message.text}
              </div>
            )}

            <Button type="submit" className="w-full h-12 text-base mt-4 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all border-none font-bold" disabled={loading}>
              {loading ? 'Creando cuenta...' : 'Registrarme ahora'}
            </Button>
          </form>
        </div>
      </div>

      {/* Panel Derecho */}
      <div className="hidden lg:flex w-1/2 bg-slate-950 relative items-center justify-center p-12 overflow-hidden">
        {/* Decoración de fondo */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-900/30 via-slate-950 to-slate-950 pointer-events-none" />
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-emerald-600/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
        
        <div className="relative z-10 text-center max-w-lg">
          <div className="mb-10 flex justify-center">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-blue-500/20 to-emerald-500/20 backdrop-blur-xl border border-white/10 flex items-center justify-center p-1 shadow-2xl">
              <div className="w-full h-full rounded-2xl bg-slate-900/80 flex items-center justify-center">
                <Sparkles className="w-10 h-10 text-emerald-400" />
              </div>
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-[1.1] tracking-tight">
            Únete a una comunidad global.
          </h2>
          <p className="text-lg text-slate-400 mb-12 leading-relaxed">
            Obtén acceso inmediato a todos los niveles de aprendizaje, tutores interactivos con IA y certificados internacionales.
          </p>
          
          <div className="grid grid-cols-2 gap-6 text-left">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 group hover:bg-white/10 transition-colors">
              <div className="text-3xl font-black text-emerald-400 mb-2 group-hover:scale-110 origin-left transition-transform duration-500">Free</div>
              <div className="text-sm text-slate-300 font-medium">Prueba gratuita de 7 días</div>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 group hover:bg-white/10 transition-colors">
              <div className="text-3xl font-black text-blue-400 mb-2 group-hover:scale-110 origin-left transition-transform duration-500">IA</div>
              <div className="text-sm text-slate-300 font-medium">Corrección en tiempo real</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
