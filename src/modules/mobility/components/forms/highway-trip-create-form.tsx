"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { startOfMinute } from "date-fns";
import { Check, ChevronsUpDown } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { DatePicker } from "@/components/form/date-picker";
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
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import type { Wallet } from "@/db/types/finance";
import type { Car } from "@/db/types/mobility";
import { cn } from "@/lib/utils";
import { useHighwayTripsCreateMutation } from "@/modules/mobility/mobility-mutations";
import {
  type CreateHighwayTripFormType,
  createHighwayTripFormSchema,
} from "@/modules/mobility/schemas/create-highway-trip-form-schema";

export function HighwayTripCreateForm({
  car,
  wallets,
}: {
  car: Car;
  wallets: Wallet[];
}) {
  const form = useForm<CreateHighwayTripFormType>({
    resolver: zodResolver(createHighwayTripFormSchema),
    defaultValues: {
      datetime: startOfMinute(new Date()),
      carId: car.id,
      walletId: null,
      placeId: null,
      startingToll: "",
      endingToll: "",
      cost: 0,
      distance: 0,
      avgSpeed: 0,
      description: null,
    },
  });

  const mutation = useHighwayTripsCreateMutation(car.id);

  function onValidSubmit(values: CreateHighwayTripFormType) {
    mutation.mutate(values);
  }

  return (
    <form
      onSubmit={form.handleSubmit(onValidSubmit)}
      onReset={() => form.reset()}
      className="space-y-6 mx-auto sm:max-w-xl"
    >
      <div className="flex items-center justify-center">
        <div className="w-full max-w-sm">
          <Field className="w-full max-w-sm">
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
        </div>
      </div>
      <Separator />
      <div className="grid grid-cols-1 gap-x-2 gap-y-6 sm:grid-cols-2">
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
        <Controller
          control={form.control}
          name="walletId"
          render={({ field }) => (
            <Field>
              <FieldLabel>Wallet</FieldLabel>
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
                      ? wallets.find((wallet) => wallet.id === field.value)
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
                        {wallets.map((wallet) => (
                          <CommandItem
                            value={wallet.name}
                            key={wallet.id}
                            onSelect={() => {
                              field.onChange(wallet.id);
                            }}
                          >
                            <div>{wallet.name}</div>
                            <Check
                              className={cn(
                                "ml-auto",
                                wallet.id === field.value
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
          name="startingToll"
          render={({ field }) => (
            <Field>
              <FieldLabel>Starting toll</FieldLabel>
              <Input {...field} type="text" />
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="endingToll"
          render={({ field }) => (
            <Field>
              <FieldLabel>Ending toll</FieldLabel>
              <Input {...field} type="text" />
            </Field>
          )}
        />
        <div className="space-y-6 sm:space-y-0 sm:col-span-full gap-x-2 gap-y-6 sm:grid sm:grid-cols-3">
          <Controller
            control={form.control}
            name="cost"
            render={({ field }) => (
              <Field>
                <FieldLabel>Cost</FieldLabel>
                <Input
                  {...field}
                  type="number"
                  value={field.value}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value.length ? +value : NaN);
                  }}
                />
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="distance"
            render={({ field }) => (
              <Field>
                <FieldLabel>Distance</FieldLabel>
                <Input
                  {...field}
                  type="number"
                  value={field.value}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value.length ? +value : NaN);
                  }}
                />
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="avgSpeed"
            render={({ field }) => (
              <Field>
                <FieldLabel>Avg. speed</FieldLabel>
                <Input
                  {...field}
                  type="number"
                  value={field.value}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value.length ? +value : NaN);
                  }}
                />
              </Field>
            )}
          />
        </div>
        <div className="sm:col-span-full">
          <Controller
            control={form.control}
            name="description"
            render={({ field }) => (
              <Field>
                <FieldLabel>Description</FieldLabel>
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
        </div>
      </div>
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
