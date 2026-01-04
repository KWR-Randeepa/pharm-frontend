import { useState, useEffect } from "react";
import "./PharmacyReview.css";


export default function PharmacyReview() {
  const [reviews, setReviews] = useState([
    {
      name: "Kasun Perera",
      rating: 5,
      text: "Excellent pharmacy! Fast service and friendly staff.",
      img: "/1.jpg",
    },
    {
      name: "Nimali Jayasekara",
      rating: 4,
      text: "Huge medicine collection with reasonable prices.",
      img: "/girl1.jpg",
    },
    {
      name: "Roshan Silva",
      rating: 5,
      text: "Very reliable and friendly pharmacists.",
      img: "/2.jpeg",
    },
    {
      name: "Sanduni Fernando",
      rating: 3,
      text: "Good service, but waiting time was long.",
      img: "/girl2.jpg",
    },
    {
      name: "Dilan Perera",
      rating: 4,
      text: "Affordable medicines and helpful staff.",
      img: "/3.jpg",
    },
  ]);

  const [index, setIndex] = useState(0);
  const [form, setForm] = useState({ name: "", rating: "5", text: "" });

  useEffect(() => {
    const auto = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviews.length);
    }, 3500);
    return () => clearInterval(auto);
  }, [reviews.length]);

  const addReview = (e) => {
    e.preventDefault();
    setReviews([...reviews, { ...form, img: "/reviews/user3.jpg" }]);
    setForm({ name: "", rating: "5", text: "" });
  };

  return (
    /* Added unique namespace class here */
    <div className="phi-review-root">
      <div className="review-layout">
        {/* Left Slider */}
        <div className="carousel-container">
          <h2>What Our Customers Say</h2>
          <div className="carousel-track">
            {reviews.map((r, i) => {
              let pos = "phi-next";
              if (i === index) pos = "phi-active";
              if (i === index - 1 || (index === 0 && i === reviews.length - 1))
                pos = "phi-prev";

              return (
                <div key={i} className={`phi-card ${pos}`}>
                  <img src={r.img} alt={r.name} />
                  <h3>{r.name}</h3>
                  <p className="phi-stars">{"★".repeat(r.rating)}</p>
                  <p>{r.text}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Form */}
        <form className="review-form" onSubmit={addReview}>
          <h3>Add Your Review</h3>
          <input
            placeholder="Your Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <select
            value={form.rating}
            onChange={(e) => setForm({ ...form, rating: e.target.value })}
          >
            <option>5</option>
            <option>4</option>
            <option>3</option>
          </select>
          <textarea
            placeholder="Your Review"
            value={form.text}
            onChange={(e) => setForm({ ...form, text: e.target.value })}
            required
          ></textarea>
          <button type="submit">Add Review</button>
        </form>
      </div>
    </div>
  );
}