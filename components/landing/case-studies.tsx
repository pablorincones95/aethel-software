import Image from "next/image"
import type { Project } from "@/lib/types"

const defaultCases = [
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDOgWf5DSJxrw6Ee-uXzFgUd0dKgX-6whMjrJz9gG4Gw1nhfsl17HTqcn1Zjjqhn72UcdMQA_GZrOBE1esVs-LMXIjqKNMRtXQbE7EPzX_O6F4PFlfr5A0kD2-ujeJU_zqpupVMkomUUvYED-4UpALULWERxqrLmw8M8uKt-OxDRBTYcS1ytu5eJCFHtyW-S7uBcJSf69RjzVlKFLFiv7kIAReUnjgwaQrxUxhU2ZtQNZZrCJFUFA12",
    tag: "Fintech & Core Bancario",
    tagColor: "case-studies__card-tag--gold",
    title: "Pasarela Transfronteriza Ultra Concurrente",
    challenge:
      "Caídas recurrentes en picos de 40k transacciones por minuto con sistemas bancarios legados.",
    solution:
      "Reescritura a microservicios distribuidos con particionado Postgres, caché Redis distribuida y motor de idempotencia en AWS EKS.",
    metric1: ">150,000 TPS Estables",
    metric2: "0% Downtime",
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA5tj_MA4lSqrDPcAqcDNkDrHqeRbkzVasNKvBr7q9DoHgnduvf5tFVxOLs_UCb6_cTilpvf_RPiT46m3qbIib5CvHIFbNYvnm0wEsiUWKfodN4aLE0BFmpgsxyOgO5hUgcVqnFeTeYvVHVfaXyx5vYrJR4osukXBzz-M045nkOto59Z9pbEVIFLid9fgFfKs6JcawVhQl-tdaBT0qwUcI3ADdc2KMggtXvRIAM-ciWKbc39eFnnq1o",
    tag: "Logística Global",
    tagColor: "case-studies__card-tag--cyan",
    title: "ERP Cloud & Telemetría IoT en Tiempo Real",
    challenge:
      "Latencias superiores a 3.5s en sincronización de flotas marítimas transoceánicas.",
    solution:
      "Arquitectura de streaming bidireccional sobre WebSockets y Apache Kafka con compresión binaria Protobuf en el edge.",
    metric1: "18ms RTT Global",
    metric2: "1.2M Dispositivos",
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCK4S6BXZMlIMqBs4qePzD_WjdQe93QrsrFGBTfWTXtcnMykU5EXG-dA5luYIYmR400DObsBjCNO7HsiEXWZjH3M9MUtAO3xhbJ03oFLVEVHG5abp3LKQdY-sgOcfsBpKetEC4ORHfUzmwFYmRDS3PHB-yvP4xtcSF54gDnQQrjl_4aZSfjpqrwsBDNmbpQsL0tVtnLilN8DSb2xFsjHOK_sKMSdTyrVwMtNzS6I9gc4h9-rYy9zfga",
    tag: "Healthcare & Mobile",
    tagColor: "case-studies__card-tag--gold",
    title: "Emergency Response Suite Multiplataforma",
    challenge:
      "Pérdida de conectividad celular en unidades de emergencia causaba pérdida de datos médicos críticos.",
    solution:
      "Aplicación React Native Offline-First con WatermelonDB, sincronización delta con resolución CRDT y cifrado biométrico AES-256.",
    metric1: "100% Cero Pérdida de Datos",
    metric2: "HIPAA Compliant",
  },
]

interface CaseStudiesProps {
  projects?: Project[]
}

export function CaseStudies({ projects }: CaseStudiesProps) {
  const displayItems =
    projects && projects.length > 0
      ? projects.filter((p) => p.is_featured).map((p, index) => ({
          title: p.title,
          tag: p.tag || "Ingeniería de Producción",
          tagColor:
            p.tag_color === "gold"
              ? "case-studies__card-tag--gold"
              : "case-studies__card-tag--cyan",
          challenge: p.challenge || p.description || "Requerimientos de alta concurrencia y tolerancia a fallos.",
          solution: p.solution || "Arquitectura distribuida y desarrollo a medida por Aethel Software.",
          metric1: p.metric_primary || "Alta Disponibilidad",
          metric2: p.metric_secondary || "100% Auditado",
          image:
            p.image_url ||
            defaultCases[index % defaultCases.length]?.image ||
            defaultCases[0].image,
        }))
      : defaultCases

  return (
    <section className="case-studies" id="casos">
      <div className="case-studies__inner">
        <div className="case-studies__header">
          <div className="case-studies__header-text">
            <span className="case-studies__label">
              Resultados Probados en Producción
            </span>
            <h2 className="case-studies__title">
              Casos de Éxito en Misión Crítica
            </h2>
          </div>
          <span className="case-studies__subtitle">
            Desafíos de Concurrencia Extrema Resueltos
          </span>
        </div>

        <div className="case-studies__grid">
          {displayItems.map((item) => (
            <div key={item.title} className="case-studies__card">
              <div className="case-studies__card-image">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <span className={`case-studies__card-tag ${item.tagColor}`}>
                  {item.tag}
                </span>
              </div>
              <div className="case-studies__card-body">
                <div>
                  <h3 className="case-studies__card-title">{item.title}</h3>
                  <div className="case-studies__card-challenge">
                    <strong>Desafío: </strong>
                    {item.challenge}
                  </div>
                  <div className="case-studies__card-solution">
                    <strong>Solución Aethel: </strong>
                    {item.solution}
                  </div>
                </div>
                <div className="case-studies__card-metrics">
                  <span>{item.metric1}</span>
                  <span className="case-studies__card-metrics-secondary">
                    {item.metric2}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
