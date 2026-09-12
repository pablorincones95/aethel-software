import { FileText } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { ContentClient } from "@/components/admin/content-client"
import type { SiteContent } from "@/lib/types"

const mockSections: SiteContent[] = [
  {
    id: "1",
    section_key: "hero",
    content: {
      badge_text: "Boutique Engineering Atelier // Software e IA de Alto Impacto",
      title: "Soluciones Digitales con IA para",
      title_gradient: "Escalar tu Negocio",
      subtitle:
        "Diseñamos y desarrollamos plataformas web, móviles y cloud potenciadas con inteligencia artificial, experiencia de usuario y posicionamiento — un enfoque completo, sin plantillas ni fábricas de código.",
      cta_primary_text: "Agendar Consulta Técnica",
      cta_secondary_text: "Explorar Arquitecturas",
      runtime_version: "aethel-core-runtime // v4.19",
      security_badge: "SOC 2 · EN PROCESO",
    },
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    section_key: "services",
    content: {
      label: "Ingeniería a Medida",
      title: "Servicios Especializados de Ingeniería",
      subtitle:
        "Diseño y construcción de soluciones a medida para productos digitales exigentes, desde la idea hasta la operación en producción.",
      items: [
        {
          number: "01 // WEB & SAAS",
          title: "Desarrollo Web & SaaS",
          desc: "Plataformas y aplicaciones web con Next.js, React, Angular y Node.js: arquitecturas modulares, serverless y preparadas para escalar.",
          tags: ["Next.js", "React", "Angular", "Node.js"],
        },
        {
          number: "02 // MOBILE",
          title: "Aplicaciones Móviles",
          desc: "Apps multiplataforma fluidas en React Native con Expo, sincronización offline y experiencia de usuario pulida en iOS y Android.",
          tags: ["React Native", "Expo", "TypeScript"],
        },
        {
          number: "03 // CLOUD & DEVOPS",
          title: "Infraestructura & Despliegue",
          desc: "Despliegues automatizados en Vercel, AWS y Railway, con pipelines CI/CD, contenedores Docker y entornos preparados para producción.",
          tags: ["Vercel", "AWS", "Railway", "Docker"],
        },
        {
          number: "04 // APIs & SISTEMAS",
          title: "APIs y Sistemas Distribuidos",
          desc: "APIs, microservicios y bases de datos con Node.js y PostgreSQL.",
          tags: ["Node.js", "PostgreSQL"],
        },
      ],
    },
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    section_key: "design_seo",
    content: {
      label: "Diseño & Crecimiento",
      title: "Experiencia de Usuario & Posicionamiento Técnico",
      subtitle:
        "Un buen software necesita verse impecable y ser encontrado fácilmente. Integramos diseño de producto y SEO técnico desde la primera línea de código.",
      cards: [
        {
          title: "UX/UI & Design Systems",
          desc: "Diseñamos interfaces intuitivas, accesibles y estéticamente refinadas. Construimos sistemas de diseño escalables con Figma y componentes reutilizables.",
          tags: ["Figma", "Design Systems", "Accesibilidad", "Micro-interacciones"],
        },
        {
          title: "SEO Técnico & Crecimiento Orgánico",
          desc: "Optimizamos arquitectura web, Core Web Vitals, metadatos estructurados y rendimiento para maximizar visibilidad en motores de búsqueda.",
          tags: ["Core Web Vitals", "Schema.org", "SSR / SSG", "Rendimiento"],
        },
      ],
    },
    updated_at: new Date().toISOString(),
  },
  {
    id: "4",
    section_key: "ai_services",
    content: {
      label: "Inteligencia Artificial Aplicada",
      title: "Ingeniería de IA Integrada en tu Producto",
      subtitle:
        "Llevamos modelos de lenguaje, agentes autónomos y procesamiento inteligente a tus flujos operativos reales, con latencia controlada y arquitecturas en producción.",
      cards: [
        {
          number: "01 // AGENTES & AUTOMATIZACIÓN",
          title: "Agentes Autónomos & RAG Empresarial",
          desc: "Pipelines de Retrieval-Augmented Generation con bases vectoriales, embeddings contextuales y agentes que ejecutan tareas complejas de negocio.",
          metric: "<80ms Latencia Vectorial",
          tags: ["RAG", "Vector DBs", "LangChain", "OpenAI / Claude"],
        },
        {
          number: "02 // FINE-TUNING & MODELOS",
          title: "Modelos Especializados & Fine-Tuning",
          desc: "Ajuste fino de LLMs de código abierto para casos de uso específicos con datos privados, reduciendo costos de inferencia y garantizando soberanía de datos.",
          metric: "100% On-Premise / VPC",
          tags: ["Llama 3", "vLLM", "Hugging Face", "LoRA"],
        },
        {
          number: "03 // VISIÓN & NLP",
          title: "Visión por Computador & Análisis Textual",
          desc: "Extracción automática de datos de documentos complejos, clasificación multimodal y procesamiento masivo de datos no estructurados.",
          metric: "99.4% Precisión en Extracción",
          tags: ["OCR Avanzado", "Multimodal", "PyTorch", "FastAPI"],
        },
      ],
    },
    updated_at: new Date().toISOString(),
  },
  {
    id: "5",
    section_key: "tech_stack",
    content: {
      label: "Stack Tecnológico",
      title: "Herramientas Seleccionadas con Criterio de Ingeniería",
      subtitle:
        "Elegimos tecnologías probadas en producción para garantizar rendimiento, mantenibilidad y escalabilidad a largo plazo.",
      items: [
        { number: "01", name: "Next.js & React", desc: "Framework web moderno con App Router y Server Components" },
        { number: "02", name: "TypeScript", desc: "Tipado estricto para bases de código robustas y libres de errores" },
        { number: "03", name: "React Native", desc: "Aplicaciones móviles nativas con rendimiento de primer nivel" },
        { number: "04", name: "Node.js & Python", desc: "Backends de alto rendimiento, microservicios y pipelines de IA" },
        { number: "05", name: "PostgreSQL & Supabase", desc: "Bases de datos relacionales sólidas con RLS y tiempo real" },
        { number: "06", name: "Docker & Kubernetes", desc: "Contenedores y orquestación para despliegues reproducibles" },
        { number: "07", name: "AWS & Vercel", desc: "Infraestructura cloud elástica y despliegues edge globales" },
        { number: "08", name: "Tailwind CSS & SCSS", desc: "Estilizado modular, rápido y con sistemas de diseño estrictos" },
        { number: "09", name: "Git & CI/CD", desc: "Integración y entrega continua con pipelines automatizados" },
        { number: "10", name: "LLMs & Vector DBs", desc: "Integración de modelos fundacionales y búsqueda semántica" },
      ],
    },
    updated_at: new Date().toISOString(),
  },
  {
    id: "6",
    section_key: "process",
    content: {
      label: "Metodología",
      title: "Cómo Trabajamos: De la Idea a Producción",
      subtitle:
        "Un proceso estructurado que minimiza riesgos, acelera entregas y garantiza que cada línea de código responda a un objetivo de negocio.",
      phases: [
        {
          number: "01",
          title: "Diagnóstico & Arquitectura",
          desc: "Analizamos tus requerimientos, definimos la arquitectura del sistema, seleccionamos el stack óptimo y establecemos los hitos clave del proyecto.",
        },
        {
          number: "02",
          title: "Diseño & Prototipado",
          desc: "Diseñamos las interfaces clave, validamos la experiencia de usuario y definimos el sistema de diseño antes de escribir una sola línea de código.",
        },
        {
          number: "03",
          title: "Desarrollo Iterativo",
          desc: "Construimos en sprints cortos con demos frecuentes. Código limpio, tipado estricto, pruebas automatizadas y revisiones constantes.",
        },
        {
          number: "04",
          title: "Despliegue & Operación",
          desc: "Configuramos infraestructura de producción, pipelines CI/CD, monitoreo continuo y documentación completa para transferencia técnica.",
        },
      ],
    },
    updated_at: new Date().toISOString(),
  },
  {
    id: "7",
    section_key: "philosophy",
    content: {
      label: "Nuestra Filosofía",
      title: "Principios que Guían Nuestro Trabajo",
      quote:
        "No construimos software para cumplir un checklist. Construimos herramientas que transforman cómo operan las empresas.",
      pillars: [
        {
          number: "01",
          title: "Rigor sobre Velocidad Imprudente",
          desc: "Avanzar rápido sin bases sólidas solo genera deuda técnica. Diseñamos sistemas que crecen con tu empresa sin necesidad de reescribirlos.",
        },
        {
          number: "02",
          title: "Transparencia Técnica Total",
          desc: "Sin jerga innecesaria ni cajas negras. Sabes exactamente qué se está construyendo, por qué se eligió cada tecnología y cómo evoluciona el proyecto.",
        },
        {
          number: "03",
          title: "Enfoque de Negocio",
          desc: "La mejor arquitectura es la que genera valor tangible. Cada decisión técnica está alineada con tus objetivos de ingresos, retención y eficiencia.",
        },
      ],
    },
    updated_at: new Date().toISOString(),
  },
  {
    id: "8",
    section_key: "contact",
    content: {
      label: "Contacto Directo",
      title: "Hablemos de tu Próximo Proyecto",
      subtitle:
        "Completa el formulario y un arquitecto senior analizará tus requerimientos técnicos para responder en menos de 4 horas hábiles.",
      security_notice: "Datos protegidos y tratados con confidencialidad",
      response_time: "<4 horas hábiles",
    },
    updated_at: new Date().toISOString(),
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

      if (data && data.length > 0) {
        // Merge with mockSections so any missing sections remain accessible
        const fetchedMap = new Map(data.map((item) => [item.section_key, item]))
        sections = mockSections.map((mock) => fetchedMap.get(mock.section_key) || mock)
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
          Gestor de Contenidos (CMS)
        </h1>
        <p className="mt-1 text-muted-foreground">
          Edita los textos y secciones de la landing page en tiempo real.
        </p>
      </div>

      <ContentClient sections={sections} />
    </div>
  )
}
