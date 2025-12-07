"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { startOfMinute } from "date-fns";
import Decimal from "decimal.js";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
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
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import type { TransactionCategory, Wallet } from "@/db/types/finance";
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
}: {
  car: Car;
  wallets: Wallet[];
  categories: TransactionCategory[];
  places: Place[];
}) {
  const form = useForm<CreateRefuelingFormType>({
    resolver: zodResolver(createRefuelingFormSchema),
    defaultValues: {
      carId: car.id,
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

  const mutation = useRefuelingsCreateMutation(car.id);

  function onValidSubmit(values: CreateRefuelingFormType) {
    mutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onValidSubmit)}
        className="space-y-6 mx-auto sm:max-w-xl"
      >
        <div className="flex items-center justify-center">
          <div className="w-full max-w-sm">
            <FormItem className="w-full max-w-sm">
              <FormLabel>Car</FormLabel>
              <FormControl>
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
              </FormControl>
              <FormMessage />
            </FormItem>
          </div>
        </div>
        <Separator />
        <div className="grid grid-cols-1 gap-x-2 gap-y-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="datetime"
            render={({ field }) => (
              <FormItem>
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
          <XSelect control={form.control} name="walletId" label="Wallet">
            {wallets.map((w) => (
              <XSelectOption key={w.id} value={w.id}>
                {w.name}
              </XSelectOption>
            ))}
          </XSelect>
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
          <FormField
            control={form.control}
            name="placeId"
            render={({ field }) => (
              <FormItem>
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
          <div className="space-y-6 sm:space-y-0 sm:col-span-full gap-x-2 gap-y-6 sm:grid sm:grid-cols-3">
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
          <XCheckbox control={form.control} name="isFull" label="Full Tank" />
          <XCheckbox
            control={form.control}
            name="isNecessary"
            label="Necessary"
          />
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
          <div className="sm:col-span-full">
            <XInput
              control={form.control}
              name="description"
              label="Description"
            />
          </div>
        </div>
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
