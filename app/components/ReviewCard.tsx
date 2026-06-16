import type { Review } from "@/lib/reviews";

type ReviewCardProps = {
  review: Review;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const initials = review.user_name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <article className="review-card" aria-label={`Review from ${review.user_name}`}>
      <header className="review-card__header">
        {review.user_avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="review-card__avatar"
            src={review.user_avatar}
            alt=""
            referrerPolicy="no-referrer"
          />
        ) : (
          <span className="review-card__avatar review-card__avatar--fallback" aria-hidden="true">
            {initials}
          </span>
        )}

        <div>
          <h3 className="review-card__name">{review.user_name}</h3>
          <time className="review-card__date" dateTime={review.created_at}>
            {formatDate(review.created_at)}
          </time>
        </div>
      </header>

      <div
        className="review-card__stars"
        aria-label={`${review.rating} out of 5 stars`}
        role="img"
      >
        {"\u2605".repeat(review.rating)}
        <span className="review-card__stars-muted">
          {"\u2605".repeat(5 - review.rating)}
        </span>
      </div>

      <p className="review-card__text">{review.review_text}</p>
    </article>
  );
}
