// ============================================================
// SUPABASE SETUP
// ============================================================

const SUPABASE_URL = "https://ryeshhidxtvioiejypsb.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5ZXNoaGlkeHR2aW9pZWp5cHNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1MTg1MTUsImV4cCI6MjA5MTA5NDUxNX0.fkLsn4fuYlzT2MR7LCRRFcTtjAvfzi3PeomstFX9BOU";
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ============================================================
// CATEGORY COLORS
// Maps each category to a marker color
// ============================================================
const categoryColors = {
  "Boba/Coffee Shop": "#FFD700", // Gold
  Library: "#1E90FF", // Dodger Blue
  Park: "#32CD32", // Lime Green
  Gym: "#FF4500", // Orange Red
  Restaurant: "#FF69B4", // Hot Pink
  Downtown: "#8A2BE2", // Blue Violet
  Plaza: "#FF8C00", // Dark Orange
  Other: "#696969", // Dim Gray
};

// Creates a colored circle marker for a given category
function getMarker(category) {
  const color = categoryColors[category] || "#94a3b8";
  return L.divIcon({
    className: "",
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
const map = L.map("map", {
  center: [34.08, -117.1647],
  zoom: 12,
  zoomControl: false, // manually added to bottom right
});

// OpenStreetMap tile layer (free API)
L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
  maxZoom: 20,
  attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(map);


// Move zoom controls to bottom right to match wireframe
L.control.zoom({ position: "bottomright" }).addTo(map);

// ============================================================
// LOAD SPOTS
// Fetches all rows from the spots table and renders them
// ============================================================
let allSpots = []; // holds every spot from the DB
let allMarkers = []; // holds every Leaflet marker

async function loadSpots() {
  // Clear existing markers from map
  allMarkers.forEach((m) => map.removeLayer(m));
  allMarkers = [];

  // Clear the sidebar spot list
  document.getElementById("spot-list").innerHTML = "";
  document.getElementById('search-input').value = '';
  document.getElementById('category-select').value = 'all';

  // Fetch all spots from Supabase
  const { data, error } = await client
    .from("spots")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error loading spots: ", error);
    return;
  }

  allSpots = data;

  allSpots.forEach((spot) => {
    addMarker(spot);
    addListItem(spot);
  });
}

// ============================================================
// ADD MARKER
// Places a colored marker on the map and binds a popup
// ============================================================
function addMarker(spot) {
  const marker = L.marker([spot.lat, spot.lng], {
    icon: getMarker(spot.category),
  });

  // Popup content
  const popupHTML = `
    <div style="
      font-family: 'Segoe UI', sans-serif;
      min-width: 180px;
    ">
      <strong style="font-size: 1rem;">${spot.name}</strong><br/>
      <span style="
        background: ${categoryColors[spot.category] || "#94a3b8"};
        color: #000;
        font-size: 0.7rem;
        padding: 2px 7px;
        border-radius: 10px;
        font-weight: 600;
        display: inline-block;
        margin: 5px 0;
      ">${spot.category}</span>
      <p style="font-size: 0.82rem; margin: 5px 0;">
        ${spot.description || "No description provided."}
      </p>
      
        <a href="https://maps.google.com/?q=${spot.lat},${spot.lng}"
        target="_blank"
        style="
          display: inline-block;
          margin-top: 8px;
          background: #a78bfa;
          color: #000;
          padding: 5px 12px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 0.78rem;
          text-decoration: none;
        "
      >Open in Google Maps</a>
    </div>
  `;

  marker.bindPopup(popupHTML);
  marker.addTo(map);

  // Store the marker alongside its spot data for filtering later
  marker.spotData = spot;
  allMarkers.push(marker);
}

// ============================================================
// ADD LIST ITEM
// Adds a spot to the sidebar <ul> list
// ============================================================
function addListItem(spot) {
    const li = document.createElement('li');
    li.textContent = spot.name;
    li.dataset.id = spot.id;

    // Clicking a list item flies the map to that marker
    // and opens its popup
    li.addEventListener('click', () => {
        const marker = allMarkers.find(m => m.spotData.id === spot.id);
        if (marker) {
            map.flyTo([spot.lat, spot.lng], 15);
            marker.openPopup();
        }
    });

    document.getElementById('spot-list').appendChild(li);
}

// ============================================================
// SIDEBAR COLLAPSE
// ============================================================
const sidebar = document.getElementById('sidebar');
const collapseBtn = document.getElementById('collapse-btn');
const showTab = document.getElementById('show-sidebar-tab');

collapseBtn.addEventListener('click', () => {
    sidebar.classList.add('collapsed');
    showTab.classList.add('visible');
});

showTab.addEventListener('click', () => {
    sidebar.classList.remove('collapsed');
    showTab.classList.remove('visible');
});

// ============================================================
// BOOT IT UP!
// ============================================================
loadSpots();

// ============================================================
// TRACK MAP CLICK
// When user clicks the map, store coords and open the modal
// ============================================================

let clickedLat = null;
let clickedLng = null;

map.on('click', function(e) {
    clickedLat = e.latlng.lat.toFixed(6);
    clickedLng = e.latlng.lng.toFixed(6);

    //Pre-fill the lat/lng fields in the modal
    document.getElementById('spot-lat').value = clickedLat;
    document.getElementById('spot-lng').value = clickedLng;

    // Open the modal
    document.getElementById('modal').classList.remove('hidden');
});

// ============================================================
// CREATE BUTTON
// Opens the modal without pre-filled coordinates
// (user can type them in manually)
// ============================================================

document.getElementById('create-btn').addEventListener('click', () => {
    // Clear previous values
    document.getElementById('spot-name').value = '';
    document.getElementById('spot-desc').value = '';
    document.getElementById('spot-category').value = '';
    document.getElementById('spot-lat').value = '';
    document.getElementById('spot-lng').value = '';

    // Open the modal
    document.getElementById('modal').classList.remove('hidden');
});

// ============================================================
// CANCEL BUTTON
// Closes the modal without doing anything
// ============================================================
document.getElementById('cancel-spot').addEventListener('click', () => {
    document.getElementById('modal').classList.add('hidden');
});

// ============================================================
// SUBMIT SPOT
// Validates the form, inserts into Supabase, refreshes map
// ============================================================
document.getElementById('submit-spot').addEventListener('click', async () => {
    
    // Grab form values
    const name = document.getElementById('spot-name').value.trim();
    const desc = document.getElementById('spot-desc').value.trim();
    const category = document.getElementById('spot-category').value;
    const lat = parseFloat(document.getElementById('spot-lat').value);
    const lng = parseFloat(document.getElementById('spot-lng').value);

    // Basic validation
    if (!name) {
        alert('Please enter a name for the spot.');
        return;
    }
    if (!category) {
        alert('Please select a category.');
        return;
    }
    if (isNaN(lat) || isNaN(lng)) {
        alert('Please provide valid coordinates.');
        return;
    }

    // Insert into Supabase
    const { error } = await client
        .from('spots')
        .insert([{
            name: name,
            description: desc,
            category: category,
            lat: lat,
            lng: lng
        }]);
    
    if (error) {
        console.error('Error inserting spot:', error);
        alert('Something went wrong. Check the console.');
        return;
    }

    // Close modal and refresh the map + list
    document.getElementById('modal').classList.add('hidden');
    await loadSpots();
})

// ============================================================
// SEARCH
// Filters markers and list items by spot name as you type
// ============================================================
document.getElementById('search-input').addEventListener('input', function() {
    const query = this.value.toLowerCase().trim();

    allMarkers.forEach(marker => {
        const name = marker.spotData.name.toLowerCase();
        const matches = name.includes(query);

        if (matches) {
            if (!map.hasLayer(marker)) map.addLayer(marker);
        } else {
            if (map.hasLayer(marker)) map.removeLayer(marker);
        }
    });

    // Filter sidebar list items
    const items = document.querySelectorAll('#spot-list li');
    items.forEach(item => {
        const name = item.textContent.toLowerCase();
        item.computedStyleMap.display = name.includes(query) ? 'block' : 'none';
    });
});

// ============================================================
// CATEGORY FILTER
// Shows only markers and list items matching selected category
// ============================================================
document.getElementById('category-select').addEventListener('change', function() {
    const selected = this.value;

    allMarkers.forEach(marker => {
        const matches = 
            selected === 'all' || marker.spotData.category === selected;

            if (matches) {
                if (!map.hasLayer(marker)) map.addLayer(marker);
            } else {
                if (map.hasLayer(marker)) map.removeLayer(marker);
            }
    });

    // Filter sidebar list items
    const items = document.querySelectorAll('#spot-list li');
    items.forEach(item => {
        const spotId = item.dataset.id;
        const spot = allSpots.find(s => s.id === spotId);
        const matches = selected === 'all' || spot.category === selected;
        item.style.display = matches ? 'block' : 'none';
    });
});