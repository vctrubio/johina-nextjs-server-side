import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Johina - Muralist & Artist",
  description:
    "Renowned international muralist Johina G. Concheso creates stunning murals for UNESCO heritage sites, Royal Palaces, and Saudi Arabian & Swedish Embassies. Featured in Architectural Digest and Elle Decor. Based in Madrid, Spain.",
  keywords:
    "muralist, international artist, UNESCO heritage sites, Royal Palaces, Saudi Arabian Embassy, Swedish Embassy, Architectural Digest, Elle Decor, Madrid artist, mural painting, wall art, custom murals, interior design, art commission",
  author: "Johina G. Concheso",
  creator: "Johina G. Concheso",
  publisher: "Johina G. Concheso",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
  charset: "UTF-8",
  language: "en",

  // Open Graph / Facebook
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://johina.com",
    siteName: "Johina G. Concheso - International Muralist",
    title: "Johina G. Concheso - International Muralist & Artist",
    description:
      "Renowned international muralist creating stunning murals for UNESCO heritage sites, Royal Palaces, and prestigious embassies. Featured in Architectural Digest and Elle Decor.",
    images: [
      {
        url: "/johina-profile.jpg",
        width: 1200,
        height: 630,
        alt: "Johina G. Concheso - International Muralist and Artist",
      },
    ],
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    title: "Johina G. Concheso - International Muralist & Artist",
    description:
      "Renowned international muralist creating stunning murals for UNESCO heritage sites, Royal Palaces, and prestigious embassies.",
    images: ["/johina-profile.jpg"],
    creator: "@johinagconcheso",
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
        {children}
      </body>
    </html>
  );
}
