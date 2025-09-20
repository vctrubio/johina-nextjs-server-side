import client from '../lib/contentful';

export async function getCategories() {
  try {
    const response = await client.getEntries({
      content_type: 'categories',
    });
    
    return response;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return null;
  }
}

export async function getCategoryById(categoryId) {
  try {
    const response = await client.getEntry(categoryId);
    
    return response;
  } catch (error) {
    console.error('Error fetching category by ID:', error);
    return null;
  }
}