"use client";

import { CircularSpinner } from "@/components/circular-spinner";
import { InputSkeleton } from "@/components/input-skeleton";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { XInput } from "@/components/x-input";
import { useHighwayTripCreateMutation } from "@/modules/mobility/mobility-mutations";
import { useCarsGetAllQuery } from "@/modules/mobility/mobility-queries";
import {
  type HighwayTripCreateForm,
  highwayTripCreateFormSchema,
} from "@/modules/mobility/schemas/highway-trip-create-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { startOfMinute } from "date-fns";
import { useForm } from "react-hook-form";

export function HighwayTripCreateForm() {
  const form = useForm<HighwayTripCreateForm>({
    resolver: zodResolver(highwayTripCreateFormSchema),
    defaultValues: {
      datetime: startOfMinute(new Date()),
    },
  });

  const mutation = useHighwayTripCreateMutation();

  const { data: cars } = useCarsGetAllQuery();

  if (!cars) {
    return <ComponentSkeleton />;
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
        <XInput
          type="number"
          control={form.control}
          name="cost"
          step={0.01}
          label="Cost"
          placeholder="0.00"
        />
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <XInput
            type="number"
            control={form.control}
            name="distance"
            step={0.01}
            label="Distance"
            placeholder="0.00"
          />
          <XInput
            type="number"
            control={form.control}
            name="avgSpeed"
            step={1}
            label="Average speed"
            placeholder="0"
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

function ComponentSkeleton() {
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
