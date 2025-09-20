import { getMuralByUrl, getMuralsByCategory } from "../../../services/murals";
import { getCategories } from "../../../services/categories";
import { notFound } from "next/navigation";
import MuralDetailClient from "../../../components/MuralDetailClient";
import MuralFooter from "../../../components/MuralFooter";
import { SITE_CONFIG, getMuralUrl, getAbsoluteUrl } from "../../../lib/constants";

// Metadata generation component
function generateMuralMetadata(muralData, params) {
  const mural = muralData.fields;
  const photos = mural.photos || [];

  // Extract first photo using the same logic as the preload section (line 165)
  let firstPhoto = null;
  if (photos.length > 0) {
    const photo = photos[0];
    firstPhoto = photo?.fields?.file?.url;
    
    // Debug logging to understand structure when photo extraction fails
    if (!firstPhoto && process.env.NODE_ENV === 'development') {
      console.log('Photo extraction failed for mural:', mural.title);
      console.log('Photos array length:', photos.length);
      console.log('First photo structure:', JSON.stringify(photo, null, 2));
    }
  }

  // Also try other possible image fields as fallbacks
  const coverPhoto =
    mural.coverPhoto?.fields?.file?.url || mural.cover?.fields?.file?.url;
  const thumbnailPhoto = mural.thumbnail?.fields?.file?.url;
  const featuredImage = mural.featuredImage?.fields?.file?.url;

  // Use the best available image in order of preference
  const bestImage = firstPhoto || coverPhoto || featuredImage || thumbnailPhoto;
  const imageUrl = bestImage
    ? bestImage.startsWith("//")
      ? `https:${bestImage}`
      : bestImage.startsWith("http")
      ? bestImage
      : getAbsoluteUrl(bestImage)
    : getAbsoluteUrl("/meta-johina.jpg");

  const title = `${mural.title} | Johina`;
  const description =
    mural.description ||
    `Stunning mural by internationally renowned artist Johina G. Concheso. Featured in prestigious venues worldwide.`;
  const absoluteUrl = getMuralUrl(mural.url);

  return {
    title,
    description,
    keywords: `${mural.title}, Johina G. Concheso, muralist, custom mural, wall art, interior design, UNESCO heritage sites, Royal Palaces, Saudi Arabian Embassy, Swedish Embassy, Architectural Digest, Elle Decor`,
    author: SITE_CONFIG.AUTHOR,
    creator: SITE_CONFIG.AUTHOR,

    // Open Graph
    openGraph: {
      title,
      description,
      type: "article",
      url: absoluteUrl,
      siteName: SITE_CONFIG.SITE_NAME,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${mural.title} - mural by Johina G. Concheso`,
        },
      ],
      article: {
        author: "Johina G. Concheso",
        section: "Art & Murals",
        tag: ["Mural", "Art", "Interior Design"].filter(Boolean),
        publishedTime: muralData.sys.createdAt,
        modifiedTime: muralData.sys.updatedAt,
      },
    },

    // Twitter
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      creator: SITE_CONFIG.TWITTER_HANDLE,
    },

    // Additional SEO
    category: "Art & Culture",

    // Structured data hints
    other: {
      "article:author": "Johina G. Concheso",
      "article:section": "Murals",
      "og:image:alt": `${mural.title} - mural by Johina G. Concheso`,

      // Additional sharing meta tags
      "og:image:width": "1200",
      "og:image:height": "630",
      "og:image:type": "image/jpeg",
      "twitter:image:alt": `${mural.title} - mural by Johina G. Concheso`,

      // App specific meta tags for native sharing
      "apple-mobile-web-app-title": `${mural.title} by Johina G. Concheso`,
      "application-name": "Johina G. Concheso - Muralist",

      // Additional social platform support
      "fb:app_id": "", // Add Facebook App ID when available
      "twitter:site": SITE_CONFIG.TWITTER_HANDLE,

      // Canonical URL
      canonical: absoluteUrl,
    },
  };
}

// Related murals fetcher component
async function getRelatedMurals(muralData) {
  let relatedMurals = [];

  // Fetch related murals from the same category
  if (muralData.fields.category?.sys?.id) {
    const relatedData = await getMuralsByCategory(
      muralData.fields.category.sys.id,
    );
    if (relatedData?.items) {
      // Filter out current mural - show all related murals in the category
      relatedMurals = relatedData.items.filter(
        (item) => item.sys.id !== muralData.sys.id,
      );
    }
  }

  return relatedMurals;
}

export async function generateMetadata({ params }) {
  const muralData = await getMuralByUrl(params.slug);

  if (!muralData) {
    return {
      title: "Johina's Mural Not Found",
      description:
        "The requested mural could not be found. Browse our gallery of international murals by renowned artist Johina G. Concheso.",
    };
  }

  return generateMuralMetadata(muralData, params);
}

export default async function MuralDetailPage({ params }) {
  const [muralData, categoriesData] = await Promise.all([
    getMuralByUrl(params.slug),
    getCategories(),
  ]);

  if (!muralData) {
    notFound();
  }

  const categories = categoriesData?.items || [];
  const relatedMurals = await getRelatedMurals(muralData);

  // Preload images on server side for better performance
  const photos = muralData.fields.photos || [];
  const preloadImages = photos
    .map((photo) => {
      const url = photo?.fields?.file?.url;
      return url?.startsWith("//") ? `https:${url}` : url;
    })
    .filter(Boolean);

  return (
    <>
      {/* Preload images */}
      {preloadImages.map((src, index) => (
        <link
          key={src}
          rel="preload"
          as="image"
          href={src}
          // Priority for first image
          {...(index === 0 && { fetchPriority: "high" })}
        />
      ))}

      <MuralDetailClient
        mural={muralData}
        categories={categories}
        relatedMurals={relatedMurals}
      />
      <MuralFooter mural={muralData} />
    </>
  );
}
