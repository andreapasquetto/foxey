"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  HighwayTripCreateForm,
  highwayTripCreateFormSchema,
} from "@/modules/cars/schemas/highway-trip-create-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface HighwayTripCreateFormProps {
  carId: string;
  onSubmit: () => void;
}

export function HighwayTripCreateForm(props: HighwayTripCreateFormProps) {
  const form = useForm<HighwayTripCreateForm>({
    resolver: zodResolver(highwayTripCreateFormSchema),
    defaultValues: {
      car: props.carId,
      start: "",
      end: "",
      distance: 0,
      cost: 0,
      avgSpeed: 0,
    },
  });

  function onValidSubmit(values: HighwayTripCreateForm) {
    console.log(values);
    props.onSubmit();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onValidSubmit)} className="space-y-4 py-2 pb-4">
        <FormField
          control={form.control}
          name="start"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="end"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="distance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Distance</FormLabel>
              <FormControl>
                <Input {...field} type="number" step={0.01} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cost"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cost</FormLabel>
              <FormControl>
                <Input {...field} type="number" step={0.01} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="avgSpeed"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avg. speed</FormLabel>
              <FormControl>
                <Input {...field} type="number" step={0.01} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
