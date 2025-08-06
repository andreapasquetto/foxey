"use client";

import { CircularSpinner } from "@/components/circular-spinner";
import { DatePicker } from "@/components/form/date-picker";
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
import { Textarea } from "@/components/ui/textarea";
import { Car } from "@/db/types/mobility";
import { useServicesCreateMutation } from "@/modules/mobility/mobility-mutations";
import {
  type ServiceCreateForm,
  serviceCreateFormSchema,
} from "@/modules/mobility/schemas/service-create-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { startOfMinute } from "date-fns";
import { useForm } from "react-hook-form";

export function ServiceCreateForm(props: { cars: Car[]; carId: string }) {
  const { cars, carId } = props;
  const form = useForm<ServiceCreateForm>({
    resolver: zodResolver(serviceCreateFormSchema),
    defaultValues: {
      carId,
      datetime: startOfMinute(new Date()),
    },
  });

  const mutation = useServicesCreateMutation(carId);

  function onValidSubmit(values: ServiceCreateForm) {
    mutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onValidSubmit)} className="space-y-4 py-2 pb-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
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
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea {...field} className="font-mono" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
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
