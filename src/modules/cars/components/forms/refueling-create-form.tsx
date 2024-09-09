import { CircularSpinner } from "@/components/circular-spinner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { XInput } from "@/components/x-input";
import { useCreateRefuelingMutation } from "@/modules/cars/cars-mutations";
import {
  type RefuelingCreateForm,
  refuelingCreateFormSchema,
} from "@/modules/cars/schemas/refueling-create-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface RefuelingCreateFormProps {
  carId: string;
  onSubmit: () => void;
}

export function RefuelingCreateForm(props: RefuelingCreateFormProps) {
  const form = useForm<RefuelingCreateForm>({
    resolver: zodResolver(refuelingCreateFormSchema),
    defaultValues: {
      carId: props.carId,
      place: "",
      cost: 0,
      quantity: 0,
      price: 0,
      trip: 0,
      odometer: 0,
    },
  });

  const mutation = useCreateRefuelingMutation();

  function onValidSubmit(values: RefuelingCreateForm) {
    mutation.mutate(values, {
      onSuccess: () => props.onSubmit(),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onValidSubmit)} className="space-y-4 py-2 pb-4">
        <XInput control={form.control} name="place" label="Place" />

        <XInput type="number" step={0.01} control={form.control} name="cost" label="Cost" />

        <XInput type="number" step={0.01} control={form.control} name="quantity" label="Quantity" />

        <XInput type="number" step={0.001} control={form.control} name="price" label="Price" />

        <div className="space-y-2">
          <FormField
            control={form.control}
            name="isFull"
            render={({ field }) => (
              <FormItem className="flex items-end gap-3">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel>Full Tank</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isNecessary"
            render={({ field }) => (
              <FormItem className="flex items-end gap-3">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel>Necessary</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <XInput type="number" step={0.01} control={form.control} name="trip" label="Trip" />

        <XInput type="number" step={1} control={form.control} name="odometer" label="Odometer" />

        <div className="flex items-center gap-3">
          <Button type="submit" disabled={mutation.isPending}>
            Submit
          </Button>
          {mutation.isPending && <CircularSpinner />}
        </div>
      </form>
    </Form>
  );
}
