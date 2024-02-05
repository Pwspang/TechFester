/**
 * Computes the Euclidean distance between two points
 * 
 * @param {number} lat1 - Latitude of the first point
 * @param {number} lon1 - Longitude of the first point
 * @param {number} lat2 - Latitude of the second point
 * @param {number} lon2 - Longitude of the second point
 * 
 * @returns {number} - Euclidean distance between the two points
 */
export function calcDistance(lat1, lon1, lat2, lon2) {
    const dx = lat1 - lat2;
    const dy = lon1 - lon2;
    return Math.sqrt(dx * dx + dy * dy);
}