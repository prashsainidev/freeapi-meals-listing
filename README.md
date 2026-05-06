# The Global Meals Directory (Meals Listing Interface)

![Project Status](https://img.shields.io/badge/Status-Completed-success?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Tech-React_|_Vite_|_CSS3-blue?style=for-the-badge)
![Live Demo](https://img.shields.io/badge/Live-Demo_Pending-orange?style=for-the-badge)

> Most developers build recipe apps the exact same way. They fetch the meals, dump an image and a title on the screen, and call it a day. 

That was fine for a beginner. But in 2026, building a generic UI isn't enough. You need to build something that feels like a premium restaurant menu. Something that is interactive and visually stunning.

**Welcome to Part 2 of my FreeAPI Mastery Series.** This is the Global Meals Directory, built using the FreeAPI Meals endpoint.

Here is exactly how I leveled up from my first API project and built this. Step by step.

## The Next Level of API Mastery

In **Part 1 (Random Users)**, I mastered how to securely fetch and display an array of data. But real-world data is rarely clean. In this second project, I tackled advanced Javascript data manipulation.

### 1. The Filter Logic
* **Goal:** Let users filter meals (e.g., Vegetarian).
* **Implementation:** Introduced a state variable for the filter type and used the array `filter()` method.
* **Result:** The app checks the category and maps over the filtered array instead of raw data.

### 2. Demystifying Messy API Data
* **The API Endpoint:** `https://api.freeapi.app/api/v1/public/meals`
* **The JSON Structure:** The API returns `data.data.data` which is an array of complex meal objects.
* **The Problem:** The FreeAPI Meals endpoint provides 20 separate properties for ingredients (`strIngredient1`, `strIngredient2`, etc.) instead of a clean array.
* **The Solution:** Built a helper function using a `for` loop to dynamically check `meal[\`strIngredient\${i}\`]` and push valid strings into a new clean array.
* **Result:** Dynamically extracted only the top 3 ingredients for the UI preview without crashing the app on empty properties.

### 3. Breaking Strings into Badges
* **Problem:** API returned tags as a single comma-separated string.
* **Solution:** Used `.split(',')` to break the string into an array.
* **Result:** Mapped the array to render each word as its own individual tag pill.

### 4. Conditional Rendering
* **Problem:** Not every meal has an article source link.
* **Solution:** Used the logical `&&` operator.
* **Result:** Conditionally rendered the 'Read Article' button only if a valid link exists.

### 5. Handling Scale (Pagination & Metadata)
Fetching a few meals is easy. Managing hundreds of recipes is hard. I upgraded the architecture to handle full-scale datasets seamlessly.
* **Dynamic Fetching:** Updated the API call to accept `page` parameters (`?page=${currentPage}&limit=12`).
* **Metadata Extraction:** Captured `totalItems`, `currentPageItems`, and `totalPages` from the API response to power a real-time Statistics Dashboard in the header.
* **Advanced Navigation:** Built a robust mathematical pagination system with `FIRST`, `PREV`, `NEXT`, and `LAST` controls, calculating dynamic page ranges on the fly so the UI never breaks.

## The Real Secret: CSS Engineering

I wanted this to look like an expensive food dashboard. Here is what makes this UI stand out:

* **Premium Aesthetics:** Used an ultra-dark background with a subtle Amber dot pattern, accented by a glowing neon header.
* **Glassmorphism Dashboard:** Designed a statistics dashboard using `rgba` backgrounds paired with `backdrop-filter: blur()` to elevate the UX beyond a standard list.
* **The `:has()` Pseudo-class:** A modern CSS feature where the card footer dynamically changes its grid layout from one column to two columns only if it detects the secondary button inside.
* **Micro-Interactions:** Smooth card lifts combined with an internal image zoom on hover and artificial loading delays makes the app feel incredibly premium and responsive.

> This isn't just another API fetch project. It's a study in advanced React state filtering and premium CSS architecture.

## Try it yourself

1. **Clone this repository** to your machine:
   ```bash
   git clone https://github.com/prashsainidev/freeapi-meals-listing.git
   ```
2. **Navigate to the folder**:
   ```bash
   cd 04-freeapi-meals-listing-interface
   ```
3. **Install the packages**:
   ```bash
   npm install
   ```
4. **Start the server**:
   ```bash
   npm run dev
   ```

_Open it up, click the category filters, inspect the CSS, and see how a proper API integration feels._
