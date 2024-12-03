"use client";

import { CheckboxSkeleton } from "@/components/checkbox-skeleton";
import { CircularSpinner } from "@/components/circular-spinner";
import { DatePicker } from "@/components/date-picker";
import { InputSkeleton } from "@/components/input-skeleton";
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { XCheckbox } from "@/components/x-checkbox";
import { XInput } from "@/components/x-input";
import { XSelect, XSelectOption } from "@/components/x-select";
import { cn } from "@/lib/utils";
import { useRefuelingCreateMutation } from "@/modules/mobility/mobility-mutations";
import { useCarsGetAllQuery } from "@/modules/mobility/mobility-queries";
import {
  type RefuelingCreateForm,
  refuelingCreateFormSchema,
} from "@/modules/mobility/schemas/refueling-create-form-schema";
import { usePlacesGetAllQuery } from "@/modules/places/places-queries";
import { zodResolver } from "@hookform/resolvers/zod";
import { startOfMinute } from "date-fns";
import { Check, ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export function RefuelingCreateForm() {
  const router = useRouter();

  const form = useForm<RefuelingCreateForm>({
    resolver: zodResolver(refuelingCreateFormSchema),
    defaultValues: {
      datetime: startOfMinute(new Date()),
    },
  });

  const mutation = useRefuelingCreateMutation();

  const { data: cars } = useCarsGetAllQuery();
  const { data: places } = usePlacesGetAllQuery();

  if (!cars || !places) {
    return <ComponentSkeleton />;
  }

  function onValidSubmit(values: RefuelingCreateForm) {
    mutation.mutate(values, {
      onSuccess: () => {
        router.push("/mobility");
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onValidSubmit)} className="space-y-4 py-2 pb-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <XSelect control={form.control} name="carId" label="Car">
            {cars.map((car) => (
              <XSelectOption key={car.id} value={car.id}>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-muted-foreground">{car.year}</span>
                  <div>
                    {car.make} {car.model}
                  </div>
                </div>
              </XSelectOption>
            ))}
          </XSelect>
          <FormField
            control={form.control}
            name="datetime"
            render={({ field }) => (
              <FormItem className="flex flex-col justify-end">
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <DatePicker value={field.value} setValue={field.onChange} includeTime />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="placeId"
            render={({ field }) => (
              <FormItem className="flex flex-col justify-end">
                <FormLabel>Place</FormLabel>
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
                          ? places.find((place) => place.id === field.value)?.name
                          : "Select an option"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <Command>
                      <CommandInput placeholder="Search..." />
                      <CommandList>
                        <CommandEmpty>No option found.</CommandEmpty>
                        <CommandGroup>
                          {places.map((place) => (
                            <CommandItem
                              value={
                                place.category ? `${place.category.name}-${place.name}` : place.name
                              }
                              key={place.id}
                              onSelect={() => {
                                form.setValue("placeId", place.id);
                              }}
                            >
                              {place.name}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  place.id === field.value ? "opacity-100" : "opacity-0",
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
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <XInput
            type="number"
            control={form.control}
            name="cost"
            step={0.01}
            label="Cost"
            placeholder="0.00"
          />
          <XInput
            type="number"
            control={form.control}
            name="quantity"
            step={0.01}
            label="Quantity"
            placeholder="0.00"
          />
          <XInput
            type="number"
            control={form.control}
            name="price"
            step={0.001}
            label="Price"
            placeholder="0.000"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <XCheckbox control={form.control} name="isFull" label="Full Tank" />
          <XCheckbox control={form.control} name="isNecessary" label="Necessary" />
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <XInput
            type="number"
            control={form.control}
            name="trip"
            step={0.01}
            label="Trip"
            placeholder="0.0"
          />
          <XInput
            type="number"
            control={form.control}
            name="odometer"
            step={1}
            label="Odometer"
            placeholder="0"
          />
        </div>
        <div className="flex items-center justify-end gap-3">
          {mutation.isPending && <CircularSpinner />}
          <Button type="submit" disabled={mutation.isPending}>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}

function ComponentSkeleton() {
  return (
    <div className="space-y-4 py-2 pb-4">
      <InputSkeleton />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <InputSkeleton />
        <InputSkeleton />
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <InputSkeleton />
        <InputSkeleton />
        <InputSkeleton />
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <CheckboxSkeleton />
        <CheckboxSkeleton />
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <InputSkeleton />
        <InputSkeleton />
      </div>
      <div className="flex items-center justify-end gap-3">
        <Skeleton className="h-10 w-20 text-right" />
      </div>
    </div>
  );
}