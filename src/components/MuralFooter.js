"use client";
import { Share2, Instagram, MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { SITE_CONFIG } from "../lib/constants";

export default function MuralFooter({
  mural,
  whatsappNumber = SITE_CONFIG.WHATSAPP_NUMBER,
}) {
  const pathname = usePathname();

  const handleShare = async () => {
    const currentUrl = `${window.location.origin}${pathname}`;
    const shareData = {
      title: mural.fields.title,
      text: `Check out this amazing mural by Johina G. Concheso: ${mural.fields.title}`,
      url: currentUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        navigator.clipboard.writeText(currentUrl);
      }
    } else {
      navigator.clipboard.writeText(currentUrl);
    }
  };

  const handleWhatsApp = () => {
    const message = `Hi! I saw this amazing mural "${mural.fields.title}" on your website. I'd love to know more about your work!`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="flex justify-center items-center space-x-6 py-8">
      <button
        onClick={handleShare}
        className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300 hover:scale-105"
        title="Share"
      >
        <Share2 size={24} />
      </button>

      <a
        href={SITE_CONFIG.INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300 hover:scale-105"
        title="Instagram"
      >
        <Instagram size={24} />
      </a>

      <button
        onClick={handleWhatsApp}
        className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300 hover:scale-105"
        title="WhatsApp"
      >
        <MessageCircle size={24} />
      </button>
    </div>
  );
}
