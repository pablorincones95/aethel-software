const phases = [
  {
    number: "01",
    label: "Fase Inicial",
    title: "Discovery & C4 Architecture",
    desc: "Modelado de dominios (DDD), especificaciones técnicas exhaustivas, diagramas de arquitectura C4 y benchmarks de latencia antes de escribir una sola línea.",
    deliverable: "Entregable: Technical RFC & Threat Model",
  },
  {
    number: "02",
    label: "Fase Diseño",
    title: "UX/UI & Design Systems",
    desc: "Sistemas de diseño atómicos con tokens sincronizados directamente a código TypeScript. Prototipos interactivos de alta fidelidad validados por stakeholders.",
    deliverable: "Entregable: Figma Tokens & Component Library",
  },
  {
    number: "03",
    label: "Fase Ejecución",
    title: "Iterative Sprints & QA",
    desc: "Ciclos bisemanales con cobertura de pruebas unitarias, de integración y end-to-end mayor al 90%. Revisión de código de 4 ojos y análisis estático SonarQube.",
    deliverable: "Entregable: Staging Deploy & CI/CD Reports",
  },
  {
    number: "04",
    label: "Fase Despliegue",
    title: "Enterprise Deployment",
    desc: "Lanzamiento Blue/Green o Canary con telemetría Prometheus/Grafana 24/7, tracing distribuido OpenTelemetry y soporte post-lanzamiento de ingenieros core.",
    deliverable: "Entregable: Production Telemetry & SLA 99.999%",
  },
]

export function Process() {
  return (
    <section className="process">
      <div className="process__inner">
        <div className="process__header">
          <span className="process__label">Gobernanza de Entrega</span>
          <h2 className="process__title">
            Protocolo y Metodología Aethel en 4 Fases
          </h2>
          <p className="process__subtitle">
            Un proceso sistemático de precisión militar que reduce drásticamente
            la incertidumbre técnica y asegura despliegues continuos sin
            fricciones.
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
