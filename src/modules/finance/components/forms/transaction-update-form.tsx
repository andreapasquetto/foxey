"use client";

import { financeRoute } from "@/common/routes";
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Transaction } from "@/db/types/finance";
import { cn } from "@/lib/utils";
import { useTransactionsUpdateMutation } from "@/modules/finance/finance-mutations";
import {
  useTransactionCategoriesGetAllQuery,
  useTransactionsGetByIdQuery,
} from "@/modules/finance/finance-queries";
import { TransactionFormSkeleton } from "@/modules/finance/components/skeletons/transaction-form-skeleton";
import {
  type TransactionUpdateForm,
  transactionUpdateFormSchema,
} from "@/modules/finance/schemas/transaction-update-form-schema";
import { usePlacesGetAllQuery } from "@/modules/places/places-queries";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface TransactionUpdateFormProps {
  id: string;
}

export function TransactionUpdateForm(props: TransactionUpdateFormProps) {
  const router = useRouter();
  const query = useTransactionsGetByIdQuery(props.id);

  if (!query.data) {
    return <TransactionFormSkeleton />;
  }

  return (
    <UpdateForm
      transaction={query.data}
      onUpdate={() => {
        router.push(financeRoute);
      }}
    />
  );
}

interface UpdateFormProps {
  transaction: Transaction;
  onUpdate: () => void;
}

function UpdateForm(props: UpdateFormProps) {
  const form = useForm<TransactionUpdateForm>({
    resolver: zodResolver(transactionUpdateFormSchema),
    defaultValues: {
      id: props.transaction.id,
      datetime: props.transaction.datetime,
      categoryId: props.transaction.category?.id,
      placeId: props.transaction.place?.id,
      amount: Number(props.transaction.amount),
      description: props.transaction.description ?? undefined,
    },
  });

  const mutation = useTransactionsUpdateMutation(props.transaction.id);

  const { data: categories } = useTransactionCategoriesGetAllQuery();
  const { data: places } = usePlacesGetAllQuery();

  if (!categories || !places) {
    return <TransactionFormSkeleton />;
  }

  function onSubmit(values: TransactionUpdateForm) {
    mutation.mutate(values, {
      onSuccess: () => {
        props.onUpdate();
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
          <div className="space-y-2">
            <Label htmlFor="fromWalletId">From</Label>
            <Input id="fromWalletId" disabled readOnly value={props.transaction.from?.name} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="toWalletId">To</Label>
            <Input id="toWalletId" disabled readOnly value={props.transaction.to?.name} />
          </div>
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
                  <PopoverContent className="p-0" align="end">
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
