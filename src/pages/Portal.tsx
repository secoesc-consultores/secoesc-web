import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, Key, Layout } from 'lucide-react';

export default function Portal() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-surface-lowest flex items-center justify-center p-8 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute inset-0 bg-blueprint opacity-[0.3]" />
      
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-[120px]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, type: 'spring' }}
        className="w-full max-w-lg glass p-12 md:p-16 rounded-[3rem] shadow-ambient relative z-10 border-primary/20"
      >
        <div className="text-center mb-12">
          <div className="w-20 h-20 glass border-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-premium group">
            <Lock className="text-primary w-10 h-10 group-hover:scale-110 transition-transform" />
          </div>
          <h1 className="text-4xl font-black text-on-surface font-headline mb-4 tracking-tighter">Portal de Clientes</h1>
          <p className="text-lg text-on-surface-variant font-medium opacity-80 italic">"Acceso seguro a sus proyectos y documentación técnica."</p>
        </div>

        <form className="space-y-8">
          <div className="flex flex-col gap-3">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Email</label>
            <div className="relative group">
              <Mail className="absolute left-0 top-1/2 -translate-y-1/2 text-primary/40 group-focus-within:text-primary transition-colors w-5 h-5" />
              <input className="w-full bg-transparent border-0 border-b-2 border-primary/20 focus:border-primary pl-10 pr-0 py-4 text-base transition-all outline-none font-medium text-on-surface placeholder:text-on-surface-variant/30" placeholder="cliente@empresa.com" type="email"/>
            </div>
          </div>
          
          <div className="flex flex-col gap-3">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Contraseña</label>
            <div className="relative group">
              <Key className="absolute left-0 top-1/2 -translate-y-1/2 text-primary/40 group-focus-within:text-primary transition-colors w-5 h-5" />
              <input className="w-full bg-transparent border-0 border-b-2 border-primary/20 focus:border-primary pl-10 pr-0 py-4 text-base transition-all outline-none font-medium text-on-surface placeholder:text-on-surface-variant/30" placeholder="••••••••" type="password"/>
            </div>
          </div>

          {isLogin && (
            <div className="flex justify-between items-center text-xs">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" className="rounded-md border-primary/30 text-primary focus:ring-primary bg-transparent" />
                <span className="text-on-surface-variant font-bold group-hover:text-primary transition-colors uppercase tracking-widest text-[9px]">Recordarme</span>
              </label>
              <a href="#" className="text-primary hover:text-primary-dim font-black uppercase tracking-widest text-[9px] decoration-primary/20 decoration-2 underline-offset-4 hover:underline">¿Olvidó su contraseña?</a>
            </div>
          )}

          <button className="w-full bg-primary text-on-surface py-5 rounded-2xl text-xs font-black uppercase tracking-[0.3em] shadow-premium hover:shadow-ambient hover:bg-primary-dim transition-all duration-300 mt-6" type="button">
            {isLogin ? 'Iniciar Sesión' : 'Solicitar Acceso'}
          </button>
        </form>

        <div className="mt-12 text-center">
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">
            {isLogin ? '¿No tiene cuenta?' : '¿Ya tiene cuenta?'}
            <button 
              onClick={() => setIsLogin(!isLogin)} 
              className="text-primary font-black ml-3 hover:text-primary-dim transition-colors decoration-primary/20 decoration-2 underline-offset-8 hover:underline"
            >
              {isLogin ? 'Solicitar acceso' : 'Iniciar sesión'}
            </button>
          </p>
        </div>
      </motion.div>
      
      {/* Decorative Element */}
      <div className="absolute bottom-10 right-10 flex items-center gap-2 opacity-20">
        <Layout className="w-5 h-5" />
        <span className="text-[10px] font-black uppercase tracking-[0.5em]">SECOESC DIGITAL SYSTEM</span>
      </div>
    </div>
  );
}