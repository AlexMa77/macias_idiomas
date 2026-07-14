import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { Button } from '../ui/Button';

export const Navbar: React.FC = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-slate-100 shadow-sm sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-2 text-blue-600 font-bold text-xl">
        <BookOpen size={28} className="text-blue-600" />
        <span>JumpUp Idiomas</span>
      </Link>
      
      <div className="flex items-center gap-4">
        <Link to="/login">
          <Button variant="ghost" className="font-semibold text-slate-600">Iniciar Sesión</Button>
        </Link>
        <Link to="/login">
          <Button className="font-semibold shadow-md bg-blue-600 hover:bg-blue-700">Registrarse</Button>
        </Link>
      </div>
    </nav>
  );
};
