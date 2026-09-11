import { Web, Devices, CloudSync, Hub } from "./icons"

const services = [
  {
    number: "01 // SAAS & WEB",
    icon: Web,
    title: "Desarrollo Web & SaaS Enterprise",
    desc: "Plataformas reactivas ultrarrápidas con Next.js, React, Node.js y NestJS. Arquitecturas modulares serverless, SSR y micro-frontends de alta disponibilidad.",
    tags: ["Next.js", "NestJS", "Turborepo"],
  },
  {
    number: "02 // MOBILE",
    icon: Devices,
    title: "Desarrollo Mobile Avanzado",
    desc: "Apps multiplataforma fluidas a 120 FPS, sincronización offline-first y puentes nativos en C++/Rust integrados en React Native para rendimiento extremo.",
    tags: ["React Native", "WatermelonDB", "JSI/C++"],
  },
  {
    number: "03 // INFRAESTRUCTURA",
    icon: CloudSync,
    title: "Arquitectura Cloud & DevOps",
    desc: "Infraestructura elástica multi-región en AWS, orquestación Kubernetes (EKS), Docker y pipelines CI/CD automatizados con políticas de despliegue blue/green.",
    tags: ["AWS EKS", "Terraform", "ArgoCD"],
  },
  {
    number: "04 // INTEGRACIONES",
    icon: Hub,
    title: "APIs & Concurrencia Crítica",
    desc: "Microservicios distribuidos mediante gRPC y GraphQL federado, pasarelas de cobro con idempotencia matemática y streaming de eventos masivo con Apache Kafka.",
    tags: ["Kafka", "gRPC", "Postgres ACID"],
  },
]

export function Services() {
  return (
    <section className="services" id="arquitecturas">
      <div className="services__inner">
        <div className="services__header">
          <div className="services__header-text">
            <span className="services__label">
              Capacidades de Misión Crítica
            </span>
            <h2 className="services__title">
              Servicios Especializados de Ingeniería
            </h2>
          </div>
          <p className="services__subtitle">
            Diseño riguroso y construcción de soluciones a gran escala para
            ecosistemas donde el downtime y la latencia son inaceptables.
          </p>
        </div>

        <div className="services__grid">
          {services.map((service) => (
            <div key={service.number} className="services__card">
              <div>
                <div className="services__card-header">
                  <span className="services__card-number">{service.number}</span>
                  <div className="services__card-icon">
                    <service.icon />
                  </div>
                </div>
                <h3 className="services__card-title">{service.title}</h3>
                <p className="services__card-desc">{service.desc}</p>
              </div>
              <div className="services__card-tags">
                {service.tags.map((tag) => (
                  <span key={tag} className="services__tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
