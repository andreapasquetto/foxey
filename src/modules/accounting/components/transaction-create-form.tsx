import { CircularSpinner } from "@/components/circular-spinner";
import { DatePicker } from "@/components/date-picker";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { zodResolver } from "@hookform/resolvers/zod";
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
      datetime: new Date(),
      amount: 0,
      description: "",
    },
  });

  const { data: wallets, isFetching: isFetchingWallets } = useWalletsGetAllQuery();
  const { data: categories, isFetching: isFetchingCategories } =
    useTransactionCategoriesGetAllQuery();

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
          name="datetime"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <FormControl>
                <DatePicker value={field.value} setValue={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!props.walletId && (
          <XSelect control={form.control} name="fromWalletId" label="From">
            {availableWallets.map((w) => (
              <XSelectOption key={w.id} value={w.id}>
                {w.name}
              </XSelectOption>
            ))}
          </XSelect>
        )}

        <XSelect control={form.control} name="toWalletId" label="To">
          {availableWallets.map((w) => (
            <XSelectOption key={w.id} value={w.id}>
              {w.name}
            </XSelectOption>
          ))}
        </XSelect>

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

        <XInput control={form.control} name="amount" type="number" label="Amount" />

        <XInput control={form.control} name="description" label="Description" />

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
