import { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [meal, setMeal] = useState([]);
  const [filterType, setFilterType] = useState('All'); // Naya state filter ke liye

  useEffect(() => {
    fetch('https://api.freeapi.app/api/v1/public/meals')
      .then(response => response.json())
      .then(data => {
        console.log('API Data:', data);
        setMeal(data.data.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Helper function to extract top 3 ingredients
  const getTopIngredients = (meal) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`] && meal[`strIngredient${i}`].trim() !== '') {
        ingredients.push(meal[`strIngredient${i}`]);
      }
    }
    return ingredients.slice(0, 3); // Return only top 3
  };

  // Filter ka Logic
  const filteredMeals = meal.filter((item) => {
    if (filterType === 'All') return true;
    
    // Vegetarian categories (Hum Dessert ko bhi veg maan rahe hain is demo ke liye)
    const isVeg = item.strCategory === 'Vegetarian' || item.strCategory === 'Vegan' || item.strCategory === 'Dessert';
    
    if (filterType === 'Veg') return isVeg;
    if (filterType === 'Non-Veg') return !isVeg; // Jo veg nahi hai, wo non-veg hai
    
    return true;
  });

  return (
    <>
      <header className="page-header">
        <h1>Global Meals Directory</h1>
        <div className="status-badge">
          <span className="pulse"></span>
          {filteredMeals.length} Premium Recipes Discovered
        </div>

        {/* Filter Buttons UI */}
        <div className="filter-container">
          <button 
            className={`filter-btn ${filterType === 'All' ? 'active' : ''}`}
            onClick={() => setFilterType('All')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${filterType === 'Veg' ? 'active' : ''}`}
            onClick={() => setFilterType('Veg')}
          >
            🥬 Veg
          </button>
          <button 
            className={`filter-btn ${filterType === 'Non-Veg' ? 'active' : ''}`}
            onClick={() => setFilterType('Non-Veg')}
          >
            🍗 Non-Veg
          </button>
        </div>
      </header>

      <div className="container">
        <div className="card-grid">
          {filteredMeals.map((item, index) => {
            const topIngredients = getTopIngredients(item);
            
            return (
              <div className="premium-card" key={index}>
                <div className="card-image-wrapper">
                  <img src={item.strMealThumb} alt={item.strMeal} className="card-image" />
                  <div className="category-badge">{item.strCategory}</div>
                </div>

                <div className="card-content">
                  <div className="area-label">📍 {item.strArea} Cuisine</div>
                  <h2 className="meal-title">{item.strMeal}</h2>
                  
                  {/* Tags */}
                  <div className="tags-container">
                    {item.strTags && item.strTags.split(',').map((tag, i) => (
                      <span key={i} className="tag-pill">#{tag.trim()}</span>
                    ))}
                  </div>

                  {/* Ingredients Preview */}
                  <div className="ingredients-preview">
                    <strong>Key Ingredients:</strong>
                    <p>{topIngredients.join(', ')}{item.strIngredient4 ? '...' : ''}</p>
                  </div>
                </div>

                <div className="card-footer">
                  <a 
                    href={item.strYoutube} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-primary"
                  >
                    ▶ Watch Recipe
                  </a>
                  {item.strSource && (
                    <a 
                      href={item.strSource} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn-secondary"
                    >
                      Read Article
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
