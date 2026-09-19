import { useState } from 'react'
import LocationPicker from '../components/LocationPicker'

function FoundCat() {
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const [formData, setFormData] = useState({
    reportType: '',
    breed: '',
    sex: '',
    colour: '',
    description: '',
    location: '',
    latitude: null,
    longitude: null,
    date: '',
    photo: null,
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  function handleChange(event) {
    const { name, value, files } = event.target

    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    })
  }

  function validateForm() {
    const newErrors = {}

    if (!formData.reportType) {
      newErrors.reportType = 'Please select what happened.'
    }

    if (!formData.breed.trim()) {
      newErrors.breed = "Please enter the cat's breed, or enter unknown."
    }

    if (!formData.sex) {
      newErrors.sex = "Please select the cat's sex."
    }

    if (!formData.colour.trim()) {
      newErrors.colour = "Please describe the cat's colour and markings."
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Please provide a description of the cat.'
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Please enter where you saw the cat.'
    }

    if (!formData.date) {
      newErrors.date = 'Please enter the date you saw the cat.'
    }

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.'
    }

    if (!formData.password) {
      newErrors.password = 'Please create a password.'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters.'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.'
    }

    return newErrors
  }

  function handleSubmit(event) {
    event.preventDefault()

    const validationErrors = validateForm()

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setSubmitted(false)
      return
    }

    setErrors({})
    console.log('Found/spotted cat report:', formData)
    setSubmitted(true)
  }

  return (
    <main className="found-page">
      {/* Header */}

      <section className="found-header">
        <div className="found-header-content">
          <p className="eyebrow">REPORT A CAT</p>

          <h1>
            Seen a cat that
            <span>might need help?</span>
          </h1>

          <p>
            Whether you've found a cat or simply spotted one nearby, sharing
            the details could help connect them with their owner.
          </p>
        </div>

        <div className="found-header-decoration">
          <span>🐾</span>
        </div>
      </section>

      <form className="found-form" onSubmit={handleSubmit}>
        {/* What happened */}

        <section className="found-section">
          <div className="found-section-heading">
            <span className="section-number">01</span>

            <div>
              <p className="section-kicker">START HERE</p>
              <h2>What happened?</h2>
            </div>
          </div>

          <div className="report-type-options">
            <label
              className={`report-type-card ${
                formData.reportType === 'found' ? 'selected' : ''
              }`}
            >
              <input
                type="radio"
                name="reportType"
                value="found"
                checked={formData.reportType === 'found'}
                onChange={handleChange}
              />

              <span className="report-type-icon">🐱</span>

              <span>
                <strong>I found a cat</strong>
                <small>
                  The cat is with me or I have taken them somewhere safe.
                </small>
              </span>
            </label>

            <label
              className={`report-type-card ${
                formData.reportType === 'spotted' ? 'selected' : ''
              }`}
            >
              <input
                type="radio"
                name="reportType"
                value="spotted"
                checked={formData.reportType === 'spotted'}
                onChange={handleChange}
              />

              <span className="report-type-icon">👀</span>

              <span>
                <strong>I spotted a cat</strong>
                <small>
                  I saw a cat nearby that could be someone's missing pet.
                </small>
              </span>
            </label>
          </div>

          {errors.reportType && (
            <p className="field-error">{errors.reportType}</p>
          )}
        </section>

        {/* Cat details */}

        <section className="found-section">
          <div className="found-section-heading">
            <span className="section-number">02</span>

            <div>
              <p className="section-kicker">THE CAT</p>
              <h2>What did they look like?</h2>
            </div>
          </div>

          <p className="section-description">
            Don't worry if you don't know everything. The details you do have
            can still be useful.
          </p>

          <div className="found-form-grid">
            <div className="found-field">
              <label htmlFor="found-breed">Breed</label>

              <input
                id="found-breed"
                name="breed"
                type="text"
                placeholder="e.g. Bengal, tabby, unknown"
                value={formData.breed}
                onChange={handleChange}
              />

              {errors.breed && (
                <p className="field-error">{errors.breed}</p>
              )}
            </div>

            <div className="found-field">
              <label htmlFor="found-sex">Sex</label>

              <select
                id="found-sex"
                name="sex"
                value={formData.sex}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="unknown">Unknown</option>
              </select>

              {errors.sex && (
                <p className="field-error">{errors.sex}</p>
              )}
            </div>
          </div>

          <div className="found-field">
            <label htmlFor="found-colour">Colour and markings</label>

            <input
              id="found-colour"
              name="colour"
              type="text"
              placeholder="e.g. Ginger and white with a small mark on the left ear"
              value={formData.colour}
              onChange={handleChange}
            />

            {errors.colour && (
              <p className="field-error">{errors.colour}</p>
            )}
          </div>

          <div className="found-field">
            <label htmlFor="found-description">Anything else you noticed</label>

            <textarea
              id="found-description"
              name="description"
              rows="5"
              placeholder="Describe anything distinctive — collar, markings, behaviour, approximate age, injuries, or anything else you noticed."
              value={formData.description}
              onChange={handleChange}
            />

            {errors.description && (
              <p className="field-error">{errors.description}</p>
            )}
          </div>
        </section>

        {/* Location */}

        <section className="found-section">
          <div className="found-section-heading">
            <span className="section-number">03</span>

            <div>
              <p className="section-kicker">WHERE & WHEN</p>
              <h2>Where did you see them?</h2>
            </div>
          </div>

          <p className="section-description">
            A location helps owners understand whether this could be their cat
            and helps us surface nearby reports.
          </p>

          <div className="found-field">
            <label htmlFor="found-location">Location</label>

            <input
              id="found-location"
              name="location"
              type="text"
              placeholder="e.g. Walthamstow, London"
              value={formData.location}
              onChange={handleChange}
            />

            {errors.location && (
              <p className="field-error">{errors.location}</p>
            )}
          </div>

          <div className="found-map-wrapper">
            <div className="map-heading">
              <div>
                <strong>Pin the location</strong>
                <p>Click the map to show where you saw the cat.</p>
              </div>

              <span>📍</span>
            </div>

            <LocationPicker
              onLocationSelect={({ latitude, longitude }) => {
                setFormData({
                  ...formData,
                  latitude,
                  longitude,
                })
              }}
            />
          </div>

          {formData.latitude && formData.longitude && (
            <p className="location-selected">
              ✓ Location selected successfully
            </p>
          )}

          <div className="found-field date-field">
            <label htmlFor="found-date">Date seen</label>

            <input
              id="found-date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
            />

            {errors.date && (
              <p className="field-error">{errors.date}</p>
            )}
          </div>
        </section>

        {/* Photo */}

        <section className="found-section">
          <div className="found-section-heading">
            <span className="section-number">04</span>

            <div>
              <p className="section-kicker">A PICTURE HELPS</p>
              <h2>Add a photo</h2>
            </div>
          </div>

          <p className="section-description">
            If you managed to take a photo, adding one can make the report
            much more useful.
          </p>

          <div className="found-upload">
            <div className="upload-icon">＋</div>

            <strong>Add a photo of the cat</strong>

            <p>JPG, PNG or other image formats</p>

            <label htmlFor="found-photo">Choose a photo</label>

            <input
              id="found-photo"
              name="photo"
              type="file"
              accept="image/*"
              onChange={handleChange}
            />

            {formData.photo && (
              <span className="selected-file">
                {formData.photo.name}
              </span>
            )}
          </div>
        </section>

        {/* Account */}

        <section className="found-section account-section">
          <div className="found-section-heading">
            <span className="section-number">05</span>

            <div>
              <p className="section-kicker">STAY CONNECTED</p>
              <h2>Create your account</h2>
            </div>
          </div>

          <p className="section-description">
            Your account lets you come back to your report and receive updates
            if a potential match is found.
          </p>

          <div className="found-field">
            <label htmlFor="found-full-name">Full name</label>

            <input
              id="found-full-name"
              name="fullName"
              type="text"
              placeholder="e.g. Arjeta Bokciu"
              value={formData.fullName}
              onChange={handleChange}
            />

            {errors.fullName && (
              <p className="field-error">{errors.fullName}</p>
            )}
          </div>

          <div className="found-field">
            <label htmlFor="found-email">Email address</label>

            <input
              id="found-email"
              name="email"
              type="email"
              placeholder="e.g. you@example.com"
              value={formData.email}
              onChange={handleChange}
            />

            {errors.email && (
              <p className="field-error">{errors.email}</p>
            )}
          </div>

          <div className="found-form-grid">
            <div className="found-field">
              <label htmlFor="found-password">Password</label>

              <input
                id="found-password"
                name="password"
                type="password"
                placeholder="At least 8 characters"
                value={formData.password}
                onChange={handleChange}
              />

              {errors.password && (
                <p className="field-error">{errors.password}</p>
              )}
            </div>

            <div className="found-field">
              <label htmlFor="found-confirm-password">
                Confirm password
              </label>

              <input
                id="found-confirm-password"
                name="confirmPassword"
                type="password"
                placeholder="Repeat your password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />

              {errors.confirmPassword && (
                <p className="field-error">{errors.confirmPassword}</p>
              )}
            </div>
          </div>
        </section>

        {submitted && (
          <div className="found-success">
            <div className="success-icon">✓</div>

            <div>
              <strong>Thank you — your report is live.</strong>

              <p>
                Your report has been submitted. You can return to your account
                to view it and check for potential matches.
              </p>
            </div>
          </div>
        )}

        <div className="found-submit-area">
          <button type="submit" className="found-submit">
            Submit report
            <span>→</span>
          </button>

          <p>
            By submitting, you're helping someone in your community find their
            cat.
          </p>
        </div>
      </form>
    </main>
  )
}

export default FoundCat