"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface AuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginRedirect: () => void;
}

export function AuthDialog({
  isOpen,
  onClose,
  onLoginRedirect,
}: AuthDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Authentication Required</DialogTitle>
          <DialogDescription>
            You need to be logged in to perform this action.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
          <Button onClick={onLoginRedirect}>Login</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
