"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { XCheckbox } from "@/components/form/x-checkbox";
import { XInput } from "@/components/form/x-input";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
      categoryId: place.category?.id,
      address: place.address ?? undefined,
      isVisited: place.isVisited,
    },
  });

  const mutation = usePlacesUpdateMutation();

  function onValidSubmit(values: UpdatePlaceFormType) {
    mutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onValidSubmit)}
        className="space-y-6 max-w-lg mx-auto"
      >
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "justify-between px-3 py-2 font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value
                        ? categories.find(
                            (category) => category.id === field.value,
                          )?.name
                        : "Select an option"}
                      <ChevronsUpDown className="ml-2 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
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
                              form.setValue("categoryId", category.id);
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
              <FormMessage />
            </FormItem>
          )}
        />
        <XInput control={form.control} name="name" label="Name" />
        <XInput control={form.control} name="address" label="Address" />
        <XCheckbox control={form.control} name="isVisited" label="Visited" />
        <div className="flex items-center justify-end gap-3">
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending && <Spinner />}
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
