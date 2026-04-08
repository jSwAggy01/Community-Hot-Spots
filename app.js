// ============================================================
// SUPABASE SETUP
// ============================================================

const SUPABASE_URL = 'https://ryeshhidxtvioiejypsb.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5ZXNoaGlkeHR2aW9pZWp5cHNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1MTg1MTUsImV4cCI6MjA5MTA5NDUxNX0.fkLsn4fuYlzT2MR7LCRRFcTtjAvfzi3PeomstFX9BOU';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ============================================================
// CATEGORY COLORS
// Maps each category to a marker color
// ============================================================
const categoryColors = {
    'Boba/Coffee Shop': '#FFD700', // Gold
    'Library':          '#1E90FF', // Dodger Blue
    'Park':             '#32CD32', // Lime Green
    'Gym':              '#FF4500', // Orange Red
    'Restaurant':       '#FF69B4', // Hot Pink
    'Downtown':         '#8A2BE2', // Blue Violet
    'Plaza':            '#FF8C00', // Dark Orange
    'Other':            '#696969' // Dim Gray
};

// Creates a colored circle marker for a given category
function getMarker(category) {
    const color = categoryColors[category] || '#94a3b8';
    return L.divIcon({
        className: '',
        html: `<div style="
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background-color: ${color};
          border: 2px solid white;
          box-shadow: 0 0 4px rgba(0,0,0,0.5);
        "></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
    });
}

// ============================================================
// MAP SETUP
// Centered between Redlands, Highland,
// Loma Linda, Yucaipa, and San Bernardino
// ============================================================
const map = L.map('map', {
    center: [24.09, -117],
    zoom: 11,
    zoomControl: false, // manually added to bottom right
});

// OpenStreetMap tile layer (free API)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Move zoom controls to bottom right to match wireframe
L.control.zoom({ position: 'bottomright' }).addTo(map);

// ============================================================
// LOAD SPOTS
// Fetches all rows from the spots table and renders them
// ============================================================
let allSpots = [];      // holds every spot from the DB
let allMarkers = [];    // holds every Leaflet marker

async function loadSpots() {
    // Clear existing markers from map
    allMarkers.forEach(m => map.removeLayer(m));
    allMarkers =[];

    // Clear the sidebar spot list
    document.getElementById('spot-list').innerHTML = '';

    // Fetch all spots from Supabase
    const { data, error } = await supabase
      .from('spots')
      .select('*')
      .order('created_at', { ascending: false });
}
// TODO: Add error handling

// ============================================================
// ADD MARKER
// Places a colored marker on the map and binds a popup
// ============================================================


// ============================================================
// ADD LIST ITEM
// Adds a spot to the sidebar <ul> list
// ============================================================


// ============================================================
// SIDEBAR COLLAPSE
// ============================================================


// ============================================================
// BOOT IT UP!
// ============================================================
loadSpots();