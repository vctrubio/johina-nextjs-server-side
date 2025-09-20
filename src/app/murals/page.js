import { getMuralCovers } from "../../services/murals";
import { getCategories } from "../../services/categories";
import MuralsClient from "../../components/MuralsClient";
import { SITE_CONFIG, getAbsoluteUrl } from '../../lib/constants';

export const metadata = {
  title: "Murals | Johina",
  description: "Explore the stunning mural portfolio of internationally renowned artist Johina G. Concheso. Browse custom murals for hotels, restaurants, private residences, UNESCO heritage sites, Royal Palaces, and prestigious embassies including Saudi Arabian & Swedish Embassies.",
  keywords: "mural gallery, custom murals, hotel murals, restaurant murals, private residence murals, UNESCO heritage site murals, Royal Palace murals, embassy murals, Saudi Arabian Embassy mural, Swedish Embassy mural, wall art portfolio, interior design murals, commercial murals, residential murals, Madrid muralist, international mural artist, Johina G. Concheso portfolio",
  author: SITE_CONFIG.AUTHOR,
  creator: SITE_CONFIG.AUTHOR,
  
  // Open Graph
  openGraph: {
    title: "Murals | Johina",
    description: "Explore the stunning mural portfolio of internationally renowned artist Johina G. Concheso. Custom murals for hotels, restaurants, UNESCO heritage sites, Royal Palaces, and prestigious embassies worldwide.",
    type: "website",
    url: getAbsoluteUrl('/murals'),
    siteName: SITE_CONFIG.SITE_NAME,
    images: [
      {
        url: getAbsoluteUrl('/meta-johina.jpg'),
        width: 1200,
        height: 1059,
        alt: "Johina G. Concheso Mural Portfolio - International Muralist Gallery",
      },
    ],
  },
  
  // Twitter
  twitter: {
    card: "summary_large_image",
    title: "Murals | Johina",
    description: "Explore stunning custom murals for hotels, restaurants, UNESCO heritage sites, Royal Palaces, and prestigious embassies by internationally renowned artist Johina G. Concheso.",
    images: [getAbsoluteUrl('/meta-johina.jpg')],
    creator: SITE_CONFIG.TWITTER_HANDLE,
  },
  
  // Additional SEO
  category: "Art & Culture",
  classification: "Art Gallery",
  
  // Structured data hints
  other: {
    'og:image:alt': 'Johina G. Concheso Mural Portfolio - International Muralist Gallery',
    'twitter:image:alt': 'Johina G. Concheso Mural Portfolio - International Muralist Gallery',
    'canonical': getAbsoluteUrl('/murals'),
    'twitter:site': SITE_CONFIG.TWITTER_HANDLE,
    
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
    getMuralCovers(),
    getCategories(),
  ]);

  const murals = muralsData?.items || [];
  const categories = categoriesData?.items || [];

  return <MuralsClient initialMurals={murals} initialCategories={categories} />;
}
