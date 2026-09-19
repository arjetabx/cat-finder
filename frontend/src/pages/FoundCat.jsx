import { useState } from 'react'
import LocationPicker from '../components/LocationPicker'

function FoundCat() {
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const [formData, setFormData] = useState({
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

    if (!formData.breed.trim()) {
      newErrors.breed = "Please enter the cat's breed, or select unknown."
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
      newErrors.location = 'Please enter where the cat was found or spotted.'
    }

    if (!formData.date) {
      newErrors.date = 'Please enter the date the cat was found or spotted.'
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
    console.log('Found cat report:', formData)
    setSubmitted(true)
  }

  return (
    <main className="report-page">
      <section className="report-header">
        <p className="report-label">REPORT A FOUND OR SPOTTED CAT</p>

        <h1>Tell us about the cat</h1>

        <p>
          If you have found or spotted a cat, provide as much information as
          you can to help identify their owner.
        </p>
      </section>

      <form className="cat-form" onSubmit={handleSubmit}>
        <section className="form-section">
          <h2>About the cat</h2>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="breed">Breed</label>

              <input
                id="breed"
                name="breed"
                type="text"
                placeholder="e.g. Bengal"
                value={formData.breed}
                onChange={handleChange}
              />

              {errors.breed && (
                <p className="field-error">{errors.breed}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="sex">Sex</label>

              <select
                id="sex"
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

          <div className="form-group">
            <label htmlFor="colour">Colour and markings</label>

            <input
              id="colour"
              name="colour"
              type="text"
              placeholder="e.g. Black with a white chest"
              value={formData.colour}
              onChange={handleChange}
            />

            {errors.colour && (
              <p className="field-error">{errors.colour}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>

            <textarea
              id="description"
              name="description"
              rows="5"
              placeholder="Describe any distinctive features, markings, collar, behaviour, or anything else you noticed..."
              value={formData.description}
              onChange={handleChange}
            />

            {errors.description && (
              <p className="field-error">{errors.description}</p>
            )}
          </div>
        </section>

        <section className="form-section">
          <h2>Where and when was the cat seen?</h2>

          <div className="form-group">
            <label htmlFor="location">Location</label>

            <input
              id="location"
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

          <div className="form-group">
            <label>Pin the location on the map</label>

            <p className="form-help">
              Click on the map to show where you found or spotted the cat.
            </p>

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
              Location selected successfully.
            </p>
          )}

          <div className="form-group">
            <label htmlFor="date">Date seen</label>

            <input
              id="date"
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

        <section className="form-section">
          <h2>Add a photo</h2>

          <p className="form-help">
            Upload a clear photo of the cat if you have one.
          </p>

          <div className="upload-box">
            <input
              id="photo"
              name="photo"
              type="file"
              accept="image/*"
              onChange={handleChange}
            />

            <label htmlFor="photo">
              Choose a photo
            </label>

            {formData.photo && (
              <p className="selected-file">
                Selected: {formData.photo.name}
              </p>
            )}
          </div>
        </section>

        <section className="form-section">
          <h2>Your details</h2>

          <p className="form-help">
            Create an account so you can return to your report and receive
            updates about potential matches.
          </p>

          <div className="form-group">
            <label htmlFor="full-name">Full name</label>

            <input
              id="full-name"
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

          <div className="form-group">
            <label htmlFor="email">Email address</label>

            <input
              id="email"
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

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Password</label>

              <input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
              />

              {errors.password && (
                <p className="field-error">{errors.password}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirm-password">Confirm password</label>

              <input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
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
          <div className="success-message">
            <h2>Report submitted successfully</h2>

            <p>
              The found cat report has been submitted. You can return to your
              account to view your report and potential matches.
            </p>
          </div>
        )}

        <button type="submit" className="submit-button">
          Create Account & Report Cat
        </button>
      </form>
    </main>
  )
}

export default FoundCat