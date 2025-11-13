"use client";

import { CircularSpinner } from "@/components/circular-spinner";
import { XInput } from "@/components/form/x-input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useCarsCreateMutation } from "@/modules/mobility/mobility-mutations";
import {
  createCarFormSchema,
  CreateCarFormType,
} from "@/modules/mobility/schemas/create-car-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
      <form onSubmit={form.handleSubmit(onValidSubmit)} className="space-y-4 py-2 pb-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <XInput type="number" control={form.control} name="year" step={1} label="Year" />
          <XInput control={form.control} name="make" label="Make" />
          <XInput control={form.control} name="model" label="Model" />
        </div>
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
