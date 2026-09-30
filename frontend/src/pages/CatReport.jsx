import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function CatReport() {
  const { id } = useParams()

  const [cat, setCat] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchReport() {
      try {
        setIsLoading(true)
        setError('')

        const response = await fetch(
          `http://localhost:5001/api/reports/${id}`,
        )

        if (!response.ok) {
          throw new Error('Report not found.')
        }

        const report = await response.json()

        setCat(report)
      } catch (error) {
        console.error('Failed to fetch report:', error)
        setError('Unable to load this cat report.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchReport()
  }, [id])

  if (isLoading) {
    return (
      <main className="report-not-found">
        <h1>Loading report...</h1>
        <p>Getting the latest cat report.</p>
      </main>
    )
  }

  if (error || !cat) {
    return (
      <main className="report-not-found">
        <h1>Report not found</h1>
        <p>
          {error || "We couldn't find the cat report you're looking for."}
        </p>
        <Link to="/browse">Back to browse cats</Link>
      </main>
    )
  }

  const status =
    cat.report_type.charAt(0).toUpperCase() + cat.report_type.slice(1)

  const formattedDate = new Date(cat.date_seen).toLocaleDateString(
    'en-GB',
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    },
  )

  const formattedSex =
    cat.sex.charAt(0).toUpperCase() + cat.sex.slice(1)

  return (
    <main className="cat-report-page">
      <Link to="/browse" className="back-link">
        ← Back to browse cats
      </Link>

      <section className="cat-report-card">
        <div className="cat-report-image">
          <span>🐱</span>
        </div>

        <div className="cat-report-content">
          <div className="cat-report-top">
            <span
              className={`status status-${cat.report_type}`}
            >
              {status}
            </span>

            <span className="cat-date">{formattedDate}</span>
          </div>

          <h1>{cat.cat_name || 'Unknown'}</h1>

          <p className="cat-report-breed">
            {cat.breed}
          </p>

          <div className="cat-details">
            <div>
              <span>Sex</span>
              <strong>{formattedSex}</strong>
            </div>

            <div>
              <span>Colour & markings</span>
              <strong>{cat.colour}</strong>
            </div>

            <div>
              <span>Location</span>
              <strong>📍 {cat.location}</strong>
            </div>

            <div>
              <span>Date reported</span>
              <strong>{formattedDate}</strong>
            </div>
          </div>

          <div className="cat-description">
            <h2>About this cat</h2>
            <p>{cat.description}</p>
          </div>

          <div className="potential-match-box">
            <span>🐾</span>

            <div>
              <h2>Looking for a potential match?</h2>
              <p>
                CatFinder can help compare this report with other
                lost, found and spotted cats nearby.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default CatReport