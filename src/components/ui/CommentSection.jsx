"use client";

import { saveComment } from "@/services/actions";
import { useState, useEffect } from "react";
import { FaRegCommentDots } from "react-icons/fa";
import { FaComment } from "react-icons/fa6";
import { MdVerified } from "react-icons/md";
import { toast } from "sonner";

const MAX_CHARS = 200;
const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function CommentSection({ lawyerId, hasPaid, user }) {
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);

  const remaining = MAX_CHARS - comment.length;

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/comments?lawyerId=${lawyerId}`,
        );
        const data = await res.json();
        if (data.success) {
          setComments(data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingComments(false);
      }
    };

    fetchComments();
  }, [lawyerId, submitted]);

  const handleSubmit = async () => {
    if (!comment.trim()) return;
    setSubmitting(true);
    setError("");

    try {
      const data = await saveComment({
        lawyerId,
        userId: user.id,
        userEmail: user.email,
        userName: user.name,
        text: comment.trim(),
      });

      if (data.success) {
        toast.success("Review posted successfully!");
        setSubmitted(true);
        setComment("");
      } else {
        toast.error(data.message || "Failed to post review.");
        setError(data.message || "Failed to post comment.");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
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

      {/* Write review */}
      <div className="px-6 py-6 border-b border-zinc-100 dark:border-zinc-800">
        {!user && (
          <div className="border border-dashed border-zinc-300 dark:border-zinc-700 p-6 text-center">
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Login to leave a review
            </p>
          </div>
        )}

        {user && !hasPaid && (
          <div className="border border-dashed border-zinc-300 dark:border-zinc-700 p-6 text-center">
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Only clients who have hired this lawyer can leave a review
            </p>
          </div>
        )}

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
                  <FaComment className="text-[#A3F367] text-sm" />
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

      {/* Comments list */}
      <div className="px-6 py-6 space-y-4">
        {loadingComments ? (
          <div className="space-y-3">
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="h-16 bg-zinc-100 dark:bg-zinc-800 animate-pulse"
              />
            ))}
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-8 border border-dashed border-zinc-200 dark:border-zinc-700">
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              No reviews yet
            </p>
          </div>
        ) : (
          comments.map((c, i) => (
            <div
              key={i}
              className="border border-zinc-100 dark:border-zinc-800 p-4 bg-zinc-50 dark:bg-zinc-950"
            >
              <div className="flex items-center gap-2 mb-2">
                <FaComment className="text-[#A3F367] text-sm shrink-0" />
                <span className="text-xs font-bold text-zinc-700 dark:text-zinc-200">
                  {c.userName}
                </span>
                <span className="text-[10px] text-zinc-400 dark:text-zinc-500 ml-auto">
                  {new Date(c.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {c.text}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
