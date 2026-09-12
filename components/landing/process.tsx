const phases = [
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

export function Process() {
  return (
    <section className="process" id="metodologia">
      <div className="process__inner">
        <div className="process__header">
          <span className="process__label">Gobernanza de Entrega</span>
          <h2 className="process__title">
            Protocolo y Metodología Aethel en 4 Fases
          </h2>
          <p className="process__subtitle">
            Un proceso claro y colaborativo, pensado para empresas reales: sin
            incertidumbre, con etapas definidas y entregables concretos en cada
            fase.
          </p>
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
