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
import { Wallet } from "@/db/types/finance";
import { Car } from "@/db/types/mobility";
import { useHighwayTripsCreateMutation } from "@/modules/mobility/mobility-mutations";
import {
  type HighwayTripCreateForm,
  highwayTripCreateFormSchema,
} from "@/modules/mobility/schemas/highway-trip-create-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { startOfMinute } from "date-fns";
import { useForm } from "react-hook-form";

export function HighwayTripCreateForm(props: { cars: Car[]; wallets: Wallet[]; carId: string }) {
  const { cars, wallets, carId } = props;
  const form = useForm<HighwayTripCreateForm>({
    resolver: zodResolver(highwayTripCreateFormSchema),
    defaultValues: {
      carId,
      datetime: startOfMinute(new Date()),
    },
  });

  const mutation = useHighwayTripsCreateMutation(carId);

  function onValidSubmit(values: HighwayTripCreateForm) {
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

          <XSelect control={form.control} name="walletId" label="Wallet">
            {wallets.map((w) => (
              <XSelectOption key={w.id} value={w.id}>
                {w.name}
              </XSelectOption>
            ))}
          </XSelect>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <XInput control={form.control} name="startingToll" label="Start" />
          <XInput control={form.control} name="endingToll" label="End" />
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <XInput
            type="number"
            control={form.control}
            name="cost"
            step={0.01}
            label="Cost (€)"
            placeholder="0.00"
          />
          <XInput
            type="number"
            control={form.control}
            name="distance"
            step={0.01}
            label="Distance (km)"
            placeholder="0.00"
          />
          <XInput
            type="number"
            control={form.control}
            name="avgSpeed"
            step={1}
            label="Average speed (km/h)"
            placeholder="0"
          />
        </div>
        <XInput control={form.control} name="description" label="Description" />
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
