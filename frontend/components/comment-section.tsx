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
}

export default function CommentSection({ riceId }: CommentSectionProps) {
  const [comments, setComments] = useState<CommentData[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPosting, setIsPosting] = useState(false);

  const fetchComments = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getCommentByRiceId(riceId.toString());
      setComments(response);
    } catch (err) {
      setError("Comments could not be loaded");
      console.log("Error loading comments:", err);
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
        const response = await postComment({
          config_id: riceId,
          description: newComment,
          id_user: 14,
        });

        if (!response) {
          throw new Error("Failed to post comment");
        }

        setComments([...comments, response]);
        fetchComments();
        setNewComment("");
      } catch (err) {
        console.error("Error posting comment:", err);
        // You might want to show an error message to the user here
      } finally {
        setIsPosting(false);
      }
    }
  };

  const handleReply = async (parentId: number, content: string) => {
    try {
      const response = await replyComment({
        config_id: riceId,
        description: content,
        id_user: 14,
        parent_id: parentId,
      });

      if (!response) {
        throw new Error("Failed to post reply");
      }

      setComments([...comments, response]);
      fetchComments();
    } catch (err) {
      console.error("Error posting reply:", err);
      // You might want to show an error message to the user here
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

  if (error) {
    return (
      <div className="mt-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      <form onSubmit={handleSubmitComment} className="mb-4">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="mb-2"
        />
        <Button type="submit" disabled={isPosting}>
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
    </div>
  );
}
