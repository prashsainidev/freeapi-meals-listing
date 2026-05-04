# The Global Meals Directory (Meals Listing Interface)

![Project Status](https://img.shields.io/badge/Status-Completed-success?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Tech-React_|_Vite_|_CSS3-blue?style=for-the-badge)
![Live Demo](https://img.shields.io/badge/Live-Demo_Pending-orange?style=for-the-badge)

> Most developers build recipe apps the exact same way. They fetch the meals, dump an image and a title on the screen, and call it a day. 

That was fine for a beginner. But in 2026, building a generic UI isn't enough. You need to build something that feels like a premium restaurant menu. Something that is interactive and visually stunning.

This is the Global Meals Directory. Built for the MasterJi Web Dev Cohort 2026, using the FreeAPI Meals endpoint.

Here is exactly how I leveled up from my first API project and built this. Step by step.

## The Next Level of API Mastery

In my previous Random Users project, I mastered the basic fetch and display. In this project, I tackled advanced data manipulation.

1. The Filter Logic
Real apps don't just show everything at once; they let users filter. I introduced a new state variable for the filter type and used the JavaScript array filter method. Before rendering any meal, the app checks if it belongs to a vegetarian category based on the API response. Instead of rendering the raw data, the app maps over the filtered array.

2. Demystifying Messy API Data
The FreeAPI Meals endpoint doesn't give you a clean array of ingredients. It provides 20 separate properties for ingredients. Instead of writing 20 lines of repetitive code, I built a helper function. I used a loop and template literals to dynamically extract only the top 3 ingredients for the UI preview.

3. Breaking Strings into Badges
The API returned tags as a single comma-separated string. I used the split method to break that string into an array, and then mapped it to render each word as its own individual tag pill.

4. Conditional Rendering
Not every meal has an article source link. If I just placed a button, the app would break or look empty for some meals. I used the logical AND operator to conditionally render the 'Read Article' button only if the API provides a valid link.

## The Real Secret: CSS Engineering

I wanted this to look like an expensive food dashboard. Here is what makes this UI stand out:

Premium Dark Aesthetics
I used an ultra-dark background with premium dark cards, accented by a warm amber color. 

Glassmorphism
For the category badges and status counters, I used rgba backgrounds paired with a backdrop blur filter to create a modern, frosted-glass effect.

The :has() Pseudo-class
This is a modern CSS feature. The card footer dynamically changes its grid layout from one column to two columns only if it detects that the secondary button exists inside it.

Micro-Interactions
Smooth card lifts combined with an internal image zoom on hover makes the app feel alive and responsive.

> This isn't just another API fetch project. It's a study in advanced React state filtering and premium CSS architecture.

## Try it yourself

1. Clone this repository to your machine:
   ```bash
   git clone https://github.com/prashsainidev/freeapi-meals-listing.git
   ```
2. Navigate to the folder:
   ```bash
   cd 04-freeapi-meals-listing-interface
   ```
3. Install the packages:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

Open it up, click the category filters, inspect the CSS, and see how a proper API integration feels.
