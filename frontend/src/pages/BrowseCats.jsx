import { Link } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'

function BrowseCats() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [cats, setCats] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [fetchError, setFetchError] = useState('')

  useEffect(() => {
    async function fetchReports() {
      try {
        setIsLoading(true)
        setFetchError('')

        const response = await fetch('http://localhost:5001/api/reports')

        if (!response.ok) {
          throw new Error('Failed to load cat reports.')
        }

        const reports = await response.json()

        setCats(reports)
      } catch (error) {
        console.error('Failed to fetch cat reports:', error)
        setFetchError('Unable to load cat reports. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchReports()
  }, [])

    const filteredCats = useMemo(() => {
        const search = searchTerm.trim().toLowerCase()
    
        return cats.filter((cat) => {
          const matchesSearch =
            search === '' ||
            cat.breed.toLowerCase().includes(search) ||
            cat.colour.toLowerCase().includes(search) ||
            cat.location.toLowerCase().includes(search)
    
          const matchesStatus =
            statusFilter === 'all' ||
            cat.report_type() === statusFilter
    
          return matchesSearch && matchesStatus
        })
      }, [cats, searchTerm, statusFilter])
    
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
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
           />
          </div>
  
          <div className="filter-box">
            <label htmlFor="status-filter">Status</label>
          
           <select
            id="status-filter"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            >
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
  
            <span>          
              {filteredCats.length}{' '}
              {filteredCats.length === 1 ? 'report' : 'reports'}
            </span>
          </div>
  
          {isLoading ? (
            <div className="no-results">
                <span>🐾</span>
                <h3>Loading reports...</h3>
                <p>Getting the latest cat reports.</p>
            </div>
            ) : fetchError ? (
            <div className="no-results">
                <span>⚠️</span>
                <h3>Unable to load reports</h3>
                <p>{fetchError}</p>
            </div>
            ) : filteredCats.length > 0 ? (
          <div className="cat-grid">
            {filteredCats.map((cat) => (
              <article className="cat-card" key={cat.id}>
                <div className="cat-card-image">
                  <span>🐱</span>
                </div>

                <div className="cat-card-content">
                  <div className="cat-card-top">
                    <span
                      className={`status status-${cat.report_type}`}
                    >
                      {cat.report_type.charAt(0).toUpperCase() + cat.report_type.slice(1)}
                    </span>

                    <span className="cat-date">{cat.date_seen}</span>
                  </div>

                  <h3>{cat.cat_name || 'Unknown'}</h3>

                  <p className="cat-breed">{cat.breed}</p>

                  <p className="cat-colour">{cat.colour}</p>

                  <p className="cat-location">📍 {cat.location}</p>

                  <Link
                    to={`/report/${cat.id}`}
                    className="view-report-button"
                    >
                    View report →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <span>🐾</span>
            <h3>No reports found</h3>
            <p>
              Try changing your search or selecting a different status.
            </p>
          </div>
        )}
      </section>
    </main>
  )
}

export default BrowseCats
