"use client";

import { CircularSpinner } from "@/components/circular-spinner";
import { DatePicker } from "@/components/date-picker";
import { InputSkeleton } from "@/components/input-skeleton";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { XInput } from "@/components/x-input";
import { XSelect, XSelectOption } from "@/components/x-select";
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
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export function TransactionCreateForm() {
  const router = useRouter();

  const form = useForm<TransactionCreateForm>({
    resolver: zodResolver(transactionCreateFormSchema),
    defaultValues: {
      datetime: new Date(),
      amount: 0,
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
          <XSelect control={form.control} name="categoryId" label="Category">
            {categories.map((category) => (
              <XSelectOption key={category.id} value={category.id}>
                {!category.parent && <div>{category.name}</div>}
                {category.parent && (
                  <div>
                    <span>{category.parent.name}</span>
                    <span className="mx-1">•</span>
                    <span className="text-muted-foreground">{category.name}</span>
                  </div>
                )}
              </XSelectOption>
            ))}
          </XSelect>
          <XSelect control={form.control} name="placeId" label="Place">
            {places.map((place) => (
              <XSelectOption key={place.id} value={place.id}>
                {!place.category && <div>{place.name}</div>}
                {place.category && (
                  <div>
                    <span>{place.category.name}</span>
                    <span className="mx-1">•</span>
                    <span className="text-muted-foreground">{place.name}</span>
                  </div>
                )}
              </XSelectOption>
            ))}
          </XSelect>
        </div>
        <XInput control={form.control} name="amount" type="number" label="Amount" />
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
