"use client";

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
import { cn } from "@/lib/utils";
import { Wallet, mockedWallets } from "@/mocks/accounting";
import { WalletCreateForm } from "@/modules/accounting/components/wallet-create-form";
import { CheckIcon, ChevronsUpDown, CirclePlus } from "lucide-react";
import { useState } from "react";

interface WalletSwitcherProps {
  selectedWallet: Wallet | undefined;
  onSelectWallet: (wallet: Wallet | undefined) => void;
}

export function WalletSwitcher(props: WalletSwitcherProps) {
  const [open, setOpen] = useState(false);
  const [showNewWalletDialog, setShowNewWalletDialog] = useState(false);

  return (
    <Dialog open={showNewWalletDialog} onOpenChange={setShowNewWalletDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={!!open}
            aria-label="Select a team"
            className={cn("w-[250px] justify-between")}
          >
            {props.selectedWallet ? props.selectedWallet.name : "No wallet selected"}
            <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
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
              {mockedWallets.map((wallet) => (
                <CommandItem
                  key={wallet.id}
                  onSelect={() => {
                    props.onSelectWallet(wallet);
                    setOpen(false);
                  }}
                  className="gap-2 text-sm"
                >
                  <p>{wallet.name}</p>
                  <span className="font-mono text-xs text-muted-foreground">
                    {wallet.balance ? currencyFormatter.format(wallet.balance) : "-"}
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add wallet</DialogTitle>
          <DialogDescription>
            Add a new wallet to manage transactions and transfers.
          </DialogDescription>
        </DialogHeader>
        <WalletCreateForm />
      </DialogContent>
    </Dialog>
  );
}
