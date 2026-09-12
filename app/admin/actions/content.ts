"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"

export async function updateContentSection(
  sectionKey: string,
  content: Record<string, unknown>
) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    return { success: false, error: "Supabase no está configurado en .env.local" }
  }

  const supabase = await createClient()

  const { error } = await supabase
    .from("site_content")
    .upsert({ section_key: sectionKey, content }, { onConflict: "section_key" })

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath("/admin/content")
  revalidatePath("/")
  return { success: true }
}
