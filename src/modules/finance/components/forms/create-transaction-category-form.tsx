"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { XTextField } from "@/components/form/x-text-field";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { useCreateTransactionCategoryMutation } from "@/modules/finance/mutations";
import {
  type CreateTransactionCategoryFormType,
  createTransactionCategoryFormSchema,
} from "@/modules/finance/schemas/create-transaction-category-form-schema";

export function CreateTransactionCategoryForm() {
  const form = useForm<CreateTransactionCategoryFormType>({
    resolver: zodResolver(createTransactionCategoryFormSchema),
    defaultValues: {
      name: "",
    },
  });
  const mutation = useCreateTransactionCategoryMutation();

  function onValidSubmit(values: CreateTransactionCategoryFormType) {
    mutation.mutate(values);
  }

  return (
    <form
      onSubmit={form.handleSubmit(onValidSubmit)}
      onReset={() => form.reset()}
      className="mx-auto max-w-xl"
    >
      <FieldGroup>
        <XTextField control={form.control} name="name" label="Name" />
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
