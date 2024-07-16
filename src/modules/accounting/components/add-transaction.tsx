import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TransactionCreateForm } from "@/modules/accounting/components/transaction-create-form";
import { WalletRead } from "@/modules/accounting/schemas/wallet-read-schema";
import { useState } from "react";

interface AddTransactionProps {
  selectedWallet?: WalletRead;
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
          {props.selectedWallet && (
            <DialogDescription>{props.selectedWallet.name}</DialogDescription>
          )}
        </DialogHeader>
        <TransactionCreateForm
          walletId={props.selectedWallet?.id}
          onSubmit={() => setShowDialog(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
