"use client";

import { useState, useEffect, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Comment } from "./comment";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getCommentByRiceId,
  postComment,
  replyComment,
} from "@/actions/comment";
import { AuthDialog } from "./unauthorized-modal";

interface User {
  avatar: string;
  username: string;
}

interface CommentData {
  id: number;
  description: string;
  parent_id: number | null;
  id_user: number;
  created_at: string;
  user: User;
}

interface CommentSectionProps {
  riceId: number;
  token: string | null; // Tambahkan token sebagai prop
}

export default function CommentSection({ riceId, token }: CommentSectionProps) {
  const [comments, setComments] = useState<CommentData[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDisabled, setIsDisabled] = useState(!token); // Nonaktifkan jika token tidak ada
  const [isPosting, setIsPosting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchComments = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getCommentByRiceId(riceId.toString());
      setComments(response);
    } catch (err) {
      setError("Comments could not be loaded");
      console.error("Error loading comments:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [riceId]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPosting(true);
    if (newComment.trim()) {
      try {
        if (!token) {
          setIsDialogOpen(true);
          throw new Error("User not authenticated");
        }

        const userString = localStorage.getItem("user");

        if (!userString) throw new Error("User data not found in localStorage");

        const user = JSON.parse(userString);

        const response = await postComment({
          config_id: riceId,
          description: newComment,
          id_user: user.id,
          token: token,
        });

        setComments([...comments, response]);
        fetchComments();
        setNewComment("");
      } catch (err: any) {
        console.error("Error posting comment:", err);
        if (err.message === "Unauthorized") {
          setIsDialogOpen(true); // Tampilkan dialog jika unauthorized
        } else {
          setError("Failed to post comment");
        }
      } finally {
        setIsPosting(false);
      }
    }
  };

  const handleReply = async (parentId: number, content: string) => {
    try {
      if (!token) {
        setIsDialogOpen(true);
        throw new Error("User not authenticated");
      }

      const userString = localStorage.getItem("user");

      if (!userString) throw new Error("User data not found in localStorage");

      const user = JSON.parse(userString);

      const response = await replyComment({
        config_id: riceId,
        description: content,
        id_user: user.id,
        parent_id: parentId,
        token: token,
      });

      setComments([...comments, response]);
      fetchComments();
    } catch (err: any) {
      console.error("Error posting reply:", err);
      if (err.message === "Unauthorized") {
        setIsDialogOpen(true); // Tampilkan dialog jika unauthorized
      } else {
        setError("Failed to post reply");
      }
    }
  };

  const renderComments = (parentId: number | null = null): ReactNode[] => {
    return comments
      .filter((comment) => comment.parent_id === parentId)
      .map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          replies={comments.filter((reply) => reply.parent_id === comment.id)}
          onReply={handleReply}
          token={token} // Teruskan token ke komponen Comment
        />
      ));
  };

  if (isLoading) {
    return (
      <div className="mt-8 space-y-4">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      <form
        onSubmit={handleSubmitComment}
        className={`mb-4 ${isDisabled && "hidden"}`}
      >
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="mb-2"
        />
        <Button type="submit" disabled={isPosting || newComment.trim() === ""}>
          {isPosting ? "Posting..." : "Post Comment"}
        </Button>
      </form>
      <div className="space-y-4">
        {comments && comments.length > 0 ? (
          renderComments()
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
      </div>

      <AuthDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onLoginRedirect={() => (window.location.href = "/login")}
      />
    </div>
  );
}
