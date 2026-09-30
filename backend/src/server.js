const express = require('express')
const cors = require('cors')
require('dotenv').config()

const db = require('./database')

const app = express()
const PORT = process.env.PORT || 5001

app.use(cors())
app.use(express.json())

// Health check
app.get('/api/health', (req, res) => {
  try {
    db.prepare('SELECT 1').get()

    res.json({
      status: 'ok',
      message: 'CatFinder API is running',
      database: 'connected',
    })
  } catch (error) {
    console.error('Database health check failed:', error)

    res.status(500).json({
      status: 'error',
      message: 'Database connection failed',
    })
  }
})

// Get all cat reports
app.get('/api/reports', (req, res) => {
  try {
    const reports = db
      .prepare(`
        SELECT *
        FROM cat_reports
        ORDER BY created_at DESC
      `)
      .all()

    res.json(reports)
  } catch (error) {
    console.error('Failed to fetch reports:', error)

    res.status(500).json({
      message: 'Failed to fetch cat reports',
    })
  }
})

// Create a new cat report
app.post('/api/reports', (req, res) => {
  try {
    const {
      reportType,
      catName,
      breed,
      sex,
      colour,
      description,
      location,
      latitude,
      longitude,
      dateSeen,
      photoPath,
    } = req.body

    // Validate required fields
    if (
      !reportType ||
      !breed ||
      !sex ||
      !colour ||
      !description ||
      !location ||
      !dateSeen
    ) {
      return res.status(400).json({
        message: 'Please provide all required fields.',
      })
    }

    // Validate report type
    if (!['lost', 'found', 'spotted'].includes(reportType)) {
      return res.status(400).json({
        message: 'Invalid report type.',
      })
    }

    // Validate sex
    if (!['female', 'male', 'unknown'].includes(sex)) {
      return res.status(400).json({
        message: 'Invalid sex.',
      })
    }

    const result = db
      .prepare(`
        INSERT INTO cat_reports (
          report_type,
          cat_name,
          breed,
          sex,
          colour,
          description,
          location,
          latitude,
          longitude,
          date_seen,
          photo_path
        )
        VALUES (
          @reportType,
          @catName,
          @breed,
          @sex,
          @colour,
          @description,
          @location,
          @latitude,
          @longitude,
          @dateSeen,
          @photoPath
        )
      `)
      .run({
        reportType,
        catName: catName || null,
        breed,
        sex,
        colour,
        description,
        location,
        latitude: latitude ?? null,
        longitude: longitude ?? null,
        dateSeen,
        photoPath: photoPath || null,
      })

    const newReport = db
      .prepare(`
        SELECT *
        FROM cat_reports
        WHERE id = ?
      `)
      .get(result.lastInsertRowid)

    res.status(201).json(newReport)
  } catch (error) {
    console.error('Failed to create cat report:', error)

    res.status(500).json({
      message: 'Failed to create cat report.',
    })
  }
})

// Delete a cat report
app.delete('/api/reports/:id', (req, res) => {
    try {
      const reportId = Number(req.params.id)
  
      if (!Number.isInteger(reportId) || reportId <= 0) {
        return res.status(400).json({
          message: 'Invalid report ID.',
        })
      }
  
      const result = db
        .prepare(`
          DELETE FROM cat_reports
          WHERE id = ?
        `)
        .run(reportId)
  
      if (result.changes === 0) {
        return res.status(404).json({
          message: 'Cat report not found.',
        })
      }
  
      res.status(204).send()
    } catch (error) {
      console.error('Failed to delete cat report:', error)
  
      res.status(500).json({
        message: 'Failed to delete cat report.',
      })
    }
  })

app.listen(PORT, () => {
  console.log(`CatFinder API running on http://localhost:${PORT}`)
})