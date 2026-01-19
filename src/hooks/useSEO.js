import { useEffect } from 'react';

const useSEO = ({ title, description, image, url, tier, type = 'website' }) => {
  useEffect(() => {
    const siteName = 'Elderstone Digital Solutions';
    const fullTitle = title ? `${title} | ${siteName}` : siteName;

    // 1. Basic Title (Available to all tiers)
    document.title = fullTitle;

    // Helper to update/create meta tags
    const updateMeta = (attr, key, content) => {
      if (!content) return;
      let element = document.querySelector(`meta[${attr}="${key}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Premium SEO Logic: Only run for Growth/Pro tiers
    // Assumes your tiers are 'Starter', 'Growth', 'Pro'
    const isPremium = tier !== 'Starter';

    if (isPremium) {
      // Full Description
      updateMeta('name', 'description', description);

      // Open Graph (Social Media)
      updateMeta('property', 'og:title', fullTitle);
      updateMeta('property', 'og:description', description);
      updateMeta('property', 'og:image', image || '/default-og-image.jpg');
      updateMeta('property', 'og:url', url || window.location.href);

      // Twitter Cards
      updateMeta('name', 'twitter:card', 'summary_large_image');
      updateMeta('name', 'twitter:title', fullTitle);
      updateMeta('name', 'twitter:image', image);
    } else {
      // Optional: Clean up or set a very basic description for Starter
      updateMeta('name', 'description', 'Elderstone Digital - Secure Managed Hosting');
    }

  }, [title, description, image, url, tier, type]);
};

export default useSEO;