'use client'

import {
  CircleMarker,
  MapContainer,
  Popup,
  TileLayer,
  ZoomControl,
} from 'react-leaflet'

import 'leaflet/dist/leaflet.css'

import { useApp } from '@/lib/app-context'

import {
  CURRENT_LOCATION,
  destinations,
  getPersonalizedDestination,
} from '@/lib/data'

import { MapPin, Sparkles } from 'lucide-react'

/*
  Coordinates for the destinations currently in Paryata.

  These are kept here for now so we do not need to change
  the Destination type or the rest of the application.
*/

const destinationCoordinates: Record<
  string,
  {
    lat: number
    lng: number
  }
> = {
  bundi: {
    lat: 25.43,
    lng: 75.64,
  },

  chettinad: {
    lat: 10.15,
    lng: 78.82,
  },

  dhanushkodi: {
    lat: 9.17,
    lng: 79.42,
  },

  ziro: {
    lat: 27.54,
    lng: 93.83,
  },

  gokarna: {
    lat: 14.55,
    lng: 74.32,
  },

  majuli: {
    lat: 27.00,
    lng: 94.22,
  },
}

/*
  Temporary current-location coordinates.

  Your app currently uses Nagercoil as the demo location.
  Later we can replace this with the browser's actual
  GPS location.
*/

const currentLocation = {
  lat: 8.18,
  lng: 77.43,
}

export function DiscoveryMap() {
  const {
    openDestination,
    travelPreferences,
  } = useApp()

  const recommendation =
    getPersonalizedDestination(
      travelPreferences,
    )

  const recommendedId =
    recommendation.destination.id

  return (
    <div className="overflow-hidden rounded-3xl bg-card shadow-[0_10px_30px_-12px_rgba(27,36,54,0.25)] ring-1 ring-border/60">

      {/* MAP HEADER */}

      <div className="flex items-center justify-between border-b border-border/60 bg-card px-4 py-3">

        <div className="flex items-center gap-2">

          <span className="grid size-9 place-items-center rounded-xl bg-primary/15 text-primary">
            <MapPin className="size-4" />
          </span>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Discover India
            </p>

            <p className="text-sm font-bold text-foreground">
              {CURRENT_LOCATION.city}
            </p>
          </div>

        </div>

        <div className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5">

          <span className="size-2 rounded-full bg-primary" />

          <span className="text-[0.65rem] font-bold text-primary">
            {destinations.length} gems
          </span>

        </div>

      </div>

      {/* MAP */}

      <div className="relative h-[360px] w-full">

        <MapContainer
          center={[
            22.5,
            80.5,
          ]}
          zoom={5}
          minZoom={4}
          maxZoom={8}
          scrollWheelZoom={true}
          zoomControl={false}
          className="h-full w-full"
        >

          {/* OpenStreetMap tiles */}

          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <ZoomControl position="bottomright" />

          {/* CURRENT LOCATION */}

          <CircleMarker
            center={[
              currentLocation.lat,
              currentLocation.lng,
            ]}
            radius={9}
            pathOptions={{
              color: '#ffffff',
              fillColor: '#e66f00',
              fillOpacity: 1,
              weight: 3,
            }}
          >

            <Popup>

              <div className="min-w-[150px]">

                <div className="flex items-center gap-2">

                  <span className="size-2.5 rounded-full bg-primary" />

                  <strong>
                    You are here
                  </strong>

                </div>

                <p className="mt-1 text-sm text-gray-600">
                  {CURRENT_LOCATION.city}
                </p>

              </div>

            </Popup>

          </CircleMarker>

          {/* DESTINATIONS */}

          {destinations.map(
            (destination) => {
              const coordinates =
                destinationCoordinates[
                  destination.id
                ]

              if (!coordinates) {
                return null
              }

              const isRecommended =
                destination.id ===
                recommendedId

              return (
                <CircleMarker
                  key={
                    destination.id
                  }
                  center={[
                    coordinates.lat,
                    coordinates.lng,
                  ]}
                  radius={
                    isRecommended
                      ? 11
                      : 8
                  }
                  pathOptions={{
                    color:
                      isRecommended
                        ? '#ffffff'
                        : '#ffffff',

                    fillColor:
                      isRecommended
                        ? '#e66f00'
                        : '#f28c28',

                    fillOpacity: 1,

                    weight:
                      isRecommended
                        ? 4
                        : 2,
                  }}
                  eventHandlers={{
                    click: () =>
                      openDestination(
                        destination.id,
                      ),
                  }}
                >

                  <Popup>

                    <div className="min-w-[180px]">

                      {isRecommended && (
                        <div className="mb-2 flex items-center gap-1 text-xs font-bold text-orange-600">

                          <Sparkles className="size-3" />

                          Paryata match

                        </div>
                      )}

                      <strong className="text-base">
                        {
                          destination.name
                        }
                      </strong>

                      <p className="mt-1 text-xs text-gray-500">
                        {
                          destination.state
                        }
                      </p>

                      <p className="mt-2 text-xs text-gray-600">
                        {
                          destination.shortDescription
                        }
                      </p>

                      <button
                        onClick={() =>
                          openDestination(
                            destination.id,
                          )
                        }
                        className="mt-3 w-full rounded-full bg-orange-600 px-3 py-2 text-xs font-bold text-white"
                      >
                        Discover this place
                      </button>

                    </div>

                  </Popup>

                </CircleMarker>
              )
            },
          )}

        </MapContainer>

        {/* MAP LEGEND */}

        <div className="pointer-events-none absolute bottom-3 left-3 z-[500] rounded-2xl bg-white/95 px-3 py-2 shadow-lg backdrop-blur">

          <div className="flex items-center gap-3">

            <div className="flex items-center gap-1.5">

              <span className="size-2.5 rounded-full border-2 border-white bg-orange-600 shadow-sm" />

              <span className="text-[0.65rem] font-semibold text-gray-700">
                You
              </span>

            </div>

            <div className="flex items-center gap-1.5">

              <span className="size-2.5 rounded-full border-2 border-white bg-orange-400 shadow-sm" />

              <span className="text-[0.65rem] font-semibold text-gray-700">
                Hidden gems
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* MAP FOOTER */}

      <div className="flex items-center justify-between border-t border-border/60 bg-card px-4 py-3">

        <div>

          <p className="text-xs font-semibold text-foreground">
            Your next discovery
          </p>

          <p className="text-[0.7rem] text-muted-foreground">
            {recommendation.destination.name}
            {' · '}
            {recommendation.score}% match
          </p>

        </div>

        <button
          onClick={() =>
            openDestination(
              recommendation.destination.id,
            )
          }
          className="rounded-full bg-primary px-3 py-2 text-[0.7rem] font-bold text-primary-foreground transition-transform active:scale-95"
        >
          Explore
        </button>

      </div>

    </div>
  )
}