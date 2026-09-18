import { Routes, Route, Link } from 'react-router-dom'
import LostCat from './pages/LostCat'
import FoundCat from './pages/FoundCat'
import BrowseCats from './pages/BrowseCats'

function Home() {
  return (
    <>
      <main>
        <section>
          <h1>Help bring lost cats home.</h1>

          <p>
            CatFinder helps owners report missing cats and helps people
            identify cats that have been found nearby.
          </p>

          <div>
            <Link to="/report/lost">
              <button>I've Lost a Cat</button>
            </Link>

            <Link to="/report/found">
              <button>I've Found a Cat</button>
            </Link>
          </div>
        </section>

        <section>
          <h2>Find lost & found cats near you</h2>

          <p>
            Browse reports and discover cats reported in your area.
          </p>

          <Link to="/browse">
            <button>Browse Cats</button>
          </Link>
        </section>
      </main>
    </>
  )
}

function App() {
  return (
    <>
      <nav>
        <h2>CatFinder</h2>

        <div>
          <Link to="/">Home</Link>
          <Link to="/browse">Browse Cats</Link>
          <Link to="/report/lost">Report a Cat</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/report/lost" element={<LostCat />} />
        <Route path="/report/found" element={<FoundCat />} />
        <Route path="/browse" element={<BrowseCats />} />
      </Routes>
    </>
  )
}

export default App