"use client";

import { useState } from "react";
import { Share2, Copy, Check } from "lucide-react";

export default function ShareButton({ title, description, url }) {
  const [copied, setCopied] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title,
      text: description,
      url,
    };

    // Check if native sharing is supported
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User cancelled or error occurred, show fallback
        if (err.name !== 'AbortError') {
          setShowFallback(true);
        }
      }
    } else {
      // Fallback: copy to clipboard
      setShowFallback(true);
    }
  };

  const copyToClipboard = async () => {
    try {
      const textToCopy = `${title}\n\n${description}\n\n${url}`;
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setShowFallback(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleShare}
        className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary font-medium rounded-full hover:bg-primary/20 transition-all duration-300 hover:scale-105 shadow-sm"
        title="Share this mural"
      >
        <Share2 size={18} />
        <span className="hidden sm:inline">Share</span>
      </button>

      {/* Fallback sharing options */}
      {showFallback && (
        <div className="absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-lg shadow-lg p-3 min-w-48 z-50">
          <p className="text-sm text-gray-600 mb-3">Share this mural:</p>
          
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 w-full px-3 py-2 text-left hover:bg-gray-50 rounded-md transition-colors"
          >
            {copied ? (
              <>
                <Check size={16} className="text-green-600" />
                <span className="text-sm text-green-600">Copied!</span>
              </>
            ) : (
              <>
                <Copy size={16} />
                <span className="text-sm">Copy link & details</span>
              </>
            )}
          </button>

          <div className="border-t border-gray-100 mt-2 pt-2">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-2 text-sm hover:bg-gray-50 rounded-md transition-colors"
            >
              Share on Facebook
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-2 text-sm hover:bg-gray-50 rounded-md transition-colors"
            >
              Share on Twitter
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-2 text-sm hover:bg-gray-50 rounded-md transition-colors"
            >
              Share on LinkedIn
            </a>
          </div>

          <button
            onClick={() => setShowFallback(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            title="Close"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}