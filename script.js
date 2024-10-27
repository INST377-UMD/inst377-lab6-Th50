// Leaflet Map Initialization
const map = L.map('map').setView([37.0902, -95.7129], 4); // Centered on the U.S.

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Random Coordinate Generator Function
function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

// Generate Three Random Coordinates
const coordinates = [
    { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-90, -100, 3) },
    { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-90, -100, 3) },
    { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-90, -100, 3) }
];

// Function to Fetch Locality Data and Display on the Map and Page
function addMarkerWithLocality(index, { lat, lng }) {
    const marker = L.marker([lat, lng]).addTo(map);
    marker.bindPopup(`Marker ${index + 1}: ${lat}, ${lng}`).openPopup();

    // Fetch locality data using BigDataCloud API
    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`)
        .then(response => response.json())
        .then(data => {
            const locality = data.locality || 'Locality not found';
            document.getElementById(`marker${index + 1}`).textContent = `Marker ${index + 1} (${lat}, ${lng}): ${locality}`;
        })
        .catch(error => {
            console.error('Error fetching locality:', error);
            document.getElementById(`marker${index + 1}`).textContent = `Marker ${index + 1} (${lat}, ${lng}): Error fetching locality`;
        });
}

// Add Markers and Fetch Locality for Each Coordinate
coordinates.forEach((coord, index) => addMarkerWithLocality(index, coord));
