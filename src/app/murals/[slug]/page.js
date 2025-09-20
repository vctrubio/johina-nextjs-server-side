import { getMuralByUrl, getMuralsByCategory } from '../../../services/murals';
import { getCategories } from '../../../services/categories';
import { notFound } from 'next/navigation';
import MuralDetailClient from '../../../components/MuralDetailClient';
import MuralFooter from '../../../components/MuralFooter';
import { SITE_CONFIG, getMuralUrl } from '../../../lib/constants';

// Metadata generation component
function generateMuralMetadata(muralData, params) {
  const mural = muralData.fields;
  const categoryName = mural.category.fields.name;
  const photos = mural.photos || [];
  const firstPhoto = photos[0]?.fields?.file?.url;
  const imageUrl = firstPhoto ? (firstPhoto.startsWith('//') ? `https:${firstPhoto}` : firstPhoto) : '/johina-profile.jpg';

  const title = mural.title;
  const description = mural.description || `Stunning ${categoryName.toLowerCase()} mural by internationally renowned artist Johina G. Concheso. Featured in prestigious venues worldwide.`;
  const absoluteUrl = getMuralUrl(params.slug);

  return {
    title,
    description,
    keywords: `${mural.title}, ${categoryName} mural, Johina G. Concheso, muralist, custom mural, wall art, interior design, UNESCO heritage sites, Royal Palaces, Saudi Arabian Embassy, Swedish Embassy, Architectural Digest, Elle Decor`,
    author: SITE_CONFIG.AUTHOR,
    creator: SITE_CONFIG.AUTHOR,
    
    // Open Graph
    openGraph: {
      title,
      description,
      type: 'article',
      url: absoluteUrl,
      siteName: SITE_CONFIG.SITE_NAME,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${mural.title} - ${categoryName} mural by Johina G. Concheso`,
        },
      ],
      article: {
        author: 'Johina G. Concheso',
        section: 'Art & Murals',
        tag: [categoryName, 'Mural', 'Art', 'Interior Design'].filter(Boolean),
        publishedTime: muralData.sys.createdAt,
        modifiedTime: muralData.sys.updatedAt,
      },
    },
    
    // Twitter
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
      creator: SITE_CONFIG.TWITTER_HANDLE,
    },
    
    // Additional SEO
    category: 'Art & Culture',
    classification: `${categoryName} Mural`,
    
    // Structured data hints
    other: {
      'article:author': 'Johina G. Concheso',
      'article:section': 'Murals',
      'og:image:alt': `${mural.title} - ${categoryName} mural by Johina G. Concheso`,
      
      // Additional sharing meta tags
      'og:image:width': '1200',
      'og:image:height': '630',
      'og:image:type': 'image/jpeg',
      'twitter:image:alt': `${mural.title} - ${categoryName} mural by Johina G. Concheso`,
      
      // App specific meta tags for native sharing
      'apple-mobile-web-app-title': `${mural.title} by Johina G. Concheso`,
      'application-name': 'Johina G. Concheso - Muralist',
      
      // Additional social platform support
      'fb:app_id': '', // Add Facebook App ID when available
      'twitter:site': SITE_CONFIG.TWITTER_HANDLE,
      
      // Canonical URL
      'canonical': absoluteUrl,
    },
  };
}

// Related murals fetcher component
async function getRelatedMurals(muralData) {
  let relatedMurals = [];
  
  // Fetch related murals from the same category
  if (muralData.fields.category?.sys?.id) {
    const relatedData = await getMuralsByCategory(muralData.fields.category.sys.id);
    if (relatedData?.items) {
      // Filter out current mural - show all related murals in the category
      relatedMurals = relatedData.items
        .filter(item => item.sys.id !== muralData.sys.id);
    }
  }
  
  return relatedMurals;
}


export async function generateMetadata({ params }) {
  const muralData = await getMuralByUrl(params.slug);
  
  if (!muralData) {
    return {
      title: "Johina's Mural Not Found",
      description: 'The requested mural could not be found. Browse our gallery of international murals by renowned artist Johina G. Concheso.',
    };
  }

  return generateMuralMetadata(muralData, params);
}

export default async function MuralDetailPage({ params }) {
  const [muralData, categoriesData] = await Promise.all([
    getMuralByUrl(params.slug),
    getCategories()
  ]);

  if (!muralData) {
    notFound();
  }

  const categories = categoriesData?.items || [];
  const relatedMurals = await getRelatedMurals(muralData);

  return (
    <>
      <MuralDetailClient 
        mural={muralData} 
        categories={categories} 
        relatedMurals={relatedMurals} 
      />
      <MuralFooter mural={muralData} slug={params.slug} />
    </>
  );
}