import { useState } from 'react'
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

function LocationMarker({ onLocationSelect }) {
  const [position, setPosition] = useState(null)

  useMapEvents({
    click(event) {
      const { lat, lng } = event.latlng

      const selectedLocation = {
        latitude: lat,
        longitude: lng,
      }

      setPosition([lat, lng])
      onLocationSelect(selectedLocation)
    },
  })

  return position ? <Marker position={position} /> : null
}

function LocationPicker({ onLocationSelect }) {
  const defaultPosition = [51.5886, -0.0179]

  return (
    <div className="location-picker">
      <MapContainer
        center={defaultPosition}
        zoom={13}
        scrollWheelZoom={true}
        className="location-map"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <LocationMarker onLocationSelect={onLocationSelect} />
      </MapContainer>
    </div>
  )
}

export default LocationPicker