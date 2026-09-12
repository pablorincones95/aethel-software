"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"

export async function updateLeadStatus(
  id: string,
  status: "new" | "contacted" | "closed"
) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    return { success: false, error: "Supabase no está configurado en .env.local" }
  }

  const supabase = await createClient()

  const { error } = await supabase
    .from("contact_leads")
    .update({ status })
    .eq("id", id)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath("/admin/leads")
  return { success: true }
}

export async function deleteLead(id: string) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    return { success: false, error: "Supabase no está configurado en .env.local" }
  }

  const supabase = await createClient()

  const { error } = await supabase.from("contact_leads").delete().eq("id", id)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath("/admin/leads")
  return { success: true }
}
