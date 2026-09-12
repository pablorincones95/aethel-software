import { Navbar } from "@/components/landing/navbar"
import { Hero } from "@/components/landing/hero"
import { SocialProof } from "@/components/landing/social-proof"
import { Services } from "@/components/landing/services"
import { DesignSeo } from "@/components/landing/design-seo"
import { AiServices } from "@/components/landing/ai-services"
import { TechStack } from "@/components/landing/tech-stack"
import { Process } from "@/components/landing/process"
import { CaseStudies } from "@/components/landing/case-studies"
import { Philosophy } from "@/components/landing/philosophy"
import { Contact } from "@/components/landing/contact"
import { Footer } from "@/components/landing/footer"
import { createClient } from "@/lib/supabase/server"
import type { Project, SiteContent } from "@/lib/types"

export default async function Home() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  let projects: Project[] = []
  const contentMap: Record<string, Record<string, unknown>> = {}

  if (supabaseUrl && supabaseKey) {
    try {
      const supabase = await createClient()
      const [{ data: projectsData }, { data: contentData }] = await Promise.all([
        supabase
          .from("projects")
          .select("*")
          .order("sort_order", { ascending: true }),
        supabase.from("site_content").select("*"),
      ])

      if (projectsData) {
        projects = projectsData as Project[]
      }

      if (contentData) {
        contentData.forEach((item: SiteContent) => {
          contentMap[item.section_key] = item.content
        })
      }
    } catch {
      // Graceful fallback to default landing content
    }
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero content={contentMap["hero"]} />
        <SocialProof />
        <Services content={contentMap["services"]} />
        <DesignSeo content={contentMap["design_seo"]} />
        <AiServices content={contentMap["ai_services"]} />
        <TechStack content={contentMap["tech_stack"]} />
        <Process content={contentMap["process"]} />
        <CaseStudies projects={projects} />
        <Philosophy content={contentMap["philosophy"]} />
        <Contact content={contentMap["contact"]} />
      </main>
      <Footer />
    </>
  )
}
