"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { XInput } from "@/components/form/x-input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import { useWalletsCreateMutation } from "@/modules/finance/finance-mutations";
import {
  type CreateWalletFormType,
  createWalletFormSchema,
} from "@/modules/finance/schemas/create-wallet-form-schema";

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
      <form
        onSubmit={form.handleSubmit(onValidSubmit)}
        className="space-y-6 mx-auto sm:max-w-xl"
      >
        <XInput control={form.control} name="name" label="Name" />
        <XInput
          type="number"
          control={form.control}
          name="initialAmount"
          step={0.01}
          label="Initial amount"
          placeholder="0.00"
        />
        <div className="flex items-center justify-end gap-3">
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending && <Spinner />}
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
