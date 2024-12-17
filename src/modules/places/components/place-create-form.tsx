import { CircularSpinner } from "@/components/circular-spinner";
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { XCheckbox } from "@/components/x-checkbox";
import { XInput } from "@/components/x-input";
import { cn } from "@/lib/utils";
import { useCreatePlaceMutation } from "@/modules/places/places-mutations";
import { usePlaceCategoriesGetAllQuery } from "@/modules/places/places-queries";
import {
  type PlaceCreateForm,
  placeCreateFormSchema,
} from "@/modules/places/schemas/place-create-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";

interface PlaceCreateFormProps {
  onSubmit: () => void;
}

export function PlaceCreateForm(props: PlaceCreateFormProps) {
  const form = useForm<PlaceCreateForm>({
    resolver: zodResolver(placeCreateFormSchema),
    defaultValues: {
      isVisited: false,
    },
  });

  const { data: placeCategories, isFetching } = usePlaceCategoriesGetAllQuery();

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
                        ? placeCategories.find((category) => category.id === field.value)?.name
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
                        {placeCategories.map((category) => (
                          <CommandItem
                            value={category.name}
                            key={category.id}
                            onSelect={() => {
                              form.setValue("categoryId", category.id);
                            }}
                          >
                            {category.name}
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
        <XInput control={form.control} name="name" label="Name" />
        <XInput control={form.control} name="address" label="Address" />
        <XCheckbox control={form.control} name="isVisited" label="Visited" />
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
