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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Wallet, mockedWallets } from "@/mocks/accounting";
import { CheckIcon, ChevronsUpDown, CirclePlus } from "lucide-react";
import { useState } from "react";

interface WalletSwitcher {
  selectedWallet: Wallet;
  onSelectWallet: (wallet: Wallet) => void;
}

export function WalletSwitcher(props: WalletSwitcher) {
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
            {props.selectedWallet.name}
            <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[250px] p-0">
          <Command>
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
                      props.selectedWallet.id === wallet.id ? "opacity-100" : "opacity-0",
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
        <div>
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="initialBalance">Initial balance</Label>
              <Input id="initialBalance" type="number" />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowNewWalletDialog(false)}>
            Cancel
          </Button>
          <Button type="submit">Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
