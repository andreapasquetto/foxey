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
import { XSelect, XSelectOption } from "@/components/x-select";
import { useCreatePlaceMutation } from "@/modules/places/places-mutations";
import { usePlaceCategoriesQuery } from "@/modules/places/places-queries";
import {
  type PlaceCreateForm,
  placeCreateFormSchema,
} from "@/modules/places/schemas/place-create-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface PlaceCreateFormProps {
  onSubmit: () => void;
}

export function PlaceCreateForm(props: PlaceCreateFormProps) {
  const form = useForm<PlaceCreateForm>({
    resolver: zodResolver(placeCreateFormSchema),
    defaultValues: {
      name: "",
      address: "",
      isVisited: false,
    },
  });

  const { data: placeCategories, isFetching } = usePlaceCategoriesQuery();

  const mutation = useCreatePlaceMutation();

  function onValidSubmit(values: PlaceCreateForm) {
    mutation.mutate(values, {
      onSuccess: () => props.onSubmit(),
    });
  }

  if (!placeCategories || isFetching) return <CircularSpinner className="mx-auto" />;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onValidSubmit)} className="space-y-4 py-2 pb-4">
        <XSelect control={form.control} name="categoryId">
          {placeCategories.map((category) => (
            <XSelectOption key={category.id} value={category.id}>
              {category.name}
            </XSelectOption>
          ))}
        </XSelect>

        <XInput control={form.control} name="name" label="Name" />

        <XInput control={form.control} name="address" label="Address" />

        <div className="space-y-2">
          <FormField
            control={form.control}
            name="isVisited"
            render={({ field }) => (
              <FormItem className="flex items-end gap-3">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel>Visited</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
