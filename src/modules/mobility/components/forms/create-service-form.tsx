"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { startOfMinute } from "date-fns";
import { ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { XDatePickerField } from "@/components/form/x-date-picker-field";
import { XNullableTextareaField } from "@/components/form/x-nullable-textarea-field";
import { XNumberField } from "@/components/form/x-number-field";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import type { Car } from "@/db/types/mobility";
import { cn } from "@/lib/utils";
import { useCreateServiceMutation } from "@/modules/mobility/mutations";
import {
  type CreateServiceFormType,
  createServiceFormSchema,
} from "@/modules/mobility/schemas/create-service-form-schema";

export function CreateServiceForm({ car }: { car: Car }) {
  const form = useForm<CreateServiceFormType>({
    resolver: zodResolver(createServiceFormSchema),
    defaultValues: {
      carId: car.id,
      datetime: startOfMinute(new Date()),
      odometer: 0,
      notes: null,
    },
  });

  const mutation = useCreateServiceMutation(car.id);

  function onValidSubmit(values: CreateServiceFormType) {
    mutation.mutate(values);
  }

  return (
    <form
      onSubmit={form.handleSubmit(onValidSubmit)}
      onReset={() => form.reset()}
      className="mx-auto max-w-xl"
    >
      <FieldGroup>
        <Field className="w-full max-w-sm">
          <FieldLabel>Car</FieldLabel>
          <Button
            variant="outline"
            role="combobox"
            className={cn("justify-between px-3 py-2 font-normal")}
            disabled
          >
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-muted-foreground">
                {car.year}
              </span>
              <div>
                {car.make} {car.model}
              </div>
            </div>
            <ChevronsUpDown className="ml-2 shrink-0 opacity-50" />
          </Button>
        </Field>
        <FieldSeparator />
        <FieldGroup>
          <XDatePickerField
            control={form.control}
            name="datetime"
            label="Date and time"
            includeTime
          />
          <XNumberField
            control={form.control}
            name="odometer"
            label="Odometer (km)"
            min={1}
          />
          <XNullableTextareaField
            control={form.control}
            name="notes"
            label="Notes"
          />
        </FieldGroup>
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
