import { Link } from 'react-router-dom'

const recentReports = [
  {
    status: 'MISSING',
    statusClass: 'missing',
    name: 'Miso',
    description:
      'Small tortoiseshell cat with a pale nose and a blue collar. Very shy around strangers.',
    location: 'Holloway',
    type: 'Tortoiseshell',
  },
  {
    status: 'SPOTTED',
    statusClass: 'spotted',
    name: 'Possible match',
    description:
      'Ginger-and-white cat spotted near a community garden. Has a small mark on the left ear.',
    location: 'Walthamstow',
    type: 'Ginger and white',
  },
  {
    status: 'MISSING',
    statusClass: 'missing',
    name: 'Luna',
    description:
      'Brown Bengal with dark markings and green eyes. Last seen wearing a blue collar.',
    location: 'Leyton',
    type: 'Bengal',
  },
]

function Home() {
  return (
    <main className="home-page">
      {/* Hero */}

      <section className="home-hero">
        <div className="hero-content">
          <p className="eyebrow">A LITTLE HELP, CLOSE TO HOME</p>

          <h1>
            Lost cats need
            <span>found neighbours.</span>
          </h1>

          <p className="hero-description">
            CatFinder brings lost cats, sightings and the people who can help
            them home into one place.
          </p>

          <div className="hero-actions">
            <Link to="/report/lost" className="primary-button">
              <span>🐾</span>
              I've lost a cat
            </Link>

            <Link to="/report/found" className="secondary-button">
              I've spotted a cat
              <span>→</span>
            </Link>
          </div>

          <p className="hero-note">
            Every report gives a missing cat another pair of eyes.
          </p>
        </div>

        <div className="hero-visual">
          <div className="hero-circle hero-circle-one"></div>
          <div className="hero-circle hero-circle-two"></div>

          <div className="cat-illustration">
            <div className="cat-ear cat-ear-left"></div>
            <div className="cat-ear cat-ear-right"></div>

            <div className="cat-face">
              <div className="cat-eye cat-eye-left"></div>
              <div className="cat-eye cat-eye-right"></div>

              <div className="cat-nose"></div>

              <div className="cat-mouth cat-mouth-left"></div>
              <div className="cat-mouth cat-mouth-right"></div>
            </div>
          </div>

          <div className="floating-card floating-card-top">
            <span className="floating-icon">✦</span>
            <div>
              <strong>Neighbours are looking</strong>
              <p>Every report adds another set of eyes.</p>
            </div>
          </div>

          <div className="floating-card floating-card-bottom">
            <span>📍</span>
            <div>
              <strong>Local sightings</strong>
              <p>See reports around you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}

      <section className="stats-section">
        <div className="stat">
          <strong>24</strong>
          <span>cats reported</span>
        </div>

        <div className="stat">
          <strong>18</strong>
          <span>local sightings</span>
        </div>

        <div className="stat">
          <strong>7</strong>
          <span>potential matches</span>
        </div>

        <div className="stat">
          <strong>1</strong>
          <span>community looking</span>
        </div>
      </section>

      {/* Recent reports */}

      <section className="reports-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">RECENT REPORTS</p>
            <h2>Cats that need a few more eyes.</h2>
          </div>

          <Link to="/browse" className="text-link">
            See all reports
            <span>→</span>
          </Link>
        </div>

        <div className="report-grid">
          {recentReports.map((report) => (
            <article className="report-card" key={report.name}>
              <div className="report-image">
                <span className={`report-badge ${report.statusClass}`}>
                  {report.status}
                </span>

                <div className="placeholder-cat">
                  <span>🐱</span>
                </div>
              </div>

              <div className="report-card-content">
                <div className="report-title-row">
                  <h3>{report.name}</h3>
                  <span className="report-arrow">→</span>
                </div>

                <p>{report.description}</p>

                <div className="report-meta">
                  <span>⌖ {report.location}</span>
                  <span>•</span>
                  <span>{report.type}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* How it works */}

      <section className="how-section">
        <div className="how-intro">
          <div className="how-icon">♡</div>

          <p className="eyebrow">HOW CATFINDER WORKS</p>

          <h2>
            Good information
            <span>travels kindly.</span>
          </h2>

          <p>
            Finding a missing cat shouldn't mean searching dozens of places.
            CatFinder keeps the important information together so people can
            act on it.
          </p>
        </div>

        <div className="steps">
          <div className="step">
            <span className="step-number">01</span>

            <h3>Report</h3>

            <p>
              Share the details people actually need — where, when and what
              your cat looks like.
            </p>
          </div>

          <div className="step">
            <span className="step-number">02</span>

            <h3>Look nearby</h3>

            <p>
              Browse missing and spotted cats around your area using the map
              and search tools.
            </p>
          </div>

          <div className="step">
            <span className="step-number">03</span>

            <h3>Find a connection</h3>

            <p>
              Potential matches bring similar reports together without
              pretending a match is certain.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}

      <section className="home-cta">
        <div>
          <p className="eyebrow">EVERY SIGHTING MATTERS</p>

          <h2>
            Someone's looking
            <span>for them.</span>
          </h2>

          <p>
            Whether you've lost a cat or simply spotted one, your report could
            be the information someone needs.
          </p>
        </div>

        <div className="cta-actions">
          <Link to="/report/lost" className="cta-primary">
            Report a lost cat
          </Link>

          <Link to="/report/found" className="cta-secondary">
            Report a sighting →
          </Link>
        </div>
      </section>
    </main>
  )
}

export default Home