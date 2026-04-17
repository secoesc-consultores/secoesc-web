import { motion } from 'framer-motion';

interface StatsProps {
  stats: any[];
}

export default function Stats({ stats }: StatsProps) {
  if (stats.length === 0) return null;

  return (
    <section className="py-20 bg-surface-lowest border-b border-outline-variant/10 relative overflow-hidden">
      {/* Detalle decorativo técnico */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-outline-variant/30 to-transparent" />
      
      <div className="px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 auto-rows-fr">
          {stats.map((stat, i) => (
            <motion.div 
              key={stat._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-8 bg-surface border border-outline-variant/30 rounded-xl transition-all hover:border-primary/50 group shadow-sm hover:shadow-premium"
            >
              <h3 className="text-primary text-4xl md:text-6xl font-black mb-3 font-headline tracking-tighter group-hover:scale-105 transition-transform origin-left">
                {stat.valor}
              </h3>
              <p className="text-[11px] font-black tracking-[0.2em] text-on-surface-variant uppercase">
                {stat.etiqueta}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}