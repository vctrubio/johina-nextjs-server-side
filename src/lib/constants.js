// Site configuration constants
export const SITE_CONFIG = {
  DOMAIN: 'johina-concheso.vercel.app',
  BASE_URL: 'https://johina-concheso.vercel.app',
  SITE_NAME: 'Johina G. Concheso - International Muralist',
  AUTHOR: 'Johina G. Concheso',
  TWITTER_HANDLE: '@johinagconcheso',
  INSTAGRAM_URL: 'https://www.instagram.com/johinagconcheso/',
  WHATSAPP_NUMBER: '34609988138'
};

// Helper function to generate absolute URLs
export const getAbsoluteUrl = (path = '') => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_CONFIG.BASE_URL}${cleanPath}`;
};

// Helper function to generate mural URLs
export const getMuralUrl = (slug) => {
  return getAbsoluteUrl(`/murals/${slug}`);
};