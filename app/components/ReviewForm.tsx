"use client";

import { useId, useState } from "react";

type ReviewFormProps = {
  onSubmit: (payload: { rating: number; review_text: string }) => Promise<void>;
};

export default function ReviewForm({ onSubmit }: ReviewFormProps) {
  const reviewId = useId();
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");

    const trimmedReview = reviewText.trim();

    if (!trimmedReview) {
      setError("Please share a short review before submitting.");
      return;
    }

    if (trimmedReview.length < 10) {
      setError("Please write at least 10 characters about your experience.");
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit({ rating, review_text: trimmedReview });
      setReviewText("");
      setRating(5);
      setSuccess("Thanks. Your verified review has been published.");
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to submit your review right now.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <fieldset className="review-form__fieldset" disabled={isSubmitting}>
        <legend className="review-form__legend">Leave a verified review</legend>

        <div className="review-form__group">
          <span className="review-form__label">Rating</span>
          <div className="review-form__rating" role="radiogroup" aria-label="Review rating">
            {[1, 2, 3, 4, 5].map((value) => (
              <label key={value} className="review-form__star">
                <input
                  type="radio"
                  name="rating"
                  value={value}
                  checked={rating === value}
                  onChange={() => setRating(value)}
                />
                <span aria-hidden="true">{value <= rating ? "*" : "-"}</span>
                <span className="sr-only">{value} stars</span>
              </label>
            ))}
          </div>
        </div>

        <div className="review-form__group">
          <label className="review-form__label" htmlFor={reviewId}>
            Review
          </label>
          <textarea
            id={reviewId}
            className="review-form__textarea"
            value={reviewText}
            onChange={(event) => setReviewText(event.target.value)}
            rows={5}
            maxLength={800}
            required
            placeholder="Tell future clients what it was like working with Aarqo.Tech."
          />
          <p className="review-form__hint">{reviewText.length}/800 characters</p>
        </div>

        {error ? (
          <p className="review-form__message review-form__message--error" role="alert">
            {error}
          </p>
        ) : null}

        {success ? (
          <p className="review-form__message review-form__message--success" role="status">
            {success}
          </p>
        ) : null}

        <button className="review-form__submit" type="submit">
          {isSubmitting ? "Submitting..." : "Submit review"}
        </button>
      </fieldset>
    </form>
  );
}
