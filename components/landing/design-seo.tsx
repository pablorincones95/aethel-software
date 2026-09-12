import { Palette, TrendingUp } from "./icons"

const designSeoServices = [
  {
    number: "05 // DISEÑO",
    icon: Palette,
    title: "Diseño UX/UI & Design Systems",
    desc: "Sistemas de diseño atómicos con tokens sincronizados directamente a código TypeScript. Prototipos interactivos de alta fidelidad y arquitectura de información validada con métricas de usabilidad reales.",
    tags: ["Figma", "Design Tokens", "Prototyping"],
    accent: "design-seo__card-icon--cyan",
  },
  {
    number: "06 // SEO TÉCNICO",
    icon: TrendingUp,
    title: "SEO Técnico & Performance",
    desc: "Auditorías técnicas de posicionamiento, optimización completa de Core Web Vitals, schema markup, arquitectura de contenido SEO y mejoras de rendimiento web end-to-end para máxima visibilidad orgánica.",
    tags: ["Core Web Vitals", "Schema.org", "Lighthouse"],
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
            Complementamos la ingeniería con diseño de producto de alta
            fidelidad y estrategia de posicionamiento técnico que maximiza el
            alcance y la conversión orgánica.
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