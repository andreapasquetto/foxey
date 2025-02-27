import { CircularSpinner } from "@/components/circular-spinner";
import { DatePicker } from "@/components/form/date-picker";
import { XCheckbox } from "@/components/form/x-checkbox";
import { XInput } from "@/components/form/x-input";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useEventsCreateMutation } from "@/modules/events/events-mutations";
import { useEventCategoriesGetAllQuery } from "@/modules/events/events-queries";
import {
  type EventCreateForm,
  eventCreateFormSchema,
} from "@/modules/events/schemas/event-create-form-schema";
import { usePlacesGetAllQuery } from "@/modules/places/places-queries";
import { zodResolver } from "@hookform/resolvers/zod";
import { PopoverContent } from "@radix-ui/react-popover";
import { add } from "date-fns";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface EventCreateFormProps {
  selectedDay: Date;
  onSubmitSuccess: () => void;
}

export function EventCreateForm(props: EventCreateFormProps) {
  const categoriesQuery = useEventCategoriesGetAllQuery();
  const placesQuery = usePlacesGetAllQuery();

  const form = useForm<EventCreateForm>({
    resolver: zodResolver(eventCreateFormSchema),
    defaultValues: {
      datetime: add(props.selectedDay, { hours: 12 }),
    },
  });

  const mutation = useEventsCreateMutation();

  function onValidSubmit(values: EventCreateForm) {
    mutation.mutate(values, {
      onSuccess: () => {
        props.onSubmitSuccess();
      },
    });
  }

  useEffect(() => {
    form.setValue("datetime", add(props.selectedDay, { hours: 12 }));
  }, [props.selectedDay, form]);

  const categories = categoriesQuery.data ?? [];
  const places = placesQuery.data ?? [];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onValidSubmit)} className="space-y-4 py-2 pb-4">
        <FormField
          control={form.control}
          name="datetime"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <FormControl>
                <DatePicker value={field.value} setValue={field.onChange} includeTime />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="md:mb-3 md:self-end">
          <XCheckbox control={form.control} name="isAllDay" label="All day" />
        </div>
        <XInput control={form.control} name="title" label="Title" />
        <XInput control={form.control} name="description" label="Description" />
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-end">
              <FormLabel>Category</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "justify-between px-3 py-2 font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value
                        ? categories.find((category) => category.id === field.value)?.name
                        : "Select an option"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
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
                              form.setValue("categoryId", category.id);
                            }}
                          >
                            <div>{category.name}</div>
                            <Check
                              className={cn(
                                "ml-auto",
                                category.id === field.value ? "opacity-100" : "opacity-0",
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="placeId"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-end">
              <FormLabel>Place</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
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
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
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
                              place.category ? `${place.category.name}-${place.name}` : place.name
                            }
                            key={place.id}
                            onSelect={() => {
                              form.setValue("placeId", place.id);
                            }}
                          >
                            {place.name}
                            <Check
                              className={cn(
                                "ml-auto",
                                place.id === field.value ? "opacity-100" : "opacity-0",
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
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
