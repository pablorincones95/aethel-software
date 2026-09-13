import type { Metadata } from "next"
import { Space_Grotesk, Hanken_Grotesk } from "next/font/google"
import { Toaster } from "sonner"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
})

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
})

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aethel.software"

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Aethel Software — Precision Engineering Atelier | Software de Élite & IA",
    template: "%s | Aethel Software",
  },
  description:
    "Estudio de ingeniería de software de élite. Diseñamos y construimos plataformas web de alto rendimiento, arquitecturas cloud resilientes y soluciones avanzadas de Inteligencia Artificial.",
  applicationName: "Aethel Software",
  authors: [{ name: "Aethel Software", url: baseUrl }],
  generator: "Next.js",
  keywords: [
    "Aethel Software",
    "estudio de ingeniería de software",
    "software engineering studio",
    "desarrollo web alto rendimiento",
    "arquitectura cloud de misión crítica",
    "ingeniería de inteligencia artificial",
    "Next.js enterprise",
    "TypeScript",
    "SaaS architecture",
    "diseño UI UX precisión",
    "Core Web Vitals",
    "desarrollo full stack",
    "cloud computing",
  ],
  referrer: "origin-when-cross-origin",
  creator: "Aethel Software",
  publisher: "Aethel Software",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
    languages: {
      "es-ES": "/",
      "en-US": "/",
    },
  },
  openGraph: {
    title: "Aethel Software — Precision Engineering Atelier | Software de Élite & IA",
    description:
      "Estudio de ingeniería de software de élite. Plataformas web de alta concurrencia, arquitecturas cloud resilientes e IA de vanguardia.",
    url: baseUrl,
    siteName: "Aethel Software",
    images: [
      {
        url: "/aethel-logo.svg",
        width: 1200,
        height: 630,
        alt: "Aethel Software — Precision Engineering Atelier",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aethel Software — Precision Engineering Atelier | Software de Élite & IA",
    description:
      "Estudio de ingeniería de software de élite. Plataformas web de alta concurrencia, arquitecturas cloud resilientes e IA de vanguardia.",
    site: "@aethelsoftware",
    creator: "@aethelsoftware",
    images: ["/aethel-logo.svg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/aethel-logo.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/aethel-logo.svg", type: "image/svg+xml" }],
    shortcut: "/aethel-logo.svg",
  },
  category: "technology",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`dark ${spaceGrotesk.variable} ${hankenGrotesk.variable}`}>
      <body
        className="min-h-screen bg-background text-foreground antialiased font-sans"
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  )
}
