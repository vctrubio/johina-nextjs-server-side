import { getMurals } from "../../services/murals";
import { getCategories } from "../../services/categories";
import MuralsClient from "../../components/MuralsClient";

export default async function MuralsPage() {
  const [muralsData, categoriesData] = await Promise.all([
    getMurals(),
    getCategories(),
  ]);

  const murals = muralsData?.items || [];
  const categories = categoriesData?.items || [];

  return <MuralsClient initialMurals={murals} initialCategories={categories} />;
}
