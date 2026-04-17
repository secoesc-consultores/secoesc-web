interface StatsProps {
  stats: any[];
}

export default function Stats({ stats }: StatsProps) {
  if (stats.length === 0) return null;

  return (
    <section className="py-16 bg-surface-lowest border-b border-outline-variant/10">
      <div className="px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat._id} className="p-6 bg-surface border border-outline-variant/30 rounded-xl transition-all hover:border-primary/50 group">
              <h3 className="text-primary text-4xl md:text-5xl font-black mb-2 font-headline tracking-tighter group-hover:scale-105 transition-transform origin-left">
                {stat.valor}
              </h3>
              <p className="text-[10px] font-black tracking-[0.2em] text-on-surface-variant uppercase">
                {stat.etiqueta}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}