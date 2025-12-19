"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { startOfMinute } from "date-fns";
import { ChevronsUpDown } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { DatePicker } from "@/components/form/date-picker";
import { XComboboxField } from "@/components/form/x-combobox-field";
import { XNullableTextField } from "@/components/form/x-nullable-text-field";
import { XNumberField } from "@/components/form/x-number-field";
import { XTextField } from "@/components/form/x-text-field";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import type { Wallet } from "@/db/types/finance";
import type { Car } from "@/db/types/mobility";
import { cn } from "@/lib/utils";
import { useHighwayTripsCreateMutation } from "@/modules/mobility/mobility-mutations";
import {
  type CreateHighwayTripFormType,
  createHighwayTripFormSchema,
} from "@/modules/mobility/schemas/create-highway-trip-form-schema";

export function HighwayTripCreateForm({
  car,
  wallets,
}: {
  car: Car;
  wallets: Wallet[];
}) {
  const form = useForm<CreateHighwayTripFormType>({
    resolver: zodResolver(createHighwayTripFormSchema),
    defaultValues: {
      datetime: startOfMinute(new Date()),
      carId: car.id,
      walletId: null,
      placeId: null,
      startingToll: "",
      endingToll: "",
      cost: 0,
      distance: 0,
      avgSpeed: 0,
      description: null,
    },
  });

  const mutation = useHighwayTripsCreateMutation(car.id);

  function onValidSubmit(values: CreateHighwayTripFormType) {
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
        <XComboboxField
          control={form.control}
          name="walletId"
          options={wallets.map((w) => ({ label: w.name, value: w.id }))}
          label="Wallet"
        />
        <XTextField
          control={form.control}
          name="startingToll"
          label="Starting toll"
        />
        <XTextField
          control={form.control}
          name="endingToll"
          label="Ending toll"
        />
        <div className="space-y-6 sm:space-y-0 sm:col-span-full gap-x-2 gap-y-6 sm:grid sm:grid-cols-3">
          <XNumberField
            control={form.control}
            name="cost"
            label="Cost (€)"
            placeholder="0.01"
            step={0.01}
            min={0.01}
          />
          <XNumberField
            control={form.control}
            name="distance"
            label="Distance (km)"
            placeholder="0.1"
            step={0.1}
            min={0.1}
          />
          <XNumberField
            control={form.control}
            name="avgSpeed"
            label="Average speed (km/h)"
            placeholder="0"
            min={1}
          />
        </div>
        <div className="sm:col-span-full">
          <XNullableTextField
            control={form.control}
            name="description"
            label="Description"
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
