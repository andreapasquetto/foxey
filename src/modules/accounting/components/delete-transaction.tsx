import { CircularSpinner } from "@/components/circular-spinner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTransactionDeleteMutation } from "@/modules/accounting/accounting-mutations";
import { TransactionRead } from "@/modules/accounting/schemas/transaction-read-schema";
import { format } from "date-fns";
import { Trash } from "lucide-react";
import { useState } from "react";

interface DeleteTransactionProps {
  transaction: TransactionRead;
}

export function DeleteTransaction(props: DeleteTransactionProps) {
  const [showDialog, setShowDialog] = useState(false);

  const mutation = useTransactionDeleteMutation(props.transaction.id);

  function deleteAndCloseDialog() {
    mutation.mutate(props.transaction.id, {
      onSuccess: () => setShowDialog(false),
    });
  }

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <Button size="icon" variant="destructive" onClick={() => setShowDialog(true)}>
        <Trash className="h-5 w-5" />
      </Button>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Delete transaction</DialogTitle>
          <DialogDescription>
            {`${format(props.transaction.date, "ccc dd MMM y")} • ${props.transaction.description}`}
          </DialogDescription>
        </DialogHeader>
        <p>Are you sure you want to delete this transaction?</p>
        <div className="flex items-center justify-center gap-3">
          <Button
            variant="outline"
            onClick={() => setShowDialog(false)}
            disabled={mutation.isPending}
          >
            Cancel
          </Button>
          <Button onClick={() => deleteAndCloseDialog()} disabled={mutation.isPending}>
            Confirm
          </Button>
          {mutation.isPending && <CircularSpinner />}
        </div>
      </DialogContent>
    </Dialog>
  );
}
