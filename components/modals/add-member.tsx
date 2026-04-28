"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useModal } from "@/context/modal-context";
import { Field, FieldGroup } from "@/components/ui/field";

export const AddMember = () => {
  const { type, closeModal } = useModal();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddMember = async () => {
    setLoading(true);

    try {
      const response = await axios.post("/api/v1/pro/add-member", { email });

      if (response.status === 200) {
        console.log(response.data);

        toast.success("Invitation sent successfully!");
        closeModal();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message;
        toast.error(message || "Failed to send invitation.");
      } else {
        toast.error("Failed to send invitation.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={type === "add_member"} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Add Member</DialogTitle>
          <DialogDescription>
            Invite your team members to collaborate on your projects.
          </DialogDescription>
        </DialogHeader>

        <FieldGroup>
          <Field>
            <Label htmlFor="member-email">Email</Label>
            <Input
              id="member-email"
              name="email"
              type="email"
              value={email}
              placeholder="yuvan@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>
        </FieldGroup>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleAddMember}>
            {loading ? <Spinner /> : "Add"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
