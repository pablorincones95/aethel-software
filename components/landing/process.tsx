const defaultPhases = [
  {
    number: "01",
    label: "Fase Inicial",
    title: "Kickoff & Definición",
    desc: "Entendemos tu negocio, objetivos y restricciones. Definimos alcance, requerimientos y una hoja de ruta realista con prioridades claras antes de escribir código.",
    deliverable: "Entregable: Plan de proyecto & Roadmap de alcance",
  },
  {
    number: "02",
    label: "Fase Diseño",
    title: "Diseño & Prototipo",
    desc: "Diseñamos la experiencia y definimos las decisiones técnicas junto a tu equipo. Prototipos para validar antes de construir, integrando el diseño que ya tengas.",
    deliverable: "Entregable: Prototipo interactivo & Arquitectura técnica",
  },
  {
    number: "03",
    label: "Fase Ejecución",
    title: "Desarrollo & Calidad",
    desc: "Desarrollo por iteraciones cortas con revisión de código y pruebas continuas. Despliegues en entorno de staging para que veas el progreso en todo momento.",
    deliverable: "Entregable: Versión funcional en staging & demos periódicas",
  },
  {
    number: "04",
    label: "Fase Entrega",
    title: "Producción & Soporte",
    desc: "Despliegue a producción, monitorización y documentación para tu equipo. Acompañamiento post-lanzamiento para seguir mejorando.",
    deliverable: "Entregable: Estrategia en producción & Soporte post-lanzamiento",
  },
]

interface ProcessProps {
  content?: Record<string, unknown>
}

export function Process({ content }: ProcessProps) {
  const label = (content?.label as string) || "Gobernanza de Entrega"
  const title = (content?.title as string) || "Protocolo y Metodología Aethel en 4 Fases"
  const subtitle =
    (content?.subtitle as string) ||
    "Un proceso claro y colaborativo, pensado para empresas reales: sin incertidumbre, con etapas definidas y entregables concretos en cada fase."

  const phases =
    Array.isArray(content?.phases) && content.phases.length > 0
      ? (content.phases as Record<string, unknown>[]).map((phase, index) => ({
          number: (phase.number as string) || `0${index + 1}`,
          label: (phase.label as string) || defaultPhases[index % defaultPhases.length]?.label || "Fase",
          title: (phase.title as string) || "",
          desc: (phase.desc as string) || "",
          deliverable:
            (phase.deliverable as string) ||
            defaultPhases[index % defaultPhases.length]?.deliverable ||
            "Entregable técnico garantizado",
        }))
      : defaultPhases

  return (
    <section className="process" id="metodologia">
      <div className="process__inner">
        <div className="process__header">
          <span className="process__label">{label}</span>
          <h2 className="process__title">{title}</h2>
          <p className="process__subtitle">{subtitle}</p>
        </div>

        <div className="process__timeline">
          <div className="process__connector" />
          {phases.map((phase) => (
            <div key={phase.number} className="process__phase">
              <div
                className={`process__phase-number ${
                  phase.number === "04" ? "process__phase-number--gold" : ""
                }`}
              >
                {phase.number}
              </div>
              <span className="process__phase-label">{phase.label}</span>
              <h3 className="process__phase-title">{phase.title}</h3>
              <p className="process__phase-desc">{phase.desc}</p>
              <span className="process__phase-deliverable">
                {phase.deliverable}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
