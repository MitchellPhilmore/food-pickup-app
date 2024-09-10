'use client'

import { useLoadScript, GoogleMap, Marker } from '@react-google-maps/api'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Clock } from 'lucide-react'

const mapContainerStyle = {
  width: '100%',
  height: '400px'
}

const center = {
  lat: 40.0545, // Latitude for 5935 Ogontz Ave, Philadelphia, PA 19141
  lng: -75.1523 // Longitude for 5935 Ogontz Ave, Philadelphia, PA 19141
}

export function RestaurantLocation() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""
  })

  if (loadError) return <div>Error loading maps</div>
  if (!isLoaded) return <div>Loading maps</div>

  return (
    <div id="location" className="bg-zinc-900 text-zinc-300 py-12">
      <div className="container mx-auto px-4">
        <Card className="bg-zinc-800 border-zinc-700">
          <CardHeader>
            <CardTitle className="text-xl text-zinc-100">Find Us Here</CardTitle>
            <CardDescription className="text-zinc-400">
              Visit us for an unforgettable dining experience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={14}
                center={center}
                options={{
                  styles: [
                    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
                    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
                    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
                  ]
                }}
              >
                <Marker position={center} />
              </GoogleMap>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <MapPin className="text-amber-400" />
                <p className="text-sm text-white">5935 Ogontz Ave, Philadelphia, PA 19141</p>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="text-amber-400" />
                <p className="text-sm text-white">+1 (555) 123-4567</p>
              </div>
              <div className="flex items-start space-x-3 md:col-span-2">
                <Clock className="text-amber-400" />
                <p className="text-sm text-white">
                  Mon-Fri: 11:00 AM - 10:00 PM<br />
                  Sat-Sun: 10:00 AM - 11:00 PM
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}