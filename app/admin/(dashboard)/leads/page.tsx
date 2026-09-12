import { Inbox } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { LeadsClient } from "@/components/admin/leads-client"
import type { ContactLead } from "@/lib/types"

export default async function AdminLeadsPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  let leads: ContactLead[] = []

  if (supabaseUrl && supabaseKey) {
    try {
      const supabase = await createClient()
      const { data } = await supabase
        .from("contact_leads")
        .select("*")
        .order("created_at", { ascending: false })

      if (data) {
        leads = data as ContactLead[]
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
