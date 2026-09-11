import { FileText } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { ContentClient } from "@/components/admin/content-client"
import type { SiteContent } from "@/lib/types"

const mockSections: SiteContent[] = [
  {
    id: "1",
    section_key: "hero",
    content: {
      title: "Precision Engineering for Digital Systems",
      subtitle:
        "We architect and build high-performance software platforms with the rigor of mission-critical systems.",
      metrics: [
        { label: "Projects Delivered", value: "47+" },
        { label: "Uptime SLA", value: "99.97%" },
        { label: "Avg. Response Time", value: "<120ms" },
      ],
    },
    updated_at: "2024-01-15T00:00:00Z",
  },
  {
    id: "2",
    section_key: "services",
    content: {
      title: "Specialized Engineering Services",
      subtitle:
        "Full-spectrum software architecture and development for enterprise-grade applications.",
      items: [
        {
          title: "Web & SaaS",
          description:
            "Full-stack applications with Next.js, React, and cloud-native backends.",
          icon: "monitor",
        },
        {
          title: "Mobile Engineering",
          description:
            "Cross-platform mobile applications using React Native and Angular.",
          icon: "smartphone",
        },
        {
          title: "Cloud & DevOps",
          description:
            "Infrastructure as code, CI/CD pipelines, and cloud architecture on AWS/GCP.",
          icon: "cloud",
        },
        {
          title: "API & Integration",
          description:
            "RESTful and GraphQL APIs, microservices, and third-party system integration.",
          icon: "link",
        },
      ],
    },
    updated_at: "2024-01-15T00:00:00Z",
  },
  {
    id: "3",
    section_key: "process",
    content: {
      title: "Engineering Process",
      subtitle:
        "A disciplined methodology refined through years of mission-critical delivery.",
      phases: [
        {
          number: "01",
          title: "Discovery & Analysis",
          description:
            "Deep-dive into requirements, system constraints, and architectural boundaries.",
        },
        {
          number: "02",
          title: "Architecture & Design",
          description:
            "Technical specifications, system diagrams, and technology stack selection.",
        },
        {
          number: "03",
          title: "Iterative Build",
          description:
            "Sprint-based development with continuous integration and automated testing.",
        },
        {
          number: "04",
          title: "Deploy & Monitor",
          description:
            "Production deployment, performance monitoring, and operational readiness.",
        },
      ],
    },
    updated_at: "2024-01-15T00:00:00Z",
  },
  {
    id: "4",
    section_key: "contact",
    content: {
      title: "Start a Conversation",
      subtitle:
        "Ready to architect your next system? Let us discuss your technical requirements.",
      email: "engineering@aethel.software",
      response_time: "24h",
    },
    updated_at: "2024-01-15T00:00:00Z",
  },
]

export default async function AdminContent() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  let sections: SiteContent[] = mockSections

  if (supabaseUrl && supabaseKey) {
    try {
      const supabase = await createClient()
      const { data } = await supabase
        .from("site_content")
        .select("*")
        .order("section_key", { ascending: true })

      if (data) {
        sections = data
      }
    } catch {
      // Use mock data
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="flex items-center gap-3 text-2xl font-bold">
          <FileText className="h-6 w-6" />
          Content Manager
        </h1>
        <p className="mt-1 text-muted-foreground">
          Edit landing page text sections in real time.
        </p>
      </div>

      <ContentClient sections={sections} />
    </div>
  )
}
