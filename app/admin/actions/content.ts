"use server"

import { revalidatePath } from "next/cache"
import { getAdminServices } from "@/lib/firebase/admin"

export async function updateContentSection(
  sectionKey: string,
  content: Record<string, unknown>
) {
  const { db } = getAdminServices()

  if (!db) {
    return { success: false, error: "Firebase no está configurado en .env.local" }
  }

  try {
    await db
      .collection("site_content")
      .doc(sectionKey)
      .set(
        {
          section_key: sectionKey,
          content,
          updated_at: new Date().toISOString(),
        },
        { merge: true }
      )

    revalidatePath("/admin/content")
    revalidatePath("/")
    return { success: true }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error al actualizar sección de contenido"
    return { success: false, error: message }
  }
}
