"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ContentSectionForm } from "./content-section-form"
import type { SiteContent } from "@/lib/types"

interface ContentClientProps {
  sections: SiteContent[]
}

const sectionLabels: Record<string, string> = {
  hero: "Hero Principal",
  services: "Servicios",
  design_seo: "Diseño & SEO",
  ai_services: "IA Aplicada",
  tech_stack: "Stack Tecnológico",
  process: "Metodología",
  philosophy: "Filosofía",
  contact: "Contacto",
}

export function ContentClient({ sections }: ContentClientProps) {
  const router = useRouter()

  function handleSuccess() {
    router.refresh()
  }

  if (sections.length === 0) {
    return (
      <Card>
        <CardContent className="flex h-24 items-center justify-center text-muted-foreground">
          No hay secciones disponibles.
        </CardContent>
      </Card>
    )
  }

  return (
    <Tabs defaultValue={sections[0]?.section_key} className="space-y-4">
      <div className="overflow-x-auto pb-1">
        <TabsList className="inline-flex w-auto">
          {sections.map((section) => (
            <TabsTrigger key={section.section_key} value={section.section_key}>
              {sectionLabels[section.section_key] || section.section_key}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {sections.map((section) => (
        <TabsContent key={section.section_key} value={section.section_key}>
          <Card>
            <CardHeader>
              <CardTitle>
                {sectionLabels[section.section_key] || section.section_key}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ContentSectionForm section={section} onSuccess={handleSuccess} />
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  )
}
