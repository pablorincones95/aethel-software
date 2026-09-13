import Image from "next/image"
import {
  ArrowForward,
  Schema,
  Lock,
} from "./icons"

interface HeroProps {
  content?: Record<string, unknown>
}

export function Hero({ content }: HeroProps) {
  const badgeText =
    (content?.badge_text as string) ||
    "Boutique Engineering Atelier // Software e IA de Alto Impacto"
  const title = (content?.title as string) || "Soluciones Digitales con IA para"
  const titleGradient = (content?.title_gradient as string) || "Escalar tu Negocio"
  const subtitle =
    (content?.subtitle as string) ||
    "Diseñamos y desarrollamos plataformas web, móviles y cloud potenciadas con inteligencia artificial, experiencia de usuario y posicionamiento — un enfoque completo, sin plantillas ni fábricas de código."
  const ctaPrimary = (content?.cta_primary_text as string) || "Agendar Consulta Técnica"
  const ctaSecondary = (content?.cta_secondary_text as string) || "Explorar Arquitecturas"
  const runtimeVersion = (content?.runtime_version as string) || "aethel-core-runtime // v4.19"
  const securityBadge = (content?.security_badge as string) || "SOC 2 · EN PROCESO"

  return (
    <section className="hero">
      <div className="hero__ambient-top" />
      <div className="hero__ambient-left" />

      <div className="hero__inner">
        <div className="hero__grid">
          {/* Left Content */}
          <div className="hero__content">
            <div className="hero__badge">
              <span className="hero__badge-ping" />
              <span className="hero__badge-text">{badgeText}</span>
            </div>

            <h1 className="hero__title">
              {title}{" "}
              <span className="hero__title-gradient">{titleGradient}</span>
            </h1>

            <p className="hero__subtitle">{subtitle}</p>

            <div className="hero__ctas">
              <a href="#contacto-evaluacion" className="hero__cta-primary">
                <span>{ctaPrimary}</span>
                <ArrowForward />
              </a>
              <a href="#arquitecturas" className="hero__cta-secondary">
                <Schema />
                <span>{ctaSecondary}</span>
              </a>
            </div>

            <div className="hero__telemetry">
              <div className="hero__telemetry-item">
                <span className="hero__telemetry-dot hero__telemetry-dot--gold" />
                <span>METODOLOGÍA RÍGIDA</span>
              </div>
              <div className="hero__telemetry-item">
                <span className="hero__telemetry-dot hero__telemetry-dot--cyan" />
                <span>IA EN PRODUCCIÓN</span>
              </div>
            </div>
          </div>

          {/* Right Console Panel */}
          <div className="hero__console">
            <div className="hero__console-topbar">
              <div className="hero__console-dots">
                <span className="hero__console-dot" />
                <span className="hero__console-dot" />
                <span className="hero__console-dot" />
                <span className="hero__console-label">{runtimeVersion}</span>
              </div>
              <div className="hero__console-badge">
                <Lock />
                <span>{securityBadge}</span>
              </div>
            </div>

            <div className="hero__monogram">
              <Image
                alt="Aethel Software — Emblema de Arquitectura e Ingeniería de Sistemas"
                src="/aethel-logo.svg"
                width={96}
                height={96}
                priority
                className="h-24 w-24 object-contain opacity-90 drop-shadow-[0_0_20px_rgba(0,229,255,0.35)]"
              />
              <div className="hero__monogram-overlay" />
            </div>

            <div className="hero__metrics">
              <div className="hero__metric-card">
                <div className="hero__metric-label">SYSTEM STATUS</div>
                <div className="hero__metric-value">OPERATIONAL</div>
                <div className="hero__metric-status hero__metric-status--gold">
                  Pipeline Verde
                </div>
              </div>
              <div className="hero__metric-card">
                <div className="hero__metric-label">RUNTIME MONITOR</div>
                <div className="hero__metric-value hero__metric-value--white">
                  NOMINAL
                </div>
                <div className="hero__metric-status hero__metric-status--cyan">
                  Alerts: 0
                </div>
              </div>
            </div>

            <div className="hero__terminal">
              <div className="hero__terminal-row">
                <span>[INIT] Delivery Pipeline</span>
                <span className="hero__terminal-ready">READY</span>
              </div>
              <div className="hero__terminal-line">
                <span className="hero__terminal-prompt">&gt;</span>{" "}
                CI/CD: deployment nominal
              </div>
              <div className="hero__terminal-muted">
                <span className="hero__terminal-prompt">&gt;</span>{" "}
                Monitoring: 0 alerts / active
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
