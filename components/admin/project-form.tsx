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
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  technologies: z.string().min(1, "At least one technology is required"),
  url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  image_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  is_featured: z.boolean(),
  sort_order: z.number().min(0, "Sort order must be 0 or greater"),
})

type FormData = z.infer<typeof formSchema>

interface ProjectFormProps {
  project?: Project
  onSuccess: () => void
  onCancel: () => void
}

export function ProjectForm({ project, onSuccess, onCancel }: ProjectFormProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: project?.title || "",
      description: project?.description || "",
      technologies: project?.technologies?.join(", ") || "",
      url: project?.url || "",
      image_url: project?.image_url || "",
      is_featured: project?.is_featured || false,
      sort_order: project?.sort_order || 0,
    },
  })

  async function onSubmit(data: FormData) {
    setIsSubmitting(true)

    const formData = new FormData()
    formData.append("title", data.title)
    if (data.description) formData.append("description", data.description)
    formData.append("technologies", data.technologies)
    if (data.url) formData.append("url", data.url)
    if (data.image_url) formData.append("image_url", data.image_url)
    if (data.is_featured) formData.append("is_featured", "on")
    formData.append("sort_order", data.sort_order.toString())

    const result = project
      ? await updateProject(project.id, formData)
      : await createProject(formData)

    setIsSubmitting(false)

    if (result.success) {
      toast.success(project ? "Project updated" : "Project created")
      onSuccess()
    } else {
      toast.error(result.error || "Something went wrong")
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="project-title">Title</FieldLabel>
              <Input
                {...field}
                id="project-title"
                placeholder="My Project"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="project-description">Description</FieldLabel>
              <Textarea
                {...field}
                id="project-description"
                placeholder="A brief description of the project"
                className="min-h-[100px]"
                aria-invalid={fieldState.invalid}
              />
              <FieldDescription>Optional project description</FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="technologies"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="project-technologies">
                Technologies
              </FieldLabel>
              <Input
                {...field}
                id="project-technologies"
                placeholder="React, Next.js, TypeScript"
                aria-invalid={fieldState.invalid}
              />
              <FieldDescription>
                Comma-separated list of technologies
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="url"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="project-url">URL</FieldLabel>
              <Input
                {...field}
                id="project-url"
                placeholder="https://example.com"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="image_url"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="project-image">Image URL</FieldLabel>
              <Input
                {...field}
                id="project-image"
                placeholder="https://example.com/image.png"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="is_featured"
          control={form.control}
          render={({ field }) => (
            <Field orientation="horizontal">
              <FieldContent>
                <FieldLabel htmlFor="project-featured">Featured</FieldLabel>
                <FieldDescription>
                  Mark this project as featured
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

        <Controller
          name="sort_order"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="project-sort">Sort Order</FieldLabel>
              <Input
                {...field}
                id="project-sort"
                type="number"
                min={0}
                onChange={(e) => field.onChange(Number(e.target.value))}
                aria-invalid={fieldState.invalid}
              />
              <FieldDescription>
                Lower numbers appear first
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : project ? "Update" : "Create"}
          </Button>
        </div>
      </FieldGroup>
    </form>
  )
}
