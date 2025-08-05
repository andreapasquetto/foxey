"use client";

import { CircularSpinner } from "@/components/circular-spinner";
import { XInput } from "@/components/form/x-input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wallet } from "@/db/types/finance";
import { useWalletsUpdateMutation } from "@/modules/finance/finance-mutations";
import {
  type WalletUpdateForm,
  walletUpdateFormSchema,
} from "@/modules/finance/schemas/wallet-update-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function WalletUpdateForm(props: { wallet: Wallet }) {
  const { wallet } = props;
  const form = useForm<WalletUpdateForm>({
    resolver: zodResolver(walletUpdateFormSchema),
    defaultValues: {
      id: wallet.id,
      name: wallet.name,
    },
  });

  const mutation = useWalletsUpdateMutation();

  function onValidSubmit(values: WalletUpdateForm) {
    mutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onValidSubmit)} className="space-y-4 py-2 pb-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <XInput control={form.control} name="name" label="Name" />
          <div className="space-y-2">
            <Label htmlFor="initialAmount">Initial amount</Label>
            <Input
              type="number"
              id="initialAmount"
              disabled
              placeholder="0.00"
              readOnly
              step={0.01}
              value={props.wallet.initialAmount}
            />
          </div>
        </div>
        <div className="flex items-center justify-end gap-3">
          {mutation.isPending && <CircularSpinner />}
          <Button type="submit" disabled={mutation.isPending}>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
