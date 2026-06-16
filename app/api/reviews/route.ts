import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  isValidRating,
  sanitizeReviewText,
  type Review,
  type ReviewEligibility,
} from "@/lib/reviews";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function createSupabaseClient(accessToken?: string) {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase environment variables are not configured.");
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    global: accessToken
      ? {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      : undefined,
  });
}

function getAccessToken(request: NextRequest) {
  const header = request.headers.get("authorization");

  if (!header?.toLowerCase().startsWith("bearer ")) {
    return null;
  }

  return header.slice(7).trim();
}

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export async function GET(request: NextRequest) {
  try {
    const publicClient = createSupabaseClient();
    const accessToken = getAccessToken(request);
    const authClient = accessToken ? createSupabaseClient(accessToken) : null;

    const { data: reviews, error: reviewsError } = await publicClient
      .from("reviews")
      .select("id,user_id,user_name,user_avatar,rating,review_text,created_at")
      .order("created_at", { ascending: false });

    if (reviewsError) {
      return jsonError("Unable to load reviews right now.", 500);
    }

    const eligibility: ReviewEligibility = {
      isLoggedIn: false,
      isVerifiedClient: false,
      hasReviewed: false,
    };

    if (authClient && accessToken) {
      const {
        data: { user },
      } = await authClient.auth.getUser(accessToken);

      if (user?.email) {
        eligibility.isLoggedIn = true;

        const normalizedEmail = user.email.toLowerCase();
        const [{ data: verifiedClient }, { data: existingReview }] =
          await Promise.all([
            authClient
              .from("verified_clients")
              .select("email")
              .eq("email", normalizedEmail)
              .maybeSingle(),
            authClient
              .from("reviews")
              .select("id")
              .eq("user_id", user.id)
              .maybeSingle(),
          ]);

        eligibility.isVerifiedClient = Boolean(verifiedClient);
        eligibility.hasReviewed = Boolean(existingReview);
      }
    }

    return NextResponse.json({
      reviews: (reviews ?? []) as Review[],
      eligibility,
    });
  } catch (error) {
    console.error("[reviews:get]", error);
    return jsonError("Unable to load reviews right now.", 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const accessToken = getAccessToken(request);

    if (!accessToken) {
      return jsonError("Please sign in with Google before submitting a review.", 401);
    }

    const supabase = createSupabaseClient(accessToken);
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(accessToken);

    if (userError || !user?.email) {
      return jsonError("Your session has expired. Please sign in again.", 401);
    }

    const body = await request.json().catch(() => null);
    const rating = Number(body?.rating);
    const reviewText = sanitizeReviewText(body?.review_text);

    if (!isValidRating(rating)) {
      return jsonError("Choose a rating from 1 to 5 stars.", 400);
    }

    if (reviewText.length < 10) {
      return jsonError("Please write at least 10 characters about your experience.", 400);
    }

    if (reviewText.length > 800) {
      return jsonError("Please keep your review under 800 characters.", 400);
    }

    const normalizedEmail = user.email.toLowerCase();
    const { data: verifiedClient } = await supabase
      .from("verified_clients")
      .select("email")
      .eq("email", normalizedEmail)
      .maybeSingle();

    if (!verifiedClient) {
      return jsonError("Only verified Aarqo.Tech clients can submit reviews.", 403);
    }

    const displayName =
      sanitizeReviewText(user.user_metadata?.full_name) ||
      sanitizeReviewText(user.user_metadata?.name) ||
      normalizedEmail.split("@")[0];

    const avatar =
      typeof user.user_metadata?.avatar_url === "string"
        ? user.user_metadata.avatar_url
        : null;

    const { data, error } = await supabase
      .from("reviews")
      .insert({
        user_id: user.id,
        user_name: displayName.slice(0, 120),
        user_email: normalizedEmail,
        user_avatar: avatar,
        rating,
        review_text: reviewText,
      })
      .select("id,user_id,user_name,user_avatar,rating,review_text,created_at")
      .single();

    if (error?.code === "23505") {
      return jsonError("You have already submitted a review.", 409);
    }

    if (error) {
      console.error("[reviews:post]", error);
      return jsonError("Unable to submit your review right now.", 500);
    }

    return NextResponse.json({ review: data as Review }, { status: 201 });
  } catch (error) {
    console.error("[reviews:post]", error);
    return jsonError("Unable to submit your review right now.", 500);
  }
}
