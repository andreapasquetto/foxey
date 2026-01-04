"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { XNullableNumberField } from "@/components/form/x-nullable-number-field";
import { XTextField } from "@/components/form/x-text-field";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { useCreateWalletMutation } from "@/modules/finance/mutations";
import {
  type CreateWalletFormType,
  createWalletFormSchema,
} from "@/modules/finance/schemas/create-wallet-form-schema";

export function CreateWalletForm() {
  const form = useForm<CreateWalletFormType>({
    resolver: zodResolver(createWalletFormSchema),
    defaultValues: {
      name: "",
      initialAmount: null,
    },
  });

  const mutation = useCreateWalletMutation();

  function onValidSubmit(values: CreateWalletFormType) {
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
        <XNullableNumberField
          control={form.control}
          name="initialAmount"
          label="Initial amount"
          placeholder="0.01"
          step={0.01}
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
