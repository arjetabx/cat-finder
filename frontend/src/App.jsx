import { Routes, Route, Link } from 'react-router-dom'

import Home from './pages/Home'
import LostCat from './pages/LostCat'
import FoundCat from './pages/FoundCat'
import BrowseCats from './pages/BrowseCats'
import CatReport from './pages/CatReport'

function App() {
  return (
    <>
      <nav className="site-nav">

        <Link to="/" className="brand">
          <span className="brand-paw">🐾</span>
          <span>CatFinder</span>
        </Link>

        <div className="nav-links">
          <Link to="/browse">Browse cats</Link>
        </div>

        <Link to="/report/lost" className="nav-button">
          Report a cat
        </Link>

      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/report/lost" element={<LostCat />} />
        <Route path="/report/found" element={<FoundCat />} />
        <Route path="/browse" element={<BrowseCats />} />
        <Route path="/report/:id" element={<CatReport />} />
      </Routes>
    </>
  )
}

export default App