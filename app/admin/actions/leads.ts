"use server"

import { revalidatePath } from "next/cache"
import { getAdminServices } from "@/lib/firebase/admin"
import { verifyAdminSession } from "@/app/admin/actions/auth"

export async function updateLeadStatus(
  id: string,
  status: "new" | "contacted" | "closed"
) {
  const session = await verifyAdminSession()
  if (!session.authenticated) {
    return { success: false, error: session.error || "Acceso no autorizado." }
  }

  if (!id || typeof id !== "string") {
    return { success: false, error: "ID de lead inválido." }
  }

  const validStatuses = new Set(["new", "contacted", "closed"])
  if (!validStatuses.has(status)) {
    return { success: false, error: "Estado no válido." }
  }

  const { db } = getAdminServices()
  if (!db) {
    return { success: false, error: "Firebase no está configurado en el servidor." }
  }

  try {
    await db.collection("contact_leads").doc(id).update({
      status,
      updated_at: new Date().toISOString(),
      updated_by: session.email || "admin",
    })

    revalidatePath("/admin/leads")
    return { success: true }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error al actualizar estado del lead"
    return { success: false, error: message }
  }
}

export async function deleteLead(id: string) {
  const session = await verifyAdminSession()
  if (!session.authenticated) {
    return { success: false, error: session.error || "Acceso no autorizado." }
  }

  if (!id || typeof id !== "string") {
    return { success: false, error: "ID de lead inválido." }
  }

  const { db } = getAdminServices()
  if (!db) {
    return { success: false, error: "Firebase no está configurado en el servidor." }
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

