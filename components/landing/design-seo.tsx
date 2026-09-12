import { Palette, TrendingUp } from "./icons"

const designSeoServices = [
  {
    number: "05 // DISEÑO",
    icon: Palette,
    title: "Diseño UX/UI",
    desc: "Diseño de producto centrado en el usuario: recorridos, interfaces y sistemas de diseño. Si tu equipo ya cuenta con diseño, lo integramos; si no, lo creamos desde cero.",
    tags: ["UX/UI", "Design Systems", "Prototipos"],
    accent: "design-seo__card-icon--cyan",
  },
  {
    number: "06 // SEO TÉCNICO",
    icon: TrendingUp,
    title: "SEO Técnico & Optimización Web",
    desc: "Posicionamiento orgánico real: Core Web Vitals, datos estructurados, arquitectura de información y auditorías de performance.",
    tags: ["Core Web Vitals", "Schema.org", "Performance"],
    accent: "design-seo__card-icon--gold",
  },
]

export function DesignSeo() {
  return (
    <section className="design-seo" id="diseño-crecimiento">
      <div className="design-seo__inner">
        <div className="design-seo__header">
          <div className="design-seo__header-text">
            <span className="design-seo__label">
              Diseño y Crecimiento Digital
            </span>
            <h2 className="design-seo__title">
              Diseño de Producto & SEO Técnico
            </h2>
          </div>
          <p className="design-seo__subtitle">
            Complementamos la ingeniería con diseño de producto centrado en el
            usuario y posicionamiento técnico que maximiza el alcance y la
            conversión orgánica.
          </p>
        </div>

        <div className="design-seo__grid">
          {designSeoServices.map((service) => (
            <div key={service.number} className="design-seo__card">
              <div>
                <div className="design-seo__card-header">
                  <span className="design-seo__card-number">
                    {service.number}
                  </span>
                  <div
                    className={`design-seo__card-icon ${service.accent}`}
                  >
                    <service.icon />
                  </div>
                </div>
                <h3 className="design-seo__card-title">{service.title}</h3>
                <p className="design-seo__card-desc">{service.desc}</p>
              </div>
              <div className="design-seo__card-tags">
                {service.tags.map((tag) => (
                  <span key={tag} className="design-seo__tag">
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