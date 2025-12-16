"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { XCheckboxField } from "@/components/form/x-checkbox-field";
import { XNullableTextField } from "@/components/form/x-nullable-text-field";
import { XTextField } from "@/components/form/x-text-field";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Spinner } from "@/components/ui/spinner";
import type { PlaceCategory } from "@/db/types/places";
import { cn } from "@/lib/utils";
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
      <Controller
        control={form.control}
        name="categoryId"
        render={({ field }) => (
          <Field>
            <FieldLabel>Category</FieldLabel>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "justify-between px-3 py-2 font-normal",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  {field.value
                    ? categories.find((category) => category.id === field.value)
                        ?.name
                    : "Select an option"}
                  <ChevronsUpDown className="ml-2 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Command>
                  <CommandInput placeholder="Search..." />
                  <CommandList>
                    <CommandEmpty>No option found.</CommandEmpty>
                    <CommandGroup>
                      {categories.map((category) => (
                        <CommandItem
                          value={category.name}
                          key={category.id}
                          onSelect={() => {
                            field.onChange(category.id);
                          }}
                        >
                          <div>{category.name}</div>
                          <Check
                            className={cn(
                              "ml-auto",
                              category.id === field.value
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </Field>
        )}
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
