import { Verified, Security, DataObject, Bolt } from "./icons"

const stats = [
  {
    icon: DataObject,
    iconColor: "social-proof__card-icon--cyan",
    title: "100% Type-Safe",
    desc: "Rigor tipado estricto, DDD y testing determinista en cada release.",
  },
  {
    icon: Security,
    iconColor: "social-proof__card-icon--gold",
    title: "SOC 2 · EN PROCESO",
    desc: "Certificación en curso: seguridad, auditoría y controles según estándares empresariales.",
  },
  {
    icon: Verified,
    iconColor: "social-proof__card-icon--cyan",
    title: "Cobertura Full-Service",
    desc: "Desarrollo, IA, diseño UX/UI, SEO y experiencia de usuario en un solo atelier.",
  },
  {
    icon: Bolt,
    iconColor: "social-proof__card-icon--gold",
    title: "Metodología Rigurosa",
    desc: "Procesos documentados: discovery, diseño, ejecución y despliegue sin improvisación.",
  },
]

export function SocialProof() {
  return (
    <section className="social-proof">
      <div className="social-proof__inner">
        <div className="social-proof__grid">
          {stats.map((stat) => (
            <div key={stat.title} className="social-proof__card">
              <div className="social-proof__card-header">
                <stat.icon className={`social-proof__card-icon ${stat.iconColor}`} />
                <span className="social-proof__card-title">{stat.title}</span>
              </div>
              <p className="social-proof__card-desc">{stat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
