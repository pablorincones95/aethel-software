import { Verified, Security, DataObject, Bolt } from "./icons"

const stats = [
  {
    icon: Verified,
    iconColor: "social-proof__card-icon--cyan",
    title: "99.999% SLA",
    desc: "Arquitectura distribuida sin punto único de fallo (SPOF).",
  },
  {
    icon: Security,
    iconColor: "social-proof__card-icon--gold",
    title: "ISO 27001 & SOC2",
    desc: "Estándares Enterprise Tier III y cifrado mTLS de extremo a extremo.",
  },
  {
    icon: DataObject,
    iconColor: "social-proof__card-icon--cyan",
    title: "100% Type-Safe",
    desc: "Rigor tipado estricto, DDD y testing determinista >90% coverage.",
  },
  {
    icon: Bolt,
    iconColor: "social-proof__card-icon--gold",
    title: "<35ms Edge Latency",
    desc: "Optimización global CDN, Rust-native edge workers y kernel caching.",
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
