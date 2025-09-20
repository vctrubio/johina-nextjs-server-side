import { getAboutPage } from "../../services/aboutPage";
import AboutClient from "../../components/AboutClient";
import { SITE_CONFIG, getAbsoluteUrl } from '../../lib/constants';

export const metadata = {
  title: "About | Johina",
  description: "Meet Johina G. Concheso, renowned international muralist with over two decades of experience. From UNESCO heritage sites to Royal Palaces and prestigious embassies, her vibrant murals bring spaces to life with color, creativity, and storytelling. Based in Madrid, Spain.",
  keywords: "Johina G. Concheso, about artist, international muralist, UNESCO heritage restoration, Royal Palaces murals, Saudi Arabian Embassy, Swedish Embassy, Madrid Towers, Tanger Continental, Hotel Misiana Tarifa, Architectural Digest, Elle Decor, artist biography, mural artist Madrid, contemporary muralist, classical art techniques",
  author: SITE_CONFIG.AUTHOR,
  creator: SITE_CONFIG.AUTHOR,
  
  // Open Graph
  openGraph: {
    title: "About | Johina",
    description: "Meet Johina G. Concheso, renowned international muralist with over two decades of experience creating stunning murals for UNESCO heritage sites, Royal Palaces, and prestigious venues worldwide.",
    type: "profile",
    url: getAbsoluteUrl('/about'),
    siteName: SITE_CONFIG.SITE_NAME,
    images: [
      {
        url: getAbsoluteUrl('/johina-profile.jpg'),
        width: 1200,
        height: 630,
        alt: "Johina G. Concheso - International Muralist and Artist Portrait",
      },
    ],
    profile: {
      firstName: "Johina",
      lastName: "G. Concheso",
      gender: "female",
    },
  },
  
  // Twitter
  twitter: {
    card: "summary_large_image",
    title: "About | Johina",
    description: "Meet the renowned international muralist creating stunning murals for UNESCO heritage sites, Royal Palaces, and prestigious venues worldwide.",
    images: [getAbsoluteUrl('/johina-profile.jpg')],
    creator: SITE_CONFIG.TWITTER_HANDLE,
  },
  
  // Additional SEO
  category: "Art & Culture",
  classification: "Artist Biography",
  
  // Structured data hints
  other: {
    'profile:first_name': 'Johina',
    'profile:last_name': 'G. Concheso',
    'profile:username': 'johinagconcheso',
    'og:image:alt': 'Johina G. Concheso - International Muralist and Artist Portrait',
    'twitter:image:alt': 'Johina G. Concheso - International Muralist and Artist Portrait',
    'canonical': getAbsoluteUrl('/about'),
    'twitter:site': SITE_CONFIG.TWITTER_HANDLE,
  },
};

export default async function AboutPage() {
  const aboutData = await getAboutPage();

  // Extract just the image URLs for the client component
  const carouselImages = [];
  if (aboutData?.items?.length > 0) {
    const aboutEntry = aboutData.items[0];
    const photosField = aboutEntry.fields.photos;
    if (Array.isArray(photosField)) {
      photosField.forEach(photo => {
        const url = photo?.fields?.file?.url;
        if (url) {
          carouselImages.push(url.startsWith('//') ? `https:${url}` : url);
        }
      });
    }
  }

  return <AboutClient carouselImages={carouselImages} />;
}
