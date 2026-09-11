// Category images mapping - matches the website's dark/jade design aesthetic
// Images are vibrant, tech-focused, and fill the entire box
export const CATEGORY_IMAGES: Record<string, { url: string; alt: string }> = {
  computers: {
    url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80',
    alt: 'Laptop and workspace',
  },
  components: {
    url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
    alt: 'PC components and hardware',
  },
  networking: {
    url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    alt: 'Networking equipment',
  },
  cybersecurity: {
    url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    alt: 'Cybersecurity',
  },
  'servers-storage': {
    url: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=800&q=80',
    alt: 'Servers and storage',
  },
  displays: {
    url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
    alt: 'Monitors and displays',
  },
  accessories: {
    url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80',
    alt: 'Keyboards and accessories',
  },
  gadgets: {
    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    alt: 'Smart gadgets and devices',
  },
};

export function getCategoryImage(slug: string): { url: string; alt: string } | undefined {
  return CATEGORY_IMAGES[slug];
}
