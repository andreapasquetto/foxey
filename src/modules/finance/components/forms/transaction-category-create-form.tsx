"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { XTextField } from "@/components/form/x-text-field";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useTransactionCategoriesCreateMutation } from "@/modules/finance/finance-mutations";
import {
  type CreateTransactionCategoryFormType,
  createTransactionCategoryFormSchema,
} from "@/modules/finance/schemas/create-transaction-category-form-schema";

export function TransactionCategoryCreateForm() {
  const form = useForm<CreateTransactionCategoryFormType>({
    resolver: zodResolver(createTransactionCategoryFormSchema),
    defaultValues: {
      name: "",
    },
  });
  const mutation = useTransactionCategoriesCreateMutation();

  function onValidSubmit(values: CreateTransactionCategoryFormType) {
    mutation.mutate(values);
  }

  return (
    <form
      onSubmit={form.handleSubmit(onValidSubmit)}
      onReset={() => form.reset()}
      className="space-y-6 mx-auto sm:max-w-xl"
    >
      <XTextField control={form.control} name="name" label="Name" />
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
