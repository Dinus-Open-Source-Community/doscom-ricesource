import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatDistanceToNow } from "date-fns";

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

interface CommentProps {
  comment: CommentData;
  replies: CommentData[];
  onReply: (parentId: number, content: string) => void;
}

export function Comment({ comment, replies, onReply }: CommentProps) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  const handleReply = () => {
    if (replyContent.trim()) {
      onReply(comment.id, replyContent);
      setReplyContent("");
      setIsReplying(false);
    }
  };

  return (
    <div className="mb-4">
      <div className="flex space-x-4">
        <Avatar>
          <AvatarImage src={comment.user.avatar} alt={comment.user.username} />
          <AvatarFallback>{comment.user.username[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <span className="font-bold">{comment.user.username}</span>
            <span className="text-muted-foreground text-sm">
              {formatDistanceToNow(new Date(comment.created_at), {
                addSuffix: true,
              })}
            </span>
          </div>
          <p className="mt-1">{comment.description}</p>
          <Button
            variant="ghost"
            size="sm"
            className="mt-2"
            onClick={() => setIsReplying(!isReplying)}
          >
            Reply
          </Button>
          {isReplying && (
            <div className="mt-2">
              <Textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Write a reply..."
                className="mb-2"
              />
              <Button size="sm" onClick={handleReply}>
                Post Reply
              </Button>
            </div>
          )}
        </div>
      </div>
      {replies.length > 0 && (
        <div className="ml-12 mt-4">
          {replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              replies={[]}
              onReply={onReply}
            />
          ))}
        </div>
      )}
    </div>
  );
}
