"use client";

import { CircularSpinner } from "@/components/circular-spinner";
import { InputSkeleton } from "@/components/input-skeleton";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { XInput } from "@/components/x-input";
import { useHighwayTripCreateMutation } from "@/modules/cars/cars-mutations";
import { useCarsGetAllQuery } from "@/modules/cars/cars-queries";
import {
  type HighwayTripCreateForm,
  highwayTripCreateFormSchema,
} from "@/modules/cars/schemas/highway-trip-create-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function HighwayTripCreateForm() {
  const form = useForm<HighwayTripCreateForm>({
    resolver: zodResolver(highwayTripCreateFormSchema),
    defaultValues: {
      datetime: new Date(),
      distance: 0,
      cost: 0,
      avgSpeed: 0,
    },
  });

  const mutation = useHighwayTripCreateMutation();

  const { data: cars } = useCarsGetAllQuery();

  if (!cars) {
    return (
      <div className="space-y-4 py-2 pb-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <InputSkeleton />
          <InputSkeleton />
        </div>

        <InputSkeleton />

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

  function onValidSubmit(values: HighwayTripCreateForm) {
    mutation.mutate(values, { onSuccess: () => {} });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onValidSubmit)} className="space-y-4 py-2 pb-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <XInput control={form.control} name="startingToll" label="Start" />
          <XInput control={form.control} name="endingToll" label="End" />
        </div>
        <XInput type="number" step={0.01} control={form.control} name="cost" label="Cost" />
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <XInput
            type="number"
            step={0.01}
            control={form.control}
            name="distance"
            label="Distance"
          />
          <XInput
            type="number"
            step={0.01}
            control={form.control}
            name="avgSpeed"
            label="Average speed"
          />
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
