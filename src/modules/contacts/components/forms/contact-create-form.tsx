"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { DatePicker } from "@/components/form/date-picker";
import { XCheckbox } from "@/components/form/x-checkbox";
import { XInput } from "@/components/form/x-input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import { useContactsCreateMutation } from "@/modules/contacts/contacts-mutations";
import {
  type CreateContactFormType,
  createContactFormSchema,
} from "@/modules/contacts/schemas/create-contact-form-schema";

export function ContactCreateForm() {
  const form = useForm<CreateContactFormType>({
    resolver: zodResolver(createContactFormSchema),
    defaultValues: {
      isArchived: false,
      isBusiness: false,
      ignoreDobYear: false,
      addresses: [],
      emails: [],
      phoneNumbers: [],
    },
  });

  const mutation = useContactsCreateMutation();

  function onValidSubmit(values: CreateContactFormType) {
    mutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onValidSubmit)}
        className="space-y-6 max-w-lg mx-auto"
      >
        <XInput control={form.control} name="fullName" label="Full Name" />
        <XInput control={form.control} name="subtitle" label="Subtitle" />
        <XCheckbox control={form.control} name="isBusiness" label="Business" />
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Birth</FormLabel>
              <FormControl>
                <DatePicker value={field.value} setValue={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <XCheckbox
          control={form.control}
          name="ignoreDobYear"
          label="Ignore Year"
        />
        <div className="flex items-center justify-end gap-3">
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending && <Spinner />}
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
