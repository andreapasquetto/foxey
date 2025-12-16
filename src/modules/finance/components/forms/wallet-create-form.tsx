"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
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
      <Controller
        control={form.control}
        name="initialAmount"
        render={({ field }) => (
          <Field>
            <FieldLabel>Initial amount</FieldLabel>
            <Input
              {...field}
              type="number"
              value={field.value ?? ""}
              onChange={(e) => {
                const value = e.target.value;
                field.onChange(value.length ? +value : null);
              }}
            />
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
