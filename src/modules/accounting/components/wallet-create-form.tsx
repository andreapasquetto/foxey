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
  WalletCreateForm,
  walletCreateFormSchema,
} from "@/modules/accounting/schemas/wallet-create-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function WalletCreateForm() {
  const form = useForm<WalletCreateForm>({
    resolver: zodResolver(walletCreateFormSchema),
    defaultValues: {
      name: "",
      initialBalance: 0,
    },
  });

  function onValidSubmit(values: WalletCreateForm) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onValidSubmit)} className="space-y-4 py-2 pb-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="initialBalance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Initial balance</FormLabel>
              <FormControl>
                <Input {...field} type="number" step={0.01} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
