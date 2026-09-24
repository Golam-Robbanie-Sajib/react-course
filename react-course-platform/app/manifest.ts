import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Self-Learn Hub — HTML, C & React",
    short_name: "Self-Learn",
    description:
      "Self-paced HTML, C and React courses with in-browser coding, auto-graded exercises and an AI tutor.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#ffffff",
    theme_color: "#2563eb",
    categories: ["education", "productivity"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "Dashboard", url: "/dashboard" },
      { name: "Practice", url: "/practice" },
      { name: "C Playground", url: "/playground" },
    ],
  }
}
