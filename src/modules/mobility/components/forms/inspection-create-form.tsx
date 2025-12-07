"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { startOfMinute } from "date-fns";
import { ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { DatePicker } from "@/components/form/date-picker";
import { XCheckbox } from "@/components/form/x-checkbox";
import { XInput } from "@/components/form/x-input";
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
import type { Car } from "@/db/types/mobility";
import { cn } from "@/lib/utils";
import { useInspectionsCreateMutation } from "@/modules/mobility/mobility-mutations";
import {
  type CreateInspectionFormType,
  createInspectionFormSchema,
} from "@/modules/mobility/schemas/create-inspection-form-schema";

export function InspectionCreateForm({ car }: { car: Car }) {
  const form = useForm<CreateInspectionFormType>({
    resolver: zodResolver(createInspectionFormSchema),
    defaultValues: {
      carId: car.id,
      datetime: startOfMinute(new Date()),
      isSuccessful: true,
    },
  });

  const mutation = useInspectionsCreateMutation(car.id);

  function onValidSubmit(values: CreateInspectionFormType) {
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
          <XInput
            type="number"
            control={form.control}
            name="odometer"
            step={1}
            label="Odometer (km)"
            placeholder="0"
          />
          <div className="sm:col-span-full">
            <XCheckbox
              control={form.control}
              name="isSuccessful"
              label="Successful"
            />
          </div>
        </div>
        <div className="flex items-center justify-end gap-1">
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending && <Spinner />}
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
