const techItems = [
  { number: "01", name: "TypeScript", desc: "Strict Core Typing" },
  { number: "02", name: "React / Next.js", desc: "SSR Architecture" },
  { number: "03", name: "Node & NestJS", desc: "Enterprise Backend" },
  { number: "04", name: "React Native", desc: "120 FPS Mobile" },
  { number: "05", name: "AWS Cloud", desc: "Multi-Region Infra" },
  { number: "06", name: "Kubernetes / EKS", desc: "Orchestration Mesh" },
  { number: "07", name: "PostgreSQL", desc: "ACID Partitioning" },
  { number: "08", name: "Redis In-Memory", desc: "Sub-Millisecond Cache" },
  { number: "09", name: "Apache Kafka", desc: "Event Streaming" },
  { number: "10", name: "gRPC & GraphQL", desc: "Protocol Buffers" },
]

export function TechStack() {
  return (
    <section className="tech-stack">
      <div className="tech-stack__inner">
        <div className="tech-stack__header">
          <div className="tech-stack__header-text">
            <span className="tech-stack__label">
              Stack Tecnológico Maestro
            </span>
            <h3 className="tech-stack__title">
              Herramientas & Runtimes Certificados
            </h3>
          </div>
          <span className="tech-stack__tagline">
            ZERO-ABSTRACTION DEBT // HIGH REPRODUCIBILITY
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
