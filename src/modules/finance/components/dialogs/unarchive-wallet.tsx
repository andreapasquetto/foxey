import { ArchiveRestore } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import type { Wallet } from "@/db/types/finance";
import { unarchiveWallet } from "@/modules/finance/server-actions";

export function UnarchiveWallet({ wallet }: { wallet: Wallet }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full cursor-pointer items-center justify-between"
        >
          Unarchive <ArchiveRestore />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Unarchive wallet</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to unarchive this wallet?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <form
            action={unarchiveWallet}
            className="flex items-center justify-center gap-3"
          >
            <input type="hidden" name="id" value={wallet.id} />
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button type="submit">Confirm</Button>
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
