import { Mail, Forum, CalendarMonth } from "./icons"
import { ContactForm } from "./contact-form"

export function Contact() {
  return (
    <section className="contact" id="contacto-evaluacion">
      <div className="contact__inner">
        <div className="contact__grid">
          {/* Left: Info & Channels */}
          <div className="contact__info">
            <div className="contact__label">
              Engineering Consultation
            </div>
            <h2 className="contact__title">
              Iniciemos tu Próxima Evolución Digital
            </h2>
            <p className="contact__subtitle">
              Analicemos tu arquitectura actual, detectemos cuellos de botella y
              diseñemos una hoja de ruta técnica escalable para tus objetivos de
              negocio.
            </p>

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

            <p className="contact__nda">
              * Acuerdos de confidencialidad (NDA mutuo) ejecutables de inmediato
              previo al intercambio de especificaciones técnicas.
            </p>
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
