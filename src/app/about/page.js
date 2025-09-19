import { getAboutPage } from "../../services/aboutPage";
import AboutClient from "../../components/AboutClient";

export default async function AboutPage() {
  const aboutData = await getAboutPage();

  // Extract just the image URLs for the client component
  const carouselImages = [];
  if (aboutData?.items?.length > 0) {
    const aboutEntry = aboutData.items[0];
    const photosField = aboutEntry.fields.photos;
    if (Array.isArray(photosField)) {
      photosField.forEach(photo => {
        const url = photo?.fields?.file?.url;
        if (url) {
          carouselImages.push(url.startsWith('//') ? `https:${url}` : url);
        }
      });
    }
  }

  return <AboutClient carouselImages={carouselImages} />;
}
