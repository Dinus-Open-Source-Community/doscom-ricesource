"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import MDEditor from "@uiw/react-md-editor";

interface CommandSnippetProps {
  command: string; // Command bisa berupa string multi-line
}

export function CommandSnippet({
  command,
}: CommandSnippetProps) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <Card>
      <CardContent>
        <div className="bg-muted rounded-md font-mono text-sm relative" data-color-mode="light">
          <MDEditor.Markdown source={command} className="mde-reset" style={{ padding: "20px", backgroundColor: "whitesmoke" }} />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2"
            onClick={copyToClipboard}
          >
            {isCopied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            <span className="sr-only">Copy to clipboard</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
