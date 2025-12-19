"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { XComboboxField } from "@/components/form/x-combobox-field";
import { XNullableNumberField } from "@/components/form/x-nullable-number-field";
import { XTextField } from "@/components/form/x-text-field";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import type { TransactionCategory, Wallet } from "@/db/types/finance";
import type { Place } from "@/db/types/places";
import { useTransactionTemplatesCreateMutation } from "@/modules/finance/finance-mutations";
import {
  type CreateTransactionTemplateFormType,
  createTransactionTemplateFormSchema,
} from "@/modules/finance/schemas/create-transaction-template-form-schema";

export function TransactionTemplateCreateForm({
  wallets,
  categories,
  places,
}: {
  wallets: Wallet[];
  categories: TransactionCategory[];
  places: Place[];
}) {
  const form = useForm<CreateTransactionTemplateFormType>({
    resolver: zodResolver(createTransactionTemplateFormSchema),
    defaultValues: {
      name: "",
      categoryId: null,
      placeId: null,
      fromWalletId: null,
      toWalletId: null,
      amount: null,
    },
  });

  const mutation = useTransactionTemplatesCreateMutation();

  function onSubmit(values: CreateTransactionTemplateFormType) {
    mutation.mutate(values);
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      onReset={() => form.reset()}
      className="space-y-6 mx-auto sm:max-w-xl"
    >
      <div className="grid grid-cols-1 gap-x-2 gap-y-6 sm:grid-cols-2">
        <div className="sm:col-span-full">
          <XTextField control={form.control} name="name" label="Name" />
        </div>
        <XComboboxField
          control={form.control}
          name="categoryId"
          options={categories.map((c) => ({ label: c.name, value: c.id }))}
          label="Category"
        />
        <XComboboxField
          control={form.control}
          name="placeId"
          options={places.map((p) => ({ label: p.name, value: p.id }))}
          label="Place"
        />
        <XComboboxField
          control={form.control}
          name="fromWalletId"
          options={wallets.map((w) => ({ label: w.name, value: w.id }))}
          label="From"
        />
        <XComboboxField
          control={form.control}
          name="toWalletId"
          options={wallets.map((w) => ({ label: w.name, value: w.id }))}
          label="To"
        />
        <div className="sm:col-span-full">
          <XNullableNumberField
            control={form.control}
            name="amount"
            label="Amount"
            placeholder="0.01"
            step={0.01}
          />
        </div>
      </div>
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
