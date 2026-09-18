function LostCat() {
    return (
      <main className="report-page">
        <section className="report-header">
          <p className="report-label">REPORT A LOST CAT</p>
  
          <h1>Tell us about your cat</h1>
  
          <p>
            Provide as much information as you can to help people identify and
            report sightings of your cat.
          </p>
        </section>
  
        <form className="cat-form">
          <section className="form-section">
            <h2>About your cat</h2>
  
            <div className="form-group">
              <label htmlFor="cat-name">Cat's name</label>
              <input
                id="cat-name"
                type="text"
                placeholder="e.g. Luna"
              />
            </div>
  
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="breed">Breed</label>
                <input
                  id="breed"
                  type="text"
                  placeholder="e.g. Bengal"
                />
              </div>
  
              <div className="form-group">
                <label htmlFor="sex">Sex</label>
                <select id="sex">
                  <option value="">Select</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="unknown">Unknown</option>
                </select>
              </div>
            </div>
  
            <div className="form-group">
              <label htmlFor="colour">Colour and markings</label>
              <input
                id="colour"
                type="text"
                placeholder="e.g. Brown with dark spots"
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                rows="5"
                placeholder="Describe any distinctive features, markings, collar, behaviour, or other details..."
              />
            </div>
          </section>
  
          <section className="form-section">
            <h2>Where and when was your cat last seen?</h2>
  
            <div className="form-group">
              <label htmlFor="location">Last known location</label>
              <input
                id="location"
                type="text"
                placeholder="e.g. Walthamstow, London"
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="date">Date last seen</label>
              <input
                id="date"
                type="date"
              />
            </div>
          </section>
  
          <section className="form-section">
            <h2>Add a photo</h2>
  
            <p className="form-help">
              Upload a clear photo of your cat if you have one.
            </p>
  
            <div className="upload-box">
              <input
                id="photo"
                type="file"
                accept="image/*"
              />
  
              <label htmlFor="photo">
                Choose a photo
              </label>
            </div>
          </section>
  
          <button type="submit" className="submit-button">
            Report Lost Cat
          </button>
        </form>
      </main>
    )
  }
  
  export default LostCat