"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { XCheckboxField } from "@/components/form/x-checkbox-field";
import { XTextField } from "@/components/form/x-text-field";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import type { Wallet } from "@/db/types/finance";
import { useUpdateWalletMutation } from "@/modules/finance/mutations";
import {
  type UpdateWalletFormType,
  updateWalletFormSchema,
} from "@/modules/finance/schemas/update-wallet-form-schema";

export function UpdateWalletForm(props: { wallet: Wallet }) {
  const { wallet } = props;
  const form = useForm<UpdateWalletFormType>({
    resolver: zodResolver(updateWalletFormSchema),
    defaultValues: {
      id: wallet.id,
      name: wallet.name,
      isArchived: wallet.isArchived,
    },
  });

  const mutation = useUpdateWalletMutation();

  function onValidSubmit(values: UpdateWalletFormType) {
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
        <Field>
          <FieldLabel>Initial amount</FieldLabel>
          <Input
            type="number"
            value={props.wallet.initialAmount}
            disabled
            readOnly
          />
        </Field>
        <XCheckboxField
          control={form.control}
          name="isArchived"
          label="Archived"
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
