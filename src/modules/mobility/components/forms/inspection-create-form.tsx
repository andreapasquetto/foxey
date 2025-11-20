"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { startOfMinute } from "date-fns";
import { useForm } from "react-hook-form";
import { CircularSpinner } from "@/components/circular-spinner";
import { DatePicker } from "@/components/form/date-picker";
import { XCheckbox } from "@/components/form/x-checkbox";
import { XInput } from "@/components/form/x-input";
import { XSelect, XSelectOption } from "@/components/form/x-select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { Car } from "@/db/types/mobility";
import { useInspectionsCreateMutation } from "@/modules/mobility/mobility-mutations";
import {
  type CreateInspectionFormType,
  createInspectionFormSchema,
} from "@/modules/mobility/schemas/create-inspection-form-schema";

export function InspectionCreateForm(props: { cars: Car[]; carId: string }) {
  const { cars, carId } = props;

  const form = useForm<CreateInspectionFormType>({
    resolver: zodResolver(createInspectionFormSchema),
    defaultValues: {
      carId,
      datetime: startOfMinute(new Date()),
      isSuccessful: true,
    },
  });

  const mutation = useInspectionsCreateMutation(carId);

  function onValidSubmit(values: CreateInspectionFormType) {
    mutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onValidSubmit)}
        className="space-y-6 mx-auto sm:max-w-xl"
      >
        <div className="grid grid-cols-1 gap-x-2 gap-y-6 sm:grid-cols-2">
          <XSelect control={form.control} name="carId" label="Car" disabled>
            {cars.map((car) => (
              <XSelectOption key={car.id} value={car.id}>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-muted-foreground">
                    {car.year}
                  </span>
                  <div>
                    {car.make} {car.model}
                  </div>
                </div>
              </XSelectOption>
            ))}
          </XSelect>
          <FormField
            control={form.control}
            name="datetime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <DatePicker
                    value={field.value}
                    setValue={field.onChange}
                    includeTime
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="sm:col-span-full">
            <XInput
              type="number"
              control={form.control}
              name="odometer"
              step={1}
              label="Odometer (km)"
              placeholder="0"
            />
          </div>
          <div className="sm:col-span-full">
            <XCheckbox
              control={form.control}
              name="isSuccessful"
              label="Successful"
            />
          </div>
        </div>
        <div className="flex items-center justify-end gap-1">
          {mutation.isPending && <CircularSpinner />}
          <Button type="submit" disabled={mutation.isPending}>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
