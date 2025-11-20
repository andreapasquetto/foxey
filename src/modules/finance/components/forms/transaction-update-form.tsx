"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
      categoryId: transaction.category?.id,
      placeId: transaction.place?.id,
      amount: Number(transaction.amount),
      description: transaction.description ?? undefined,
    },
  });

  const mutation = useTransactionsUpdateMutation();

  function onSubmit(values: UpdateTransactionFormType) {
    mutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 mx-auto sm:max-w-xl"
      >
        <div className="grid grid-cols-1 gap-x-2 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-full">
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
          </div>
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
                        <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="p-0" align="end">
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
                        <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="p-0" align="end">
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
          <div className="space-y-2">
            <Label htmlFor="fromWalletId">From</Label>
            <Input
              id="fromWalletId"
              disabled
              readOnly
              value={props.transaction.from?.name}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="toWalletId">To</Label>
            <Input
              id="toWalletId"
              disabled
              readOnly
              value={props.transaction.to?.name}
            />
          </div>
          <div className="sm:col-span-full">
            <XInput
              type="number"
              control={form.control}
              name="amount"
              step={0.01}
              label="Amount"
              placeholder="0.00"
            />
          </div>
          <div className="sm:col-span-full">
            <XInput
              control={form.control}
              name="description"
              label="Description"
            />
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
