"use client";

import { deleteAccount } from "../services/deleteAccount";
import Button from "@/ui/components/Button";

export default function DeleteAccountButton({ userId }: { userId: string }) {
  const onDelete = () => {
    if (window.confirm("This will permanently delete your account"))
      deleteAccount(userId);
  };

  return <Button onClick={onDelete}>Delete account</Button>;
}
