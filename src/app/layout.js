import "./globals.css";
import Navbar from "../components/Navbar";
import { Analytics } from "@vercel/analytics/next";
import { SITE_CONFIG, getAbsoluteUrl } from "../lib/constants";

export const metadata = {
  title: "Johina - Muralist & Artist",
  description:
    "Renowned international muralist Johina G. Concheso creates stunning murals for UNESCO heritage sites, Royal Palaces, and Saudi Arabian & Swedish Embassies. Featured in Architectural Digest and Elle Decor. Based in Madrid, Spain.",
  keywords:
    "muralist, international artist, UNESCO heritage sites, Royal Palaces, Saudi Arabian Embassy, Swedish Embassy, Architectural Digest, Elle Decor, Madrid artist, mural painting, wall art, custom murals, interior design, art commission",
  author: SITE_CONFIG.AUTHOR,
  creator: SITE_CONFIG.AUTHOR,
  publisher: "Johina G. Concheso",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
  charset: "UTF-8",
  language: "en",

  // Icons
  icons: {
    icon: [
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },

  // Open Graph / Facebook
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.BASE_URL,
    siteName: SITE_CONFIG.SITE_NAME,
    title: "Johina G. Concheso - International Muralist & Artist",
    description:
      "Renowned international muralist creating stunning murals for UNESCO heritage sites, Royal Palaces, and prestigious embassies. Featured in Architectural Digest and Elle Decor.",
    images: [
      {
        url: getAbsoluteUrl("/meta-johina.jpg"),
        width: 1200,
        height: 1059,
        alt: "Johina G. Concheso - International Muralist and Artist",
        type: "image/jpeg",
      },
    ],
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    title: "Johina G. Concheso - International Muralist & Artist",
    description:
      "Renowned international muralist creating stunning murals for UNESCO heritage sites, Royal Palaces, and prestigious embassies.",
    images: [getAbsoluteUrl("/meta-johina.jpg")],
    creator: SITE_CONFIG.TWITTER_HANDLE,
  },

  // Additional SEO
  category: "Art & Culture",
  classification: "Art Portfolio",

  // Geo tags for local SEO
  geo: {
    region: "ES-MD",
    placename: "Madrid, Spain",
    position: "40.4168;-3.7038",
  },

  // Verification tags (add when available)
  // verification: {
  //   google: "your-google-verification-code",
  //   yandex: "your-yandex-verification-code",
  //   bing: "your-bing-verification-code",
  // },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <Analytics />
        {children}
      </body>
    </html>
  );
}
