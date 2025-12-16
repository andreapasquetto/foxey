"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { XNullableNumberField } from "@/components/form/x-nullable-number-field";
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
import type { TransactionCategory, Wallet } from "@/db/types/finance";
import type { Place } from "@/db/types/places";
import { cn } from "@/lib/utils";
import { useTransactionTemplatesCreateMutation } from "@/modules/finance/finance-mutations";
import {
  type CreateTransactionTemplateFormType,
  createTransactionTemplateFormSchema,
} from "@/modules/finance/schemas/create-transaction-template-form-schema";

export function TransactionTemplateCreateForm({
  wallets,
  categories,
  places,
}: {
  wallets: Wallet[];
  categories: TransactionCategory[];
  places: Place[];
}) {
  const form = useForm<CreateTransactionTemplateFormType>({
    resolver: zodResolver(createTransactionTemplateFormSchema),
    defaultValues: {
      name: "",
      categoryId: null,
      placeId: null,
      fromWalletId: null,
      toWalletId: null,
      amount: null,
    },
  });

  const mutation = useTransactionTemplatesCreateMutation();

  function onSubmit(values: CreateTransactionTemplateFormType) {
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
          <XTextField control={form.control} name="name" label="Name" />
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
        <Controller
          control={form.control}
          name="fromWalletId"
          render={({ field }) => (
            <Field>
              <FieldLabel>From</FieldLabel>
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
                            <div
                              className={cn(
                                wallet.isArchived && "text-muted-foreground",
                              )}
                            >
                              {wallet.name}
                            </div>
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
          name="toWalletId"
          render={({ field }) => (
            <Field>
              <FieldLabel>To</FieldLabel>
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
                            <div
                              className={cn(
                                wallet.isArchived && "text-muted-foreground",
                              )}
                            >
                              {wallet.name}
                            </div>
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
        <div className="sm:col-span-full">
          <XNullableNumberField
            control={form.control}
            name="amount"
            label="Amount"
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
