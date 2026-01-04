"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { XCheckboxField } from "@/components/form/x-checkbox-field";
import { XComboboxField } from "@/components/form/x-combobox-field";
import { XNullableTextField } from "@/components/form/x-nullable-text-field";
import { XTextField } from "@/components/form/x-text-field";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import type { Place, PlaceCategory } from "@/db/types/places";
import { usePlacesUpdateMutation } from "@/modules/places/mutations";
import {
  type UpdatePlaceFormType,
  updatePlaceFormSchema,
} from "@/modules/places/schemas/update-place-form-schema";

export function UpdatePlaceForm(props: {
  categories: PlaceCategory[];
  place: Place;
}) {
  const { categories, place } = props;
  const form = useForm<UpdatePlaceFormType>({
    resolver: zodResolver(updatePlaceFormSchema),
    defaultValues: {
      id: place.id,
      name: place.name,
      categoryId: place.category?.id ?? null,
      address: place.address ?? null,
      isVisited: place.isVisited,
    },
  });

  const mutation = usePlacesUpdateMutation();

  function onValidSubmit(values: UpdatePlaceFormType) {
    mutation.mutate(values);
  }

  return (
    <form
      onSubmit={form.handleSubmit(onValidSubmit)}
      onReset={() => form.reset()}
      className="max-w-lg mx-auto"
    >
      <FieldGroup>
        <XComboboxField
          control={form.control}
          name="categoryId"
          options={categories.map((c) => ({ label: c.name, value: c.id }))}
          label="Category"
        />
        <XTextField control={form.control} name="name" label="Name" />
        <XNullableTextField
          control={form.control}
          name="address"
          label="Address"
        />
        <XCheckboxField
          control={form.control}
          name="isVisited"
          label="Visited"
        />
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
