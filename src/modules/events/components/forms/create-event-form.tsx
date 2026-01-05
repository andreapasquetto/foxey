import { zodResolver } from "@hookform/resolvers/zod";
import { add } from "date-fns";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { XCheckboxField } from "@/components/form/x-checkbox-field";
import { XComboboxField } from "@/components/form/x-combobox-field";
import { XDatePickerField } from "@/components/form/x-date-picker-field";
import { XNullableTextField } from "@/components/form/x-nullable-text-field";
import { XTextField } from "@/components/form/x-text-field";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import type { EventCategory } from "@/db/types/events";
import type { Place } from "@/db/types/places";
import { useCreateEventMutation } from "@/modules/events/mutations";
import {
  type CreateEventFormType,
  createEventFormSchema,
} from "@/modules/events/schemas/create-event-form-schema";

export function CreateEventForm({
  categories,
  places,
  selectedDay,
  onSuccess,
}: {
  categories: EventCategory[];
  places: Place[];
  selectedDay: Date;
  onSuccess?: () => void;
}) {
  const form = useForm<CreateEventFormType>({
    resolver: zodResolver(createEventFormSchema),
    defaultValues: {
      datetime: add(selectedDay, { hours: 12 }),
      isAllDay: false,
      title: "",
      description: null,
      categoryId: null,
      placeId: null,
    },
  });

  const mutation = useCreateEventMutation();

  function onValidSubmit(values: CreateEventFormType) {
    mutation.mutate(values, {
      onSuccess: () => {
        onSuccess?.();
      },
    });
  }

  useEffect(() => {
    if (selectedDay) {
      form.setValue("datetime", add(selectedDay, { hours: 12 }));
    }
  }, [selectedDay, form]);

  return (
    <form
      onSubmit={form.handleSubmit(onValidSubmit)}
      onReset={() => form.reset()}
      className=""
    >
      <FieldGroup>
        <XDatePickerField
          control={form.control}
          name="datetime"
          label="Date and time"
          includeTime
        />
        <XCheckboxField
          control={form.control}
          name="isAllDay"
          label="All day"
        />
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
        <Field orientation="horizontal" className="justify-end">
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
        </Field>
      </FieldGroup>
    </form>
  );
}
