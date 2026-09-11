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
                Boutique Engineering Atelier // High-Throughput Systems
              </span>
            </div>

            <h1 className="hero__title">
              Ingeniería de Software de Precisión para{" "}
              <span className="hero__title-gradient">
                Escalar tu Negocio
              </span>
            </h1>

            <p className="hero__subtitle">
              Diseñamos sistemas resilientes a medida, arquitectura cloud de
              misión crítica y experiencias digitales de ultra-bajo tiempo de
              respuesta para compañías líderes e infraestructuras globales.
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
                <span>ZERO-DOWNTIME COMMITMENT</span>
              </div>
              <div className="hero__telemetry-item">
                <span className="hero__telemetry-dot hero__telemetry-dot--cyan" />
                <span>MEDIAN LATENCY: &lt;12ms</span>
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
                <span>SOC2 TIER III</span>
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
                <div className="hero__metric-label">THROUGHPUT PEAK</div>
                <div className="hero__metric-value">
                  184,200{" "}
                  <span className="hero__metric-unit">TPS</span>
                </div>
                <div className="hero__metric-status hero__metric-status--gold">
                  Mesh Consensus OK
                </div>
              </div>
              <div className="hero__metric-card">
                <div className="hero__metric-label">GLOBAL P99 RTT</div>
                <div className="hero__metric-value hero__metric-value--white">
                  11.8{" "}
                  <span className="hero__metric-unit">MS</span>
                </div>
                <div className="hero__metric-status hero__metric-status--cyan">
                  Edge Multi-Region
                </div>
              </div>
            </div>

            <div className="hero__terminal">
              <div className="hero__terminal-row">
                <span>[INIT] Autonomous Consensus Stream</span>
                <span className="hero__terminal-ready">READY</span>
              </div>
              <div className="hero__terminal-line">
                <span className="hero__terminal-prompt">&gt;</span>{" "}
                EKS Multi-Az Sharding: verified zero dropped packets
              </div>
              <div className="hero__terminal-muted">
                <span className="hero__terminal-prompt">&gt;</span>{" "}
                Zero-Trust handshake: TLS 1.3 / Rust Micro-Kernel active
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
