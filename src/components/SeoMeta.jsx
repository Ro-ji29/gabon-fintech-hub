import { useEffect } from 'react';
import { SITE_CONFIG } from '../config/site';

/**
 * Composant d'injection propre des balises meta SEO et Open Graph pour LinkedIn et réseaux sociaux.
 * Nettoie et restaure les balises initiales lors du démontage de la page.
 */
export function SeoMeta({
  title,
  description,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  twitterCard = 'summary_large_image',
}) {
  useEffect(() => {
    const originalTitle = document.title;
    if (title) {
      document.title = title;
    }

    const setMetaTag = (attrName, attrValue, content) => {
      if (!content) return null;
      let tag = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      let previousContent = null;
      if (tag) {
        previousContent = tag.getAttribute('content');
        tag.setAttribute('content', content);
      } else {
        tag = document.createElement('meta');
        tag.setAttribute(attrName, attrValue);
        tag.setAttribute('content', content);
        document.head.appendChild(tag);
      }
      return { tag, previousContent, isNew: !previousContent };
    };

    // Calcul de l'URL absolue pour l'image et la page
    const absoluteOgImage = ogImage
      ? ogImage.startsWith('http')
        ? ogImage
        : `${SITE_CONFIG.baseUrl}${ogImage}`
      : `${SITE_CONFIG.baseUrl}${SITE_CONFIG.defaultOgImage}`;

    const absoluteOgUrl = ogUrl
      ? ogUrl.startsWith('http')
        ? ogUrl
        : `${SITE_CONFIG.baseUrl}${ogUrl}`
      : typeof window !== 'undefined'
      ? window.location.href
      : SITE_CONFIG.baseUrl;

    const modifications = [
      setMetaTag('name', 'description', description),
      setMetaTag('property', 'og:title', ogTitle || title),
      setMetaTag('property', 'og:description', ogDescription || description),
      setMetaTag('property', 'og:image', absoluteOgImage),
      setMetaTag('property', 'og:url', absoluteOgUrl),
      setMetaTag('property', 'og:type', 'website'),
      setMetaTag('name', 'twitter:card', twitterCard),
      setMetaTag('name', 'twitter:title', ogTitle || title),
      setMetaTag('name', 'twitter:description', ogDescription || description),
      setMetaTag('name', 'twitter:image', absoluteOgImage),
    ];

    return () => {
      document.title = originalTitle;
      modifications.forEach((mod) => {
        if (!mod) return;
        if (mod.isNew && mod.tag.parentNode) {
          mod.tag.parentNode.removeChild(mod.tag);
        } else if (mod.previousContent !== null) {
          mod.tag.setAttribute('content', mod.previousContent);
        }
      });
    };
  }, [title, description, ogTitle, ogDescription, ogImage, ogUrl, twitterCard]);

  return null;
}
