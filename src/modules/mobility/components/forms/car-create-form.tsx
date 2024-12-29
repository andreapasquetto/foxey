"use client";

import { CircularSpinner } from "@/components/circular-spinner";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { XInput } from "@/components/form/x-input";
import { useCarCreateMutation } from "@/modules/mobility/mobility-mutations";
import {
  type CarCreateForm,
  carCreateFormSchema,
} from "@/modules/mobility/schemas/car-create-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export function CarCreateForm() {
  const router = useRouter();
  const form = useForm<CarCreateForm>({
    resolver: zodResolver(carCreateFormSchema),
    defaultValues: {
      year: new Date().getFullYear(),
    },
  });

  const mutation = useCarCreateMutation();

  function onValidSubmit(values: CarCreateForm) {
    mutation.mutate(values, {
      onSuccess: () => {
        router.push("/mobility");
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onValidSubmit)} className="space-y-4 py-2 pb-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <XInput type="number" control={form.control} name="year" step={1} label="Year" />
          <XInput control={form.control} name="make" label="Make" />
          <XInput control={form.control} name="model" label="Model" />
        </div>
        <div className="flex items-center justify-end">
          <Button type="submit" disabled={mutation.isPending}>
            Submit
          </Button>
          {mutation.isPending && <CircularSpinner />}
        </div>
      </form>
    </Form>
  );
}
