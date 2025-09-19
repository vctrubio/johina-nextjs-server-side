import client from '../lib/contentful';

export async function getCategories() {
  try {
    const response = await client.getEntries({
      content_type: 'categories',
    });
    
    console.log('Categories data from Contentful:', response);
    return response;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return null;
  }
}

export async function getCategoryById(categoryId) {
  try {
    const response = await client.getEntry(categoryId);
    
    console.log('Category by ID data from Contentful:', response);
    return response;
  } catch (error) {
    console.error('Error fetching category by ID:', error);
    return null;
  }
}