"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Spinner } from "@/components/ui/spinner";
import type { Place, PlaceCategory } from "@/db/types/places";
import { cn } from "@/lib/utils";
import { usePlacesUpdateMutation } from "@/modules/places/places-mutations";
import {
  type UpdatePlaceFormType,
  updatePlaceFormSchema,
} from "@/modules/places/schemas/update-place-form-schema";

export function PlaceUpdateForm(props: {
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
      <Controller
        control={form.control}
        name="name"
        render={({ field }) => (
          <Field>
            <FieldLabel>Name</FieldLabel>
            <Input {...field} type="text" />
          </Field>
        )}
      />
      <Controller
        control={form.control}
        name="address"
        render={({ field }) => (
          <Field>
            <FieldLabel>Address</FieldLabel>
            <Input
              {...field}
              type="text"
              value={field.value ?? ""}
              onChange={(e) => {
                const value = e.target.value;
                field.onChange(value.length ? value : null);
              }}
            />
          </Field>
        )}
      />
      <Controller
        control={form.control}
        name="isVisited"
        render={({ field }) => (
          <Field orientation="horizontal">
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
            <FieldLabel htmlFor={field.name}>Visited</FieldLabel>
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
