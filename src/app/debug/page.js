import { getBackgroundFloaters } from "../../services/backgroundFloaters";
import { getBannerPhotos } from "../../services/bannerPhotos";
import ColorPaletteDebug from "../../components/ColorPaletteDebug";
import ModelDebug from "../../components/ModelDebug";

export default async function DebugPage() {
  const floatersData = await getBackgroundFloaters();
  const bannerData = await getBannerPhotos();

  return (
    <>
      <div>
        <h1>Johina Debug Dashboard</h1>
        <h2>Development Tools</h2>

        <ColorPaletteDebug />
        <ModelDebug floatersData={floatersData} bannerData={bannerData} />
      </div>
    </>
  );
}
