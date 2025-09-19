import HeroSection from "../components/HeroSection";
import FloatingBackground from "../components/FloatingBackground";
import GalleryGrid from "../components/GalleryGrid";
import Footer from "../components/Footer";
import { getBackgroundFloaters } from "../services/backgroundFloaters";
import { getHomeBanners } from "../services/homeBanners";
import { getMurals } from "../services/murals";
import { getCategories } from "../services/categories";

export default async function Home() {
  const [floatersData, bannersData, muralsData, categoriesData] = await Promise.all([
    getBackgroundFloaters(),
    getHomeBanners(),
    getMurals(),
    getCategories(),
  ]);

  return (
    <>
      <main className="min-h-screen">
        <div className="h-screen relative overflow-hidden">
          <FloatingBackground floatersData={floatersData} />
          <HeroSection muralsData={muralsData} categoriesData={categoriesData} />
        </div>
        <GalleryGrid bannersData={bannersData} />
      </main>

      <Footer />
    </>
  );
}
