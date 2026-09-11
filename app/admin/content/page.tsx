import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"
import { FileText } from "lucide-react"

export default async function AdminContent() {
  const supabase = await createClient()

  const { data: sections } = await supabase
    .from("site_content")
    .select("*")
    .order("section_key", { ascending: true })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="flex items-center gap-3 text-headline-lg text-text-ice">
          <FileText className="h-6 w-6 text-primary-container" />
          Content Manager
        </h1>
        <p className="mt-1 text-body-md text-text-muted">
          Edit landing page text sections in real time.
        </p>
      </div>

      {/* Content Sections */}
      <div className="space-y-4">
        {sections && sections.length > 0 ? (
          sections.map((section) => (
            <Card key={section.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-title-sm text-text-ice">
                    {section.section_key}
                  </CardTitle>
                  <button className="text-sm text-text-muted hover:text-primary-container">
                    Edit
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                <pre className="overflow-x-auto rounded-[4px] bg-surface-abyssal p-4 text-body-sm text-text-muted">
                  {JSON.stringify(section.content, null, 2)}
                </pre>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="flex h-24 items-center justify-center text-text-muted">
              No content sections found. Run the SQL seed script to initialize.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
