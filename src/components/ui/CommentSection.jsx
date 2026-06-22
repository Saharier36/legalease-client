"use client";

import { useState } from "react";
import { FaRegCommentDots } from "react-icons/fa";
import { MdVerified } from "react-icons/md";

const MAX_CHARS = 200;

export default function CommentSection({ lawyerId, hasPaid, user }) {
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const remaining = MAX_CHARS - comment.length;

  const handleSubmit = async () => {
    if (!comment.trim()) return;
    setSubmitting(true);
    setError("");

    try {
      // TODO: connect to comment API
      // await postComment({ lawyerId, userId: user._id, text: comment });
      setSubmitted(true);
      setComment("");
    } catch (err) {
      setError("Failed to post comment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
      {/* Header */}
      <div className="border-b border-zinc-100 dark:border-zinc-800 px-6 py-4 flex items-center gap-2">
        <FaRegCommentDots className="text-[#A3F367] text-sm" />
        <span className="text-xs font-black uppercase tracking-widest text-zinc-900 dark:text-white">
          Client Review
        </span>
      </div>

      <div className="px-6 py-6">
        {/* Not logged in */}
        {!user && (
          <div className="border border-dashed border-zinc-300 dark:border-zinc-700 p-6 text-center">
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Login to leave a review
            </p>
          </div>
        )}

        {/* Logged in but not paid */}
        {user && !hasPaid && (
          <div className="border border-dashed border-zinc-300 dark:border-zinc-700 p-6 text-center">
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Only clients who have hired this lawyer can leave a review
            </p>
          </div>
        )}

        {/* Logged in and paid */}
        {user && hasPaid && (
          <>
            {submitted ? (
              <div className="border border-[#A3F367]/30 bg-[#A3F367]/5 p-4">
                <p className="text-xs font-bold text-[#A3F367] uppercase tracking-wider">
                  Review submitted successfully
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <MdVerified className="text-[#A3F367] text-sm" />
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    Posting as{" "}
                    <span className="font-bold text-zinc-700 dark:text-zinc-200">
                      {user.name}
                    </span>
                  </span>
                </div>

                <textarea
                  value={comment}
                  onChange={(e) => {
                    if (e.target.value.length <= MAX_CHARS) {
                      setComment(e.target.value);
                    }
                  }}
                  placeholder="Share your experience with this lawyer..."
                  rows={4}
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 px-4 py-3 text-sm text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 focus:outline-none focus:border-[#A3F367] transition-colors resize-none rounded-none"
                />

                <div className="flex items-center justify-between">
                  <span
                    className={`text-[11px] font-medium ${
                      remaining <= 20
                        ? "text-red-400"
                        : "text-zinc-400 dark:text-zinc-500"
                    }`}
                  >
                    {remaining} characters remaining
                  </span>

                  <button
                    onClick={handleSubmit}
                    disabled={submitting || !comment.trim()}
                    className="bg-[#A3F367] hover:bg-[#b5fa82] disabled:opacity-40 disabled:cursor-not-allowed text-zinc-950 font-black text-xs uppercase tracking-widest px-5 py-2 rounded-none transition-all duration-200"
                  >
                    {submitting ? "Posting..." : "Post Review"}
                  </button>
                </div>

                {error && (
                  <p className="text-xs text-red-400 font-medium">{error}</p>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
