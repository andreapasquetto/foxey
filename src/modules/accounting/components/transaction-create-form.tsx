"use client";

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
import { XInput } from "@/components/x-input";
import { XSelect, XSelectOption } from "@/components/x-select";
import { cn } from "@/lib/utils";
import { useTransactionCreateMutation } from "@/modules/accounting/accounting-mutations";
import {
  useTransactionCategoriesGetAllQuery,
  useWalletsGetAllQuery,
} from "@/modules/accounting/accounting-queries";
import {
  type TransactionCreateForm,
  transactionCreateFormSchema,
} from "@/modules/accounting/schemas/transaction-create-form-schema";
import { usePlacesGetAllQuery } from "@/modules/places/places-queries";
import { zodResolver } from "@hookform/resolvers/zod";
import { startOfMinute } from "date-fns";
import { Check, ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export function TransactionCreateForm() {
  const router = useRouter();

  const form = useForm<TransactionCreateForm>({
    resolver: zodResolver(transactionCreateFormSchema),
    defaultValues: {
      datetime: startOfMinute(new Date()),
    },
  });

  const mutation = useTransactionCreateMutation();

  const { data: wallets } = useWalletsGetAllQuery();
  const { data: categories } = useTransactionCategoriesGetAllQuery();
  const { data: places } = usePlacesGetAllQuery();

  if (!wallets || !categories || !places) {
    return (
      <div className="space-y-4 py-2 pb-4">
        <InputSkeleton />
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <InputSkeleton />
          <InputSkeleton />
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <InputSkeleton />
          <InputSkeleton />
        </div>
        <InputSkeleton />
        <InputSkeleton />
        <div className="flex items-center justify-end gap-3">
          <Skeleton className="h-10 w-20 text-right" />
        </div>
      </div>
    );
  }

  function onSubmit(values: TransactionCreateForm) {
    mutation.mutate(values, {
      onSuccess: () => {
        router.push("/accounting");
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2 pb-4">
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
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <XSelect control={form.control} name="fromWalletId" label="From">
            {wallets.map((w) => (
              <XSelectOption key={w.id} value={w.id}>
                {w.name}
              </XSelectOption>
            ))}
          </XSelect>
          <XSelect control={form.control} name="toWalletId" label="To">
            {wallets.map((w) => (
              <XSelectOption key={w.id} value={w.id}>
                {w.name}
              </XSelectOption>
            ))}
          </XSelect>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="flex flex-col justify-end">
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
                          {categories.map((category) => (
                            <CommandItem
                              value={
                                category.parent
                                  ? `${category.parent.name}-${category.name}`
                                  : category.name
                              }
                              key={category.id}
                              onSelect={() => {
                                form.setValue("categoryId", category.id);
                              }}
                            >
                              {!category.parent && <div>{category.name}</div>}
                              {category.parent && (
                                <div>
                                  <span>{category.parent.name}</span>
                                  <span className="mx-1">•</span>
                                  <span className="text-muted-foreground">{category.name}</span>
                                </div>
                              )}
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
        <XInput
          type="number"
          control={form.control}
          name="amount"
          step={0.01}
          label="Amount"
          placeholder="0.00"
        />
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
