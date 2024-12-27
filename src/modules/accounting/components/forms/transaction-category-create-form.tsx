"use client";

import { CircularSpinner } from "@/components/circular-spinner";
import { InputSkeleton } from "@/components/input-skeleton";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { XInput } from "@/components/x-input";
import { XSelect, XSelectOption } from "@/components/x-select";
import { useTransactionCategoryCreateMutation } from "@/modules/accounting/accounting-mutations";
import { useTransactionCategoriesGetAllWithoutParentQuery } from "@/modules/accounting/accounting-queries";
import {
  type TransactionCategoryCreateForm,
  transactionCategoryCreateFormSchema,
} from "@/modules/accounting/schemas/transaction-category-create-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export function TransactionCategoryCreateForm() {
  const router = useRouter();
  const form = useForm<TransactionCategoryCreateForm>({
    resolver: zodResolver(transactionCategoryCreateFormSchema),
  });
  const mutation = useTransactionCategoryCreateMutation();
  const parentCategoriesQuery = useTransactionCategoriesGetAllWithoutParentQuery();

  if (!parentCategoriesQuery.data) {
    return (
      <div className="space-y-4 py-2 pb-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <InputSkeleton />
          <InputSkeleton />
        </div>
        <div className="flex items-center justify-end gap-3">
          <Skeleton className="h-10 w-20 text-right" />
        </div>
      </div>
    );
  }

  function onValidSubmit(values: TransactionCategoryCreateForm) {
    mutation.mutate(values, {
      onSuccess: () => {
        router.push("/accounting/categories");
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onValidSubmit)} className="space-y-4 py-2 pb-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <XSelect
            control={form.control}
            name="parentId"
            label="Parent category"
            disabled={!parentCategoriesQuery.data.length}
          >
            {parentCategoriesQuery.data.map((category) => (
              <XSelectOption key={category.id} value={category.id}>
                {category.name}
              </XSelectOption>
            ))}
          </XSelect>
          <XInput control={form.control} name="name" label="Name" />
        </div>
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
