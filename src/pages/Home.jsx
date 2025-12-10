import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom'; // Removed 'Link' import
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Home.css';

// Leaflet Icon Fix
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

function Home() {
  const [pharmacies, setPharmacies] = useState([]);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // 1. Get the medicine name directly from the URL
  const [searchParams] = useSearchParams();
  const drugName = searchParams.get('drug'); 

  // 2. Set User Location
 /* useEffect(() => {
   setLocation({
      lat: 6.9275,
      long: 79.8590
    });
  }, []);*/
  useEffect(() => {
  // 1. Check if Geolocation is supported by the browser
  if ("geolocation" in navigator) {
    
    navigator.geolocation.getCurrentPosition(
      // Success Callback
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
      },
      // Error Callback (User denied permission or location unavailable)
      (error) => {
        console.error("Error getting location:", error);
        // Fallback to Colombo if permission is denied
        setLocation({
          lat: 6.9275,
          long: 79.8590
        });
        alert("Location permission denied. Defaulting to Colombo.");
      }
    );

  } else {
    // Browser doesn't support Geolocation
    console.log("Geolocation is not available");
    setLocation({
      lat: 6.9275,
      long: 79.8590
    });
  }
}, []);

  // 3. Automatically Fetch Data
  useEffect(() => {
    const fetchPharmacies = async () => {
      if (!location || !drugName) return;

      setLoading(true);
      setError('');
      setPharmacies([]);

      try {
        const res = await axios.get(`http://localhost:5000/api/search`, {
          params: {
            drugName: drugName,
            lat: location.lat,
            long: location.long
          }
        });

        if (res.data.message) {
          setError(res.data.message + (res.data.suggestion ? ` ${res.data.suggestion}` : ''));
        } else {
          setPharmacies(res.data);
        }
      } catch (err) {
        setError("Error connecting to server.");
        console.error(err);
      }
      setLoading(false);
    };

    fetchPharmacies();
  }, [location, drugName]); 

  return (
    <div className="container">
      
      {/* Title Only */}
      <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#065f46' }}>
        Results for "{drugName}"
      </h1>

      {loading && <p style={{textAlign: 'center', fontSize: '18px'}}>Searching nearby pharmacies...</p>}

      {error && <div style={{color: 'red', marginBottom: '10px', textAlign: 'center'}}>{error}</div>}

      {!drugName && !loading && (
        <div style={{textAlign: 'center', color: '#666'}}>
          <p>No medicine selected.</p>
        </div>
      )}

      {/* Map View */}
      {location && drugName && (
        <MapContainer center={[location.lat, location.long]} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          <Marker position={[location.lat, location.long]}>
            <Popup>You are here</Popup>
          </Marker>

          {pharmacies.map((item) => (
            <Marker 
              key={item._id} 
              position={[
                item.pharmacy.location.coordinates[1], 
                item.pharmacy.location.coordinates[0] 
              ]}
            >
              <Popup>
                <b>{item.pharmacy.name}</b><br/>
                {item.pharmacy.address}<br/>
                Status: {item.status}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}

      {/* List View */}
      {drugName && (
        <div style={{marginTop: '20px'}}>
          <h3>Found {pharmacies.length} Pharmacies</h3>
          {pharmacies.map((item) => (
            <div key={item._id} className="pharmacy-card">
              <h3>{item.pharmacy.name}</h3>
              <p>📍 {item.pharmacy.address}</p>
              <p>📞 {item.pharmacy.contactNumber}</p>
              <p style={{color: 'green', fontWeight: 'bold'}}>✅ {item.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;