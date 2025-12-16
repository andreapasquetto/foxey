"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useCarsCreateMutation } from "@/modules/mobility/mobility-mutations";
import {
  type CreateCarFormType,
  createCarFormSchema,
} from "@/modules/mobility/schemas/create-car-form-schema";

export function CarCreateForm() {
  const form = useForm<CreateCarFormType>({
    resolver: zodResolver(createCarFormSchema),
    defaultValues: {
      year: new Date().getFullYear(),
      make: "",
      model: "",
    },
  });

  const mutation = useCarsCreateMutation();

  function onValidSubmit(values: CreateCarFormType) {
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
        name="year"
        render={({ field }) => (
          <Field>
            <FieldLabel>Year</FieldLabel>
            <Input
              {...field}
              type="number"
              value={field.value}
              onChange={(e) => {
                const value = e.target.value;
                field.onChange(value.length ? +value : NaN);
              }}
            />
          </Field>
        )}
      />
      <Controller
        control={form.control}
        name="make"
        render={({ field }) => (
          <Field>
            <FieldLabel>Make</FieldLabel>
            <Input {...field} type="text" />
          </Field>
        )}
      />
      <Controller
        control={form.control}
        name="model"
        render={({ field }) => (
          <Field>
            <FieldLabel>Model</FieldLabel>
            <Input {...field} type="text" />
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
