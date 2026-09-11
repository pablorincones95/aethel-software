import Link from "next/link"

const navLinks = [
  { label: "SERVICIOS", href: "#arquitecturas" },
  { label: "SOLUCIONES", href: "#casos" },
  { label: "STACK", href: "#stack" },
  { label: "METODOLOGÍA", href: "#metodologia" },
  { label: "CONTACTO", href: "#contacto-evaluacion" },
]

export function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <Link href="/" className="navbar__logo">
          <img
            alt="Aethel Software Logo"
            src="/aethel-logo.svg"
            className="h-8 w-auto object-contain"
          />
          <span>Aethel</span>
        </Link>

        <div className="navbar__nav">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="navbar__link">
              {link.label}
            </a>
          ))}
        </div>

        <a href="#contacto-evaluacion" className="navbar__cta">
          <span className="inline-flex h-9 items-center justify-center rounded bg-[#00e5ff] px-4 text-sm font-semibold text-[#030712] transition-all hover:bg-[#9cf0ff] hover:shadow-[0_0_24px_rgba(0,229,255,0.4)]">
            Agendar Evaluación
          </span>
        </a>
      </div>
    </nav>
  )
}
