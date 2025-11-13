"use client";

import { CircularSpinner } from "@/components/circular-spinner";
import { DatePicker } from "@/components/form/date-picker";
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { TransactionCategory, TransactionTemplate, Wallet } from "@/db/types/finance";
import { Place } from "@/db/types/places";
import { cn } from "@/lib/utils";
import { useTransactionsCreateMutation } from "@/modules/finance/finance-mutations";
import {
  type TransactionCreateForm,
  transactionCreateFormSchema,
} from "@/modules/finance/schemas/transaction-create-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { startOfHour } from "date-fns";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

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
  const form = useForm<TransactionCreateForm>({
    resolver: zodResolver(transactionCreateFormSchema),
    defaultValues: {
      datetime: startOfHour(new Date()),
    },
  });

  const [selectedTemplate, setSelectedTemplate] = useState<TransactionTemplate | null>(null);

  function handleTemplateSelect(id: string) {
    if (id === selectedTemplate?.id) {
      form.setValue("categoryId", undefined);
      form.setValue("fromWalletId", undefined);
      form.setValue("toWalletId", undefined);
      form.setValue("placeId", undefined);
      setSelectedTemplate(null);
      return;
    }
    const template = templates.find((t) => t.id === id)!;
    form.setValue("categoryId", template.category?.id ?? undefined);
    form.setValue("fromWalletId", template.from?.id ?? undefined);
    form.setValue("toWalletId", template.to?.id ?? undefined);
    form.setValue("placeId", template.place?.id ?? undefined);
    if (template.amount !== null) {
      form.setValue("amount", Number(template.amount));
    }
    setSelectedTemplate(template);
  }

  const mutation = useTransactionsCreateMutation();

  function onSubmit(values: TransactionCreateForm) {
    mutation.mutate(values);
  }

  return (
    <Form {...form}>
      <div className="flex items-center justify-center">
        <FormItem className="flex flex-col">
          <FormLabel>Template</FormLabel>
          <FormControl>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "h-12 w-[350px] justify-between px-3 py-2 font-normal",
                      !selectedTemplate && "text-muted-foreground",
                    )}
                  >
                    {selectedTemplate
                      ? templates.find((template) => template.id === selectedTemplate.id)?.name
                      : "Select an option"}
                    <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
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
                          <div>
                            <div>{template.name}</div>
                          </div>
                          <Check
                            className={cn(
                              "ml-auto",
                              template.id === selectedTemplate?.id ? "opacity-100" : "opacity-0",
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormMessage />
        </FormItem>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2 pb-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <FormField
            control={form.control}
            name="datetime"
            render={({ field }) => (
              <FormItem className="flex flex-col">
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
            name="categoryId"
            render={({ field }) => (
              <FormItem className="flex flex-col">
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
                          ? categories.find((category) => category.id === field.value)?.name
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
                                  category.id === field.value ? "opacity-100" : "opacity-0",
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
              <FormItem className="flex flex-col">
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
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <FormField
            control={form.control}
            name="fromWalletId"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>From</FormLabel>
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
                          ? wallets.find((wallet) => wallet.id === field.value)?.name
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
                          {wallets.map((wallet) => (
                            <CommandItem
                              value={wallet.name}
                              key={wallet.id}
                              onSelect={() => {
                                form.setValue("fromWalletId", wallet.id);
                              }}
                            >
                              <div className={cn(wallet.isArchived && "text-muted-foreground")}>
                                {wallet.name}
                              </div>
                              <Check
                                className={cn(
                                  "ml-auto",
                                  wallet.id === field.value ? "opacity-100" : "opacity-0",
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
            name="toWalletId"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>To</FormLabel>
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
                          ? wallets.find((wallet) => wallet.id === field.value)?.name
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
                          {wallets.map((wallet) => (
                            <CommandItem
                              value={wallet.name}
                              key={wallet.id}
                              onSelect={() => {
                                form.setValue("toWalletId", wallet.id);
                              }}
                            >
                              <div className={cn(wallet.isArchived && "text-muted-foreground")}>
                                {wallet.name}
                              </div>
                              <Check
                                className={cn(
                                  "ml-auto",
                                  wallet.id === field.value ? "opacity-100" : "opacity-0",
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
            name="amount"
            step={0.01}
            label="Amount"
            placeholder="0.00"
          />
          <div className="md:col-span-2">
            <XInput control={form.control} name="description" label="Description" />
          </div>
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
