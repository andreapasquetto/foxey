"use client";

import { CircularSpinner } from "@/components/circular-spinner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTransactionCreateMutation } from "@/modules/accounting/accounting-mutations";
import {
  useTransactionCategoriesQuery,
  useWalletsQuery,
} from "@/modules/accounting/accounting-queries";
import {
  type TransactionCreateForm,
  transactionCreateFormSchema,
} from "@/modules/accounting/schemas/transaction-create-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";

interface TransactionCreateFormProps {
  walletId?: string;
  onSubmit: () => void;
}

export function TransactionCreateForm(props: TransactionCreateFormProps) {
  const form = useForm<TransactionCreateForm>({
    resolver: zodResolver(transactionCreateFormSchema),
    defaultValues: {
      fromWalletId: props.walletId,
      date: new Date(),
      amount: 0,
      description: "",
    },
  });

  const { data: wallets, isFetching: isFetchingWallets } = useWalletsQuery();
  const { data: categories, isFetching: isFetchingCategories } = useTransactionCategoriesQuery();

  const mutation = useTransactionCreateMutation();

  if (!wallets || isFetchingWallets || !categories || isFetchingCategories) {
    return <CircularSpinner className="mx-auto" />;
  }

  const availableWallets = wallets.filter((w) => w.id !== props.walletId);

  function onSubmit(values: TransactionCreateForm) {
    mutation.mutate(values, {
      onSuccess: () => {
        props.onSubmit();
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2 pb-4">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input placeholder={format(field.value, "EEE yyyy-MM-dd HH:mm")} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!props.walletId && (
          <FormField
            control={form.control}
            name="fromWalletId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>From</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {availableWallets.map((w) => (
                      <SelectItem key={w.id} value={w.id} className="gap-2 text-sm">
                        {w.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="toWalletId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>To</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {availableWallets.map((w) => (
                    <SelectItem key={w.id} value={w.id} className="gap-2 text-sm">
                      {w.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id} className="gap-2 text-sm">
                      {!category.parent && <div>{category.name}</div>}
                      {category.parent && (
                        <div>
                          <span>{category.parent.name}</span>
                          <span className="mx-1">•</span>
                          <span className="text-muted-foreground">{category.name}</span>
                        </div>
                      )}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input {...field} type="number" step={0.01} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center gap-3">
          <Button type="submit" disabled={mutation.isPending}>
            Submit
          </Button>
          {mutation.isPending && <CircularSpinner />}
        </div>
      </form>
    </Form>
  );
}
