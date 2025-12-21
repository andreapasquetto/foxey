"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { startOfMinute } from "date-fns";
import Decimal from "decimal.js";
import { ChevronsUpDown } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { DatePicker } from "@/components/form/date-picker";
import { XCheckboxField } from "@/components/form/x-checkbox-field";
import { XComboboxField } from "@/components/form/x-combobox-field";
import { XNullableNumberField } from "@/components/form/x-nullable-number-field";
import { XNullableTextField } from "@/components/form/x-nullable-text-field";
import { XNumberField } from "@/components/form/x-number-field";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import type { Tag, TransactionCategory, Wallet } from "@/db/types/finance";
import type { Car } from "@/db/types/mobility";
import type { Place } from "@/db/types/places";
import { cn } from "@/lib/utils";
import { useRefuelingsCreateMutation } from "@/modules/mobility/mobility-mutations";
import {
  type CreateRefuelingFormType,
  createRefuelingFormSchema,
} from "@/modules/mobility/schemas/create-refueling-form-schema";

export function RefuelingCreateForm({
  car,
  wallets,
  categories,
  places,
  tags,
}: {
  car: Car;
  categories: TransactionCategory[];
  wallets: Wallet[];
  places: Place[];
  tags: Tag[];
}) {
  const form = useForm<CreateRefuelingFormType>({
    resolver: zodResolver(createRefuelingFormSchema),
    defaultValues: {
      datetime: startOfMinute(new Date()),
      carId: car.id,
      categoryId: null,
      placeId: null,
      walletId: null,
      tagId: null,
      description: null,
      price: 0,
      quantity: 0,
      cost: 0,
      isFull: true,
      isNecessary: true,
      trip: null,
      odometer: 0,
    },
  });

  const costValue = form.watch("cost");
  const priceValue = form.watch("price");
  const quantityPlaceholder = priceValue
    ? new Decimal(costValue ?? 0).div(priceValue).toDecimalPlaces(2).toString()
    : "0.00";

  const mutation = useRefuelingsCreateMutation(car.id);

  function onValidSubmit(values: CreateRefuelingFormType) {
    mutation.mutate(values);
  }

  return (
    <form
      onSubmit={form.handleSubmit(onValidSubmit)}
      onReset={() => form.reset()}
      className="mx-auto max-w-xl"
    >
      <FieldGroup>
        <Field>
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
        <FieldSet>
          <FieldLegend>Transaction</FieldLegend>
          <FieldGroup>
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
            <XComboboxField
              control={form.control}
              name="categoryId"
              options={categories.map((c) => ({ label: c.name, value: c.id }))}
              label="Category"
            />
            <XComboboxField
              control={form.control}
              name="placeId"
              options={places.map((p) => ({ label: p.name, value: p.id }))}
              label="Place"
            />
            <XComboboxField
              control={form.control}
              name="tagId"
              options={tags.map((t) => ({ label: t.name, value: t.id }))}
              label="Tag"
            />
            <XNullableTextField
              control={form.control}
              name="description"
              label="Description"
            />
          </FieldGroup>
        </FieldSet>
        <FieldSeparator />
        <FieldSet>
          <FieldLegend>Refueling</FieldLegend>
          <FieldGroup>
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
              name="price"
              label="Price (€/L)"
              placeholder="0.001"
              step={0.001}
              min={0.001}
            />
            <XNumberField
              control={form.control}
              name="quantity"
              label="Quantity (L)"
              placeholder={quantityPlaceholder}
              step={0.01}
              min={0.01}
            />
            <XCheckboxField
              control={form.control}
              name="isFull"
              label="Full tank"
            />
            <XCheckboxField
              control={form.control}
              name="isNecessary"
              label="Necessary"
            />
            <XNullableNumberField
              control={form.control}
              name="trip"
              label="Trip (km)"
              placeholder="0.1"
              step={0.1}
              min={0.1}
            />
            <XNumberField
              control={form.control}
              name="odometer"
              label="Odometer (km)"
              min={1}
            />
          </FieldGroup>
        </FieldSet>
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
