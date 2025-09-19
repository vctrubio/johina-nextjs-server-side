import client from '../lib/contentful';

/**
 * Fetch home-banners content type from Contentful
 * @returns {Object} Object containing entries, count, and latest update info
 */
export async function getBannerPhotos() {
  try {
    const entries = await client.getEntries({
      content_type: 'homeBanners',
      order: '-sys.updatedAt', // Order by most recently updated first
    });

    // Get the latest updated entry
    const latestEntry = entries.items[0];
    const latestUpdatedAt = latestEntry ? latestEntry.sys.updatedAt : null;

    return {
      entries: entries.items,
      count: entries.total,
      latestUpdatedAt,
      success: true,
    };
  } catch (error) {
    console.error('Error fetching banner photos:', error);
    return {
      entries: [],
      count: 0,
      latestUpdatedAt: null,
      success: false,
      error: error.message,
    };
  }
}

/**
 * Get summary information about home-banners
 * @returns {Object} Summary with count and latest update date
 */
export async function getBannerPhotosSummary() {
  const data = await getBannerPhotos();
  
  return {
    count: data.count,
    latestUpdatedAt: data.latestUpdatedAt,
    success: data.success,
    error: data.error,
  };
}