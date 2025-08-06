export function buildGoogleMapsUrlWithAddress(address: string) {
  return `https://google.com/maps?q=${address.replaceAll(" ", "+")}`;
}

export function buildGoogleMapsUrlWithCoordinates(coordinates: [number, number]) {
  const [lat, lon] = coordinates;
  return `https://google.com/maps/place/${lat},${lon}`;
}
