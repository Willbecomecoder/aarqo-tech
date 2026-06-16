"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Review, ReviewEligibility } from "@/lib/reviews";
import styles from "./Reviews.module.css";

type ReviewsResponse = {
  reviews: Review[];
  eligibility: ReviewEligibility;
  error?: string;
};

type CurrentUser = {
  name: string;
  avatar: string | null;
};

const defaultEligibility: ReviewEligibility = {
  isLoggedIn: false,
  isVerifiedClient: false,
  hasReviewed: false,
};

const placeholderCards = [1, 2, 3];

function getDisplayName(metadata: Record<string, unknown> | undefined, email?: string) {
  const name = metadata?.full_name ?? metadata?.name;

  if (typeof name === "string" && name.trim()) {
    return name.trim();
  }

  return email?.split("@")[0] ?? "Verified client";
}

function getAvatar(metadata: Record<string, unknown> | undefined) {
  return typeof metadata?.avatar_url === "string" ? metadata.avatar_url : null;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

async function getSessionContext() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return {
    token: session?.access_token ?? null,
    user: session?.user
      ? {
          name: getDisplayName(session.user.user_metadata, session.user.email),
          avatar: getAvatar(session.user.user_metadata),
        }
      : null,
  };
}

function Stars({ rating, interactive = false }: { rating: number; interactive?: boolean }) {
  return (
    <span className={interactive ? styles.formStarsPreview : styles.cardStars}>
      {"\u2605".repeat(rating)}
      <span className={styles.mutedStars}>{"\u2605".repeat(5 - rating)}</span>
    </span>
  );
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const initials = review.user_name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <motion.article
      className={styles.card}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.42, delay: index * 0.04, ease: "easeOut" }}
      whileHover={{ y: -6, scale: 1.015 }}
      aria-label={`Review from ${review.user_name}`}
    >
      <header className={styles.cardHeader}>
        {review.user_avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className={styles.avatar}
            src={review.user_avatar}
            alt=""
            referrerPolicy="no-referrer"
          />
        ) : (
          <span className={styles.avatarFallback} aria-hidden="true">
            {initials}
          </span>
        )}

        <div className={styles.identity}>
          <h3>{review.user_name}</h3>
          <time dateTime={review.created_at}>{formatDate(review.created_at)}</time>
        </div>
      </header>

      <div aria-label={`${review.rating} out of 5 stars`} role="img">
        <Stars rating={review.rating} />
      </div>

      <p className={styles.reviewText}>{review.review_text}</p>
    </motion.article>
  );
}

function PlaceholderCard({ index }: { index: number }) {
  return (
    <motion.article
      className={`${styles.card} ${styles.placeholderCard}`}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.36, delay: index * 0.06 }}
      whileHover={{ y: -6, scale: 1.015 }}
    >
      <Stars rating={5} />
      <h3>Client Review Coming Soon</h3>
      <p>
        Verified reviews from real clients will appear here after project completion.
      </p>
    </motion.article>
  );
}

function SkeletonCard({ index }: { index: number }) {
  return (
    <motion.article
      className={`${styles.card} ${styles.skeletonCard}`}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, delay: index * 0.04 }}
      aria-hidden="true"
    >
      <div className={styles.skeletonHeader}>
        <span className={styles.skeletonAvatar} />
        <span className={styles.skeletonName} />
      </div>
      <span className={styles.skeletonStars} />
      <span className={styles.skeletonLine} />
      <span className={styles.skeletonLine} />
      <span className={styles.skeletonLineShort} />
    </motion.article>
  );
}

function ReviewForm({
  currentUser,
  onSubmit,
}: {
  currentUser: CurrentUser;
  onSubmit: (payload: { rating: number; review_text: string }) => Promise<void>;
}) {
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

    if (trimmedReview.length < 10) {
      setError("Please write at least 10 characters about your experience.");
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit({ rating, review_text: trimmedReview });
      setRating(5);
      setReviewText("");
      setSuccess("Your verified review is live. Thank you.");
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
    <motion.form
      className={styles.form}
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, ease: "easeOut" }}
    >
      <div className={styles.userStrip}>
        {currentUser.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className={styles.userAvatar}
            src={currentUser.avatar}
            alt=""
            referrerPolicy="no-referrer"
          />
        ) : (
          <span className={styles.userAvatarFallback} aria-hidden="true">
            {currentUser.name.slice(0, 2).toUpperCase()}
          </span>
        )}
        <div>
          <span>Signed in as</span>
          <strong>{currentUser.name}</strong>
        </div>
      </div>

      <fieldset className={styles.fieldset} disabled={isSubmitting}>
        <legend>Leave a verified review</legend>

        <div className={styles.ratingRow}>
          <span>Rating</span>
          <div className={styles.ratingControls} role="radiogroup" aria-label="Review rating">
            {[1, 2, 3, 4, 5].map((value) => (
              <label key={value}>
                <input
                  type="radio"
                  name="rating"
                  value={value}
                  checked={rating === value}
                  onChange={() => setRating(value)}
                />
                <motion.span
                  aria-hidden="true"
                  whileTap={{ scale: 0.86 }}
                  animate={{ scale: value <= rating ? 1 : 0.92 }}
                >
                  {value <= rating ? "\u2605" : "\u2606"}
                </motion.span>
                <span className={styles.srOnly}>{value} stars</span>
              </label>
            ))}
          </div>
          <Stars rating={rating} interactive />
        </div>

        <label className={styles.textareaLabel} htmlFor={reviewId}>
          Review
        </label>
        <textarea
          id={reviewId}
          value={reviewText}
          onChange={(event) => setReviewText(event.target.value)}
          maxLength={800}
          rows={4}
          required
          placeholder="Share the result, the process, or what changed for your business."
        />

        <div className={styles.formMeta}>
          <span>{reviewText.length}/800</span>
          <span>Verified Google account required</span>
        </div>

        <AnimatePresence mode="popLayout">
          {error ? (
            <motion.p
              className={styles.formError}
              role="alert"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
            >
              {error}
            </motion.p>
          ) : null}

          {success ? (
            <motion.p
              className={styles.formSuccess}
              role="status"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
            >
              {success}
            </motion.p>
          ) : null}
        </AnimatePresence>

        <motion.button
          className={styles.submitButton}
          type="submit"
          disabled={isSubmitting}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          {isSubmitting ? "Publishing..." : "Publish review"}
        </motion.button>
      </fieldset>
    </motion.form>
  );
}

export default function Reviews() {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [eligibility, setEligibility] =
    useState<ReviewEligibility>(defaultEligibility);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [loadError, setLoadError] = useState("");

  const loadReviews = useCallback(async () => {
    setLoadError("");

    const { token, user } = await getSessionContext();
    setCurrentUser(user);

    const response = await fetch("/api/reviews", {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      cache: "no-store",
    });
    const payload = (await response.json()) as ReviewsResponse;

    if (!response.ok) {
      throw new Error(payload.error ?? "Unable to load reviews right now.");
    }

    setReviews(payload.reviews);
    setEligibility(payload.eligibility);
  }, []);

  useEffect(() => {
    let mounted = true;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadReviews()
      .catch((error) => {
        if (mounted) {
          setLoadError(
            error instanceof Error
              ? error.message
              : "Unable to load reviews right now.",
          );
        }
      })
      .finally(() => {
        if (mounted) setIsLoading(false);
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      loadReviews().catch((error) => {
        setLoadError(
          error instanceof Error
            ? error.message
            : "Unable to refresh your review access.",
        );
      });
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [loadReviews]);

  async function signInWithGoogle() {
    setAuthLoading(true);
    setLoadError("");

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/#reviews`,
      },
    });

    if (error) {
      setLoadError(error.message);
      setAuthLoading(false);
    }
  }

  async function signOut() {
    setAuthLoading(true);
    await supabase.auth.signOut();
    setCurrentUser(null);
    setAuthLoading(false);
  }

  async function submitReview(payload: { rating: number; review_text: string }) {
    const { token } = await getSessionContext();

    if (!token) {
      throw new Error("Please sign in with Google before submitting a review.");
    }

    const response = await fetch("/api/reviews", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error ?? "Unable to submit your review right now.");
    }

    setReviews((currentReviews) => [result.review, ...currentReviews]);
    setEligibility((current) => ({ ...current, hasReviewed: true }));
  }

  function scrollCarousel(direction: "previous" | "next") {
    carouselRef.current?.scrollBy({
      left: direction === "next" ? 332 : -332,
      behavior: "smooth",
    });
  }

  const canSubmitReview =
    eligibility.isLoggedIn &&
    eligibility.isVerifiedClient &&
    !eligibility.hasReviewed &&
    currentUser;

  return (
    <section className={styles.section} id="reviews" aria-labelledby="reviews-title">
      <motion.div
        className={styles.shell}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.48, ease: "easeOut" }}
      >
        <div className={styles.header}>
          <span className={styles.eyebrow}>Verified feedback</span>
          <h2 id="reviews-title">Client Reviews</h2>

          <div className={styles.authRow} aria-live="polite">
            {!eligibility.isLoggedIn ? (
              <motion.button
                className={styles.authButton}
                type="button"
                onClick={signInWithGoogle}
                disabled={authLoading}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {authLoading ? "Opening..." : "Google Sign In"}
              </motion.button>
            ) : (
              <motion.button
                className={`${styles.authButton} ${styles.authButtonGhost}`}
                type="button"
                onClick={signOut}
                disabled={authLoading}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Sign out
              </motion.button>
            )}
          </div>
        </div>

        {loadError ? (
          <p className={styles.alert} role="alert">
            {loadError}
          </p>
        ) : null}

        {!isLoading && reviews.length === 0 && !loadError ? (
          <motion.div
            className={styles.emptyIntro}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3>Be the first verified client to leave a review.</h3>
          </motion.div>
        ) : null}

        <div className={styles.carouselWrap}>
          <button
            className={`${styles.carouselButton} ${styles.previousButton}`}
            type="button"
            aria-label="Previous reviews"
            onClick={() => scrollCarousel("previous")}
          >
            {"<"}
          </button>

          <div className={styles.carousel} ref={carouselRef} tabIndex={0}>
            <AnimatePresence mode="popLayout">
              {isLoading
                ? [0, 1, 2].map((item) => <SkeletonCard key={item} index={item} />)
                : reviews.length > 0
                  ? reviews.map((review, index) => (
                      <ReviewCard key={review.id} review={review} index={index} />
                    ))
                  : placeholderCards.map((item, index) => (
                      <PlaceholderCard key={item} index={index} />
                    ))}
            </AnimatePresence>
          </div>

          <button
            className={`${styles.carouselButton} ${styles.nextButton}`}
            type="button"
            aria-label="Next reviews"
            onClick={() => scrollCarousel("next")}
          >
            {">"}
          </button>
        </div>

        {!isLoading && eligibility.isLoggedIn && !eligibility.isVerifiedClient ? (
          <p className={styles.note}>
            This Google account is signed in, but it is not on the verified client list.
          </p>
        ) : null}

        {!isLoading && eligibility.hasReviewed ? (
          <p className={styles.note}>You have already submitted your verified review.</p>
        ) : null}

        {canSubmitReview ? (
          <ReviewForm currentUser={currentUser} onSubmit={submitReview} />
        ) : null}
      </motion.div>
    </section>
  );
}
