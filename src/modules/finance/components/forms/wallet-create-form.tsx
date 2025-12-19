"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { XNullableNumberField } from "@/components/form/x-nullable-number-field";
import { XTextField } from "@/components/form/x-text-field";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useWalletsCreateMutation } from "@/modules/finance/finance-mutations";
import {
  type CreateWalletFormType,
  createWalletFormSchema,
} from "@/modules/finance/schemas/create-wallet-form-schema";

export function WalletCreateForm() {
  const form = useForm<CreateWalletFormType>({
    resolver: zodResolver(createWalletFormSchema),
    defaultValues: {
      name: "",
      initialAmount: null,
    },
  });

  const mutation = useWalletsCreateMutation();

  function onValidSubmit(values: CreateWalletFormType) {
    mutation.mutate(values);
  }

  return (
    <form
      onSubmit={form.handleSubmit(onValidSubmit)}
      onReset={() => form.reset()}
      className="space-y-6 mx-auto sm:max-w-xl"
    >
      <XTextField control={form.control} name="name" label="Name" />
      <XNullableNumberField
        control={form.control}
        name="initialAmount"
        label="Initial amount"
        placeholder="0.01"
        step={0.01}
      />
      <div className="flex items-center justify-end gap-2">
        <Button
          type="reset"
          variant="outline"
          disabled={!form.formState.isDirty || mutation.isPending}
        >
          Reset
        </Button>
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending && <Spinner />}
          Submit
        </Button>
      </div>
    </form>
  );
}
