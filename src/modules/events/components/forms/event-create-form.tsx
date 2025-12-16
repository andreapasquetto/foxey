import { zodResolver } from "@hookform/resolvers/zod";
import { add } from "date-fns";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { DatePicker } from "@/components/form/date-picker";
import { XCheckboxField } from "@/components/form/x-checkbox-field";
import { XComboboxField } from "@/components/form/x-combobox-field";
import { XNullableTextField } from "@/components/form/x-nullable-text-field";
import { XTextField } from "@/components/form/x-text-field";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import type { EventCategory } from "@/db/types/events";
import type { Place } from "@/db/types/places";
import { useEventsCreateMutation } from "@/modules/events/events-mutations";
import {
  type CreateEventFormType,
  createEventFormSchema,
} from "@/modules/events/schemas/create-event-form-schema";

export function EventCreateForm(props: {
  categories: EventCategory[];
  places: Place[];
  selectedDay: Date;
  onSuccess?: () => void;
}) {
  const { categories, places } = props;

  const form = useForm<CreateEventFormType>({
    resolver: zodResolver(createEventFormSchema),
    defaultValues: {
      datetime: add(props.selectedDay, { hours: 12 }),
      isAllDay: false,
      title: "",
      description: null,
      categoryId: null,
      placeId: null,
    },
  });

  const mutation = useEventsCreateMutation();

  function onValidSubmit(values: CreateEventFormType) {
    mutation.mutate(values, {
      onSuccess: () => {
        props.onSuccess?.();
      },
    });
  }

  useEffect(() => {
    if (props.selectedDay) {
      form.setValue("datetime", add(props.selectedDay, { hours: 12 }));
    }
  }, [props.selectedDay, form]);

  return (
    <form
      onSubmit={form.handleSubmit(onValidSubmit)}
      onReset={() => form.reset()}
      className="space-y-6 mx-auto sm:max-w-xl"
    >
      <Controller
        control={form.control}
        name="datetime"
        render={({ field }) => (
          <Field>
            <FieldLabel>Date</FieldLabel>
            <DatePicker
              includeTime
              value={field.value ?? undefined}
              setValue={(e) => {
                field.onChange(e ?? null);
              }}
            />
          </Field>
        )}
      />
      <XCheckboxField control={form.control} name="isAllDay" label="All day" />
      <XTextField control={form.control} name="title" label="Title" />
      <XNullableTextField
        control={form.control}
        name="description"
        label="Description"
      />
      <XComboboxField
        control={form.control}
        name="categoryId"
        options={categories.map((c) => ({ label: c.name, value: c.id }))}
        label="Category"
      />
      <XComboboxField
        control={form.control}
        name="placeId"
        options={places.map((p) => ({ label: p.name, value: p.id }))}
        label="Place"
      />
      <div className="flex items-center justify-end gap-2">
        <Button
          type="reset"
          variant="outline"
          disabled={!form.formState.isDirty || mutation.isPending}
        >
          Reset
        </Button>
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending && <Spinner />}
          Submit
        </Button>
      </div>
    </form>
  );
}
