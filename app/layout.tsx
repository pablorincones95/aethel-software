import type { Metadata } from "next"
import { Toaster } from "sonner"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

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
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  )
}
