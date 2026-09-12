/**
 * Aethel Software — Firebase Firestore Seed Script
 * Supports both Firebase Admin (service account) and Firebase Web SDK (API key)
 * Run with: pnpm seed:firebase
 */

import { readFileSync, existsSync } from "fs"
import { resolve } from "path"

// Load .env.local if present
const envPath = resolve(process.cwd(), ".env.local")
if (existsSync(envPath)) {
  const envContent = readFileSync(envPath, "utf-8")
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim()
    if (trimmed && !trimmed.startsWith("#")) {
      const eqIdx = trimmed.indexOf("=")
      if (eqIdx !== -1) {
        const key = trimmed.slice(0, eqIdx).trim()
        const val = trimmed.slice(eqIdx + 1).trim()
        if (!process.env[key]) {
          process.env[key] = val
        }
      }
    }
  }
}

const projectId =
  process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
let privateKey = process.env.FIREBASE_PRIVATE_KEY
const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY

if (!projectId) {
  console.error("❌ Error: NEXT_PUBLIC_FIREBASE_PROJECT_ID is not configured in .env.local")
  process.exit(1)
}

const projects = [
  {
    title: "Pasarela Transfronteriza Ultra Concurrente",
    tag: "Fintech & Core Bancario",
    tag_color: "gold",
    challenge:
      "Caídas recurrentes en picos de 40k transacciones por minuto con sistemas bancarios legados.",
    solution:
      "Reescritura a microservicios distribuidos con particionado Postgres, caché Redis distribuida y motor de idempotencia en AWS EKS.",
    metric_primary: ">150,000 TPS Estables",
    metric_secondary: "0% Downtime",
    image_url:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDOgWf5DSJxrw6Ee-uXzFgUd0dKgX-6whMjrJz9gG4Gw1nhfsl17HTqcn1Zjjqhn72UcdMQA_GZrOBE1esVs-LMXIjqKNMRtXQbE7EPzX_O6F4PFlfr5A0kD2-ujeJU_zqpupVMkomUUvYED-4UpALULWERxqrLmw8M8uKt-OxDRBTYcS1ytu5eJCFHtyW-S7uBcJSf69RjzVlKFLFiv7kIAReUnjgwaQrxUxhU2ZtQNZZrCJFUFA12",
    sort_order: 1,
    is_featured: true,
    technologies: ["Next.js", "Redis", "AWS EKS", "Postgres"],
    url: "",
  },
  {
    title: "ERP Cloud & Telemetría IoT en Tiempo Real",
    tag: "Logística Global",
    tag_color: "cyan",
    challenge:
      "Latencias superiores a 3.5s en sincronización de flotas marítimas transoceánicas.",
    solution:
      "Arquitectura de streaming bidireccional sobre WebSockets y Apache Kafka con compresión binaria Protobuf en el edge.",
    metric_primary: "18ms RTT Global",
    metric_secondary: "1.2M Dispositivos",
    image_url:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA5tj_MA4lSqrDPcAqcDNkDrHqeRbkzVasNKvBr7q9DoHgnduvf5tFVxOLs_UCb6_cTilpvf_RPiT46m3qbIib5CvHIFbNYvnm0wEsiUWKfodN4aLE0BFmpgsxyOgO5hUgcVqnFeTeYvVHVfaXyx5vYrJR4osukXBzz-M045nkOto59Z9pbEVIFLid9fgFfKs6JcawVhQl-tdaBT0qwUcI3ADdc2KMggtXvRIAM-ciWKbc39eFnnq1o",
    sort_order: 2,
    is_featured: true,
    technologies: ["WebSockets", "Kafka", "Protobuf", "Node.js"],
    url: "",
  },
  {
    title: "Emergency Response Suite Multiplataforma",
    tag: "Healthcare & Mobile",
    tag_color: "gold",
    challenge:
      "Pérdida de conectividad celular en unidades de emergencia causaba pérdida de datos médicos críticos.",
    solution:
      "Aplicación React Native Offline-First con WatermelonDB, sincronización delta con resolución CRDT y cifrado biométrico AES-256.",
    metric_primary: "100% Cero Pérdida de Datos",
    metric_secondary: "HIPAA Compliant",
    image_url:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCK4S6BXZMlIMqBs4qePzD_WjdQe93QrsrFGBTfWTXtcnMykU5EXG-dA5luYIYmR400DObsBjCNO7HsiEXWZjH3M9MUtAO3xhbJ03oFLVEVHG5abp3LKQdY-sgOcfsBpKetEC4ORHfUzmwFYmRDS3PHB-yvP4xtcSF54gDnQQrjl_4aZSfjpqrwsBDNmbpQsL0tVtnLilN8DSb2xFsjHOK_sKMSdTyrVwMtNzS6I9gc4h9-rYy9zfga",
    sort_order: 3,
    is_featured: true,
    technologies: ["React Native", "Expo", "WatermelonDB", "TypeScript"],
    url: "",
  },
]

const sections = {
  hero: {
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
  services: {
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
  design_seo: {
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
  ai_services: {
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
  tech_stack: {
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
  process: {
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
  philosophy: {
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
  contact: {
    label: "Contacto Directo",
    title: "Hablemos de tu Próximo Proyecto",
    subtitle:
      "Completa el formulario y un arquitecto senior analizará tus requerimientos técnicos para responder en menos de 4 horas hábiles.",
    security_notice: "Datos protegidos y tratados con confidencialidad",
    response_time: "<4 horas hábiles",
  },
}

async function seed() {
  console.log("🚀 Starting Firestore seed...")

  if (clientEmail && privateKey) {
    console.log("🔑 Authenticating with Firebase Admin Service Account...")
    privateKey = privateKey.replace(/\\n/g, "\n")
    const { initializeApp, cert } = await import("firebase-admin/app")
    const { getFirestore } = await import("firebase-admin/firestore")
    const app = initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) })
    const db = getFirestore(app)

    for (const [key, content] of Object.entries(sections)) {
      await db.collection("site_content").doc(key).set({ section_key: key, content, updated_at: new Date().toISOString() }, { merge: true })
      console.log(`  ✓ Section [${key}] saved`)
    }

    const snap = await db.collection("projects").get()
    if (snap.empty) {
      for (const p of projects) {
        const ref = await db.collection("projects").add({ ...p, created_at: new Date().toISOString(), updated_at: new Date().toISOString() })
        console.log(`  ✓ Project created with ID: ${ref.id}`)
      }
    } else {
      console.log("  ℹ Projects collection already populated.")
    }
  } else if (apiKey) {
    console.log("🌐 Authenticating with Firebase Web Client SDK...")
    const { initializeApp } = await import("firebase/app")
    const { getFirestore, doc, setDoc, collection, getDocs, addDoc } = await import("firebase/firestore")
    const app = initializeApp({ apiKey, projectId })
    const db = getFirestore(app)

    for (const [key, content] of Object.entries(sections)) {
      await setDoc(doc(db, "site_content", key), { section_key: key, content, updated_at: new Date().toISOString() }, { merge: true })
      console.log(`  ✓ Section [${key}] saved`)
    }

    const snap = await getDocs(collection(db, "projects"))
    if (snap.empty) {
      for (const p of projects) {
        const ref = await addDoc(collection(db, "projects"), { ...p, created_at: new Date().toISOString(), updated_at: new Date().toISOString() })
        console.log(`  ✓ Project created with ID: ${ref.id}`)
      }
    } else {
      console.log("  ℹ Projects collection already populated.")
    }
  }

  console.log("✅ Firestore seed complete!")
  process.exit(0)
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err.message || err)
  console.log("\n💡 Nota: Si ves 'permission-denied', ve a Firebase Console -> Firestore Database -> Reglas (Rules) y publica temporalmente las reglas de firestore.rules para permitir la inicialización, o descarga tu clave privada en Configuración del proyecto -> Cuentas de servicio.")
  process.exit(1)
})
