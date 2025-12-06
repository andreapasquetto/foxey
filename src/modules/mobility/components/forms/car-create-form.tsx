"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { XInput } from "@/components/form/x-input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import { useCarsCreateMutation } from "@/modules/mobility/mobility-mutations";
import {
  type CreateCarFormType,
  createCarFormSchema,
} from "@/modules/mobility/schemas/create-car-form-schema";

export function CarCreateForm() {
  const form = useForm<CreateCarFormType>({
    resolver: zodResolver(createCarFormSchema),
    defaultValues: {
      year: new Date().getFullYear(),
    },
  });

  const mutation = useCarsCreateMutation();

  function onValidSubmit(values: CreateCarFormType) {
    mutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onValidSubmit)}
        className="space-y-6 max-w-lg mx-auto"
      >
        <XInput
          type="number"
          control={form.control}
          name="year"
          step={1}
          label="Year"
        />
        <XInput control={form.control} name="make" label="Make" />
        <XInput control={form.control} name="model" label="Model" />
        <div className="flex items-center justify-end gap-3">
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending && <Spinner />}
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
