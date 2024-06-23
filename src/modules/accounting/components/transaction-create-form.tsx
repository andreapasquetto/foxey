"use client";

import { currencyFormatter } from "@/common/formatters";
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
import { mockedWallets } from "@/mocks/accounting";
import {
  TransactionCreateForm,
  transactionCreateFormSchema,
} from "@/modules/accounting/schemas/transaction-create-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRightLeft, Minus, Plus } from "lucide-react";
import { useForm } from "react-hook-form";

interface TransactionCreateFormProps {
  walletId: string;
  onSubmit: () => void;
}

export function TransactionCreateForm(props: TransactionCreateFormProps) {
  const availableWallets = mockedWallets.filter((w) => w.id !== props.walletId && w.balance);

  const form = useForm<TransactionCreateForm>({
    resolver: zodResolver(transactionCreateFormSchema),
    defaultValues: {
      wallet: props.walletId,
      datetime: new Date(),
      description: "",
      primaryCategory: "",
      amount: 0,
      secondaryCategory: "",
    },
  });

  function onSubmit(values: TransactionCreateForm) {
    console.log(values);
    props.onSubmit();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2 pb-4">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="datetime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="incoming">
                      <Plus className="mr-1 inline-block h-4 w-4 text-green-500 dark:text-green-400" />{" "}
                      Incoming
                    </SelectItem>
                    <SelectItem value="outgoing">
                      <Minus className="mr-1 inline-block h-4 w-4 text-red-500 dark:text-red-400" />{" "}
                      Outgoing
                    </SelectItem>
                    <SelectItem value="transfer">
                      <ArrowRightLeft className="mr-1 inline-block h-4 w-4 text-muted-foreground" />{" "}
                      Transfer
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {
            <FormField
              control={form.control}
              name="to"
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
                          <span className="ml-2 font-mono text-xs text-muted-foreground">
                            {w.balance ? currencyFormatter.format(w.balance) : "-"}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          }
        </div>

        <div className="space-y-2">
          <FormField
            control={form.control}
            name="primaryCategory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Primary category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="something">Something</SelectItem>
                    <SelectItem value="somethingElse">Something Else</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="secondaryCategory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Secondary category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="something">Something</SelectItem>
                    <SelectItem value="somethingElse">Something Else</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-2">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>amount</FormLabel>
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
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
