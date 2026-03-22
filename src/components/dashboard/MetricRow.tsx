import MetricItem from './MetricItem';

const metrics = [
  { value: '50k+', label: 'Entrevistas realizadas' },
  { value: '94%', label: 'Taxa de aprovação' },
  { value: '200+', label: 'Tipos de entrevistas' },
  { value: '4.9', label: 'Avaliação média' },
];

export default function MetricsRow() {
  return (
    <section className="border-y border-slate-900 bg-slate-950/50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {metrics.map((metric, index) => (
            <MetricItem 
              key={index} 
              value={metric.value} 
              label={metric.label} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}