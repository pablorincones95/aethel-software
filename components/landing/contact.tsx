import { Mail, Forum, CalendarMonth } from "./icons"
import { ContactForm } from "./contact-form"

interface ContactProps {
  content?: Record<string, unknown>
}

export function Contact({ content }: ContactProps) {
  const label = (content?.label as string) || "Engineering Consultation"
  const title = (content?.title as string) || "Iniciemos tu Próxima Evolución Digital"
  const subtitle =
    (content?.subtitle as string) ||
    "Analicemos tu arquitectura actual, detectemos cuellos de botella y diseñemos una hoja de ruta técnica escalable para tus objetivos de negocio."
  const securityNotice =
    (content?.security_notice as string) ||
    "* Acuerdos de confidencialidad (NDA mutuo) ejecutables de inmediato previo al intercambio de especificaciones técnicas."

  return (
    <section className="contact" id="contacto-evaluacion">
      <div className="contact__inner">
        <div className="contact__grid">
          {/* Left: Info & Channels */}
          <div className="contact__info">
            <div className="contact__label">{label}</div>
            <h2 className="contact__title">{title}</h2>
            <p className="contact__subtitle">{subtitle}</p>

            <div className="contact__channels">
              <div className="contact__channel">
                <div className="contact__channel-icon contact__channel-icon--cyan">
                  <Mail />
                </div>
                <div>
                  <div className="contact__channel-label">
                    Dispatch Corporativo
                  </div>
                  <div className="contact__channel-value">
                    architects@aethelsoftware.com
                  </div>
                </div>
              </div>
              <div className="contact__channel">
                <div className="contact__channel-icon contact__channel-icon--gold">
                  <Forum />
                </div>
                <div>
                  <div className="contact__channel-label">
                    Línea Directa de Ingeniería
                  </div>
                  <div className="contact__channel-value">
                    +41 (0) 44 820 9100 // +1 (415) 890-4100
                  </div>
                </div>
              </div>
              <div className="contact__channel">
                <div className="contact__channel-icon contact__channel-icon--cyan">
                  <CalendarMonth />
                </div>
                <div>
                  <div className="contact__channel-label">
                    Sesión de Arquitectura Técnica
                  </div>
                  <div className="contact__channel-value contact__channel-value--cyan">
                    Reserva 30 min con un Principal Partner
                  </div>
                </div>
              </div>
            </div>

            <p className="contact__nda">{securityNotice}</p>
          </div>

          {/* Right: Form */}
          <div className="contact__form-wrapper">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
