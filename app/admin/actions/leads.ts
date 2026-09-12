"use server"

import { revalidatePath } from "next/cache"
import { getAdminServices } from "@/lib/firebase/admin"

export async function updateLeadStatus(
  id: string,
  status: "new" | "contacted" | "closed"
) {
  const { db } = getAdminServices()

  if (!db) {
    return { success: false, error: "Firebase no está configurado en .env.local" }
  }

  try {
    await db.collection("contact_leads").doc(id).update({
      status,
      updated_at: new Date().toISOString(),
    })

    revalidatePath("/admin/leads")
    return { success: true }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error al actualizar estado del lead"
    return { success: false, error: message }
  }
}

export async function deleteLead(id: string) {
  const { db } = getAdminServices()

  if (!db) {
    return { success: false, error: "Firebase no está configurado en .env.local" }
  }

  try {
    await db.collection("contact_leads").doc(id).delete()

    revalidatePath("/admin/leads")
    return { success: true }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error al eliminar lead"
    return { success: false, error: message }
  }
}
