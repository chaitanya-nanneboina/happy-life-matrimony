import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://happylifematrimony.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Happy Life Matrimony | Find Your Perfect Life Partner in Hyderabad",
    template: "%s | Happy Life Matrimony",
  },
  description:
    "Happy Life Matrimony is a trusted, privacy-first Indian matrimony service based in Hyderabad. Register your profile today and find a compatible life partner through personalized, secure matchmaking.",
  keywords: [
    "matrimony hyderabad",
    "Indian matrimony",
    "Telugu matrimony",
    "marriage bureau Hyderabad",
    "happy life matrimony",
    "find life partner",
    "matrimonial service",
  ],
  authors: [{ name: "CHETTIMALA RAMA CHANDRA RAO", url: siteUrl }],
  creator: "Happy Life Matrimony",
  publisher: "Happy Life Matrimony",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Happy Life Matrimony",
    title: "Happy Life Matrimony | Find Your Perfect Life Partner",
    description:
      "A trusted, privacy-first Indian matrimony service. Register your profile and find your perfect match with personal attention and care.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Happy Life Matrimony — Find Your Perfect Life Partner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Happy Life Matrimony | Find Your Perfect Life Partner",
    description:
      "Trusted Indian matrimony service in Hyderabad. Register your profile today.",
    images: ["/og-image.jpg"],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "Happy Life Matrimony",
  url: siteUrl,
  telephone: "+918688971732",
  founder: {
    "@type": "Person",
    name: "CHETTIMALA RAMA CHANDRA RAO",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hyderabad",
    addressRegion: "Telangana",
    addressCountry: "IN",
  },
  description:
    "Happy Life Matrimony is a trusted, privacy-first Indian matrimony service based in Hyderabad, offering personalized matchmaking.",
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteUrl}/#localbusiness`,
  name: "Happy Life Matrimony",
  url: siteUrl,
  telephone: "+918688971732",
  geo: {
    "@type": "GeoCoordinates",
    latitude: 17.443939208984375,
    longitude: 78.44844055175781,
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hyderabad",
    addressRegion: "Telangana",
    addressCountry: "IN",
  },
  priceRange: "₹",
  openingHours: "Mo-Su 09:00-21:00",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: "Happy Life Matrimony",
  description:
    "Trusted Indian matrimony service offering personalized matchmaking in Hyderabad.",
  publisher: { "@id": `${siteUrl}/#organization` },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#8B1A2E" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
