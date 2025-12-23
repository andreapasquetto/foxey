"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { XComboboxField } from "@/components/form/x-combobox-field";
import { XDatePickerField } from "@/components/form/x-date-picker-field";
import { XNullableTextField } from "@/components/form/x-nullable-text-field";
import { XNumberField } from "@/components/form/x-number-field";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import type { Tag, Transaction, TransactionCategory } from "@/db/types/finance";
import type { Place } from "@/db/types/places";
import { useTransactionsUpdateMutation } from "@/modules/finance/finance-mutations";
import {
  type UpdateTransactionFormType,
  updateTransactionFormSchema,
} from "@/modules/finance/schemas/update-transaction-form-schema";

export function TransactionUpdateForm({
  categories,
  places,
  tags,
  transaction,
}: {
  categories: TransactionCategory[];
  places: Place[];
  tags: Tag[];
  transaction: Transaction;
}) {
  const form = useForm<UpdateTransactionFormType>({
    resolver: zodResolver(updateTransactionFormSchema),
    defaultValues: {
      id: transaction.id,
      datetime: transaction.datetime,
      categoryId: transaction.category?.id ?? null,
      placeId: transaction.place?.id ?? null,
      amount: Number(transaction.amount),
      description: transaction.description ?? null,
      // TODO: figure out if a transaction can have multiple tags (for now, it's not necessary)
      tagId: transaction.tags.length ? transaction.tags[0].tag.id : null,
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
      className="mx-auto max-w-xl"
    >
      <FieldGroup>
        <XDatePickerField
          control={form.control}
          name="datetime"
          label="Date and time"
          includeTime
        />
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
            value={transaction.from?.name}
            disabled
            readOnly
          />
        </Field>
        <Field>
          <FieldLabel>To</FieldLabel>
          <Input
            id="toWalletId"
            value={transaction.to?.name}
            disabled
            readOnly
          />
        </Field>
        <XNumberField
          control={form.control}
          name="amount"
          label="Amount"
          placeholder="0.01"
          step={0.01}
          min={0.01}
        />
        <XNullableTextField
          control={form.control}
          name="description"
          label="Description"
        />
        <XComboboxField
          control={form.control}
          name="tagId"
          options={tags.map((t) => ({ label: t.name, value: t.id }))}
          label="Tag"
        />
        <Field orientation="horizontal" className="justify-end">
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
        </Field>
      </FieldGroup>
    </form>
  );
}
