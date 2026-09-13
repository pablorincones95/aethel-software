import { Sparkles, Verified, Engineering } from "./icons"

const defaultAiServices = [
  {
    number: "07 // INGENIERÍA AUMENTADA",
    icon: Sparkles,
    title: "Desarrollo asistido por IA",
    desc: "Trabajamos con asistentes de IA en código, revisión y testing dentro de nuestro flujo de desarrollo, con la supervisión de un ingeniero en cada paso.",
    tags: ["IA en código", "Testing", "Revisión"],
    accent: "ai-services__card-icon--cyan",
  },
  {
    number: "08 // REVISIÓN HUMANA",
    icon: Verified,
    title: "Cada entrega revisada por un ingeniero",
    desc: "Todo lo generado con IA pasa por un ingeniero senior antes de llegar a producción. Datos y cambios con garantía, sin cajas negras.",
    tags: ["Code Review", "QA", "Control"],
    accent: "ai-services__card-icon--gold",
  },
  {
    number: "09 // IA CON CRITERIO",
    icon: Engineering,
    title: "IA donde aporta, escalando contigo",
    desc: "Aplicamos IA donde acelera con calidad garantizada, no por moda. El criterio de un equipo senior decide dónde tiene sentido y dónde no.",
    tags: ["Eficiencia", "Calidad", "Escalamiento"],
    accent: "ai-services__card-icon--cyan",
  },
]

const icons = [Sparkles, Verified, Engineering]

interface AiServicesProps {
  content?: Record<string, unknown>
}

export function AiServices({ content }: AiServicesProps) {
  const label = (content?.label as string) || "Ingeniería con IA"
  const title = (content?.title as string) || "IA Integrada en Nuestro Proceso de Desarrollo"
  const subtitle =
    (content?.subtitle as string) ||
    "Usamos inteligencia artificial como herramienta interna de ingeniería para construir más rápido y con más calidad — siempre con revisión humana."

  const items =
    Array.isArray(content?.cards) && content.cards.length > 0
      ? (content.cards as Record<string, unknown>[]).map((card, index) => ({
          number: (card.number as string) || `0${index + 7} // IA`,
          icon: icons[index % icons.length] || Sparkles,
          title: (card.title as string) || "",
          desc: (card.desc as string) || "",
          tags: Array.isArray(card.tags)
            ? (card.tags as string[])
            : typeof card.tags === "string"
            ? (card.tags as string).split(",").map((t) => t.trim())
            : [],
          accent:
            index % 2 === 0
              ? "ai-services__card-icon--cyan"
              : "ai-services__card-icon--gold",
        }))
      : defaultAiServices

  return (
    <section className="ai-services" id="ia">
      <div className="ai-services__inner">
        <div className="ai-services__header">
          <div className="ai-services__header-text">
            <span className="ai-services__label">{label}</span>
            <h2 className="ai-services__title">{title}</h2>
          </div>
          <p className="ai-services__subtitle">{subtitle}</p>
        </div>

        <div className="ai-services__grid">
          {items.map((service) => (
            <div key={service.title} className="ai-services__card">
              <div>
                <div className="ai-services__card-header">
                  <span className="ai-services__card-number">
                    {service.number}
                  </span>
                  <div className={`ai-services__card-icon ${service.accent}`}>
                    <service.icon />
                  </div>
                </div>
                <h3 className="ai-services__card-title">{service.title}</h3>
                <p className="ai-services__card-desc">{service.desc}</p>
              </div>
              <div className="ai-services__card-tags">
                {service.tags.map((tag) => (
                  <span key={tag} className="ai-services__tag">
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
