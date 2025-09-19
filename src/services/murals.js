import client from '../lib/contentful';

export async function getMurals() {
  try {
    const response = await client.getEntries({
      content_type: 'murals',
      include: 2, // Include linked assets and entries
    });
    
    console.log('Murals data from Contentful:', response);
    return response;
  } catch (error) {
    console.error('Error fetching murals:', error);
    return null;
  }
}

export async function getMuralByUrl(url) {
  try {
    const response = await client.getEntries({
      content_type: 'murals',
      'fields.url': url,
      include: 2,
    });
    
    console.log('Mural by URL data from Contentful:', response);
    return response.items[0] || null;
  } catch (error) {
    console.error('Error fetching mural by URL:', error);
    return null;
  }
}

export async function getMuralsByCategory(categoryId) {
  try {
    const response = await client.getEntries({
      content_type: 'murals',
      'fields.category.sys.id': categoryId,
      include: 2,
    });
    
    console.log('Murals by category data from Contentful:', response);
    return response;
  } catch (error) {
    console.error('Error fetching murals by category:', error);
    return null;
  }
}

export async function getMuralCovers() {
  try {
    const response = await client.getEntries({
      content_type: 'murals',
      select: 'fields.title,fields.url,fields.category,fields.photos,sys.id',
      include: 1, // Only include direct references, not nested
    });
    
    console.log('Mural covers data from Contentful:', response);
    return response;
  } catch (error) {
    console.error('Error fetching mural covers:', error);
    return null;
  }
}