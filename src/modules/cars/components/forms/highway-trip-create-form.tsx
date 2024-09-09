import { CircularSpinner } from "@/components/circular-spinner";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { XInput } from "@/components/x-input";
import { useCreateHighwayTripMutation } from "@/modules/cars/cars-mutations";
import {
  type HighwayTripCreateForm,
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
      carId: props.carId,
      startingToll: "",
      endingToll: "",
      distance: 0,
      cost: 0,
      avgSpeed: 0,
    },
  });

  const mutation = useCreateHighwayTripMutation();

  function onValidSubmit(values: HighwayTripCreateForm) {
    mutation.mutate(values, { onSuccess: () => props.onSubmit() });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onValidSubmit)} className="space-y-4 py-2 pb-4">
        <XInput control={form.control} name="startingToll" label="Start" />

        <XInput control={form.control} name="endingToll" label="End" />

        <XInput type="number" step={0.01} control={form.control} name="distance" label="Distance" />

        <XInput type="number" step={0.01} control={form.control} name="cost" label="Cost" />

        <XInput
          type="number"
          step={0.01}
          control={form.control}
          name="avgSpeed"
          label="Average speed"
        />

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
