"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Transaction } from "@/db/types/finance";
import { transactionsDelete } from "@/modules/finance/finance-actions";
import { format } from "date-fns";
import { Trash } from "lucide-react";
import { useState } from "react";

interface DeleteTransactionProps {
  transaction: Transaction;
}

export function DeleteTransaction(props: DeleteTransactionProps) {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <Button
        variant="ghost"
        className="flex h-12 w-full cursor-pointer items-center justify-between gap-1 px-2 py-1.5 sm:h-10"
        onClick={() => setShowDialog(true)}
      >
        Delete <Trash className="h-5 w-5 text-destructive" />
      </Button>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Delete transaction</DialogTitle>
          <DialogDescription>
            <code>{format(props.transaction.datetime, "ccc y-MM-dd HH:mm")}</code>
          </DialogDescription>
        </DialogHeader>
        <p className="text-center sm:text-left">
          Are you sure you want to delete this transaction?
        </p>
        <form action={transactionsDelete} className="flex items-center justify-center gap-3">
          <input type="hidden" name="id" value={props.transaction.id} />
          <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>
            Cancel
          </Button>
          <Button type="submit" onClick={() => setShowDialog(false)}>
            Confirm
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
