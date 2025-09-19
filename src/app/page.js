import HeroSection from '../components/HeroSection';
import FloatingBackground from '../components/FloatingBackground';
import { getBackgroundFloaters } from '../services/backgroundFloaters';

export default async function Home() {
  const floatersData = await getBackgroundFloaters();

  return (
    <main className="min-h-screen relative overflow-hidden">
      <FloatingBackground floatersData={floatersData} />
      <HeroSection />
    </main>
  );
}
