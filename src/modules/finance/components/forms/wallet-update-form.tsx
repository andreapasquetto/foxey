"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CircularSpinner } from "@/components/circular-spinner";
import { XCheckbox } from "@/components/form/x-checkbox";
import { XInput } from "@/components/form/x-input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Wallet } from "@/db/types/finance";
import { useWalletsUpdateMutation } from "@/modules/finance/finance-mutations";
import {
  type UpdateWalletFormType,
  updateWalletFormSchema,
} from "@/modules/finance/schemas/update-wallet-form-schema";

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
      <form
        onSubmit={form.handleSubmit(onValidSubmit)}
        className="space-y-6 mx-auto sm:max-w-xl"
      >
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
