const defaultTechItems = [
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

interface TechStackProps {
  content?: Record<string, unknown>
}

export function TechStack({ content }: TechStackProps) {
  const label = (content?.label as string) || "Stack Tecnológico"
  const title = (content?.title as string) || "Las tecnologías que vibramos"
  const tagline = (content?.subtitle as string) || "TECNOLOGÍAS PROBADAS EN PRODUCCIÓN"

  const items =
    Array.isArray(content?.items) && content.items.length > 0
      ? (content.items as Record<string, unknown>[]).map((item, index) => ({
          number: (item.number as string) || `0${index + 1}`,
          name: (item.name as string) || "",
          desc: (item.desc as string) || "",
        }))
      : defaultTechItems

  return (
    <section className="tech-stack" id="stack">
      <div className="tech-stack__inner">
        <div className="tech-stack__header">
          <div className="tech-stack__header-text">
            <span className="tech-stack__label">{label}</span>
            <h3 className="tech-stack__title">{title}</h3>
          </div>
          <span className="tech-stack__tagline">{tagline}</span>
        </div>

        <div className="tech-stack__grid">
          {items.map((item) => (
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
