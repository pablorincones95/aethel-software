import { Inbox } from "lucide-react"
import { getAdminServices } from "@/lib/firebase/admin"
import { LeadsClient } from "@/components/admin/leads-client"
import type { ContactLead } from "@/lib/types"

export default async function AdminLeadsPage() {
  const { db } = getAdminServices()

  let leads: ContactLead[] = []

  if (db) {
    try {
      const snap = await db
        .collection("contact_leads")
        .orderBy("created_at", "desc")
        .get()

      if (!snap.empty) {
        leads = snap.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<ContactLead, "id">),
        }))
      }
    } catch {
      // Fallback
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="flex items-center gap-3 text-2xl font-bold">
          <Inbox className="h-6 w-6" />
          Leads & Solicitudes de Contacto
        </h1>
        <p className="mt-1 text-muted-foreground">
          Revisa y gestiona las solicitudes técnicas enviadas desde la landing page.
        </p>
      </div>

      <LeadsClient leads={leads} />
    </div>
  )
}
