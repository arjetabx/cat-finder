function App() {
  return (
    <div>
      <nav>
      <h1>CatFinder</h1>

      <div>
      <a href="#">Home</a>
          <a href="#">Browse Cats</a>
          <a href="#">Report a Cat</a>
      </div>
      </nav>

    <main>
      <section>
        <h1>Help bring lost cats home.</h1>

        <p>CatFinder helps owners report missing cats and helps people idenitfy cats that have been spotted nearby</p>
     
        <div>
          <button>I've Lost a Cat :(</button>
          <button>I've Found a Cat :)</button>
        </div>
      </section>

      <section>
        <h2>Find lost & found cats near you</h2>

        <p>
          Browse reports and discover cats reported in your area.
        </p>
        <button>Browse Cats</button>
      </section>
     </main>
    </div>

  )
}

export default App