import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/data/site";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: `${site.name} — Market intelligence dashboard`,
    template: `%s · ${site.name}`,
  },
  description:
    "Premium market intelligence dashboard—price trends, regional insights, and investment signals. Illustrative demo.",
  openGraph: {
    title: site.name,
    description:
      "Premium market intelligence dashboard—price trends, regional insights, and investment signals.",
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description:
      "Premium market intelligence dashboard—price trends, regional insights, and investment signals.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full antialiased">
        <SmoothScroll>
          <SiteHeader />
          <div className="flex flex-col pt-16 lg:pt-[4.25rem]">{children}</div>
        </SmoothScroll>
      </body>
    </html>
  );
}
