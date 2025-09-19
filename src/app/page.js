import HeroSection from '../components/HeroSection';
import Navbar from '../components/Navbar';
import FloatingBackground from '../components/FloatingBackground';
import { getBackgroundFloaters } from '../services/backgroundFloaters';

export default async function Home() {
  const floatersData = await getBackgroundFloaters();

  return (
    <>
      <Navbar />
      <main className="min-h-screen relative overflow-hidden">
        <FloatingBackground floatersData={floatersData} />
        {/* <HeroSection /> */}
      </main>
    </>
  );
}
