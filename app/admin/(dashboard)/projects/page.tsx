import { FolderKanban } from "lucide-react"
import { getAdminServices } from "@/lib/firebase/admin"
import { ProjectsClient } from "@/components/admin/projects-client"
import type { Project } from "@/lib/types"

const mockProjects: Project[] = [
  {
    id: "1",
    title: "Pasarela Transfronteriza Ultra Concurrente",
    tag: "Fintech & Core Bancario",
    tag_color: "gold",
    challenge: "Caídas recurrentes en picos de 40k transacciones por minuto.",
    solution: "Reescritura a microservicios distribuidos con Postgres particionado.",
    metric_primary: ">150,000 TPS Estables",
    metric_secondary: "0% Downtime",
    description: "Pasarela financiera de alta concurrencia.",
    technologies: ["Next.js", "Redis", "AWS EKS", "Postgres"],
    url: "",
    image_url:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDOgWf5DSJxrw6Ee-uXzFgUd0dKgX-6whMjrJz9gG4Gw1nhfsl17HTqcn1Zjjqhn72UcdMQA_GZrOBE1esVs-LMXIjqKNMRtXQbE7EPzX_O6F4PFlfr5A0kD2-ujeJU_zqpupVMkomUUvYED-4UpALULWERxqrLmw8M8uKt-OxDRBTYcS1ytu5eJCFHtyW-S7uBcJSf69RjzVlKFLFiv7kIAReUnjgwaQrxUxhU2ZtQNZZrCJFUFA12",
    is_featured: true,
    sort_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "ERP Cloud & Telemetría IoT en Tiempo Real",
    tag: "Logística Global",
    tag_color: "cyan",
    challenge: "Latencias superiores a 3.5s en flotas marítimas.",
    solution: "Streaming bidireccional sobre WebSockets y Apache Kafka.",
    metric_primary: "18ms RTT Global",
    metric_secondary: "1.2M Dispositivos",
    description: "Plataforma IoT y telemetría en tiempo real.",
    technologies: ["WebSockets", "Kafka", "Protobuf", "Node.js"],
    url: "",
    image_url:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA5tj_MA4lSqrDPcAqcDNkDrHqeRbkzVasNKvBr7q9DoHgnduvf5tFVxOLs_UCb6_cTilpvf_RPiT46m3qbIib5CvHIFbNYvnm0wEsiUWKfodN4aLE0BFmpgsxyOgO5hUgcVqnFeTeYvVHVfaXyx5vYrJR4osukXBzz-M045nkOto59Z9pbEVIFLid9fgFfKs6JcawVhQl-tdaBT0qwUcI3ADdc2KMggtXvRIAM-ciWKbc39eFnnq1o",
    is_featured: true,
    sort_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Emergency Response Suite Multiplataforma",
    tag: "Healthcare & Mobile",
    tag_color: "gold",
    challenge: "Pérdida de conectividad celular en unidades médicas de emergencia.",
    solution: "React Native Offline-First con WatermelonDB y cifrado biométrico.",
    metric_primary: "100% Cero Pérdida de Datos",
    metric_secondary: "HIPAA Compliant",
    description: "Suite móvil de emergencia médica.",
    technologies: ["React Native", "Expo", "WatermelonDB", "TypeScript"],
    url: "",
    image_url:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCK4S6BXZMlIMqBs4qePzD_WjdQe93QrsrFGBTfWTXtcnMykU5EXG-dA5luYIYmR400DObsBjCNO7HsiEXWZjH3M9MUtAO3xhbJ03oFLVEVHG5abp3LKQdY-sgOcfsBpKetEC4ORHfUzmwFYmRDS3PHB-yvP4xtcSF54gDnQQrjl_4aZSfjpqrwsBDNmbpQsL0tVtnLilN8DSb2xFsjHOK_sKMSdTyrVwMtNzS6I9gc4h9-rYy9zfga",
    is_featured: true,
    sort_order: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export default async function AdminProjects() {
  const { db } = getAdminServices()

  let projects: Project[] = mockProjects

  if (db) {
    try {
      const snap = await db
        .collection("projects")
        .orderBy("sort_order", "asc")
        .get()

      if (!snap.empty) {
        projects = snap.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Project, "id">),
        }))
      }
    } catch {
      // Use fallback
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="flex items-center gap-3 text-2xl font-bold">
          <FolderKanban className="h-6 w-6" />
          Proyectos & Casos de Estudio
        </h1>
        <p className="mt-1 text-muted-foreground">
          Gestiona los proyectos y casos de éxito visibles en el portafolio público.
        </p>
      </div>

      <ProjectsClient projects={projects} />
    </div>
  )
}
