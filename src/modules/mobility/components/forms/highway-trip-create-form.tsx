"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { startOfMinute } from "date-fns";
import { ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
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
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import type { Wallet } from "@/db/types/finance";
import type { Car } from "@/db/types/mobility";
import { cn } from "@/lib/utils";
import { useHighwayTripsCreateMutation } from "@/modules/mobility/mobility-mutations";
import {
  type CreateHighwayTripFormType,
  createHighwayTripFormSchema,
} from "@/modules/mobility/schemas/create-highway-trip-form-schema";

export function HighwayTripCreateForm({
  car,
  wallets,
}: {
  car: Car;
  wallets: Wallet[];
}) {
  const form = useForm<CreateHighwayTripFormType>({
    resolver: zodResolver(createHighwayTripFormSchema),
    defaultValues: {
      carId: car.id,
      datetime: startOfMinute(new Date()),
    },
  });

  const mutation = useHighwayTripsCreateMutation(car.id);

  function onValidSubmit(values: CreateHighwayTripFormType) {
    mutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onValidSubmit)}
        className="space-y-6 mx-auto sm:max-w-xl"
      >
        <div className="flex items-center justify-center">
          <div className="w-full max-w-sm">
            <FormItem className="w-full max-w-sm">
              <FormLabel>Car</FormLabel>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn("justify-between px-3 py-2 font-normal")}
                  disabled
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-muted-foreground">
                      {car.year}
                    </span>
                    <div>
                      {car.make} {car.model}
                    </div>
                  </div>
                  <ChevronsUpDown className="ml-2 shrink-0 opacity-50" />
                </Button>
              </FormControl>
              <FormMessage />
            </FormItem>
          </div>
        </div>
        <Separator />
        <div className="grid grid-cols-1 gap-x-2 gap-y-6 sm:grid-cols-2">
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
          <XSelect control={form.control} name="walletId" label="Wallet">
            {wallets.map((w) => (
              <XSelectOption key={w.id} value={w.id}>
                {w.name}
              </XSelectOption>
            ))}
          </XSelect>
          <XInput control={form.control} name="startingToll" label="Start" />
          <XInput control={form.control} name="endingToll" label="End" />
          <div className="space-y-6 sm:space-y-0 sm:col-span-full gap-x-2 gap-y-6 sm:grid sm:grid-cols-3">
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
          <div className="sm:col-span-full">
            <XInput
              control={form.control}
              name="description"
              label="Description"
            />
          </div>
        </div>
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
