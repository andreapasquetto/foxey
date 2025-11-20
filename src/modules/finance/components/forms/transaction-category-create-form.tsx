"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CircularSpinner } from "@/components/circular-spinner";
import { XInput } from "@/components/form/x-input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useTransactionCategoriesCreateMutation } from "@/modules/finance/finance-mutations";
import {
  type CreateTransactionCategoryFormType,
  createTransactionCategoryFormSchema,
} from "@/modules/finance/schemas/create-transaction-category-form-schema";

export function TransactionCategoryCreateForm() {
  const form = useForm<CreateTransactionCategoryFormType>({
    resolver: zodResolver(createTransactionCategoryFormSchema),
  });
  const mutation = useTransactionCategoriesCreateMutation();

  function onValidSubmit(values: CreateTransactionCategoryFormType) {
    mutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onValidSubmit)}
        className="space-y-6 mx-auto sm:max-w-xl"
      >
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
