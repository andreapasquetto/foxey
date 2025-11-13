"use client";

import { CircularSpinner } from "@/components/circular-spinner";
import { XCheckbox } from "@/components/form/x-checkbox";
import { XInput } from "@/components/form/x-input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wallet } from "@/db/types/finance";
import { useWalletsUpdateMutation } from "@/modules/finance/finance-mutations";
import {
  updateWalletFormSchema,
  UpdateWalletFormType,
} from "@/modules/finance/schemas/update-wallet-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function WalletUpdateForm(props: { wallet: Wallet }) {
  const { wallet } = props;
  const form = useForm<UpdateWalletFormType>({
    resolver: zodResolver(updateWalletFormSchema),
    defaultValues: {
      id: wallet.id,
      name: wallet.name,
      isArchived: wallet.isArchived,
    },
  });

  const mutation = useWalletsUpdateMutation();

  function onValidSubmit(values: UpdateWalletFormType) {
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
              placeholder="0.00"
              step={0.01}
              value={props.wallet.initialAmount}
              disabled
              readOnly
            />
          </div>
          <XCheckbox control={form.control} name="isArchived" label="Archived" />
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
