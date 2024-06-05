import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Wallet } from "@/mocks/accounting";
import { TransactionCreateForm } from "@/modules/accounting/components/transaction-create-form";
import { useState } from "react";

interface AddTransactionProps {
  selectedWallet: Wallet;
}

export function AddTransaction(props: AddTransactionProps) {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <Button size="sm" onClick={() => setShowDialog(true)}>
        Add transaction
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add transaction</DialogTitle>
          <DialogDescription>{props.selectedWallet.name}</DialogDescription>
        </DialogHeader>
        <TransactionCreateForm
          walletId={props.selectedWallet.id}
          onSubmit={() => setShowDialog(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
