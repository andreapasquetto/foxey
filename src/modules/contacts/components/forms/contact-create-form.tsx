"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { DatePicker } from "@/components/form/date-picker";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
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
      <Controller
        control={form.control}
        name="fullName"
        render={({ field }) => (
          <Field>
            <FieldLabel>Full name</FieldLabel>
            <Input {...field} type="text" />
          </Field>
        )}
      />
      <Controller
        control={form.control}
        name="subtitle"
        render={({ field }) => (
          <Field>
            <FieldLabel>Subtitle</FieldLabel>
            <Input
              {...field}
              type="text"
              value={field.value ?? ""}
              onChange={(e) => {
                const value = e.target.value;
                field.onChange(value.length ? value : null);
              }}
            />
          </Field>
        )}
      />
      <Controller
        control={form.control}
        name="isBusiness"
        render={({ field }) => (
          <Field orientation="horizontal">
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
            <FieldLabel htmlFor={field.name}>Business</FieldLabel>
          </Field>
        )}
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
      <Controller
        control={form.control}
        name="ignoreDobYear"
        render={({ field }) => (
          <Field orientation="horizontal">
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
            <FieldLabel htmlFor={field.name}>Ignore year</FieldLabel>
          </Field>
        )}
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
