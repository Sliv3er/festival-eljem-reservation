const WIKIMEDIA_API = 'https://commons.wikimedia.org/w/api.php';
const CATEGORY = 'Category:Amphitheatre_of_El_Jem';

let cachedImages = null;

/**
 * Fetch images of the Amphitheatre of El Jem from Wikimedia Commons
 */
export async function fetchAmphitheatreImages(limit = 20) {
  if (cachedImages) return cachedImages;

  try {
    const params = new URLSearchParams({
      action: 'query',
      generator: 'categorymembers',
      gcmtitle: CATEGORY,
      gcmtype: 'file',
      gcmlimit: String(limit),
      prop: 'imageinfo',
      iiprop: 'url|size|mime',
      iiurlwidth: '1200',
      format: 'json',
      origin: '*',
    });

    const response = await fetch(`${WIKIMEDIA_API}?${params}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    const pages = data.query?.pages || {};

    const images = Object.values(pages)
      .filter((page) => page.imageinfo && page.imageinfo.length > 0)
      .map((page) => {
        const info = page.imageinfo[0];
        return {
          id: page.pageid,
          title: page.title.replace('File:', ''),
          url: info.thumburl || info.url,
          fullUrl: info.url,
          width: info.width,
          height: info.height,
          mime: info.mime,
        };
      })
      .filter((img) => img.mime?.startsWith('image/'));

    cachedImages = images;
    return images;
  } catch (error) {
    console.error('Failed to fetch Wikimedia images:', error);
    return getFallbackImages();
  }
}

/**
 * Get a single random amphitheatre image
 */
export async function getRandomImage() {
  const images = await fetchAmphitheatreImages();
  if (images.length === 0) return getFallbackImages()[0];
  return images[Math.floor(Math.random() * images.length)];
}

/**
 * Get hero image (first available or fallback)
 */
export async function getHeroImage() {
  const images = await fetchAmphitheatreImages();
  // Prefer landscape images for hero
  const landscape = images.filter((img) => img.width > img.height);
  return landscape[0] || images[0] || getFallbackImages()[0];
}

/**
 * Fallback images when API is unavailable
 */
function getFallbackImages() {
  return [
    {
      id: 'fallback-1',
      title: 'Amphitheatre of El Jem',
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Amphitheatre_of_El_Jem.jpg/1200px-Amphitheatre_of_El_Jem.jpg',
      fullUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/79/Amphitheatre_of_El_Jem.jpg',
      width: 1200,
      height: 800,
      mime: 'image/jpeg',
    },
    {
      id: 'fallback-2',
      title: 'El Jem Amphitheatre Interior',
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/El_Djem_Amphitheater_%28II%29.jpg/1200px-El_Djem_Amphitheater_%28II%29.jpg',
      fullUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/50/El_Djem_Amphitheater_%28II%29.jpg',
      width: 1200,
      height: 800,
      mime: 'image/jpeg',
    },
  ];
}

export default { fetchAmphitheatreImages, getRandomImage, getHeroImage };
