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
import { getAdminServices } from "@/lib/firebase/admin"
import type { Project, SiteContent } from "@/lib/types"

export default async function Home() {
  let projects: Project[] = []
  const contentMap: Record<string, Record<string, unknown>> = {}

  const { db } = getAdminServices()

  if (db) {
    try {
      const [projectsSnap, contentSnap] = await Promise.all([
        db.collection("projects").orderBy("sort_order", "asc").get(),
        db.collection("site_content").get(),
      ])

      projects = projectsSnap.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Project, "id">),
      }))

      contentSnap.docs.forEach((doc) => {
        const data = doc.data() as SiteContent
        contentMap[doc.id] = data.content
      })
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
