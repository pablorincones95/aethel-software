import { Shield, SyncProblem, EnhancedEncryption, Engineering } from "./icons"

const defaultPillars = [
  {
    icon: Shield,
    iconColor: "philosophy__pillar-icon--cyan",
    title: "Código Inmune & Type-Safe",
    desc: "Políticas de tipado inviolables, cero `any` tolerados y testing estricto con validaciones formales para blindar cada release.",
  },
  {
    icon: SyncProblem,
    iconColor: "philosophy__pillar-icon--gold",
    title: "Tolerancia Extrema a Fallos",
    desc: "Circuit breakers, fallbacks automáticos, idempotencia en transacciones y replicación cross-region continua sin downtime.",
  },
  {
    icon: EnhancedEncryption,
    iconColor: "philosophy__pillar-icon--cyan",
    title: "Seguridad Aplicada",
    desc: "Seguridad integrada en cada entrega: credenciales y datos protegidos, dependencias auditadas y revisiones constantes durante el desarrollo.",
  },
  {
    icon: Engineering,
    iconColor: "philosophy__pillar-icon--gold",
    title: "Trato Directo con Principal Architects",
    desc: "Sin intermediarios ni account managers sin perfil técnico. Te comunicas en tiempo real directamente con quienes diseñan el sistema.",
  },
]

const icons = [Shield, SyncProblem, EnhancedEncryption, Engineering]

interface PhilosophyProps {
  content?: Record<string, unknown>
}

export function Philosophy({ content }: PhilosophyProps) {
  const label = (content?.label as string) || "El Enfoque Atelier"
  const title =
    (content?.title as string) || "Ingeniería sin Concesiones. Sin Capas Burocráticas."
  const quote =
    (content?.quote as string) ||
    "La elegancia en el software no es decoración visual; es la ausencia total de deuda técnica oculta, la velocidad de ejecución determinista y la resiliencia absoluta bajo máxima presión operativa."

  const pillars =
    Array.isArray(content?.pillars) && content.pillars.length > 0
      ? (content.pillars as Record<string, unknown>[]).map((pillar, index) => ({
          icon: icons[index % icons.length] || Shield,
          iconColor:
            index % 2 === 0
              ? "philosophy__pillar-icon--cyan"
              : "philosophy__pillar-icon--gold",
          title: (pillar.title as string) || "",
          desc: (pillar.desc as string) || "",
        }))
      : defaultPillars

  return (
    <section className="philosophy">
      <div className="philosophy__inner">
        <div className="philosophy__grid">
          {/* Left: Manifesto */}
          <div className="philosophy__manifesto">
            <span className="philosophy__label">{label}</span>
            <h2 className="philosophy__title">{title}</h2>
            <p className="philosophy__text">
              Rechazamos las fórmulas de las consultoras genéricas masivas. En
              Aethel operamos como un atelier de software de alta gama: equipos
              compactos formados exclusivamente por ingenieros senior y
              arquitectos de soluciones de primer nivel.
            </p>
            <div className="philosophy__quote">
              <p className="philosophy__quote-text">&ldquo;{quote}&rdquo;</p>
              <span className="philosophy__quote-author">
                — Aethel Engineering Principles / Manifesto
              </span>
            </div>
          </div>

          {/* Right: Pillars */}
          <div className="philosophy__pillars">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="philosophy__pillar">
                <div className={`philosophy__pillar-icon ${pillar.iconColor}`}>
                  <pillar.icon />
                </div>
                <div>
                  <h4 className="philosophy__pillar-title">{pillar.title}</h4>
                  <p className="philosophy__pillar-desc">{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
