"use client";

import { CircularSpinner } from "@/components/circular-spinner";
import { DatePicker } from "@/components/form/date-picker";
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
import { useContactsCreateMutation } from "@/modules/contacts/contacts-mutations";
import {
  type ContactCreateForm,
  contactCreateFormSchema,
} from "@/modules/contacts/schemas/contact-create-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { startOfDay } from "date-fns";
import { useForm } from "react-hook-form";

interface ContactCreateFormProps {
  onSubmit: () => void;
}

export function ContactCreateForm(props: ContactCreateFormProps) {
  const form = useForm<ContactCreateForm>({
    resolver: zodResolver(contactCreateFormSchema),
    defaultValues: {
      dob: startOfDay(new Date()),
      isArchived: false,
      isBusiness: false,
      addresses: [],
      emails: [],
      phoneNumbers: [],
    },
  });

  const mutation = useContactsCreateMutation();

  function onValidSubmit(values: ContactCreateForm) {
    mutation.mutate(values, {
      onSuccess: () => props.onSubmit(),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onValidSubmit)} className="space-y-4 py-2 pb-4">
        <XInput control={form.control} name="fullName" label="Full Name" />

        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of Birth</FormLabel>
              <FormControl>
                <DatePicker value={field.value} setValue={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
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
