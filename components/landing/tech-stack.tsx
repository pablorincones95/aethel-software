const techItems = [
  { number: "01", name: "TypeScript", desc: "Lenguaje Núcleo" },
  { number: "02", name: "React & Next.js", desc: "Web & SSR" },
  { number: "03", name: "Angular", desc: "Web Empresarial" },
  { number: "04", name: "Node.js & NestJS", desc: "Backend Modular" },
  { number: "05", name: "React Native & Expo", desc: "Mobile Multiplataforma" },
  { number: "06", name: "PostgreSQL", desc: "Base de Datos" },
  { number: "07", name: "Vercel", desc: "Despliegue Frontend" },
  { number: "08", name: "AWS", desc: "Infraestructura Cloud" },
  { number: "09", name: "Railway", desc: "Hosting & PaaS" },
  { number: "10", name: "Docker", desc: "Contenedores" },
]

export function TechStack() {
  return (
    <section className="tech-stack" id="stack">
      <div className="tech-stack__inner">
        <div className="tech-stack__header">
          <div className="tech-stack__header-text">
            <span className="tech-stack__label">
              Stack Tecnológico
            </span>
            <h3 className="tech-stack__title">
              Las tecnologías que vibramos
            </h3>
          </div>
          <span className="tech-stack__tagline">
            TECNOLOGÍAS PROBADAS EN PRODUCCIÓN
          </span>
        </div>

        <div className="tech-stack__grid">
          {techItems.map((item) => (
            <div key={item.number} className="tech-stack__item">
              <span className="tech-stack__item-number">{item.number}</span>
              <div className="tech-stack__item-info">
                <span className="tech-stack__item-name">{item.name}</span>
                <span className="tech-stack__item-desc">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
