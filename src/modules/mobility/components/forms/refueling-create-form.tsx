"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { startOfMinute } from "date-fns";
import Decimal from "decimal.js";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { CircularSpinner } from "@/components/circular-spinner";
import { DatePicker } from "@/components/form/date-picker";
import { XCheckbox } from "@/components/form/x-checkbox";
import { XInput } from "@/components/form/x-input";
import { XSelect, XSelectOption } from "@/components/form/x-select";
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
import type { Wallet } from "@/db/types/finance";
import type { Car } from "@/db/types/mobility";
import type { Place } from "@/db/types/places";
import { cn } from "@/lib/utils";
import { useRefuelingsCreateMutation } from "@/modules/mobility/mobility-mutations";
import {
  type CreateRefuelingFormType,
  createRefuelingFormSchema,
} from "@/modules/mobility/schemas/create-refueling-form-schema";

export function RefuelingCreateForm(props: {
  cars: Car[];
  wallets: Wallet[];
  places: Place[];
  carId: string;
}) {
  const { cars, wallets, places, carId } = props;
  const form = useForm<CreateRefuelingFormType>({
    resolver: zodResolver(createRefuelingFormSchema),
    defaultValues: {
      carId,
      datetime: startOfMinute(new Date()),
      isFull: true,
      isNecessary: true,
    },
  });

  const costValue = form.watch("cost");
  const priceValue = form.watch("price");
  const quantityPlaceholder = priceValue
    ? new Decimal(costValue ?? 0).div(priceValue).toDecimalPlaces(2).toString()
    : "0.00";

  const mutation = useRefuelingsCreateMutation(carId);

  function onValidSubmit(values: CreateRefuelingFormType) {
    mutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onValidSubmit)}
        className="space-y-4 py-2 pb-4"
      >
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <XSelect control={form.control} name="carId" label="Car" disabled>
            {cars.map((car) => (
              <XSelectOption key={car.id} value={car.id}>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-muted-foreground">
                    {car.year}
                  </span>
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
                  <DatePicker
                    value={field.value}
                    setValue={field.onChange}
                    includeTime
                  />
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
                          ? places.find((place) => place.id === field.value)
                              ?.name
                          : "Select an option"}
                        <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
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
                                place.category
                                  ? `${place.category.name}-${place.name}`
                                  : place.name
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
                                  place.id === field.value
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
          <XSelect control={form.control} name="walletId" label="Wallet">
            {wallets.map((w) => (
              <XSelectOption key={w.id} value={w.id}>
                {w.name}
              </XSelectOption>
            ))}
          </XSelect>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <XInput
            type="number"
            control={form.control}
            name="cost"
            step={0.01}
            label="Cost (€)"
            placeholder="0.00"
          />
          <XInput
            type="number"
            control={form.control}
            name="price"
            step={0.001}
            label="Price (€/L)"
            placeholder="0.000"
          />
          <XInput
            type="number"
            control={form.control}
            name="quantity"
            step={0.01}
            label="Quantity (L)"
            placeholder={quantityPlaceholder}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <XCheckbox control={form.control} name="isFull" label="Full Tank" />
          <XCheckbox
            control={form.control}
            name="isNecessary"
            label="Necessary"
          />
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <XInput
            type="number"
            control={form.control}
            name="trip"
            step={0.01}
            label="Trip (km)"
            placeholder="0.0"
          />
          <XInput
            type="number"
            control={form.control}
            name="odometer"
            step={1}
            label="Odometer (km)"
            placeholder="0"
          />
        </div>
        <XInput control={form.control} name="description" label="Description" />
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
