"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { createProject, updateProject } from "@/app/admin/actions/projects"
import type { Project } from "@/lib/types"

const formSchema = z.object({
  title: z.string().min(1, "El título es requerido"),
  tag: z.string().optional(),
  tag_color: z.enum(["cyan", "gold"]),
  challenge: z.string().optional(),
  solution: z.string().optional(),
  metric_primary: z.string().optional(),
  metric_secondary: z.string().optional(),
  technologies: z.string().optional(),
  url: z.string().url("Debe ser una URL válida").optional().or(z.literal("")),
  image_url: z.string().url("Debe ser una URL válida").optional().or(z.literal("")),
  is_featured: z.boolean(),
  sort_order: z.number().min(0, "El orden debe ser 0 o superior"),
})

type ProjectFormValues = z.infer<typeof formSchema>

interface ProjectFormProps {
  project?: Project
  onSuccess: () => void
  onCancel: () => void
}

export function ProjectForm({ project, onSuccess, onCancel }: ProjectFormProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: project?.title || "",
      tag: project?.tag || "",
      tag_color: (project?.tag_color === "gold" ? "gold" : "cyan"),
      challenge: project?.challenge || "",
      solution: project?.solution || "",
      metric_primary: project?.metric_primary || "",
      metric_secondary: project?.metric_secondary || "",
      technologies: project?.technologies?.join(", ") || "",
      url: project?.url || "",
      image_url: project?.image_url || "",
      is_featured: project?.is_featured ?? true,
      sort_order: project?.sort_order ?? 0,
    },
  })

  async function onSubmit(data: ProjectFormValues) {
    setIsSubmitting(true)

    const formData = new FormData()
    formData.append("title", data.title)
    if (data.tag) formData.append("tag", data.tag)
    formData.append("tag_color", data.tag_color)
    if (data.challenge) formData.append("challenge", data.challenge)
    if (data.solution) formData.append("solution", data.solution)
    if (data.metric_primary) formData.append("metric_primary", data.metric_primary)
    if (data.metric_secondary) formData.append("metric_secondary", data.metric_secondary)
    if (data.technologies) formData.append("technologies", data.technologies)
    if (data.url) formData.append("url", data.url)
    if (data.image_url) formData.append("image_url", data.image_url)
    if (data.is_featured) formData.append("is_featured", "on")
    formData.append("sort_order", data.sort_order.toString())

    const result = project
      ? await updateProject(project.id, formData)
      : await createProject(formData)

    setIsSubmitting(false)

    if (result.success) {
      toast.success(project ? "Proyecto actualizado" : "Proyecto creado y publicado")
      onSuccess()
    } else {
      toast.error(result.error || "Ocurrió un error al guardar")
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FieldGroup className="space-y-3">
        {/* Título */}
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="project-title">Título del Proyecto / Caso *</FieldLabel>
              <Input
                {...field}
                id="project-title"
                placeholder="p. ej. Pasarela Transfronteriza Ultra Concurrente"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Tag & Tag Color */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Controller
            name="tag"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor="project-tag">Categoría / Etiqueta</FieldLabel>
                <Input
                  {...field}
                  id="project-tag"
                  placeholder="p. ej. Fintech & Core Bancario"
                />
              </Field>
            )}
          />

          <Controller
            name="tag_color"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor="project-tag-color">Color de Etiqueta</FieldLabel>
                <select
                  id="project-tag-color"
                  value={field.value}
                  onChange={field.onChange}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="cyan">Cyan Eléctrico (#00e5ff)</option>
                  <option value="gold">Oro Champagne (#e2c974)</option>
                </select>
              </Field>
            )}
          />
        </div>

        {/* Desafío */}
        <Controller
          name="challenge"
          control={form.control}
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor="project-challenge">Desafío / Problemática</FieldLabel>
              <Textarea
                {...field}
                id="project-challenge"
                placeholder="p. ej. Caídas recurrentes en picos de 40k transacciones por minuto..."
                className="min-h-[60px]"
              />
            </Field>
          )}
        />

        {/* Solución */}
        <Controller
          name="solution"
          control={form.control}
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor="project-solution">Solución Técnica Implementada</FieldLabel>
              <Textarea
                {...field}
                id="project-solution"
                placeholder="p. ej. Reescritura a microservicios con Postgres particionado y Redis..."
                className="min-h-[60px]"
              />
            </Field>
          )}
        />

        {/* Métricas */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Controller
            name="metric_primary"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor="project-metric1">Métrica Principal</FieldLabel>
                <Input
                  {...field}
                  id="project-metric1"
                  placeholder="p. ej. >150,000 TPS Estables"
                />
              </Field>
            )}
          />

          <Controller
            name="metric_secondary"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor="project-metric2">Métrica Secundaria</FieldLabel>
                <Input
                  {...field}
                  id="project-metric2"
                  placeholder="p. ej. 0% Downtime"
                />
              </Field>
            )}
          />
        </div>

        {/* Imagen & Tecnologías */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Controller
            name="image_url"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="project-image">URL de Imagen</FieldLabel>
                <Input
                  {...field}
                  id="project-image"
                  type="url"
                  placeholder="https://..."
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="technologies"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor="project-technologies">Tecnologías (coma)</FieldLabel>
                <Input
                  {...field}
                  id="project-technologies"
                  placeholder="Postgres, Redis, Next.js"
                />
              </Field>
            )}
          />
        </div>

        {/* URL & Orden */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Controller
            name="url"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="project-url">Enlace Externo (Opcional)</FieldLabel>
                <Input
                  {...field}
                  id="project-url"
                  type="url"
                  placeholder="https://..."
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="sort_order"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="project-order">Orden de Visualización</FieldLabel>
                <Input
                  {...field}
                  id="project-order"
                  type="number"
                  min="0"
                  onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </div>

        {/* Switch Destacado */}
        <Controller
          name="is_featured"
          control={form.control}
          render={({ field }) => (
            <Field orientation="horizontal" className="pt-2">
              <FieldContent>
                <FieldLabel htmlFor="project-featured">Visible en Landing Page</FieldLabel>
                <FieldDescription>
                  Activa para mostrar este caso de estudio en el portafolio público.
                </FieldDescription>
              </FieldContent>
              <Switch
                id="project-featured"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </Field>
          )}
        />
      </FieldGroup>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? "Guardando..."
            : project
            ? "Guardar Cambios"
            : "Crear Proyecto"}
        </Button>
      </div>
    </form>
  )
}
