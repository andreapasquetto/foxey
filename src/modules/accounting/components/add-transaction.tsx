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
import { Plus } from "lucide-react";
import { useState } from "react";

interface AddTransactionProps {
  selectedWallet?: WalletRead;
}

export function AddTransaction(props: AddTransactionProps) {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <Button className="hidden sm:inline-flex" size="sm" onClick={() => setShowDialog(true)}>
        Add transaction
      </Button>
      <Button className="sm:hidden" size="icon" onClick={() => setShowDialog(true)}>
        <Plus className="h-5 w-5" />
      </Button>
      <DialogContent aria-describedby={undefined}>
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
