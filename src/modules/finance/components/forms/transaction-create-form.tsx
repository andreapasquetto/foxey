"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { startOfHour } from "date-fns";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { DatePicker } from "@/components/form/date-picker";
import { XNullableTextField } from "@/components/form/x-nullable-text-field";
import { XNumberField } from "@/components/form/x-number-field";
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
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import type {
  TransactionCategory,
  TransactionTemplate,
  Wallet,
} from "@/db/types/finance";
import type { Place } from "@/db/types/places";
import { cn } from "@/lib/utils";
import { useTransactionsCreateMutation } from "@/modules/finance/finance-mutations";
import {
  type CreateTransactionFormType,
  createTransactionFormSchema,
} from "@/modules/finance/schemas/create-transaction-form-schema";

export function TransactionCreateForm({
  templates,
  wallets,
  categories,
  places,
}: {
  templates: TransactionTemplate[];
  wallets: Wallet[];
  categories: TransactionCategory[];
  places: Place[];
}) {
  const form = useForm<CreateTransactionFormType>({
    resolver: zodResolver(createTransactionFormSchema),
    defaultValues: {
      datetime: startOfHour(new Date()),
      categoryId: null,
      placeId: null,
      fromWalletId: null,
      toWalletId: null,
      amount: 0.01,
      description: null,
    },
  });

  const [selectedTemplate, setSelectedTemplate] =
    useState<TransactionTemplate | null>(null);

  function handleTemplateSelect(id: string) {
    if (id === selectedTemplate?.id) {
      form.reset();
      setSelectedTemplate(null);
      return;
    }
    const template = templates.find((t) => t.id === id)!;
    setSelectedTemplate(template);
    form.setValue("categoryId", template.category?.id ?? null);
    form.setValue("placeId", template.place?.id ?? null);
    form.setValue("fromWalletId", template.from?.id ?? null);
    form.setValue("toWalletId", template.to?.id ?? null);
    form.setValue("amount", template.amount ? Number(template.amount) : 0.01);
  }

  const mutation = useTransactionsCreateMutation();

  function onSubmit(values: CreateTransactionFormType) {
    mutation.mutate(values);
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      onReset={() => form.reset()}
      className="space-y-6 mx-auto sm:max-w-xl"
    >
      <div className="flex items-center justify-center">
        <Field className="w-full max-w-sm">
          <FieldLabel>Template</FieldLabel>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className={cn(
                  "justify-between px-3 py-2 font-normal",
                  !selectedTemplate && "text-muted-foreground",
                )}
              >
                {selectedTemplate
                  ? templates.find(
                      (template) => template.id === selectedTemplate.id,
                    )?.name
                  : "Select an option"}
                <ChevronsUpDown className="ml-2 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[350px] p-0">
              <Command id="templateId">
                <CommandInput placeholder="Search..." />
                <CommandList>
                  <CommandEmpty>No option found.</CommandEmpty>
                  <CommandGroup>
                    {templates.map((template) => (
                      <CommandItem
                        value={template.id}
                        key={template.id}
                        onSelect={(id) => handleTemplateSelect(id)}
                      >
                        <div>{template.name}</div>
                        <Check
                          className={cn(
                            "ml-auto",
                            template.id === selectedTemplate?.id
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
      </div>
      <Separator />
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
          <XNumberField control={form.control} name="amount" label="Amount" />
        </div>
        <div className="sm:col-span-full">
          <XNullableTextField
            control={form.control}
            name="description"
            label="Description"
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
