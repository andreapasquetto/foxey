import { currencyFormatter } from "@/common/formatters";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useWalletsGetAllQuery } from "@/modules/accounting/accounting-queries";
import { WalletCreateForm } from "@/modules/accounting/components/wallet-create-form";
import { WalletRead } from "@/modules/accounting/schemas/wallet-read-schema";
import { CheckIcon, ChevronsUpDown, CirclePlus } from "lucide-react";
import { useState } from "react";

interface WalletSwitcherProps {
  selectedWallet: WalletRead | undefined;
  onSelectWallet: (wallet: WalletRead | undefined) => void;
}

export function WalletSwitcher(props: WalletSwitcherProps) {
  const [open, setOpen] = useState(false);
  const [showNewWalletDialog, setShowNewWalletDialog] = useState(false);

  const query = useWalletsGetAllQuery();

  return (
    <Dialog open={showNewWalletDialog} onOpenChange={setShowNewWalletDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        {query.isFetching && <Skeleton className="h-10 w-60" />}
        {!query.isFetching && (
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={!!open}
              aria-label="Select a team"
              className={cn("w-[250px] justify-between")}
            >
              {props.selectedWallet?.name ?? "No wallet selected"}
              <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
        )}
        <PopoverContent className="w-[250px] p-0">
          <Command>
            <CommandList>
              <CommandItem
                onSelect={() => {
                  props.onSelectWallet(undefined);
                  setOpen(false);
                }}
                className="gap-2 text-sm"
              >
                No wallet selected
              </CommandItem>
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandEmpty>No wallet found.</CommandEmpty>
              {query.data?.map((wallet) => (
                <CommandItem
                  key={wallet.id}
                  onSelect={() => {
                    props.onSelectWallet(wallet);
                    setOpen(false);
                  }}
                  className="gap-2 text-sm"
                >
                  <span>{wallet.name}</span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {currencyFormatter.format(Number(wallet.amount))}
                  </span>
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      props.selectedWallet?.id === wallet.id ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false);
                      setShowNewWalletDialog(true);
                    }}
                  >
                    <CirclePlus className="mr-2 h-5 w-5" />
                    Add wallet...
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Add wallet</DialogTitle>
          <DialogDescription>
            Add a new wallet to manage transactions and transfers.
          </DialogDescription>
        </DialogHeader>
        <WalletCreateForm onSubmit={() => setShowNewWalletDialog(false)} />
      </DialogContent>
    </Dialog>
  );
}
