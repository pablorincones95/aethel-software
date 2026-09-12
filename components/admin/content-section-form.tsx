"use client"

import * as React from "react"
import { toast } from "sonner"
import { Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { updateContentSection } from "@/app/admin/actions/content"
import type { SiteContent } from "@/lib/types"

interface ContentSectionFormProps {
  section: SiteContent
  onSuccess: () => void
}

export function ContentSectionForm({ section, onSuccess }: ContentSectionFormProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [content, setContent] = React.useState<Record<string, unknown>>(
    section.content
  )

  function updateField(key: string, value: unknown) {
    setContent((prev) => ({ ...prev, [key]: value }))
  }

  function updateArrayItem(
    arrayKey: string,
    index: number,
    itemKey: string,
    value: unknown
  ) {
    const array = (content[arrayKey] as Record<string, unknown>[]) || []
    const newArray = [...array]
    newArray[index] = { ...newArray[index], [itemKey]: value }
    updateField(arrayKey, newArray)
  }

  function addArrayItem(arrayKey: string, template: Record<string, unknown>) {
    const array = (content[arrayKey] as Record<string, unknown>[]) || []
    updateField(arrayKey, [...array, template])
  }

  function removeArrayItem(arrayKey: string, index: number) {
    const array = (content[arrayKey] as Record<string, unknown>[]) || []
    updateField(
      arrayKey,
      array.filter((_, i) => i !== index)
    )
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)

    const result = await updateContentSection(section.section_key, content)

    setIsSubmitting(false)

    if (result.success) {
      toast.success("Contenido actualizado en tiempo real")
      onSuccess()
    } else {
      toast.error(result.error || "Error al actualizar contenido")
    }
  }

  function renderSectionFields() {
    switch (section.section_key) {
      case "hero":
        return (
          <>
            <Field>
              <FieldLabel>Badge Superior (Texto Pequeño)</FieldLabel>
              <Input
                value={(content.badge_text as string) || ""}
                onChange={(e) => updateField("badge_text", e.target.value)}
              />
            </Field>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel>Título Principal (Parte 1)</FieldLabel>
                <Input
                  value={(content.title as string) || ""}
                  onChange={(e) => updateField("title", e.target.value)}
                />
              </Field>

              <Field>
                <FieldLabel>Título en Gradiente (Cyan/Gold)</FieldLabel>
                <Input
                  value={(content.title_gradient as string) || ""}
                  onChange={(e) => updateField("title_gradient", e.target.value)}
                />
              </Field>
            </div>

            <Field>
              <FieldLabel>Subtítulo / Bajada Descriptiva</FieldLabel>
              <Textarea
                value={(content.subtitle as string) || ""}
                onChange={(e) => updateField("subtitle", e.target.value)}
                className="min-h-[80px]"
              />
            </Field>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel>Botón CTA Primario</FieldLabel>
                <Input
                  value={(content.cta_primary_text as string) || ""}
                  onChange={(e) => updateField("cta_primary_text", e.target.value)}
                />
              </Field>

              <Field>
                <FieldLabel>Botón CTA Secundario</FieldLabel>
                <Input
                  value={(content.cta_secondary_text as string) || ""}
                  onChange={(e) => updateField("cta_secondary_text", e.target.value)}
                />
              </Field>
            </div>

            <Separator />
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Telemetría de Consola (Tarjeta Derecha)
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel>Versión Runtime</FieldLabel>
                <Input
                  value={(content.runtime_version as string) || ""}
                  onChange={(e) => updateField("runtime_version", e.target.value)}
                />
              </Field>

              <Field>
                <FieldLabel>Badge de Seguridad</FieldLabel>
                <Input
                  value={(content.security_badge as string) || ""}
                  onChange={(e) => updateField("security_badge", e.target.value)}
                />
              </Field>
            </div>
          </>
        )

      case "services":
        return (
          <>
            <Field>
              <FieldLabel>Etiqueta de Sección</FieldLabel>
              <Input
                value={(content.label as string) || ""}
                onChange={(e) => updateField("label", e.target.value)}
              />
            </Field>

            <Field>
              <FieldLabel>Título de Sección</FieldLabel>
              <Input
                value={(content.title as string) || ""}
                onChange={(e) => updateField("title", e.target.value)}
              />
            </Field>

            <Field>
              <FieldLabel>Subtítulo de Sección</FieldLabel>
              <Textarea
                value={(content.subtitle as string) || ""}
                onChange={(e) => updateField("subtitle", e.target.value)}
                className="min-h-[70px]"
              />
            </Field>

            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <FieldLabel>Tarjetas de Servicios</FieldLabel>
                <FieldDescription>Servicios principales mostrados en grid</FieldDescription>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  addArrayItem("items", {
                    number: "0" + (((content.items as unknown[]) || []).length + 1) + " // NUEVO",
                    title: "",
                    desc: "",
                    tags: [],
                  })
                }
              >
                <Plus className="mr-1 h-3.5 w-3.5" /> Agregar Servicio
              </Button>
            </div>

            <div className="space-y-4">
              {((content.items as Record<string, unknown>[]) || []).map((item, index) => (
                <div key={index} className="rounded-lg border p-4 space-y-3 bg-muted/20">
                  <div className="flex items-center justify-between gap-2">
                    <Input
                      placeholder="Número (p. ej. 01 // WEB & SAAS)"
                      value={(item.number as string) || ""}
                      onChange={(e) =>
                        updateArrayItem("items", index, "number", e.target.value)
                      }
                      className="max-w-[240px] font-mono text-xs"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeArrayItem("items", index)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <Input
                    placeholder="Título del Servicio"
                    value={(item.title as string) || ""}
                    onChange={(e) =>
                      updateArrayItem("items", index, "title", e.target.value)
                    }
                  />
                  <Textarea
                    placeholder="Descripción detallada"
                    value={(item.desc as string) || ""}
                    onChange={(e) =>
                      updateArrayItem("items", index, "desc", e.target.value)
                    }
                    className="min-h-[60px]"
                  />
                  <Input
                    placeholder="Etiquetas / Tecnologías (separadas por coma)"
                    value={
                      Array.isArray(item.tags)
                        ? item.tags.join(", ")
                        : (item.tags as string) || ""
                    }
                    onChange={(e) =>
                      updateArrayItem(
                        "items",
                        index,
                        "tags",
                        e.target.value.split(",").map((t) => t.trim()).filter(Boolean)
                      )
                    }
                  />
                </div>
              ))}
            </div>
          </>
        )

      case "design_seo":
        return (
          <>
            <Field>
              <FieldLabel>Etiqueta de Sección</FieldLabel>
              <Input
                value={(content.label as string) || ""}
                onChange={(e) => updateField("label", e.target.value)}
              />
            </Field>

            <Field>
              <FieldLabel>Título Principal</FieldLabel>
              <Input
                value={(content.title as string) || ""}
                onChange={(e) => updateField("title", e.target.value)}
              />
            </Field>

            <Field>
              <FieldLabel>Subtítulo Explicativo</FieldLabel>
              <Textarea
                value={(content.subtitle as string) || ""}
                onChange={(e) => updateField("subtitle", e.target.value)}
              />
            </Field>

            <Separator />
            <FieldLabel>Tarjetas de Diseño & Crecimiento</FieldLabel>
            <div className="space-y-4">
              {((content.cards as Record<string, unknown>[]) || []).map((card, index) => (
                <div key={index} className="rounded-lg border p-4 space-y-3 bg-muted/20">
                  <Input
                    placeholder="Título de la Tarjeta"
                    value={(card.title as string) || ""}
                    onChange={(e) =>
                      updateArrayItem("cards", index, "title", e.target.value)
                    }
                  />
                  <Textarea
                    placeholder="Descripción"
                    value={(card.desc as string) || ""}
                    onChange={(e) =>
                      updateArrayItem("cards", index, "desc", e.target.value)
                    }
                  />
                  <Input
                    placeholder="Tags destacados (coma)"
                    value={
                      Array.isArray(card.tags)
                        ? card.tags.join(", ")
                        : (card.tags as string) || ""
                    }
                    onChange={(e) =>
                      updateArrayItem(
                        "cards",
                        index,
                        "tags",
                        e.target.value.split(",").map((t) => t.trim()).filter(Boolean)
                      )
                    }
                  />
                </div>
              ))}
            </div>
          </>
        )

      case "ai_services":
        return (
          <>
            <Field>
              <FieldLabel>Etiqueta de Sección</FieldLabel>
              <Input
                value={(content.label as string) || ""}
                onChange={(e) => updateField("label", e.target.value)}
              />
            </Field>

            <Field>
              <FieldLabel>Título de Sección</FieldLabel>
              <Input
                value={(content.title as string) || ""}
                onChange={(e) => updateField("title", e.target.value)}
              />
            </Field>

            <Field>
              <FieldLabel>Subtítulo de Sección</FieldLabel>
              <Textarea
                value={(content.subtitle as string) || ""}
                onChange={(e) => updateField("subtitle", e.target.value)}
              />
            </Field>

            <Separator />
            <FieldLabel>Módulos de Inteligencia Artificial</FieldLabel>
            <div className="space-y-4">
              {((content.cards as Record<string, unknown>[]) || []).map((card, index) => (
                <div key={index} className="rounded-lg border p-4 space-y-3 bg-muted/20">
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <Input
                      placeholder="Número (p. ej. 01 // AGENTES)"
                      value={(card.number as string) || ""}
                      onChange={(e) =>
                        updateArrayItem("cards", index, "number", e.target.value)
                      }
                      className="font-mono text-xs"
                    />
                    <Input
                      placeholder="Métrica (p. ej. <80ms Latencia)"
                      value={(card.metric as string) || ""}
                      onChange={(e) =>
                        updateArrayItem("cards", index, "metric", e.target.value)
                      }
                    />
                  </div>
                  <Input
                    placeholder="Título del Servicio IA"
                    value={(card.title as string) || ""}
                    onChange={(e) =>
                      updateArrayItem("cards", index, "title", e.target.value)
                    }
                  />
                  <Textarea
                    placeholder="Descripción técnica"
                    value={(card.desc as string) || ""}
                    onChange={(e) =>
                      updateArrayItem("cards", index, "desc", e.target.value)
                    }
                  />
                  <Input
                    placeholder="Tags (separados por coma)"
                    value={
                      Array.isArray(card.tags)
                        ? card.tags.join(", ")
                        : (card.tags as string) || ""
                    }
                    onChange={(e) =>
                      updateArrayItem(
                        "cards",
                        index,
                        "tags",
                        e.target.value.split(",").map((t) => t.trim()).filter(Boolean)
                      )
                    }
                  />
                </div>
              ))}
            </div>
          </>
        )

      case "tech_stack":
        return (
          <>
            <Field>
              <FieldLabel>Etiqueta de Sección</FieldLabel>
              <Input
                value={(content.label as string) || ""}
                onChange={(e) => updateField("label", e.target.value)}
              />
            </Field>

            <Field>
              <FieldLabel>Título</FieldLabel>
              <Input
                value={(content.title as string) || ""}
                onChange={(e) => updateField("title", e.target.value)}
              />
            </Field>

            <Field>
              <FieldLabel>Subtítulo</FieldLabel>
              <Textarea
                value={(content.subtitle as string) || ""}
                onChange={(e) => updateField("subtitle", e.target.value)}
              />
            </Field>

            <Separator />
            <FieldLabel>Herramientas del Stack (10 Elementos)</FieldLabel>
            <div className="space-y-3">
              {((content.items as Record<string, unknown>[]) || []).map((item, index) => (
                <div key={index} className="flex gap-2 items-center rounded border p-2 bg-muted/20">
                  <span className="w-8 text-center font-mono text-xs text-muted-foreground">
                    {(item.number as string) || "0" + (index + 1)}
                  </span>
                  <Input
                    placeholder="Nombre tecnología"
                    value={(item.name as string) || ""}
                    onChange={(e) =>
                      updateArrayItem("items", index, "name", e.target.value)
                    }
                    className="max-w-[200px]"
                  />
                  <Input
                    placeholder="Descripción / función"
                    value={(item.desc as string) || ""}
                    onChange={(e) =>
                      updateArrayItem("items", index, "desc", e.target.value)
                    }
                  />
                </div>
              ))}
            </div>
          </>
        )

      case "process":
        return (
          <>
            <Field>
              <FieldLabel>Etiqueta de Sección</FieldLabel>
              <Input
                value={(content.label as string) || ""}
                onChange={(e) => updateField("label", e.target.value)}
              />
            </Field>

            <Field>
              <FieldLabel>Título</FieldLabel>
              <Input
                value={(content.title as string) || ""}
                onChange={(e) => updateField("title", e.target.value)}
              />
            </Field>

            <Field>
              <FieldLabel>Subtítulo</FieldLabel>
              <Textarea
                value={(content.subtitle as string) || ""}
                onChange={(e) => updateField("subtitle", e.target.value)}
              />
            </Field>

            <Separator />
            <FieldLabel>Fases del Proceso</FieldLabel>
            <div className="space-y-4">
              {((content.phases as Record<string, unknown>[]) || []).map((phase, index) => (
                <div key={index} className="rounded-lg border p-4 space-y-2 bg-muted/20">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Número (01, 02...)"
                      value={(phase.number as string) || ""}
                      onChange={(e) =>
                        updateArrayItem("phases", index, "number", e.target.value)
                      }
                      className="max-w-[80px] font-mono"
                    />
                    <Input
                      placeholder="Título de la Fase"
                      value={(phase.title as string) || ""}
                      onChange={(e) =>
                        updateArrayItem("phases", index, "title", e.target.value)
                      }
                    />
                  </div>
                  <Textarea
                    placeholder="Descripción detallada de la fase"
                    value={(phase.desc as string) || ""}
                    onChange={(e) =>
                      updateArrayItem("phases", index, "desc", e.target.value)
                    }
                  />
                </div>
              ))}
            </div>
          </>
        )

      case "philosophy":
        return (
          <>
            <Field>
              <FieldLabel>Etiqueta de Sección</FieldLabel>
              <Input
                value={(content.label as string) || ""}
                onChange={(e) => updateField("label", e.target.value)}
              />
            </Field>

            <Field>
              <FieldLabel>Título</FieldLabel>
              <Input
                value={(content.title as string) || ""}
                onChange={(e) => updateField("title", e.target.value)}
              />
            </Field>

            <Field>
              <FieldLabel>Cita Principal / Manifiesto</FieldLabel>
              <Textarea
                value={(content.quote as string) || ""}
                onChange={(e) => updateField("quote", e.target.value)}
              />
            </Field>

            <Separator />
            <FieldLabel>Pilares de Ingeniería</FieldLabel>
            <div className="space-y-4">
              {((content.pillars as Record<string, unknown>[]) || []).map((pillar, index) => (
                <div key={index} className="rounded-lg border p-4 space-y-2 bg-muted/20">
                  <Input
                    placeholder="Título del Pilar"
                    value={(pillar.title as string) || ""}
                    onChange={(e) =>
                      updateArrayItem("pillars", index, "title", e.target.value)
                    }
                  />
                  <Textarea
                    placeholder="Descripción"
                    value={(pillar.desc as string) || ""}
                    onChange={(e) =>
                      updateArrayItem("pillars", index, "desc", e.target.value)
                    }
                  />
                </div>
              ))}
            </div>
          </>
        )

      case "contact":
        return (
          <>
            <Field>
              <FieldLabel>Etiqueta de Sección</FieldLabel>
              <Input
                value={(content.label as string) || ""}
                onChange={(e) => updateField("label", e.target.value)}
              />
            </Field>

            <Field>
              <FieldLabel>Título</FieldLabel>
              <Input
                value={(content.title as string) || ""}
                onChange={(e) => updateField("title", e.target.value)}
              />
            </Field>

            <Field>
              <FieldLabel>Subtítulo de Contacto</FieldLabel>
              <Textarea
                value={(content.subtitle as string) || ""}
                onChange={(e) => updateField("subtitle", e.target.value)}
              />
            </Field>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel>Aviso de Confidencialidad / Seguridad</FieldLabel>
                <Input
                  value={(content.security_notice as string) || ""}
                  onChange={(e) => updateField("security_notice", e.target.value)}
                />
              </Field>

              <Field>
                <FieldLabel>Tiempo Estimado de Respuesta</FieldLabel>
                <Input
                  value={(content.response_time as string) || ""}
                  onChange={(e) => updateField("response_time", e.target.value)}
                />
              </Field>
            </div>
          </>
        )

      default:
        return (
          <div className="text-sm text-muted-foreground">
            Editor genérico de JSON disponible para esta sección.
          </div>
        )
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <FieldGroup className="space-y-4">{renderSectionFields()}</FieldGroup>

      <div className="flex justify-end pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Guardando..." : "Guardar Cambios"}
        </Button>
      </div>
    </form>
  )
}
