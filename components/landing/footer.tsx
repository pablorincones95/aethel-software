const footerLinks = {
  Plataforma: [
    "Servicios de Ingeniería",
    "Diseño UX/UI & Producto",
    "Desarrollo Web & SaaS",
    "SEO Técnico & Growth",
  ],
  Arquitectura: [
    "Metodología de Entrega",
    "Seguridad & Auditoría",
    "DevOps & Infraestructura",
    "Operaciones & Soporte",
  ],
  Gobernanza: [
    "Términos de Servicio",
    "Política de Privacidad",
    "Acuerdos de Niveles (SLA)",
    "Cumplimiento & Certificaciones",
  ],
  Conectar: [
    "Blog de Ingeniería",
    "Documentación Técnica",
    "Portal de Empleo",
    "Contacto Corporativo",
  ],
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__grid">
          {/* Brand Column */}
          <div className="footer__brand">
            <div className="flex items-center gap-2 mb-4">
              <img
                alt="Aethel Software Logo"
                src="/aethel-logo.svg"
                className="h-6 w-auto object-contain"
              />
              <span className="font-[family-name:var(--font-display)] text-sm font-semibold tracking-wider uppercase text-[#F8FAFC]">
                Aethel Architecture
              </span>
            </div>
            <p className="footer__brand-desc mb-4">
              Atelier de ingeniería de software de alta fidelidad para sistemas
              de misión crítica, infraestructura distribuida y plataformas
              autónomas.
            </p>
            <div className="inline-flex items-center gap-2 rounded px-2 py-2 bg-[rgba(36,42,54,0.6)] border border-[rgba(255,255,255,0.08)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00e5ff] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00e5ff]" />
              </span>
              <span className="font-[family-name:var(--font-display)] text-[11px] font-semibold leading-4 tracking-[0.18em] uppercase text-[#bac9cc]">
                All Systems Operational &lt;12ms
              </span>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="footer__column-title">{category}</h4>
              <ul className="space-y-1">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="footer__link">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer__bottom">
          <span className="footer__copyright">
            ©2026 Aethel Software AG. Precision Architectural Engineering.
          </span>
          <div className="flex gap-6">
            <span className="font-[family-name:var(--font-display)] text-[12px] font-medium leading-[18px] tracking-[0.04em] text-[#94A3B8]">
              LATENCY: 8.4MS
            </span>
            <span className="font-[family-name:var(--font-display)] text-[12px] font-medium leading-[18px] tracking-[0.04em] text-[#94A3B8]">
              REV: 4.19.0-PROD
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
