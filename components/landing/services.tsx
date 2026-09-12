import { Web, Devices, CloudSync, Hub } from "./icons"

const services = [
  {
    number: "01 // WEB & SAAS",
    icon: Web,
    title: "Desarrollo Web & SaaS",
    desc: "Plataformas y aplicaciones web con Next.js, React, Angular y Node.js: arquitecturas modulares, serverless y preparadas para escalar.",
    tags: ["Next.js", "React", "Angular", "Node.js"],
  },
  {
    number: "02 // MOBILE",
    icon: Devices,
    title: "Aplicaciones Móviles",
    desc: "Apps multiplataforma fluidas en React Native con Expo, sincronización offline y experiencia de usuario pulida en iOS y Android.",
    tags: ["React Native", "Expo", "TypeScript"],
  },
  {
    number: "03 // CLOUD & DEVOPS",
    icon: CloudSync,
    title: "Infraestructura & Despliegue",
    desc: "Despliegues automatizados en Vercel, AWS y Railway, con pipelines CI/CD, contenedores Docker y entornos preparados para producción.",
    tags: ["Vercel", "AWS", "Railway", "Docker"],
  },
  {
    number: "04 // APIs & SISTEMAS",
    icon: Hub,
    title: "APIs y Sistemas Distribuidos",
    desc: "APIs, microservicios y bases de datos con Node.js y PostgreSQL.",
    tags: ["Node.js", "PostgreSQL"],
  },
]

export function Services() {
  return (
    <section className="services" id="arquitecturas">
      <div className="services__inner">
        <div className="services__header">
          <div className="services__header-text">
            <span className="services__label">
              Ingeniería a Medida
            </span>
            <h2 className="services__title">
              Servicios Especializados de Ingeniería
            </h2>
          </div>
          <p className="services__subtitle">
            Diseño y construcción de soluciones a medida para productos
            digitales exigentes, desde la idea hasta la operación en producción.
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
