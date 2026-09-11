"use server"

export async function submitContactForm(
  _prevState: { success: boolean; error: string | null } | null,
  formData: FormData
): Promise<{ success: boolean; error: string | null }> {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const organization = formData.get("organization") as string
  const service = formData.get("service") as string
  const budget = formData.get("budget") as string
  const details = formData.get("details") as string

  if (!name || !email || !organization) {
    return { success: false, error: "Missing required fields" }
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // If Supabase is not configured, return success without saving
  if (!supabaseUrl || !supabaseKey) {
    console.log("[Contact Form] Supabase not configured — form data:", {
      name,
      email,
      organization,
      service,
      budget,
      details,
    })
    return { success: true, error: null }
  }

  try {
    const { createClient } = await import("@/lib/supabase/server")
    const supabase = await createClient()

    const { error } = await supabase.from("site_content").upsert(
      {
        section_key: `contact_${Date.now()}`,
        content: {
          name,
          email,
          organization,
          service,
          budget,
          details,
          submitted_at: new Date().toISOString(),
        },
      },
      { onConflict: "section_key" }
    )

    if (error) {
      console.error("Supabase error:", error)
      return { success: false, error: error.message }
    }

    return { success: true, error: null }
  } catch (err) {
    console.error("Contact form error:", err)
    return { success: false, error: "Internal server error" }
  }
}
