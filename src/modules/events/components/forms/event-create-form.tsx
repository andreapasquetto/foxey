import { zodResolver } from "@hookform/resolvers/zod";
import { add } from "date-fns";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { DatePicker } from "@/components/form/date-picker";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Spinner } from "@/components/ui/spinner";
import type { EventCategory } from "@/db/types/events";
import type { Place } from "@/db/types/places";
import { cn } from "@/lib/utils";
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
      <Controller
        control={form.control}
        name="isAllDay"
        render={({ field }) => (
          <Field orientation="horizontal">
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
            <FieldLabel htmlFor={field.name}>All day</FieldLabel>
          </Field>
        )}
      />
      <Controller
        control={form.control}
        name="title"
        render={({ field }) => (
          <Field>
            <FieldLabel>Title</FieldLabel>
            <Input {...field} type="text" />
          </Field>
        )}
      />
      <Controller
        control={form.control}
        name="description"
        render={({ field }) => (
          <Field>
            <FieldLabel>Description</FieldLabel>
            <Input
              {...field}
              type="text"
              value={field.value ?? ""}
              onChange={(e) => {
                const value = e.target.value;
                field.onChange(value.length ? value : null);
              }}
            />
          </Field>
        )}
      />
      <Controller
        control={form.control}
        name="categoryId"
        render={({ field }) => (
          <Field>
            <FieldLabel>Category</FieldLabel>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "justify-between px-3 py-2 font-normal",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  {field.value
                    ? categories.find((category) => category.id === field.value)
                        ?.name
                    : "Select an option"}
                  <ChevronsUpDown className="ml-2 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Command>
                  <CommandInput placeholder="Search..." />
                  <CommandList>
                    <CommandEmpty>No option found.</CommandEmpty>
                    <CommandGroup>
                      {categories.map((category) => (
                        <CommandItem
                          value={category.name}
                          key={category.id}
                          onSelect={() => {
                            field.onChange(category.id);
                          }}
                        >
                          <div>{category.name}</div>
                          <Check
                            className={cn(
                              "ml-auto",
                              category.id === field.value
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </Field>
        )}
      />
      <Controller
        control={form.control}
        name="placeId"
        render={({ field }) => (
          <Field>
            <FieldLabel>Place</FieldLabel>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "justify-between px-3 py-2 font-normal",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  {field.value
                    ? places.find((place) => place.id === field.value)?.name
                    : "Select an option"}
                  <ChevronsUpDown className="ml-2 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Command>
                  <CommandInput placeholder="Search..." />
                  <CommandList>
                    <CommandEmpty>No option found.</CommandEmpty>
                    <CommandGroup>
                      {places.map((place) => (
                        <CommandItem
                          value={
                            place.category
                              ? `${place.category.name}-${place.name}`
                              : place.name
                          }
                          key={place.id}
                          onSelect={() => {
                            field.onChange(place.id);
                          }}
                        >
                          <div>{place.name}</div>
                          <Check
                            className={cn(
                              "ml-auto",
                              place.id === field.value
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </Field>
        )}
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
