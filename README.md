# Community Hot Spots 📍

[![Live Demo](https://img.shields.io/badge/Live_Demo-Live_Now!-success?style=for-the-badge)](https://jswaggy01.github.io/Community-Hot-Spots/)
[![Snap Engineering Academy](https://img.shields.io/badge/Snap_Engineering_Academy-Portfolio_Project-yellow?style=for-the-badge)](#)

A crowdsourced, web-based map application empowering young people to find and share the best spots for vibes, aesthetics, good food, and third-places in their community. Focuses currently on the Inland Empire region (Highland, Redlands, Loma Linda, Yucaipa, and San Bernardino). 

Whether you're looking for an aesthetic library to study in, a highly-rated local gym, or a top-tier boba shop, Community Hot Spots helps you discover it!

![Community Hot Spots Demo](docs/demo.gif)

---

## 📖 Background

Community Hot Spots is a project I built for the Snap Engineering Academy. The idea sparked while I was taking computer science classes at my community college to deepen my knowledge, particularly for the government sector tech stack. Alongside courses in Web Development and Relational Database Management Systems, I had an excellent professor teaching GIS. I found the concept of interacting with data geospatially incredible, and combining it with the web and database skills I was acquiring felt like the perfect challenge. Realizing that Snap also uses a map to showcase where friends are and where high activity areas are located, I knew this would be the perfect project.

After attending a Snap Engineering Academy alum panel, I spoke with an alum named Bee Du. He shared valuable insights about the application process and the types of projects they look for, noting how competitive the academy has become. Even though he didn't use AI at the time, I chose to embrace it to accelerate my learning. 

As a disclaimer, this project utilized AI assistance. However, I hand coded every line you see. In an evolving technological age, I believe AI should be used as a tool and a learning aid, rather than just a shortcut for building software. I learned so much reading line by line what it takes to build a project that started simple but grew complex with custom styling and interacting components.

A month in advance, I began planning the vision for my app, deciding on the technologies, wireframing, mapping the user flow, and finding inspiration. Through careful planning, product thinking, and AI engineering, a workflow that could have taken months was completed in just a couple of weeks. As a forward-thinking technologist, I understand both the power and the limitations of AI. Leveraged properly, it is a game changer that allows engineers to focus more intentional time and intellectual capacity on system design instead of pure coding.

---

## 🌟 Features

* **Interactive Map:** Pan, zoom, and explore different parts of the community.
* **Crowdsourced Data:** Click anywhere on the map to drop a pin and add a new "Spot" to the database.
* **Dynamic Sidebar:** Easily view a list of all currently pinned locations.
* **Live Filtering & Search:** Filter markers by category (Boba, Gym, Park, etc.) and search for spots by name in real-time.
* **Custom Map Styles & Markers:** Implements custom icons, category-color maps, and a neat dynamic legend.
* **User Feedback Submission:** Integrated feedback system directly connected to the backend.

## 🛠️ Tech Stack

This project was built from the ground up using core web technologies to showcase a deep, first-principles understanding of development!

* **HTML5:** Semantic architecture and structure.
* **Vanilla CSS3:** Custom styling, UI/UX, responsive transitions, and glassmorphism aspects.
* **Vanilla JavaScript:** Frontend logic, DOM manipulation, asynchronous fetching, and event handling.
* **Leaflet.js & Stadia Maps:** Open-source interactive map rendering and dark-mode tile layers.
* **Supabase (PostgreSQL):** Open-source Firebase alternative functioning as the backend database.

## 📂 Project Structure

```text
Community-Hot-Spots/
├── docs/                        # Planning documents (PRD, flow diagrams, wireframes)
├── .gitignore                   # Ignored files and system artifacts
├── index.html                   # Main application interface and structure
├── style.css                    # Styling, UI components, modals, and map overlays
├── app.js                       # Map initialization, API logic, and interactivity
└── README.md                    # Project documentation (You are here!)
```

## 🗄️ Database Schema (Supabase)

This project relies on a PostgreSQL database hosted by Supabase.

### `spots` Table
Stores all the user-submitted locations for the map.

| Column Name | Data Type | Description |
| :--- | :--- | :--- |
| `id` | `uuid` | Primary Key, auto-generated |
| `name` | `text` | Title of the spot |
| `description` | `text` | Optional details or "vibes" about the spot |
| `category` | `text` | Sorting category (e.g., Boba/Coffee Shop, Library) |
| `lat` | `float8` | Latitude coordinate |
| `lng` | `float8` | Longitude coordinate |
| `created_at` | `timestamptz` | Auto-generated timestamp |

### `feedback` Table
Captures user bug reports and suggestions.

| Column Name | Data Type | Description |
| :--- | :--- | :--- |
| `id` | `uuid` | Primary Key, auto-generated |
| `name` | `text` | Optional name of submittor |
| `message` | `text` | Feedback text content |
| `created_at` | `timestamptz` | Auto-generated timestamp |

## 🚀 Local Setup & Installation

If you would like to run this app locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/jSwAggy01/Community-Hot-Spots.git
   cd Community-Hot-Spots
   ```

2. **Run it locally:**
   Because this is pure HTML/CSS/JS, no build step (`npm start`) is required! Simply open `index.html` in your browser. 
   Optionally, use an extension like **Live Server** in VS Code for a better development experience.

3. **Supabase Note:** 
   The application uses an Anon Public Key to communicate with the database via client-side JavaScript. This key enforces Row Level Security (RLS) configured directly in Supabase to maintain database integrity.

## 🔮 Future Improvements

If given more time, these are features that would elevate the platform:
1. **User Authentication:** Allow users to create profiles, track their favorite spots, and upvote/downvote submissions.
2. **Image Uploads:** Integrate Supabase Storage to let users attach photos of the spots they create.
3. **Routing / Directions:** Integrate a routing API to allow users to generate travel directions from their current location directly to a spot's marker.
4. **Clustering:** Implement `Leaflet.markercluster` to group markers when zooming out to avoid visual clutter as the app scales.

---
*Created as a portfolio project for the Snap Engineering Academy (2026).*
