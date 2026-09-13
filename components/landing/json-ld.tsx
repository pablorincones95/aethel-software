export function JsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aethel.software"

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        "name": "Aethel Software",
        "legalName": "Aethel Software Engineering Studio",
        "url": baseUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/aethel-logo.svg`,
          "caption": "Aethel Software Logo",
        },
        "image": `${baseUrl}/aethel-logo.svg`,
        "description":
          "Elite software engineering studio specializing in high-performance web platforms, mobile applications, AI systems, and cloud architecture.",
        "knowsAbout": [
          "Next.js",
          "TypeScript",
          "Cloud Architecture",
          "AI Engineering",
          "Performance Optimization",
          "Full-Stack Web Development",
          "SaaS Architecture",
          "Google Cloud & Firebase",
        ],
        "sameAs": [
          "https://github.com/pablorincones95/aethel-software",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        "url": baseUrl,
        "name": "Aethel Software — Precision Engineering Atelier",
        "description":
          "Estudio de ingeniería de software de élite especializado en plataformas web de alto rendimiento, sistemas de IA y arquitectura cloud.",
        "publisher": {
          "@id": `${baseUrl}/#organization`,
        },
        "inLanguage": "es",
      },
      {
        "@type": "ProfessionalService",
        "@id": `${baseUrl}/#service`,
        "name": "Aethel Software",
        "url": baseUrl,
        "image": `${baseUrl}/aethel-logo.svg`,
        "priceRange": "$$$$",
        "areaServed": {
          "@type": "Place",
          "name": "Worldwide",
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Servicios de Ingeniería de Software de Élite",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Arquitecturas de Misión Crítica",
                "description":
                  "Desarrollo full-stack, plataformas de alta concurrencia, resiliencia distribuida y cloud computing.",
              },
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Diseño UI/UX de Precisión & Crecimiento SEO",
                "description":
                  "Interfaces web artesanales con sistema de diseño suizo, rendimiento Core Web Vitals y optimización para motores de búsqueda.",
              },
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Ingeniería de Inteligencia Artificial",
                "description":
                  "Integración de modelos fundacionales, pipelines de RAG y flujos de trabajo autónomos para empresas.",
              },
            },
          ],
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${baseUrl}/#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": "¿Qué tipo de soluciones desarrolla Aethel Software?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Desarrollamos plataformas web de alto rendimiento, aplicaciones móviles nativas y cross-platform, arquitecturas cloud distribuidas e integraciones avanzadas de Inteligencia Artificial empresarial.",
            },
          },
          {
            "@type": "Question",
            "name": "¿Cuál es la metodología de ingeniería de Aethel Software?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Operamos bajo un ciclo riguroso de cuatro fases: Diagnóstico de Arquitectura, Especificación de Precisión & Prototipado, Construcción Rigurosa con CI/CD automatizado, y Despliegue con Telemetría en Tiempo Real.",
            },
          },
          {
            "@type": "Question",
            "name": "¿Cómo garantiza Aethel Software el rendimiento y la seguridad?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Todo el software se construye con TypeScript en modo estricto, reglas de seguridad de base de datos a nivel de servidor, políticas de cabeceras HTTP estrictas y optimizaciones dirigidas a puntuaciones de 100/100 en Google Core Web Vitals.",
            },
          },
        ],
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
