"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { DatePicker } from "@/components/form/date-picker";
import { XCheckboxField } from "@/components/form/x-checkbox-field";
import { XNullableTextField } from "@/components/form/x-nullable-text-field";
import { XTextField } from "@/components/form/x-text-field";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { useContactsCreateMutation } from "@/modules/contacts/contacts-mutations";
import {
  type CreateContactFormType,
  createContactFormSchema,
} from "@/modules/contacts/schemas/create-contact-form-schema";

export function ContactCreateForm() {
  const form = useForm<CreateContactFormType>({
    resolver: zodResolver(createContactFormSchema),
    defaultValues: {
      fullName: "",
      subtitle: null,
      isBusiness: false,
      dob: null,
      ignoreDobYear: false,
    },
  });

  const mutation = useContactsCreateMutation();

  function onValidSubmit(values: CreateContactFormType) {
    mutation.mutate(values);
  }

  return (
    <form
      onSubmit={form.handleSubmit(onValidSubmit)}
      onReset={() => form.reset()}
      className="space-y-6 max-w-lg mx-auto"
    >
      <XTextField control={form.control} name="fullName" label="Full name" />
      <XNullableTextField
        control={form.control}
        name="subtitle"
        label="Subtitle"
      />
      <XCheckboxField
        control={form.control}
        name="isBusiness"
        label="Business"
      />
      <Controller
        control={form.control}
        name="dob"
        render={({ field }) => (
          <Field>
            <FieldLabel>Date of Birth</FieldLabel>
            <DatePicker
              value={field.value ?? undefined}
              setValue={(e) => {
                field.onChange(e ?? null);
              }}
            />
          </Field>
        )}
      />
      <XCheckboxField
        control={form.control}
        name="ignoreDobYear"
        label="Ignore year"
      />
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
