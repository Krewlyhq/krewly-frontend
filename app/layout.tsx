import type React from "react"
import type { Metadata } from "next"
import { Urbanist } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const urbanist = Urbanist({ subsets: ["latin"], variable: "--font-urbanist" })

export const metadata: Metadata = {
  title: "Krewly - Find Event Vendors",
  description: "Discover trusted makeup artists, photographers, gele stylists, decorators and more for your next event.",
  generator: "Krewly",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${urbanist.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
