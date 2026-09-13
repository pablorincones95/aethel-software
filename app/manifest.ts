import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Aethel Software — Precision Engineering Atelier",
    short_name: "Aethel",
    description:
      "Elite software engineering studio specializing in high-performance web platforms, mobile applications, AI systems, and cloud architecture.",
    start_url: "/",
    display: "standalone",
    background_color: "#030712",
    theme_color: "#030712",
    icons: [
      {
        src: "/aethel-logo.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  }
}
