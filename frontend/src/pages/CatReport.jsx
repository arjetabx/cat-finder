import { Link, useParams } from 'react-router-dom'

const cats = [
  {
    id: 1,
    name: 'Luna',
    status: 'Lost',
    breed: 'Bengal',
    sex: 'Female',
    colour: 'Brown with dark spots',
    location: 'Walthamstow, London',
    date: '18 September 2026',
    description:
      'Luna is a friendly Bengal cat with distinctive dark spots. She may be nervous around unfamiliar people.',
  },
  {
    id: 2,
    name: 'Unknown',
    status: 'Found',
    breed: 'Domestic Shorthair',
    sex: 'Unknown',
    colour: 'Ginger and white',
    location: 'Leyton, London',
    date: '19 September 2026',
    description:
      'Ginger and white cat seen nearby. The cat appeared calm but no owner was nearby.',
  },
  {
    id: 3,
    name: 'Milo',
    status: 'Lost',
    breed: 'British Shorthair',
    sex: 'Male',
    colour: 'Grey',
    location: 'Hackney, London',
    date: '17 September 2026',
    description:
      'Milo is a grey British Shorthair. He is usually friendly but may hide when approached by strangers.',
  },
]

function CatReport() {
  const { id } = useParams()

  const cat = cats.find((cat) => cat.id === Number(id))

  if (!cat) {
    return (
      <main className="report-not-found">
        <h1>Report not found</h1>
        <p>
          We couldn't find the cat report you're looking for.
        </p>
        <Link to="/browse">Back to browse cats</Link>
      </main>
    )
  }

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
              className={`status status-${cat.status.toLowerCase()}`}
            >
              {cat.status}
            </span>

            <span className="cat-date">{cat.date}</span>
          </div>

          <h1>{cat.name}</h1>

          <p className="cat-report-breed">
            {cat.breed}
          </p>

          <div className="cat-details">
            <div>
              <span>Sex</span>
              <strong>{cat.sex}</strong>
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
              <strong>{cat.date}</strong>
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