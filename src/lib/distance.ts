/**
 * Calculate the distance between two geographical points using the Haversine formula
 * @param lat1 - Latitude of first point
 * @param lon1 - Longitude of first point
 * @param lat2 - Latitude of second point
 * @param lon2 - Longitude of second point
 * @returns Distance in kilometers
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

/**
 * Format distance to readable string
 * @param distanceKm - Distance in kilometers
 * @returns Formatted string like "2.4 km" or "850 m"
 */
export function formatDistance(distanceKm: number): string {
  if (distanceKm < 1) {
    return `${Math.round(distanceKm * 1000)} m`;
  }
  return `${distanceKm.toFixed(1)} km`;
}

/**
 * Get mock coordinates for restaurant places (since API doesn't provide coordinates)
 * This is a temporary solution until we have actual coordinates from API
 */
export function getMockCoordinates(place: string): {
  lat: number;
  lng: number;
} {
  // Mock coordinates for common Indonesian cities/areas
  const mockCoordinates: Record<string, { lat: number; lng: number }> = {
    Jakarta: { lat: -6.2088, lng: 106.8456 },
    'Jakarta Selatan': { lat: -6.2615, lng: 106.8106 },
    'Jakarta Pusat': { lat: -6.1831, lng: 106.8292 },
    'Jakarta Utara': { lat: -6.1385, lng: 106.8635 },
    'Jakarta Barat': { lat: -6.1675, lng: 106.7539 },
    'Jakarta Timur': { lat: -6.225, lng: 106.9004 },
    Bandung: { lat: -6.9175, lng: 107.6191 },
    Surabaya: { lat: -7.2575, lng: 112.7521 },
    Medan: { lat: 3.5952, lng: 98.6722 },
    Bekasi: { lat: -6.2383, lng: 106.9756 },
    Tangerang: { lat: -6.1781, lng: 106.6319 },
    Depok: { lat: -6.4025, lng: 106.7942 },
    Semarang: { lat: -6.9667, lng: 110.4167 },
    Palembang: { lat: -2.9761, lng: 104.7754 },
    Makassar: { lat: -5.1477, lng: 119.4327 },
    Bogor: { lat: -6.5971, lng: 106.806 },
  };

  // Try to find exact match first
  if (mockCoordinates[place]) {
    return mockCoordinates[place];
  }

  // Try partial match
  const partialMatch = Object.keys(mockCoordinates).find(
    (key) =>
      place.toLowerCase().includes(key.toLowerCase()) ||
      key.toLowerCase().includes(place.toLowerCase())
  );

  if (partialMatch) {
    return mockCoordinates[partialMatch];
  }

  // Default to Jakarta if no match found
  return mockCoordinates['Jakarta'];
}
