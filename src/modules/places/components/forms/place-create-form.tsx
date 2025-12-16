"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { XCheckboxField } from "@/components/form/x-checkbox-field";
import { XComboboxField } from "@/components/form/x-combobox-field";
import { XNullableTextField } from "@/components/form/x-nullable-text-field";
import { XTextField } from "@/components/form/x-text-field";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import type { PlaceCategory } from "@/db/types/places";
import { usePlacesCreateMutation } from "@/modules/places/places-mutations";
import {
  type CreatePlaceFormType,
  createPlaceFormSchema,
} from "@/modules/places/schemas/create-place-form-schema";

export function PlaceCreateForm(props: { categories: PlaceCategory[] }) {
  const { categories } = props;
  const form = useForm<CreatePlaceFormType>({
    resolver: zodResolver(createPlaceFormSchema),
    defaultValues: {
      name: "",
      categoryId: null,
      address: null,
      isVisited: false,
    },
  });

  const mutation = usePlacesCreateMutation();

  function onValidSubmit(values: CreatePlaceFormType) {
    mutation.mutate(values);
  }

  return (
    <form
      onSubmit={form.handleSubmit(onValidSubmit)}
      onReset={() => form.reset()}
      className="space-y-6 max-w-lg mx-auto"
    >
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
      <XCheckboxField control={form.control} name="isVisited" label="Visited" />
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
