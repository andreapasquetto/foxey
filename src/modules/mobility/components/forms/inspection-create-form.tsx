"use client";

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
import { Car } from "@/db/types/mobility";
import { useInspectionsCreateMutation } from "@/modules/mobility/mobility-mutations";
import {
  type InspectionCreateForm,
  inspectionCreateFormSchema,
} from "@/modules/mobility/schemas/inspection-create-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { startOfMinute } from "date-fns";
import { useForm } from "react-hook-form";

export function InspectionCreateForm(props: { cars: Car[]; carId: string }) {
  const { cars, carId } = props;

  const form = useForm<InspectionCreateForm>({
    resolver: zodResolver(inspectionCreateFormSchema),
    defaultValues: {
      carId,
      datetime: startOfMinute(new Date()),
      isSuccessful: true,
    },
  });

  const mutation = useInspectionsCreateMutation(carId);

  function onValidSubmit(values: InspectionCreateForm) {
    mutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onValidSubmit)} className="space-y-4 py-2 pb-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <XSelect control={form.control} name="carId" label="Car" disabled>
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
