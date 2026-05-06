import { useState, useEffect } from 'react';
import './index.css';

const SUB_FILTERS = [
  'All', 'Chicken', 'Beef', 'Pork', 'Lamb', 'Seafood', 
  'Vegetarian', 'Vegan', 'Pasta', 'Dessert', 'Starter', 'Breakfast'
];

const FILTER_EMOJIS = {
  All: '',
  Chicken: '🍗',
  Beef: '🥩',
  Pork: '🥓',
  Lamb: '🍖',
  Seafood: '🍤',
  Vegetarian: '🥬',
  Vegan: '🌱',
  Pasta: '🍝',
  Dessert: '🍰',
  Starter: '🥟',
  Breakfast: '🍳'
};

function App() {
  const [meal, setMeal] = useState([]);
  const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [filterType, setFilterType] = useState('All'); 

  const fetchMeals = async (currentPage, searchQuery) => {
    try {
      setLoading(true);
      const url = searchQuery && searchQuery !== 'All'
        ? `https://api.freeapi.app/api/v1/public/meals?page=${currentPage}&limit=12&query=${searchQuery}`
        : `https://api.freeapi.app/api/v1/public/meals?page=${currentPage}&limit=12`;

      const response = await fetch(url);
      const data = await response.json();
      
      // Artificial delay for smooth loading animation
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setMeal(data.data.data);
      setMeta({
        totalItems: data.data.totalItems,
        currentPageItems: data.data.currentPageItems,
        totalPages: data.data.totalPages,
        page: data.data.page,
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeals(page, filterType);
  }, [page, filterType]);

  const handleFilterClick = (type) => {
    setFilterType(type);
    setPage(1); // Reset to page 1 when filter changes
  };

  const getTopIngredients = (meal) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`] && meal[`strIngredient${i}`].trim() !== '') {
        ingredients.push(meal[`strIngredient${i}`]);
      }
    }
    return ingredients.slice(0, 3);
  };

  const renderPagination = () => {
    if (!meta || meta.totalPages <= 1) return null;
    const { totalPages } = meta;
    let startPage = Math.max(1, page - 2);
    let endPage = Math.min(totalPages, page + 2);
    
    if (page <= 2) endPage = Math.min(5, totalPages);
    if (page >= totalPages - 1) startPage = Math.max(1, totalPages - 4);

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return (
      <div className="pagination">
        <button className="page-btn nav-btn" disabled={page === 1} onClick={() => setPage(1)} title="Go to First Page">
          &laquo; FIRST
        </button>
        <button className="page-btn nav-btn" disabled={page === 1} onClick={() => setPage(page - 1)} title="Previous Page">
          &lsaquo; PREV
        </button>
        
        {startPage > 1 && <span className="page-dots">...</span>}
        
        {pages.map(p => (
          <button key={p} className={`page-btn ${p === page ? 'active' : ''}`} onClick={() => setPage(p)}>
            {p}
          </button>
        ))}
        
        {endPage < totalPages && <span className="page-dots">...</span>}
        
        <button className="page-btn nav-btn" disabled={page === totalPages} onClick={() => setPage(page + 1)} title="Next Page">
          NEXT &rsaquo;
        </button>
        <button className="page-btn nav-btn" disabled={page === totalPages} onClick={() => setPage(totalPages)} title="Go to Last Page">
          LAST &raquo;
        </button>
      </div>
    );
  };

  return (
    <>
      <header className="page-header">
        <div className="header-glow"></div>
        <h1 className="header-title">Global Meals Directory</h1>
        <p className="header-subtitle">Discover premium culinary experiences from around the globe.</p>
        
        {!loading && meta && (
          <div className="stats-dashboard">
            <div className="stat-box">
              <span className="stat-value">{meta.totalItems}</span>
              <span className="stat-label">Total Recipes Found</span>
            </div>
            <div className="stat-box">
              <span className="stat-value">{meal.length}</span>
              <span className="stat-label">In this view</span>
            </div>
            <div className="stat-box">
              <span className="stat-value">{meta.totalPages > 0 ? meta.page : 0} / {meta.totalPages}</span>
              <span className="stat-label">Page Info</span>
            </div>
          </div>
        )}

        <div className="filter-container">
          {SUB_FILTERS.map((type) => (
            <button 
              key={type}
              className={`filter-btn ${filterType === type ? 'active' : ''}`} 
              onClick={() => handleFilterClick(type)}
            >
              {FILTER_EMOJIS[type]} {type}
            </button>
          ))}
        </div>
      </header>

      <div className="container">
        {loading ? (
          <div className="loader">Sizzling recipes...</div>
        ) : meal.length === 0 ? (
          <div className="no-data-msg">No recipes found for "{filterType}". Try another category.</div>
        ) : (
          <>
            <div className="top-pagination-wrapper">
              {renderPagination()}
            </div>

            <div className="card-grid">
              {meal.map((item, index) => {
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
                      
                      <div className="tags-container">
                        {item.strTags && item.strTags.split(',').map((tag, i) => (
                          <span key={i} className="tag-pill">#{tag.trim()}</span>
                        ))}
                      </div>

                      <div className="ingredients-preview">
                        <strong>Key Ingredients:</strong>
                        <p>{topIngredients.join(', ')}{item.strIngredient4 ? '...' : ''}</p>
                      </div>
                    </div>

                    <div className="card-footer">
                      <a href={item.strYoutube} target="_blank" rel="noopener noreferrer" className="btn-primary">
                        ▶ Watch Recipe
                      </a>
                      {item.strSource && (
                        <a href={item.strSource} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                          Read Article
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bottom-pagination-wrapper">
              {renderPagination()}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
