"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { startOfMinute } from "date-fns";
import { ChevronsUpDown } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { DatePicker } from "@/components/form/date-picker";
import { XCheckboxField } from "@/components/form/x-checkbox-field";
import { XNumberField } from "@/components/form/x-number-field";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import type { Car } from "@/db/types/mobility";
import { cn } from "@/lib/utils";
import { useInspectionsCreateMutation } from "@/modules/mobility/mobility-mutations";
import {
  type CreateInspectionFormType,
  createInspectionFormSchema,
} from "@/modules/mobility/schemas/create-inspection-form-schema";

export function InspectionCreateForm({ car }: { car: Car }) {
  const form = useForm<CreateInspectionFormType>({
    resolver: zodResolver(createInspectionFormSchema),
    defaultValues: {
      carId: car.id,
      datetime: startOfMinute(new Date()),
      odometer: 0,
      isSuccessful: true,
    },
  });

  const mutation = useInspectionsCreateMutation(car.id);

  function onValidSubmit(values: CreateInspectionFormType) {
    mutation.mutate(values);
  }

  return (
    <form
      onSubmit={form.handleSubmit(onValidSubmit)}
      onReset={() => form.reset()}
      className="space-y-6 mx-auto sm:max-w-xl"
    >
      <div className="flex items-center justify-center">
        <div className="w-full max-w-sm">
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
        </div>
      </div>
      <Separator />
      <div className="grid grid-cols-1 gap-x-2 gap-y-6 sm:grid-cols-2">
        <Controller
          control={form.control}
          name="datetime"
          render={({ field }) => (
            <Field>
              <FieldLabel>Date</FieldLabel>
              <DatePicker
                value={field.value}
                setValue={field.onChange}
                includeTime
              />
            </Field>
          )}
        />
        <XNumberField control={form.control} name="odometer" label="Odometer" />
        <div className="sm:col-span-full">
          <XCheckboxField
            control={form.control}
            name="isSuccessful"
            label="Successful"
          />
        </div>
      </div>
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
