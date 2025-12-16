"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
import { Spinner } from "@/components/ui/spinner";
import type { Transaction, TransactionCategory } from "@/db/types/finance";
import type { Place } from "@/db/types/places";
import { cn } from "@/lib/utils";
import { useTransactionsUpdateMutation } from "@/modules/finance/finance-mutations";
import {
  type UpdateTransactionFormType,
  updateTransactionFormSchema,
} from "@/modules/finance/schemas/update-transaction-form-schema";

export function TransactionUpdateForm(props: {
  categories: TransactionCategory[];
  places: Place[];
  transaction: Transaction;
}) {
  const { categories, places, transaction } = props;

  const form = useForm<UpdateTransactionFormType>({
    resolver: zodResolver(updateTransactionFormSchema),
    defaultValues: {
      id: transaction.id,
      datetime: transaction.datetime,
      categoryId: transaction.category?.id ?? null,
      placeId: transaction.place?.id ?? null,
      amount: Number(transaction.amount),
      description: transaction.description ?? null,
    },
  });

  const mutation = useTransactionsUpdateMutation();

  function onSubmit(values: UpdateTransactionFormType) {
    mutation.mutate(values);
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      onReset={() => form.reset()}
      className="space-y-6 mx-auto sm:max-w-xl"
    >
      <div className="grid grid-cols-1 gap-x-2 gap-y-6 sm:grid-cols-2">
        <div className="sm:col-span-full">
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
        </div>
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
                      ? categories.find(
                          (category) => category.id === field.value,
                        )?.name
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
          name="placeId"
          render={({ field }) => (
            <Field>
              <FieldLabel>Place</FieldLabel>
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
                      ? places.find((place) => place.id === field.value)?.name
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
                        {places.map((place) => (
                          <CommandItem
                            value={
                              place.category
                                ? `${place.category.name}-${place.name}`
                                : place.name
                            }
                            key={place.id}
                            onSelect={() => {
                              field.onChange(place.id);
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
            </Field>
          )}
        />
        <Field>
          <FieldLabel>From</FieldLabel>
          <Input
            id="fromWalletId"
            disabled
            readOnly
            value={props.transaction.from?.name}
          />
        </Field>
        <Field>
          <FieldLabel>To</FieldLabel>
          <Input
            id="toWalletId"
            disabled
            readOnly
            value={props.transaction.to?.name}
          />
        </Field>
        <div className="sm:col-span-full">
          <Controller
            control={form.control}
            name="amount"
            render={({ field }) => (
              <Field>
                <FieldLabel>Amount</FieldLabel>
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
