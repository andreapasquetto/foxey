"use client";

import { placesRoute } from "@/common/routes";
import { CircularSpinner } from "@/components/circular-spinner";
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { PlaceFormSkeleton } from "@/modules/places/components/skeletons/place-form-skeleton";
import { usePlaceUpdateMutation } from "@/modules/places/places-mutations";
import {
  usePlaceCategoriesGetAllQuery,
  usePlaceGetByIdQuery,
} from "@/modules/places/places-queries";
import { PlaceRead } from "@/modules/places/schemas/place-read-schema";
import {
  placeUpdateFormSchema,
  type PlaceUpdateForm,
} from "@/modules/places/schemas/place-update-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface PlaceUpdateFormProps {
  id: string;
}

export function PlaceUpdateForm(props: PlaceUpdateFormProps) {
  const router = useRouter();
  const query = usePlaceGetByIdQuery(props.id);

  if (!query.data) {
    return <PlaceFormSkeleton />;
  }

  return (
    <UpdateForm
      place={query.data}
      onUpdate={() => {
        router.push(placesRoute);
      }}
    />
  );
}

interface UpdateFormProps {
  place: PlaceRead;
  onUpdate: () => void;
}

function UpdateForm(props: UpdateFormProps) {
  const form = useForm<PlaceUpdateForm>({
    resolver: zodResolver(placeUpdateFormSchema),
    defaultValues: {
      id: props.place.id,
      name: props.place.name,
      categoryId: props.place.category?.id,
      address: props.place.address ?? undefined,
      isVisited: props.place.isVisited,
    },
  });

  const mutation = usePlaceUpdateMutation(props.place.id);

  const { data: categories } = usePlaceCategoriesGetAllQuery();

  if (!categories) {
    return <PlaceFormSkeleton />;
  }

  function onValidSubmit(values: PlaceUpdateForm) {
    mutation.mutate(values, {
      onSuccess: () => {
        props.onUpdate();
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onValidSubmit)} className="space-y-4 py-2 pb-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
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
                              value={
                                category.parent
                                  ? `${category.parent.name}-${category.name}`
                                  : category.name
                              }
                              key={category.id}
                              onSelect={() => {
                                form.setValue("categoryId", category.id);
                              }}
                            >
                              {!category.parent && <div>{category.name}</div>}
                              {category.parent && (
                                <div>
                                  <span>{category.parent.name}</span>
                                  <span className="mx-1">•</span>
                                  <span className="text-muted-foreground">{category.name}</span>
                                </div>
                              )}
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
          <div className="md:mb-3 md:self-end">
            <XCheckbox control={form.control} name="isVisited" label="Visited" />
          </div>
        </div>
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
