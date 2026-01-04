import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Home.css';

// Leaflet Icon Fix
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Default pharmacy marker (green)
const PharmacyIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -41]
});

// User location marker (blue)
const UserIcon = L.icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg width="25" height="41" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.5 0C5.6 0 0 5.6 0 12.5c0 8.4 12.5 28.5 12.5 28.5S25 20.9 25 12.5C25 5.6 19.4 0 12.5 0z" fill="#3B82F6"/>
      <circle cx="12.5" cy="12.5" r="6" fill="white"/>
    </svg>
  `),
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -41]
});

L.Marker.prototype.options.icon = PharmacyIcon;

function Home() {
  const [pharmacies, setPharmacies] = useState([]);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [usingFallback, setUsingFallback] = useState(false);

  // Colombo (Lotus Tower) Coordinates as Fallback
  const FALLBACK_LAT = 6.9271;
  const FALLBACK_LONG = 79.8612;

  // Order Modal State
  const [showModal, setShowModal] = useState(false);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [orderForm, setOrderForm] = useState({
    email: '',
    phone: '',
    file: null
  });
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState('');

  // 1. Get the medicine name directly from the URL
  const [searchParams] = useSearchParams();
  const drugName = searchParams.get('drug');

  // 2. Set User Location
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            long: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocation({ lat: 6.9275, long: 79.8590 }); // Default Colombo
          alert("Location permission denied. Defaulting to Colombo.");
        }
      );
    } else {
      setLocation({ lat: 6.9275, long: 79.8590 });
    }
  }, []);

  // 3. Automatically Fetch Data
  useEffect(() => {
    const fetchPharmacies = async () => {
      if (!location) return;

      setLoading(true);
      setError('');
      setPharmacies([]);

      try {
        let res;
        if (drugName) {
          // Search for specific drug
          res = await axios.get(`http://localhost:5000/api/search`, {
            params: {
              drugName: drugName,
              lat: location.lat,
              long: location.long
            }
          });
          console.log("Drug Search Res:", res.data); // LOGGING
          if (res.data.message) {
            // 1. Check if we are already at Fallback Location (to prevent infinite loops)
            const isAtFallback = Math.abs(location.lat - FALLBACK_LAT) < 0.001 && Math.abs(location.long - FALLBACK_LONG) < 0.001;

            if (!isAtFallback) {
              console.log("Not found nearby, trying Fallback (Colombo)...");
              // 2. Perform Fallback Search
              try {
                const fallbackRes = await axios.get(`http://localhost:5000/api/search`, {
                  params: {
                    drugName: drugName,
                    lat: FALLBACK_LAT,
                    long: FALLBACK_LONG
                  }
                });

                if (fallbackRes.data.message) {
                  // Still not found
                  setError(res.data.message + (res.data.suggestion ? ` ${res.data.suggestion}` : ''));
                  setUsingFallback(false);
                } else {
                  // Found in Fallback
                  setPharmacies(fallbackRes.data);
                  setLocation({ lat: FALLBACK_LAT, long: FALLBACK_LONG });
                  setUsingFallback(true);
                }
              } catch (fallbackErr) {
                setError("Error connecting to server during fallback.");
              }
            } else {
              
              setError(res.data.message + (res.data.suggestion ? ` ${res.data.suggestion}` : ''));
              setUsingFallback(true);
            }
          } else {
            setPharmacies(res.data); 

            // Check if we effectively used Fallback (e.g. if location naturally matched)
            const isAtFallback = Math.abs(location.lat - FALLBACK_LAT) < 0.001 && Math.abs(location.long - FALLBACK_LONG) < 0.001;
            setUsingFallback(isAtFallback);
          }
        } else {
          // Search generic nearby pharmacies
          res = await axios.get(`http://localhost:5000/api/pharmacy/nearby`, {
            params: {
              lat: location.lat,
              long: location.long
            }

          });
          console.log("Nearby Search Res:", res.data); // LOGGING
          // Normalize structure to match search results
          setPharmacies(res.data.map(p => ({ pharmacy: p, status: 'Open' })));
        }
      } catch (err) {
        setError("Error connecting to server.");
        console.error(err);
      }
      setLoading(false);
    };

    fetchPharmacies();
  }, [location, drugName]);

  const handleOrderClick = (pharmacy) => {
    setSelectedPharmacy(pharmacy);
    setShowModal(true);
    setOrderSuccess('');
  };

  const handleFileChange = (e) => {
    setOrderForm({ ...orderForm, file: e.target.files[0] });
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (!orderForm.file) return alert("Please upload a prescription image.");

    setOrderLoading(true);
    const formData = new FormData();
    formData.append('pharmacyId', selectedPharmacy._id);
    formData.append('userEmail', orderForm.email);
    formData.append('userPhone', orderForm.phone);
    formData.append('prescriptionImage', orderForm.file);

    try {
      await axios.post('http://localhost:5000/api/orders', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setOrderSuccess("Order placed successfully! Check your email for confirmation.");
      setOrderForm({ email: '', phone: '', file: null });
      setTimeout(() => setShowModal(false), 3000);
    } catch (error) {
      alert("Failed to place order: " + (error.response?.data?.message || error.message));
    }
    setOrderLoading(false);
  };

  return (
    <div className="container">

      <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#065f46' }}>
        {drugName ? `Results for "${drugName}"` : "Nearby Pharmacies"}
      </h1>

      {loading && <p style={{ textAlign: 'center', fontSize: '18px' }}>Searching nearby pharmacies...</p>}

      {error && <div style={{ color: 'red', marginBottom: '10px', textAlign: 'center' }}>{error}</div>}

      {usingFallback && !error && (
        <div style={{
          backgroundColor: '#d1fae5',
          color: '#065f46',
          padding: '10px',
          borderRadius: '8px',
          marginBottom: '20px',
          textAlign: 'center',
          border: '1px solid #34d399'
        }}>
          <strong>Note:</strong> Medicine not found nearby. Showing results from <strong>Colombo</strong>.
        </div>
      )}

      {/* Map View */}
      {location && (
        <MapContainer center={[location.lat, location.long]} zoom={13} scrollWheelZoom={false} className="leaflet-container">
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* User Location Marker (Blue) */}
          <Marker position={[location.lat, location.long]} icon={UserIcon}>
            <Popup>Your Location</Popup>
            <Tooltip permanent direction="top" offset={[0, -40]} className="user-tooltip">
              You
            </Tooltip>
          </Marker>

          {/* Pharmacy Markers (Green) */}
          {pharmacies.map((item) => (
            <Marker
              key={item.pharmacy._id}
              position={[
                item.pharmacy.location.coordinates[1],
                item.pharmacy.location.coordinates[0]
              ]}
              icon={PharmacyIcon}
            >
              <Popup>
                <b>{item.pharmacy.pharmacyName || item.pharmacy.name || "Pharmacy"}</b><br />
                {item.pharmacy.address}<br />
                <button
                  onClick={() => handleOrderClick(item.pharmacy)}
                  className="btn-order-popup"
                >
                  Order Here
                </button>
              </Popup>
              <Tooltip permanent direction="top" offset={[0, -40]} className="pharmacy-tooltip">
                {item.pharmacy.pharmacyName || item.pharmacy.name || "Pharmacy"}
              </Tooltip>
            </Marker>
          ))}
        </MapContainer>
      )}

      {/* List View */}
      <div className="pharmacy-results">
        <h3>Found {pharmacies.length} Pharmacies</h3>
        <div className="pharmacy-grid">
          {pharmacies.map((item, index) => {
            // DEBUG: Log the pharmacy object structure
            console.log(`Pharmacy ${index}:`, item.pharmacy);
            console.log(`  pharmacyName: "${item.pharmacy.pharmacyName}"`);
            console.log(`  name: "${item.pharmacy.name}"`);
            console.log(`  phoneNumber: "${item.pharmacy.phoneNumber}"`);
            console.log(`  address: "${item.pharmacy.address}"`);

            return (
              <div key={item.pharmacy._id} className="pharmacy-card">
                <div className="card-header">
                  {item.pharmacy.profilePicture && (
                    <img
                      src={`http://localhost:5000${item.pharmacy.profilePicture}`}
                      alt={item.pharmacy.pharmacyName}
                      className="pharmacy-card-image"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  )}
                  <h3>{item.pharmacy.pharmacyName || item.pharmacy.name || item.pharmacy.ownerName || "Unknown Pharmacy"}</h3>
                  <span className="status-badge">Open</span>
                </div>
                <div className="card-body">
                  <p><strong>Name:</strong> {item.pharmacy.pharmacyName || item.pharmacy.name || item.pharmacy.ownerName || "N/A"}</p>
                  <p><strong>Address:</strong> {item.pharmacy.address}</p>
                  <p><strong>Phone:</strong> {item.pharmacy.phoneNumber || item.pharmacy.contactNumber || "N/A"}</p>
                </div>
                <button
                  onClick={() => handleOrderClick(item.pharmacy)}
                  className="btn-order"
                >
                  Upload Prescription & Order
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Order Modal */}
      {showModal && (
        <div className="order-modal-overlay">
          <div className="order-modal-content">
            <h2>Place Order at {selectedPharmacy?.name}</h2>
            {orderSuccess ? (
              <div className="order-success-message">
                <p>✅ {orderSuccess}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitOrder}>
                <div className="modal-form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={orderForm.email}
                    onChange={(e) => setOrderForm({ ...orderForm, email: e.target.value })}
                  />
                </div>
                <div className="modal-form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="Enter your phone number"
                    value={orderForm.phone}
                    onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })}
                  />
                </div>
                <div className="modal-form-group">
                  <label>Prescription Image</label>
                  <div className="file-input-wrapper">
                    <input
                      type="file"
                      accept="image/*"
                      required
                      onChange={handleFileChange}
                      id="file-upload"
                    />
                  </div>
                </div>
                <div className="modal-actions">
                  <button type="button" onClick={() => setShowModal(false)} className="btn-cancel">
                    Cancel
                  </button>
                  <button type="submit" disabled={orderLoading} className="btn-submit">
                    {orderLoading ? 'Sending...' : 'Confirm Order'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

export default Home;