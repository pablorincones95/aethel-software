import {
  ArrowForward,
  Schema,
  Lock,
} from "./icons"

export function Hero() {
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
              <span className="hero__badge-text">
                Boutique Engineering Atelier // Software e IA de Alto Impacto
              </span>
            </div>

            <h1 className="hero__title">
              Soluciones Digitales con IA para{" "}
              <span className="hero__title-gradient">
                Escalar tu Negocio
              </span>
            </h1>

            <p className="hero__subtitle">
              Diseñamos y desarrollamos plataformas web, móviles y cloud
              potenciadas con inteligencia artificial, experiencia de usuario y
              posicionamiento — un enfoque completo, sin plantillas ni fábricas
              de código.
            </p>

            <div className="hero__ctas">
              <a href="#contacto-evaluacion" className="hero__cta-primary">
                <span>Agendar Consulta Técnica</span>
                <ArrowForward />
              </a>
              <a href="#arquitecturas" className="hero__cta-secondary">
                <Schema />
                <span>Explorar Arquitecturas</span>
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
                <span className="hero__console-label">
                  aethel-core-runtime // v4.19
                </span>
              </div>
              <div className="hero__console-badge">
                <Lock />
                <span>SOC 2 · EN PROCESO</span>
              </div>
            </div>

            <div className="hero__monogram">
              <img
                alt="Aethel Architecture Core Node Emblem"
                src="/aethel-logo.svg"
                className="h-24 w-auto object-contain opacity-90 drop-shadow-[0_0_20px_rgba(0,229,255,0.35)]"
              />
              <div className="hero__monogram-overlay" />
            </div>

            <div className="hero__metrics">
              <div className="hero__metric-card">
                <div className="hero__metric-label">SYSTEM STATUS</div>
                <div className="hero__metric-value">
                  OPERATIONAL
                </div>
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
