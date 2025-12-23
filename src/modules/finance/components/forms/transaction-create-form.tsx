"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { startOfHour } from "date-fns";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { XComboboxField } from "@/components/form/x-combobox-field";
import { XDatePickerField } from "@/components/form/x-date-picker-field";
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
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Spinner } from "@/components/ui/spinner";
import type {
  Tag,
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
  tags,
}: {
  templates: TransactionTemplate[];
  wallets: Wallet[];
  categories: TransactionCategory[];
  places: Place[];
  tags: Tag[];
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
      // TODO: figure out if a transaction can have multiple tags (for now, it's not necessary)
      tagId: null,
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
      className="mx-auto max-w-xl"
    >
      <FieldGroup>
        <Field>
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
        <FieldSeparator />
        <XDatePickerField
          control={form.control}
          name="datetime"
          label="Date and time"
          includeTime
        />
        <XComboboxField
          control={form.control}
          name="categoryId"
          options={categories.map((c) => ({ label: c.name, value: c.id }))}
          label="Category"
        />
        <XComboboxField
          control={form.control}
          name="placeId"
          options={places.map((p) => ({ label: p.name, value: p.id }))}
          label="Place"
        />
        <XComboboxField
          control={form.control}
          name="fromWalletId"
          options={wallets.map((w) => ({ label: w.name, value: w.id }))}
          label="From"
        />
        <XComboboxField
          control={form.control}
          name="toWalletId"
          options={wallets.map((w) => ({ label: w.name, value: w.id }))}
          label="To"
        />
        <XNumberField
          control={form.control}
          name="amount"
          label="Amount"
          placeholder="0.01"
          step={0.01}
          min={0.01}
        />
        <XNullableTextField
          control={form.control}
          name="description"
          label="Description"
        />
        <XComboboxField
          control={form.control}
          name="tagId"
          options={tags.map((t) => ({ label: t.name, value: t.id }))}
          label="Tag"
        />
        <Field orientation="horizontal" className="justify-end">
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
        </Field>
      </FieldGroup>
    </form>
  );
}
