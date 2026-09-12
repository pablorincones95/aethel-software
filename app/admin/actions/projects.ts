"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { z } from "zod"

const projectSchema = z.object({
  title: z.string().min(1, "El título es requerido"),
  description: z.string().optional(),
  challenge: z.string().optional(),
  solution: z.string().optional(),
  tag: z.string().optional(),
  tag_color: z.enum(["cyan", "gold"]).default("cyan"),
  metric_primary: z.string().optional(),
  metric_secondary: z.string().optional(),
  technologies: z.string().transform((val) =>
    val
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)
  ),
  url: z.string().url().optional().or(z.literal("")),
  image_url: z.string().url().optional().or(z.literal("")),
  is_featured: z.boolean(),
  sort_order: z.number().min(0),
})

export async function createProject(formData: FormData) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    return { success: false, error: "Supabase no está configurado en .env.local" }
  }

  const rawData = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    challenge: formData.get("challenge") as string,
    solution: formData.get("solution") as string,
    tag: formData.get("tag") as string,
    tag_color: (formData.get("tag_color") as string) || "cyan",
    metric_primary: formData.get("metric_primary") as string,
    metric_secondary: formData.get("metric_secondary") as string,
    technologies: (formData.get("technologies") as string) || "",
    url: formData.get("url") as string,
    image_url: formData.get("image_url") as string,
    is_featured: formData.get("is_featured") === "on" || formData.get("is_featured") === "true",
    sort_order: Number(formData.get("sort_order") || 0),
  }

  const validated = projectSchema.safeParse(rawData)

  if (!validated.success) {
    return { success: false, error: validated.error.errors[0].message }
  }

  const supabase = await createClient()

  const { error } = await supabase.from("projects").insert({
    title: validated.data.title,
    description: validated.data.description || null,
    challenge: validated.data.challenge || null,
    solution: validated.data.solution || null,
    tag: validated.data.tag || null,
    tag_color: validated.data.tag_color,
    metric_primary: validated.data.metric_primary || null,
    metric_secondary: validated.data.metric_secondary || null,
    technologies: validated.data.technologies,
    url: validated.data.url || null,
    image_url: validated.data.image_url || null,
    is_featured: validated.data.is_featured,
    sort_order: validated.data.sort_order,
  })

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath("/admin/projects")
  revalidatePath("/")
  return { success: true }
}

export async function updateProject(id: string, formData: FormData) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    return { success: false, error: "Supabase no está configurado en .env.local" }
  }

  const rawData = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    challenge: formData.get("challenge") as string,
    solution: formData.get("solution") as string,
    tag: formData.get("tag") as string,
    tag_color: (formData.get("tag_color") as string) || "cyan",
    metric_primary: formData.get("metric_primary") as string,
    metric_secondary: formData.get("metric_secondary") as string,
    technologies: (formData.get("technologies") as string) || "",
    url: formData.get("url") as string,
    image_url: formData.get("image_url") as string,
    is_featured: formData.get("is_featured") === "on" || formData.get("is_featured") === "true",
    sort_order: Number(formData.get("sort_order") || 0),
  }

  const validated = projectSchema.safeParse(rawData)

  if (!validated.success) {
    return { success: false, error: validated.error.errors[0].message }
  }

  const supabase = await createClient()

  const { error } = await supabase
    .from("projects")
    .update({
      title: validated.data.title,
      description: validated.data.description || null,
      challenge: validated.data.challenge || null,
      solution: validated.data.solution || null,
      tag: validated.data.tag || null,
      tag_color: validated.data.tag_color,
      metric_primary: validated.data.metric_primary || null,
      metric_secondary: validated.data.metric_secondary || null,
      technologies: validated.data.technologies,
      url: validated.data.url || null,
      image_url: validated.data.image_url || null,
      is_featured: validated.data.is_featured,
      sort_order: validated.data.sort_order,
    })
    .eq("id", id)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath("/admin/projects")
  revalidatePath("/")
  return { success: true }
}

export async function deleteProject(id: string) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    return { success: false, error: "Supabase no está configurado en .env.local" }
  }

  const supabase = await createClient()

  const { error } = await supabase.from("projects").delete().eq("id", id)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath("/admin/projects")
  revalidatePath("/")
  return { success: true }
}
