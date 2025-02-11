"use client";

import { mobilityRoute } from "@/common/routes";
import { CircularSpinner } from "@/components/circular-spinner";
import { DatePicker } from "@/components/form/date-picker";
import { XCheckbox } from "@/components/form/x-checkbox";
import { XInput } from "@/components/form/x-input";
import { XSelect, XSelectOption } from "@/components/form/x-select";
import { CheckboxSkeleton } from "@/components/skeleton/checkbox-skeleton";
import { InputSkeleton } from "@/components/skeleton/input-skeleton";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { useInspectionsCreateMutation } from "@/modules/mobility/mobility-mutations";
import { useCarsGetAllQuery } from "@/modules/mobility/mobility-queries";
import {
  type InspectionCreateForm,
  inspectionCreateFormSchema,
} from "@/modules/mobility/schemas/inspection-create-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { startOfMinute } from "date-fns";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export function InspectionCreateForm() {
  const router = useRouter();

  const form = useForm<InspectionCreateForm>({
    resolver: zodResolver(inspectionCreateFormSchema),
    defaultValues: {
      datetime: startOfMinute(new Date()),
      isSuccessful: true,
    },
  });

  const mutation = useInspectionsCreateMutation();

  const { data: cars } = useCarsGetAllQuery();

  if (!cars) {
    return <ComponentSkeleton />;
  }

  function onValidSubmit(values: InspectionCreateForm) {
    mutation.mutate(values, {
      onSuccess: () => {
        router.push(mobilityRoute);
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onValidSubmit)} className="space-y-4 py-2 pb-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <FormField
            control={form.control}
            name="datetime"
            render={({ field }) => (
              <FormItem className="flex flex-col justify-end">
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <DatePicker value={field.value} setValue={field.onChange} includeTime />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <XSelect control={form.control} name="carId" label="Car">
            {cars.map((car) => (
              <XSelectOption key={car.id} value={car.id}>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-muted-foreground">{car.year}</span>
                  <div>
                    {car.make} {car.model}
                  </div>
                </div>
              </XSelectOption>
            ))}
          </XSelect>
          <XInput
            type="number"
            control={form.control}
            name="odometer"
            step={1}
            label="Odometer"
            placeholder="0"
          />
          <div className="md:mb-3 md:self-end">
            <XCheckbox control={form.control} name="isSuccessful" label="Successful" />
          </div>
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
        <InputSkeleton />
        <InputSkeleton />
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <InputSkeleton />
        <InputSkeleton />
        <InputSkeleton />
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <CheckboxSkeleton />
        <CheckboxSkeleton />
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <InputSkeleton />
        <InputSkeleton />
      </div>
      <InputSkeleton />
      <div className="flex items-center justify-end gap-3">
        <Skeleton className="h-10 w-20 text-right" />
      </div>
    </div>
  );
}
