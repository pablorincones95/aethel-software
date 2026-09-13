import Link from "next/link"
import Image from "next/image"
import { ThemeToggle } from "./theme-toggle"

const navLinks = [
  { label: "SERVICIOS", href: "#arquitecturas" },
  { label: "DISEÑO & SEO", href: "#diseño-crecimiento" },
  { label: "IA", href: "#ia" },
  { label: "CASOS", href: "#casos" },
  { label: "STACK", href: "#stack" },
  { label: "METODOLOGÍA", href: "#metodologia" },
  { label: "CONTACTO", href: "#contacto-evaluacion" },
]

export function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <Link href="/" className="navbar__logo">
          <Image
            alt="Aethel Software — Estudio de Ingeniería y Arquitectura de Software"
            src="/aethel-logo.svg"
            width={32}
            height={32}
            priority
            className="h-8 w-8 object-contain"
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

        <div className="navbar__actions">
          <ThemeToggle />
          <a href="#contacto-evaluacion" className="navbar__cta">
            <span className="inline-flex h-9 items-center justify-center rounded bg-[var(--ae-primary-container)] px-4 text-sm font-semibold text-[var(--ae-on-primary)] transition-all hover:opacity-90 hover:shadow-[0_0_24px_var(--ae-border-active)]">
              Agendar Evaluación
            </span>
          </a>
        </div>
      </div>
    </nav>
  )
}
