"use client";

import { CircularSpinner } from "@/components/circular-spinner";
import { XInput } from "@/components/form/x-input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useTransactionCategoriesCreateMutation } from "@/modules/finance/finance-mutations";
import {
  type TransactionCategoryCreateForm,
  transactionCategoryCreateFormSchema,
} from "@/modules/finance/schemas/transaction-category-create-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function TransactionCategoryCreateForm() {
  const form = useForm<TransactionCategoryCreateForm>({
    resolver: zodResolver(transactionCategoryCreateFormSchema),
  });
  const mutation = useTransactionCategoriesCreateMutation();

  function onValidSubmit(values: TransactionCategoryCreateForm) {
    mutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onValidSubmit)} className="space-y-4 py-2 pb-4">
        <XInput control={form.control} name="name" label="Name" />
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
