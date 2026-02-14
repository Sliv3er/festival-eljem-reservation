const WIKIMEDIA_API = 'https://commons.wikimedia.org/w/api.php';

let cachedImages = null;

/**
 * Fetch images of the Amphitheatre of El Jem from Wikimedia Commons via search API
 */
export async function fetchAmphitheatreImages(limit = 20) {
  if (cachedImages) return cachedImages;

  try {
    const params = new URLSearchParams({
      action: 'query',
      generator: 'search',
      gsrsearch: 'El Jem amphitheatre',
      gsrnamespace: '6',
      gsrlimit: String(limit),
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
      .filter((img) => img.mime?.startsWith('image/') && img.width > 600);

    if (images.length > 0) {
      cachedImages = images;
      return images;
    }
    return getFallbackImages();
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
 * Get hero image (first landscape or fallback)
 */
export async function getHeroImage() {
  const images = await fetchAmphitheatreImages();
  const landscape = images.filter((img) => img.width > img.height);
  return landscape[0] || images[0] || getFallbackImages()[0];
}

/**
 * Get image by category for contextual usage
 */
export function getImageByCategory(category = 'exterior') {
  const fallbacks = getFallbackImages();
  const categoryMap = {
    hero: 0,
    exterior: 1,
    interior: 2,
    panorama: 3,
    detail: 4,
    aerial: 5,
    night: 0,
  };
  const index = categoryMap[category] ?? 0;
  return fallbacks[index] || fallbacks[0];
}

/**
 * Verified fallback images from Wikimedia Commons (all tested working)
 */
function getFallbackImages() {
  return [
    {
      id: 'fallback-hero',
      title: 'Amphitheatre of El Jem — HDR Panorama',
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Anfiteatro%2C_El_Jem%2C_T%C3%BAnez%2C_2016-09-04%2C_DD_38-40_HDR.jpg/1280px-Anfiteatro%2C_El_Jem%2C_T%C3%BAnez%2C_2016-09-04%2C_DD_38-40_HDR.jpg',
      fullUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b2/Anfiteatro%2C_El_Jem%2C_T%C3%BAnez%2C_2016-09-04%2C_DD_38-40_HDR.jpg',
      width: 8379,
      height: 4632,
      mime: 'image/jpeg',
    },
    {
      id: 'fallback-exterior',
      title: 'Amphitheater at El Djem — Exterior',
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Amphitheater_at_El_Djem.jpg/1280px-Amphitheater_at_El_Djem.jpg',
      fullUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ee/Amphitheater_at_El_Djem.jpg',
      width: 3888,
      height: 2592,
      mime: 'image/jpeg',
    },
    {
      id: 'fallback-interior',
      title: 'Amphitheatre Interior — El Jem',
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Anfiteatro%2C_El_Jem%2C_T%C3%BAnez%2C_2016-09-04%2C_DD_35-37_HDR.jpg/1280px-Anfiteatro%2C_El_Jem%2C_T%C3%BAnez%2C_2016-09-04%2C_DD_35-37_HDR.jpg',
      fullUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Anfiteatro%2C_El_Jem%2C_T%C3%BAnez%2C_2016-09-04%2C_DD_35-37_HDR.jpg',
      width: 6739,
      height: 5098,
      mime: 'image/jpeg',
    },
    {
      id: 'fallback-panorama',
      title: 'El Jem Amphitheatre — Wide View',
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Anfiteatro%2C_El_Jem%2C_T%C3%BAnez%2C_2016-09-04%2C_DD_11.jpg/1280px-Anfiteatro%2C_El_Jem%2C_T%C3%BAnez%2C_2016-09-04%2C_DD_11.jpg',
      fullUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/df/Anfiteatro%2C_El_Jem%2C_T%C3%BAnez%2C_2016-09-04%2C_DD_11.jpg',
      width: 7996,
      height: 4240,
      mime: 'image/jpeg',
    },
    {
      id: 'fallback-detail',
      title: 'El Jem Amphitheatre — Interior Detail',
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Anfiteatro%2C_El_Jem%2C_T%C3%BAnez%2C_2016-09-04%2C_DD_22.jpg/1280px-Anfiteatro%2C_El_Jem%2C_T%C3%BAnez%2C_2016-09-04%2C_DD_22.jpg',
      fullUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/Anfiteatro%2C_El_Jem%2C_T%C3%BAnez%2C_2016-09-04%2C_DD_22.jpg',
      width: 8359,
      height: 5575,
      mime: 'image/jpeg',
    },
    {
      id: 'fallback-aerial',
      title: 'Amphithéâtre d\'El Jem 2024',
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Amphith%C3%A9%C3%A2tre_d%27El_Jem_2024_05.jpg/1280px-Amphith%C3%A9%C3%A2tre_d%27El_Jem_2024_05.jpg',
      fullUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Amphith%C3%A9%C3%A2tre_d%27El_Jem_2024_05.jpg',
      width: 3468,
      height: 4624,
      mime: 'image/jpeg',
    },
  ];
}

export default { fetchAmphitheatreImages, getRandomImage, getHeroImage, getImageByCategory };
