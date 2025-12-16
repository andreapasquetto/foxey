"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
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
    <form
      onSubmit={form.handleSubmit(onValidSubmit)}
      onReset={() => form.reset()}
      className="space-y-6 mx-auto sm:max-w-xl"
    >
      <Controller
        control={form.control}
        name="name"
        render={({ field }) => (
          <Field>
            <FieldLabel>Name</FieldLabel>
            <Input {...field} type="text" />
          </Field>
        )}
      />
      <Field>
        <FieldLabel>Initial amount</FieldLabel>
        <Input
          type="number"
          value={props.wallet.initialAmount}
          disabled
          readOnly
        />
      </Field>
      <Controller
        control={form.control}
        name="isArchived"
        render={({ field }) => (
          <Field orientation="horizontal">
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
            <FieldLabel htmlFor={field.name}>Archived</FieldLabel>
          </Field>
        )}
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
