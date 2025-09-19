import { getMuralByUrl, getMuralsByCategory } from '../../../services/murals';
import { getCategories } from '../../../services/categories';
import { notFound } from 'next/navigation';
import MuralDetailClient from '../../../components/MuralDetailClient';

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