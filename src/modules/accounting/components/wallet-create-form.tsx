import { CircularSpinner } from "@/components/circular-spinner";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { XInput } from "@/components/x-input";
import { useWalletCreateMutation } from "@/modules/accounting/accounting-mutations";
import {
  type WalletCreateForm,
  walletCreateFormSchema,
} from "@/modules/accounting/schemas/wallet-create-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface WalletCreateFormProps {
  onSubmit: () => void;
}

export function WalletCreateForm(props: WalletCreateFormProps) {
  const form = useForm<WalletCreateForm>({
    resolver: zodResolver(walletCreateFormSchema),
  });

  const mutation = useWalletCreateMutation();

  function onValidSubmit(values: WalletCreateForm) {
    mutation.mutate(values, {
      onSuccess: () => props.onSubmit(),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onValidSubmit)} className="space-y-4 py-2 pb-4">
        <XInput control={form.control} name="name" label="Name" />

        <XInput
          type="number"
          control={form.control}
          name="initialAmount"
          step={0.01}
          label="Initial amount"
          placeholder="0.00"
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
