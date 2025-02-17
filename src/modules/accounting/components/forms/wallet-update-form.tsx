"use client";

import { accountingRoute } from "@/common/routes";
import { CircularSpinner } from "@/components/circular-spinner";
import { XInput } from "@/components/form/x-input";
import { InputSkeleton } from "@/components/skeleton/input-skeleton";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useWalletsUpdateMutation } from "@/modules/accounting/accounting-mutations";
import { useWalletsGetByIdQuery } from "@/modules/accounting/accounting-queries";
import { WalletRead } from "@/modules/accounting/schemas/wallet-read-schema";
import {
  type WalletUpdateForm,
  walletUpdateFormSchema,
} from "@/modules/accounting/schemas/wallet-update-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface WalletUpdateFormProps {
  id: string;
}

export function WalletUpdateForm(props: WalletUpdateFormProps) {
  const router = useRouter();
  const query = useWalletsGetByIdQuery(props.id);

  if (!query.data) {
    return <ComponentSkeleton />;
  }

  return (
    <ComponentForm
      wallet={query.data}
      onUpdate={() => {
        router.push(accountingRoute);
      }}
    />
  );
}

interface UpdateFormProps {
  wallet: WalletRead;
  onUpdate: () => void;
}

function ComponentForm(props: UpdateFormProps) {
  const form = useForm<WalletUpdateForm>({
    resolver: zodResolver(walletUpdateFormSchema),
    defaultValues: {
      id: props.wallet.id,
      name: props.wallet.name,
    },
  });

  const mutation = useWalletsUpdateMutation(props.wallet.id);

  function onValidSubmit(values: WalletUpdateForm) {
    mutation.mutate(values, {
      onSuccess: () => {
        props.onUpdate();
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onValidSubmit)} className="space-y-4 py-2 pb-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <XInput control={form.control} name="name" label="Name" />
          <div className="space-y-2">
            <Label htmlFor="initialAmount">Initial amount</Label>
            <Input
              type="number"
              id="initialAmount"
              disabled
              placeholder="0.00"
              readOnly
              step={0.01}
              value={props.wallet.initialAmount}
            />
          </div>
        </div>
        <div className="flex items-center justify-end">
          {mutation.isPending && <CircularSpinner />}
          <Button type="submit" disabled={mutation.isPending}>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}

function ComponentSkeleton() {
  return (
    <div className="space-y-4 py-2 pb-4">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <InputSkeleton />
        <InputSkeleton />
      </div>
      <div className="flex items-center justify-end gap-3">
        <Skeleton className="h-10 w-20 text-right" />
      </div>
    </div>
  );
}
