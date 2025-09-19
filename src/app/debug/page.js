import { getBackgroundFloaters } from "../../services/backgroundFloaters";
import { getHomeBanners } from "../../services/homeBanners";
import { getMurals } from "../../services/murals";
import { getCategories } from "../../services/categories";
import ColorPaletteDebug from "../../components/ColorPaletteDebug";
import ModelDebug from "../../components/ModelDebug";

export default async function DebugPage() {
  const floatersData = await getBackgroundFloaters();
  const bannersData = await getHomeBanners();
  const muralsData = await getMurals();
  const categoriesData = await getCategories();

  return (
    <>
      <div>
        <h1>Johina Debug Dashboard</h1>
        <h2>Development Tools</h2>

        <ColorPaletteDebug />
        <ModelDebug 
          floatersData={floatersData} 
          bannersData={bannersData}
          muralsData={muralsData}
          categoriesData={categoriesData}
        />
      </div>
    </>
  );
}
