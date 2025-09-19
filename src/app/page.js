import HeroSection from "../components/HeroSection";
import FloatingBackground from "../components/FloatingBackground";
import GalleryGrid from "../components/GalleryGrid";
import Footer from "../components/Footer";
import { getBackgroundFloaters } from "../services/backgroundFloaters";
import { getHomeBanners } from "../services/homeBanners";

export default async function Home() {
  const floatersData = await getBackgroundFloaters();
  const bannersData = await getHomeBanners();

  return (
    <>
      <main className="min-h-screen">
        <div className="h-screen relative overflow-hidden">
          <FloatingBackground floatersData={floatersData} />
          <HeroSection />
        </div>
        <GalleryGrid bannersData={bannersData} />
      </main>

      <Footer />
    </>
  );
}
