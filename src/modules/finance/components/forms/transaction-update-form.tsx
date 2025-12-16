"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { DatePicker } from "@/components/form/date-picker";
import { XComboboxField } from "@/components/form/x-combobox-field";
import { XNullableTextField } from "@/components/form/x-nullable-text-field";
import { XNumberField } from "@/components/form/x-number-field";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import type { Transaction, TransactionCategory } from "@/db/types/finance";
import type { Place } from "@/db/types/places";
import { useTransactionsUpdateMutation } from "@/modules/finance/finance-mutations";
import {
  type UpdateTransactionFormType,
  updateTransactionFormSchema,
} from "@/modules/finance/schemas/update-transaction-form-schema";

export function TransactionUpdateForm(props: {
  categories: TransactionCategory[];
  places: Place[];
  transaction: Transaction;
}) {
  const { categories, places, transaction } = props;

  const form = useForm<UpdateTransactionFormType>({
    resolver: zodResolver(updateTransactionFormSchema),
    defaultValues: {
      id: transaction.id,
      datetime: transaction.datetime,
      categoryId: transaction.category?.id ?? null,
      placeId: transaction.place?.id ?? null,
      amount: Number(transaction.amount),
      description: transaction.description ?? null,
    },
  });

  const mutation = useTransactionsUpdateMutation();

  function onSubmit(values: UpdateTransactionFormType) {
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
          <Controller
            control={form.control}
            name="datetime"
            render={({ field }) => (
              <Field>
                <FieldLabel>Date</FieldLabel>
                <DatePicker
                  value={field.value}
                  setValue={field.onChange}
                  includeTime
                />
              </Field>
            )}
          />
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
          options={places.map((c) => ({ label: c.name, value: c.id }))}
          label="Place"
        />
        <Field>
          <FieldLabel>From</FieldLabel>
          <Input
            id="fromWalletId"
            value={props.transaction.from?.name}
            disabled
            readOnly
          />
        </Field>
        <Field>
          <FieldLabel>To</FieldLabel>
          <Input
            id="toWalletId"
            value={props.transaction.to?.name}
            disabled
            readOnly
          />
        </Field>
        <div className="sm:col-span-full">
          <XNumberField control={form.control} name="amount" label="Amount" />
        </div>
        <div className="sm:col-span-full">
          <XNullableTextField
            control={form.control}
            name="description"
            label="Description"
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
