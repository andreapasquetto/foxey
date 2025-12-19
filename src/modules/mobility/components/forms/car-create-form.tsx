"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { XNumberField } from "@/components/form/x-number-field";
import { XTextField } from "@/components/form/x-text-field";
import { Button } from "@/components/ui/button";
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
      <XNumberField
        control={form.control}
        name="year"
        label="Year"
        min={1900}
      />
      <XTextField control={form.control} name="make" label="Make" />
      <XTextField control={form.control} name="model" label="Model" />
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
