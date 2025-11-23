import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

// Internal component that contains the actual page logic
function AddMedicineForm() {
  // State variables strictly for the Medicine Model
  const [brandName, setBrandName] = useState("");
  const [genericName, setGenericName] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  async function addMedicine() {
    // Validation
    if (brandName === "" || genericName === "") {
      toast.error("Please fill in Brand Name and Generic Name.");
      return;
    }

    try {
      // Fallback for backend URL if environment variable is missing in preview
      const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

      await axios.post(
        backendUrl + "/medicines/",
        {
          brandName: brandName,
          genericName: genericName,
          description: description,
        }
      );

      toast.success("Medicine added successfully!");
      // Navigate back to the product list within the admin panel
      navigate("/admin/pannel/products");

    } catch (err) {
      toast.error("Error adding medicine. Please try again.");
      console.log("Error adding medicine:", err);
    }
  }

  return (
    <div className="page-container">
      <style>{`
      
        .page-container {
  width: 100% !important;
  min-height: 100vh;

  display: flex;            
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-family: 'Inter', sans-serif;
  background: linear-gradient(135deg, #77f3bdff 0%, #f0f4e8ff 100%);
  box-sizing: border-box;
  padding: 20px 0;
}

        /* Glassmorphism Card */
        .form-card {
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          border-radius: 24px;
          padding: 50px;
          width: 100%;
          max-width: 800px;
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.3);
          animation: fadeIn 0.6s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Header */
        .form-header {
          font-size: 2rem;
          color: #2d3748;
          margin-bottom: 30px;
          text-align: center;
          font-weight: 700;
          text-shadow: 0 1px 2px rgba(0,0,0,0.05);
        }

        /* Form Content Container */
        .form-content {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 20px;
        }

        /* Input Groups */
        .input-group {
          display: flex;
          flex-direction: column;
        }

        .input-group.half-width {
          width: calc(50% - 10px);
        }

        .input-group.full-width {
          width: 100%;
        }

        /* Labels */
        .input-group label {
          margin-bottom: 8px;
          font-weight: 600;
          color: #4a5568;
          font-size: 0.95rem;
          letter-spacing: 0.5px;
        }

        /* Inputs & Textarea */
        .form-input,
        .form-textarea {
          width: 100%;
          background: rgba(255, 255, 255, 0.8);
          border: 2px solid transparent;
          border-radius: 12px;
          padding: 12px 16px;
          font-size: 1rem;
          color: #2d3748;
          transition: all 0.3s ease;
          box-sizing: border-box;
          box-shadow: 0 4px 6px rgba(0,0,0,0.02);
        }

        .form-textarea {
          height: 120px;
          resize: vertical;
        }

        .form-input:focus,
        .form-textarea:focus {
          outline: none;
          border-color: #48bb78;
          background: white;
          box-shadow: 0 0 0 4px rgba(72, 187, 120, 0.2);
          transform: translateY(-1px);
        }

        .form-input::placeholder,
        .form-textarea::placeholder {
          color: #a0aec0;
        }

        /* Buttons */
        .button-group {
          width: 100%;
          display: flex;
          justify-content: flex-end;
          gap: 15px;
          margin-top: 30px;
        }

        .btn {
          padding: 12px 30px;
          border-radius: 50px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
        }

        .btn-cancel {
          background: rgba(255, 255, 255, 0.5);
          color: #e53e3e;
          border: 1px solid rgba(229, 62, 62, 0.3);
        }

        .btn-cancel:hover {
          background: rgba(229, 62, 62, 0.1);
          transform: translateY(-2px);
        }

        .btn-add {
          background: linear-gradient(45deg, #48bb78, #38a169);
          color: white;
          box-shadow: 0 4px 15px rgba(56, 161, 105, 0.3);
        }

        .btn-add:hover {
          background: linear-gradient(45deg, #38a169, #2f855a);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(56, 161, 105, 0.4);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .input-group.half-width {
            width: 100%;
          }
          
          .form-card {
            padding: 30px;
          }
        }
      `}</style>

      <div className="form-card">
        <h1 className="form-header">
          Add New Medicine
        </h1>

        <div className="form-content">
          {/* Brand Name */}
          <div className="input-group half-width">
            <label>Brand Name</label>
            <input
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              className="form-input"
              placeholder="e.g., Panadol"
            />
          </div>

          {/* Generic Name */}
          <div className="input-group half-width">
            <label>Generic Name</label>
            <input
              type="text"
              value={genericName}
              onChange={(e) => setGenericName(e.target.value)}
              className="form-input"
              placeholder="e.g., Paracetamol"
            />
          </div>

          {/* Description */}
          <div className="input-group full-width">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-textarea"
              placeholder="Enter detailed medicine information..."
            />
          </div>

          {/* Action Buttons */}
          <div className="button-group">
            <Link to="/admin/pannel/products" className="btn btn-cancel">
              Cancel
            </Link>
            <button onClick={addMedicine} className="btn btn-add">
              Add Medicine
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Export: Wraps the form in Router and Toaster for standalone execution
export default function AdminAddMedicinePage() {
  return (
    <>
      
      <AddMedicineForm />
    </>
  );
}