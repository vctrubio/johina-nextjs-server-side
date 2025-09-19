import { getMuralByUrl, getMuralsByCategory } from '../../../services/murals';
import { getCategories } from '../../../services/categories';
import { notFound } from 'next/navigation';
import MuralDetailClient from '../../../components/MuralDetailClient';

export async function generateMetadata({ params }) {
  const muralData = await getMuralByUrl(params.slug);
  
  if (!muralData) {
    return {
      title: "Johina's Mural Not Found",
      description: 'The requested mural could not be found. Browse our gallery of international murals by renowned artist Johina G. Concheso.',
    };
  }

  const mural = muralData.fields;
  const categoryName = mural.category?.fields?.name || 'Custom Mural';
  const location = mural.location || '';
  const year = mural.year || '';
  const images = mural.images || [];
  const firstImage = images[0]?.fields?.file?.url;
  const imageUrl = firstImage ? (firstImage.startsWith('//') ? `https:${firstImage}` : firstImage) : '/johina-profile.jpg';

  const title = mural.title;
  const description = mural.description 
    ? `${mural.description.substring(0, 150)}... Custom ${categoryName.toLowerCase()} mural by internationally renowned artist Johina G. Concheso${location ? ` in ${location}` : ''}${year ? ` (${year})` : ''}.`
    : `Stunning ${categoryName.toLowerCase()} mural by internationally renowned artist Johina G. Concheso${location ? ` located in ${location}` : ''}${year ? ` completed in ${year}` : ''}. Featured in prestigious venues worldwide.`;

  return {
    title,
    description,
    keywords: `${mural.title}, ${categoryName} mural, Johina G. Concheso, muralist, ${location}, custom mural, wall art, interior design, ${year}, UNESCO heritage sites, Royal Palaces, Saudi Arabian Embassy, Swedish Embassy, Architectural Digest, Elle Decor`,
    author: 'Johina G. Concheso',
    creator: 'Johina G. Concheso',
    
    // Open Graph
    openGraph: {
      title,
      description,
      type: 'article',
      url: `https://johina.com/murals/${params.slug}`,
      siteName: 'Johina G. Concheso - International Muralist',
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
        tag: [categoryName, 'Mural', 'Art', 'Interior Design', location, year].filter(Boolean),
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
      creator: '@johinagconcheso',
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
      'twitter:site': '@johinagconcheso',
      
      // Canonical URL
      'canonical': `https://johina.com/murals/${params.slug}`,
    },
  };
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
  let relatedMurals = [];

  // Fetch related murals from the same category
  if (muralData.fields.category?.sys?.id) {
    const relatedData = await getMuralsByCategory(muralData.fields.category.sys.id);
    if (relatedData?.items) {
      // Filter out current mural and limit to 3 recommendations
      relatedMurals = relatedData.items
        .filter(item => item.sys.id !== muralData.sys.id)
        .slice(0, 3);
    }
  }

  return (
    <MuralDetailClient 
      mural={muralData} 
      categories={categories} 
      relatedMurals={relatedMurals} 
    />
  );
}