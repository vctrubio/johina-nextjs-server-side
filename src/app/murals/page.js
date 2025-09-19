import { getMurals } from "../../services/murals";
import { getCategories } from "../../services/categories";
import MuralsClient from "../../components/MuralsClient";

export const metadata = {
  title: "Murals | Johina",
  description: "Explore the stunning mural portfolio of internationally renowned artist Johina G. Concheso. Browse custom murals for hotels, restaurants, private residences, UNESCO heritage sites, Royal Palaces, and prestigious embassies including Saudi Arabian & Swedish Embassies.",
  keywords: "mural gallery, custom murals, hotel murals, restaurant murals, private residence murals, UNESCO heritage site murals, Royal Palace murals, embassy murals, Saudi Arabian Embassy mural, Swedish Embassy mural, wall art portfolio, interior design murals, commercial murals, residential murals, Madrid muralist, international mural artist, Johina G. Concheso portfolio",
  author: "Johina G. Concheso",
  creator: "Johina G. Concheso",
  
  // Open Graph
  openGraph: {
    title: "Murals | Johina",
    description: "Explore the stunning mural portfolio of internationally renowned artist Johina G. Concheso. Custom murals for hotels, restaurants, UNESCO heritage sites, Royal Palaces, and prestigious embassies worldwide.",
    type: "website",
    url: "https://johina.com/murals",
    siteName: "Johina G. Concheso - International Muralist",
    images: [
      {
        url: "/johina-profile.jpg",
        width: 1200,
        height: 630,
        alt: "Johina G. Concheso Mural Portfolio - International Muralist Gallery",
      },
    ],
  },
  
  // Twitter
  twitter: {
    card: "summary_large_image",
    title: "Murals | Johina",
    description: "Explore stunning custom murals for hotels, restaurants, UNESCO heritage sites, Royal Palaces, and prestigious embassies by internationally renowned artist Johina G. Concheso.",
    images: ["/johina-profile.jpg"],
    creator: "@johinagconcheso",
  },
  
  // Additional SEO
  category: "Art & Culture",
  classification: "Art Gallery",
  
  // Structured data hints
  other: {
    'og:image:alt': 'Johina G. Concheso Mural Portfolio - International Muralist Gallery',
    'twitter:image:alt': 'Johina G. Concheso Mural Portfolio - International Muralist Gallery',
    'canonical': 'https://johina.com/murals',
    'twitter:site': '@johinagconcheso',
    
    // Gallery-specific tags
    'article:section': 'Art Gallery',
    'og:type': 'website',
    'robots': 'index, follow, max-image-preview:large',
    
    // Schema.org hints for art gallery
    'schema:artform': 'Mural Painting',
    'schema:genre': 'Contemporary Art',
    'schema:audience': 'Art Collectors, Interior Designers, Hospitality Industry',
  },
};

export default async function MuralsPage() {
  const [muralsData, categoriesData] = await Promise.all([
    getMurals(),
    getCategories(),
  ]);

  const murals = muralsData?.items || [];
  const categories = categoriesData?.items || [];

  return <MuralsClient initialMurals={murals} initialCategories={categories} />;
}
