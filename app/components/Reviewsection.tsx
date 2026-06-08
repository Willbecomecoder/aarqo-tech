
"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function ReviewSection() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);
useEffect(() => {
  loadReviews();
}, []);

async function loadReviews() {
  const { data, error } = await supabase
    .from("feedback")
    .select("*")
    .eq("approved", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return;
  }

  setReviews(data || []);
}
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        name,
        rating: Number(rating),
        message,
      };

      console.log("[REVIEW_DEBUG] INSERT PAYLOAD:", payload);
      console.log("[REVIEW_DEBUG] INSERT PAYLOAD KEYS:", Object.keys(payload));
      console.log("[REVIEW_DEBUG] INSERT PAYLOAD JSON:", JSON.stringify(payload));

      const response = await supabase
        .from("feedback")
        .insert([payload])
        .select();

      console.log("[REVIEW_DEBUG] FULL INSERT RESPONSE:", response);
      console.log("[REVIEW_DEBUG] INSERT DATA:", response.data);
      console.log("[REVIEW_DEBUG] INSERT ERROR:", response.error);
      if (response.error) {
        console.log("[REVIEW_DEBUG] Error Code:", response.error.code);
        console.log("[REVIEW_DEBUG] Error Message:", response.error.message);
        console.log("[REVIEW_DEBUG] Error Details:", response.error.details);
       // console.log("[REVIEW_DEBUG] HTTP Status:", response.error.status);
      }

if (response.error) {
  alert(`Supabase Error: ${response.error.message}`);
  return;
}

loadReviews();

setName("");
setRating("");
setMessage("");

setOpen(false);

alert("Review submitted successfully!");
      
    
    } catch (err) {
      console.error("Unexpected Error:", err);
      alert("Unexpected error occurred. Check browser console.");
    } finally {
      setLoading(false);
    }
}

  return (
    <section className="reviews-card">
      <div className="review-icon">⭐</div>

      <h3>Client Reviews</h3>

{reviews.length === 0 ? (
  <p className="review-text">
    No verified reviews published yet.
  </p>
) : (
  <div className="reviews-list">
    {reviews.map((review) => (
<div key={review.id} className="review-item">
  <div className="review-stars">
    {"⭐".repeat(review.rating)}
  </div>

  <h4>{review.name}</h4>

  <p className="review-message">
  {review.message}
</p>
</div>
    ))}
  </div>
)}

      <button
        className="review-btn"
        onClick={() => setOpen(true)}
      >
        Leave a Review
      </button>

      {open && (
        <div className="modal-overlay">
          <div className="review-modal">
            <button
              className="close-btn"
              onClick={() => setOpen(false)}
            >
              ×
            </button>

            <h2>Leave a Review</h2>

            <form onSubmit={handleSubmit}>
              <input
                className="feedback-input"
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <select
                className="feedback-input"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                required
              >
                <option value="">Select Rating</option>
                <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
                <option value="4">⭐⭐⭐⭐ Very Good</option>
                <option value="3">⭐⭐⭐ Good</option>
                <option value="2">⭐⭐ Fair</option>
                <option value="1">⭐ Poor</option>
              </select>

              <textarea
                className="feedback-textarea"
                placeholder="Share your experience..."
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />

              <button
                type="submit"
                className="submit-review-btn"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

