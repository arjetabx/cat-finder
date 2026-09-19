import { useState } from 'react'

function LostCat() {
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const [formData, setFormData] = useState({
    catName: '',
    breed: '',
    sex: '',
    colour: '',
    description: '',
    location: '',
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
  
    if (!formData.catName.trim()) {
      newErrors.catName = "Please enter your cat's name."
    }
  
    if (!formData.breed.trim()) {
      newErrors.breed = "Please enter your cat's breed."
    }
  
    if (!formData.sex) {
      newErrors.sex = "Please select your cat's sex."
    }
  
    if (!formData.colour.trim()) {
      newErrors.colour = "Please describe your cat\'s colour and markings."
    }
  
    if (!formData.description.trim()) {
      newErrors.description = "Please provide a description of your cat."
    }
  
    if (!formData.location.trim()) {
      newErrors.location = "Please enter where your cat was last seen."
    }
  
    if (!formData.date) {
      newErrors.date = "Please enter the date your cat was last seen."
    }
  
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please enter your full name."
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
      console.log('Lost cat report:', formData)
      setSubmitted(true)
  }

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

      <form className="cat-form" onSubmit={handleSubmit}>
        <section className="form-section">
          <h2>About your cat</h2>

          <div className="form-group">
            <label htmlFor="cat-name">Cat's name</label>
            <input
              id="cat-name"
              name="catName"
              type="text"
              placeholder="e.g. Luna"
              value={formData.catName}
              onChange={handleChange}
            />
            {errors.catName && (
              <p className="field-error">{errors.catName}</p>
            )}
          </div>

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
                {errors.sex && (
                <p className="field-error">{errors.sex}</p>
                )}
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
              name="colour"
              type="text"
              placeholder="e.g. Brown with dark spots"
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
              placeholder="Describe any distinctive features, markings, collar, behaviour, or other details..."
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && (
              <p className="field-error">{errors.description}</p>
            )}
          </div>
        </section>

        <section className="form-section">
          <h2>Where and when was your cat last seen?</h2>

          <div className="form-group">
            <label htmlFor="location">Last known location</label>
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
            <label htmlFor="date">Date last seen</label>
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
            Upload a clear photo of your cat if you have one.
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
            Create an account so you can return to your report, see potential
            matches and receive updates.
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
                Your lost cat report has been submitted. You can return to your account
                to view your report and potential matches.
                </p>
            </div>
            )}

            <button type="submit" className="submit-button">
            Create Account & Report Lost Cat
            </button>
      </form>
    </main>
  )
}

export default LostCat