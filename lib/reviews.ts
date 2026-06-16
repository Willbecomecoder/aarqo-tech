export type Review = {
  id: string;
  user_id: string;
  user_name: string;
  user_email?: string;
  user_avatar: string | null;
  rating: number;
  review_text: string;
  created_at: string;
};

export type ReviewEligibility = {
  isLoggedIn: boolean;
  isVerifiedClient: boolean;
  hasReviewed: boolean;
};

export function sanitizeReviewText(value: unknown) {
  return String(value ?? "")
    .replace(/<[^>]*>/g, "")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function isValidRating(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value >= 1 && value <= 5;
}
