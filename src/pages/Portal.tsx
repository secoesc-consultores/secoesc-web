import { useState } from 'react';

export default function Portal() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-surface-container-low flex items-center justify-center p-8 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-xl relative z-10 border border-slate-100">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-primary text-3xl">lock</span>
          </div>
          <h1 className="text-2xl font-bold text-on-surface font-headline mb-2">Portal de Clientes</h1>
          <p className="text-sm text-on-surface-variant">Acceso seguro a sus proyectos y documentos.</p>
        </div>

        <form className="space-y-6">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Email</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-0 top-1/2 -translate-y-1/2 text-slate-400 text-lg">mail</span>
              <input className="w-full bg-transparent border-0 border-b-2 border-outline focus:ring-0 focus:border-primary pl-8 pr-0 py-2 text-sm transition-all outline-none" placeholder="cliente@empresa.com" type="email"/>
            </div>
          </div>
          
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Contraseña</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-0 top-1/2 -translate-y-1/2 text-slate-400 text-lg">key</span>
              <input className="w-full bg-transparent border-0 border-b-2 border-outline focus:ring-0 focus:border-primary pl-8 pr-0 py-2 text-sm transition-all outline-none" placeholder="••••••••" type="password"/>
            </div>
          </div>

          {isLogin && (
            <div className="flex justify-between items-center text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-slate-300 text-primary focus:ring-primary" />
                <span className="text-slate-600">Recordarme</span>
              </label>
              <a href="#" className="text-primary hover:underline font-semibold">¿Olvidó su contraseña?</a>
            </div>
          )}

          <button className="w-full bg-primary text-on-primary py-3.5 rounded-lg text-sm font-bold uppercase tracking-widest shadow-md hover:shadow-lg hover:bg-primary-dim transition-all mt-4" type="button">
            {isLogin ? 'Iniciar Sesión' : 'Solicitar Acceso'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-xs text-slate-500">
            {isLogin ? '¿No tiene cuenta?' : '¿Ya tiene cuenta?'}
            <button 
              onClick={() => setIsLogin(!isLogin)} 
              className="text-primary font-bold ml-2 hover:underline"
            >
              {isLogin ? 'Solicitar acceso' : 'Iniciar sesión'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}