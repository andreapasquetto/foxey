"use client";

import { CircularSpinner } from "@/components/circular-spinner";
import { XInput } from "@/components/form/x-input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useWalletsCreateMutation } from "@/modules/finance/finance-mutations";
import {
  createWalletFormSchema,
  CreateWalletFormType,
} from "@/modules/finance/schemas/create-wallet-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function WalletCreateForm() {
  const form = useForm<CreateWalletFormType>({
    resolver: zodResolver(createWalletFormSchema),
  });

  const mutation = useWalletsCreateMutation();

  function onValidSubmit(values: CreateWalletFormType) {
    mutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onValidSubmit)} className="space-y-4 py-2 pb-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <XInput control={form.control} name="name" label="Name" />
          <XInput
            type="number"
            control={form.control}
            name="initialAmount"
            step={0.01}
            label="Initial amount"
            placeholder="0.00"
          />
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
