// Brand color constants
export const COLORS = {
  primary: '#8CB150',
  secondary: '#5E488D', 
  tertiary: '#FDBE9A',
  fourth: '#6B68AD',
  fifth: '#97AAD3'
};

// Route-specific colors
export const ROUTE_COLORS = {
  '/murals': COLORS.secondary,
  '/about': COLORS.tertiary
};

// Category-specific colors for murals
export const CATEGORY_COLORS = {
  'Hotels': COLORS.primary,      // Green
  'Restaurants': COLORS.secondary, // Purple  
  'Private Residences': COLORS.tertiary, // Orange
  'Other': '#F4D03F'             // Hard yellow
};