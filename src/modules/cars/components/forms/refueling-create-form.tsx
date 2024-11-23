"use client";

import { CheckboxSkeleton } from "@/components/checkbox-skeleton";
import { CircularSpinner } from "@/components/circular-spinner";
import { DatePicker } from "@/components/date-picker";
import { InputSkeleton } from "@/components/input-skeleton";
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
import { XCheckbox } from "@/components/x-checkbox";
import { XInput } from "@/components/x-input";
import { XSelect, XSelectOption } from "@/components/x-select";
import { useRefuelingCreateMutation } from "@/modules/cars/cars-mutations";
import { useCarsGetAllQuery } from "@/modules/cars/cars-queries";
import {
  type RefuelingCreateForm,
  refuelingCreateFormSchema,
} from "@/modules/cars/schemas/refueling-create-form-schema";
import { usePlacesGetAllQuery } from "@/modules/places/places-queries";
import { zodResolver } from "@hookform/resolvers/zod";
import { startOfMinute } from "date-fns";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export function RefuelingCreateForm() {
  const router = useRouter();

  const form = useForm<RefuelingCreateForm>({
    resolver: zodResolver(refuelingCreateFormSchema),
    defaultValues: {
      datetime: startOfMinute(new Date()),
    },
  });

  const mutation = useRefuelingCreateMutation();

  const { data: cars } = useCarsGetAllQuery();
  const { data: places } = usePlacesGetAllQuery();

  if (!cars || !places) {
    return <ComponentSkeleton />;
  }

  function onValidSubmit(values: RefuelingCreateForm) {
    mutation.mutate(values, {
      onSuccess: () => {
        router.push("/cars");
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onValidSubmit)} className="space-y-4 py-2 pb-4">
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
          <XSelect control={form.control} name="placeId" label="Place">
            {places.map((place) => (
              <XSelectOption key={place.id} value={place.id}>
                {!place.category && <div>{place.name}</div>}
                {place.category && (
                  <div>
                    <span>{place.category.name}</span>
                    <span className="mx-1">•</span>
                    <span className="text-muted-foreground">{place.name}</span>
                  </div>
                )}
              </XSelectOption>
            ))}
          </XSelect>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <XInput
            type="number"
            control={form.control}
            name="cost"
            step={0.01}
            label="Cost"
            placeholder="0.00"
          />
          <XInput
            type="number"
            control={form.control}
            name="quantity"
            step={0.01}
            label="Quantity"
            placeholder="0.00"
          />
          <XInput
            type="number"
            control={form.control}
            name="price"
            step={0.001}
            label="Price"
            placeholder="0.000"
          />
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <XCheckbox control={form.control} name="isFull" label="Full Tank" />
          <XCheckbox control={form.control} name="isNecessary" label="Necessary" />
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <XInput
            type="number"
            control={form.control}
            name="trip"
            step={0.01}
            label="Trip"
            placeholder="0.0"
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
      <InputSkeleton />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
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
      <div className="flex items-center justify-end gap-3">
        <Skeleton className="h-10 w-20 text-right" />
      </div>
    </div>
  );
}
