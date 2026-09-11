import { Navbar } from "@/components/landing/navbar"
import { Hero } from "@/components/landing/hero"
import { SocialProof } from "@/components/landing/social-proof"
import { Services } from "@/components/landing/services"
import { TechStack } from "@/components/landing/tech-stack"
import { Process } from "@/components/landing/process"
import { CaseStudies } from "@/components/landing/case-studies"
import { Philosophy } from "@/components/landing/philosophy"
import { Contact } from "@/components/landing/contact"
import { Footer } from "@/components/landing/footer"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <Services />
        <TechStack />
        <Process />
        <CaseStudies />
        <Philosophy />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
