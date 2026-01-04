"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { XNumberField } from "@/components/form/x-number-field";
import { XTextField } from "@/components/form/x-text-field";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { useCreateCarMutation } from "@/modules/mobility/mutations";
import {
  type CreateCarFormType,
  createCarFormSchema,
} from "@/modules/mobility/schemas/create-car-form-schema";

export function CreateCarForm() {
  const form = useForm<CreateCarFormType>({
    resolver: zodResolver(createCarFormSchema),
    defaultValues: {
      year: new Date().getFullYear(),
      make: "",
      model: "",
    },
  });

  const mutation = useCreateCarMutation();

  function onValidSubmit(values: CreateCarFormType) {
    mutation.mutate(values);
  }

  return (
    <form
      onSubmit={form.handleSubmit(onValidSubmit)}
      onReset={() => form.reset()}
      className="max-w-lg mx-auto"
    >
      <FieldGroup>
        <XNumberField
          control={form.control}
          name="year"
          label="Year"
          min={1900}
        />
        <XTextField control={form.control} name="make" label="Make" />
        <XTextField control={form.control} name="model" label="Model" />
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
