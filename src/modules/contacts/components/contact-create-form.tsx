"use client";

import { CircularSpinner } from "@/components/circular-spinner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateContactMutation } from "@/modules/contacts/contacts-mutations";
import {
  ContactCreateForm,
  contactCreateFormSchema,
} from "@/modules/contacts/schemas/contact-create-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface ContactCreateFormProps {
  onSubmit: () => void;
}

export function ContactCreateForm(props: ContactCreateFormProps) {
  const form = useForm<ContactCreateForm>({
    resolver: zodResolver(contactCreateFormSchema),
    defaultValues: {
      fullName: "",
      subtitle: "",
      dob: new Date(),
      isArchived: false,
      isBusiness: false,
      addresses: [],
      emails: [],
      phoneNumbers: [],
    },
  });

  const mutation = useCreateContactMutation();

  function onValidSubmit(values: ContactCreateForm) {
    console.log(values);
    mutation.mutate(values, {
      onSuccess: () => props.onSubmit(),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onValidSubmit)} className="space-y-4 py-2 pb-4">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
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
