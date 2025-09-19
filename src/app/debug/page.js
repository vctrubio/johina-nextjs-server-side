import { getBackgroundFloaters } from "../../services/backgroundFloaters";
import { getHomeBanners } from "../../services/homeBanners";
import { getMurals } from "../../services/murals";
import { getCategories } from "../../services/categories";
import { getAboutPage } from "../../services/aboutPage";
import ColorPaletteDebug from "../../components/ColorPaletteDebug";
import ModelDebug from "../../components/ModelDebug";

export default async function DebugPage() {
  const [floatersData, bannersData, muralsData, categoriesData, aboutData] = await Promise.all([
    getBackgroundFloaters(),
    getHomeBanners(),
    getMurals(),
    getCategories(),
    getAboutPage(),
  ]);

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
          aboutData={aboutData}
        />
      </div>
    </>
  );
}
