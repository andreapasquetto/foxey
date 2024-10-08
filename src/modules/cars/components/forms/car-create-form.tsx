import { CircularSpinner } from "@/components/circular-spinner";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { XInput } from "@/components/x-input";
import { useCreateCarMutation } from "@/modules/cars/cars-mutations";
import {
  type CarCreateForm,
  carCreateFormSchema,
} from "@/modules/cars/schemas/car-create-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface CarCreateFormProps {
  onSubmit: () => void;
}

export function CarCreateForm(props: CarCreateFormProps) {
  const form = useForm<CarCreateForm>({
    resolver: zodResolver(carCreateFormSchema),
    defaultValues: {
      year: new Date().getFullYear(),
      make: "",
      model: "",
    },
  });

  const mutation = useCreateCarMutation();

  function onValidSubmit(values: CarCreateForm) {
    mutation.mutate(values, {
      onSuccess: () => props.onSubmit(),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onValidSubmit)} className="space-y-4 py-2 pb-4">
        <XInput type="number" control={form.control} name="year" label="Year" />

        <XInput control={form.control} name="make" label="Make" />

        <XInput control={form.control} name="model" label="Model" />

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
