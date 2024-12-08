import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon issue with Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icons using CSS classes
const userIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  className: 'user-marker-icon'
});

const ambulanceIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-red.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  className: 'ambulance-marker-icon'
});

function MapUpdater({ userLocation, ambulanceLocation }) {
  const map = useMap();

  useEffect(() => {
    if (userLocation && ambulanceLocation) {
      const bounds = L.latLngBounds(
        L.latLng(userLocation.lat, userLocation.lng),
        L.latLng(ambulanceLocation.lat, ambulanceLocation.lng)
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    } else if (userLocation) {
      map.setView([userLocation.lat, userLocation.lng], 13);
    }
  }, [map, userLocation, ambulanceLocation]);

  return null;
}

const MapComponent = ({ userLocation, ambulanceLocation }) => {
  const mapRef = useRef(null);
  const routingControlRef = useRef(null);

  useEffect(() => {
    if (mapRef.current && userLocation && ambulanceLocation) {
      if (!routingControlRef.current) {
        routingControlRef.current = L.Routing.control({
          waypoints: [
            L.latLng(userLocation.lat, userLocation.lng),
            L.latLng(ambulanceLocation.lat, ambulanceLocation.lng)
          ],
          lineOptions: {
            styles: [{ color: "#6FA1EC", weight: 4 }]
          },
          show: false,
          addWaypoints: false,
          routeWhileDragging: false,
          fitSelectedRoutes: true,
          showAlternatives: false
        }).addTo(mapRef.current);
      } else {
        routingControlRef.current.setWaypoints([
          L.latLng(userLocation.lat, userLocation.lng),
          L.latLng(ambulanceLocation.lat, ambulanceLocation.lng)
        ]);
      }
    }
  }, [userLocation, ambulanceLocation]);

  const mapCenter = userLocation || [0, 0];

  return (
    <MapContainer 
      center={mapCenter} 
      zoom={13} 
      style={{ height: '100%', width: '100%' }}
      whenCreated={mapInstance => { mapRef.current = mapInstance; }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {userLocation && (
        <Marker 
          position={[userLocation.lat, userLocation.lng]} 
          icon={userIcon}
        >
          <Popup>Your Location</Popup>
        </Marker>
      )}
      
      {ambulanceLocation && (
        <Marker 
          position={[ambulanceLocation.lat, ambulanceLocation.lng]} 
          icon={ambulanceIcon}
        >
          <Popup>Ambulance Location</Popup>
        </Marker>
      )}
      
      <MapUpdater userLocation={userLocation} ambulanceLocation={ambulanceLocation} />
    </MapContainer>
  );
};

export default MapComponent;