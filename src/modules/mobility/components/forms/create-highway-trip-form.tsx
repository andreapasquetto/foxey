"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { startOfMinute } from "date-fns";
import { ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { XComboboxField } from "@/components/form/x-combobox-field";
import { XDatePickerField } from "@/components/form/x-date-picker-field";
import { XNullableTextField } from "@/components/form/x-nullable-text-field";
import { XNumberField } from "@/components/form/x-number-field";
import { XTextField } from "@/components/form/x-text-field";
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
import { cn } from "@/lib/utils";
import { useCreateHighwayTripMutation } from "@/modules/mobility/mutations";
import {
  type CreateHighwayTripFormType,
  createHighwayTripFormSchema,
} from "@/modules/mobility/schemas/create-highway-trip-form-schema";

export function CreateHighwayTripForm({
  car,
  wallets,
  categories,
  tags,
}: {
  car: Car;
  categories: TransactionCategory[];
  wallets: Wallet[];
  tags: Tag[];
}) {
  const form = useForm<CreateHighwayTripFormType>({
    resolver: zodResolver(createHighwayTripFormSchema),
    defaultValues: {
      datetime: startOfMinute(new Date()),
      carId: car.id,
      categoryId: null,
      walletId: null,
      tagId: null,
      description: null,
      startingToll: "",
      endingToll: "",
      cost: 0,
      distance: 0,
      avgSpeed: 0,
    },
  });

  const mutation = useCreateHighwayTripMutation(car.id);

  function onValidSubmit(values: CreateHighwayTripFormType) {
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
            <XDatePickerField
              control={form.control}
              name="datetime"
              label="Date and time"
              includeTime
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
          <FieldLegend>Trip</FieldLegend>
          <FieldGroup>
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
