function BrowseCats() {
    const cats = [
      {
        id: 1,
        name: 'Luna',
        status: 'Lost',
        breed: 'Bengal',
        colour: 'Brown with dark spots',
        location: 'Walthamstow, London',
        date: '18 September 2026',
      },
      {
        id: 2,
        name: 'Unknown',
        status: 'Found',
        breed: 'Domestic Shorthair',
        colour: 'Ginger and white',
        location: 'Leyton, London',
        date: '19 September 2026',
      },
      {
        id: 3,
        name: 'Milo',
        status: 'Lost',
        breed: 'British Shorthair',
        colour: 'Grey',
        location: 'Hackney, London',
        date: '17 September 2026',
      },
    ]
  
    return (
      <main className="browse-page">
        <section className="browse-header">
          <p className="browse-label">CATFINDER REPORTS</p>
  
          <h1>Find cats near you.</h1>
  
          <p>
            Browse lost, found and spotted cat reports and see what's been
            reported in your area.
          </p>
        </section>
  
        <section className="browse-controls">
          <div className="search-box">
            <label htmlFor="cat-search">Search reports</label>
  
            <input
              id="cat-search"
              type="text"
              placeholder="Search by breed, colour or location..."
            />
          </div>
  
          <div className="filter-box">
            <label htmlFor="status-filter">Status</label>
  
            <select id="status-filter">
              <option value="all">All reports</option>
              <option value="lost">Lost</option>
              <option value="found">Found</option>
              <option value="spotted">Spotted</option>
            </select>
          </div>
        </section>
  
        <section className="browse-results">
          <div className="results-heading">
            <div>
              <p className="results-label">NEARBY REPORTS</p>
              <h2>Recent reports</h2>
            </div>
  
            <span>{cats.length} reports</span>
          </div>
  
          <div className="cat-grid">
            {cats.map((cat) => (
              <article className="cat-card" key={cat.id}>
                <div className="cat-card-image">
                  <span>🐱</span>
                </div>
  
                <div className="cat-card-content">
                  <div className="cat-card-top">
                    <span className={`status status-${cat.status.toLowerCase()}`}>
                      {cat.status}
                    </span>
  
                    <span className="cat-date">{cat.date}</span>
                  </div>
  
                  <h3>{cat.name}</h3>
  
                  <p className="cat-breed">{cat.breed}</p>
  
                  <p className="cat-colour">{cat.colour}</p>
  
                  <p className="cat-location">
                    📍 {cat.location}
                  </p>
  
                  <button className="view-report-button">
                    View report →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    )
  }
  
  export default BrowseCats