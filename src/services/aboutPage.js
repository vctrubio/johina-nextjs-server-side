import client from '../lib/contentful';

export async function getAboutPage() {
  try {
    const response = await client.getEntries({
      content_type: 'aboutPage',
      include: 2, // Include linked assets
      order: '-sys.updatedAt', // Get the most recent first
      limit: 1, // Only get the latest entry
    });
    
    
    return response;
  } catch (error) {
    console.error('Error fetching about page:', error);
    return null;
  }
}