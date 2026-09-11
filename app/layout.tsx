import type { Metadata } from "next"
import "./globals.css"
import "@/styles/global.scss"

export const metadata: Metadata = {
  title: "Aethel Software — Precision Engineering Atelier",
  description:
    "Elite software engineering studio specializing in high-performance web platforms, mobile applications, and cloud architecture.",
  keywords: [
    "software engineering",
    "web development",
    "SaaS",
    "cloud architecture",
    "DevOps",
    "React",
    "Next.js",
    "TypeScript",
  ],
  openGraph: {
    title: "Aethel Software — Precision Engineering Atelier",
    description:
      "Elite software engineering studio specializing in high-performance web platforms, mobile applications, and cloud architecture.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-canvas-void text-on-surface antialiased">
        {children}
      </body>
    </html>
  )
}
