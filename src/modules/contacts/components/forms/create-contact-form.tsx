"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { XCheckboxField } from "@/components/form/x-checkbox-field";
import { XNullableDatePickerField } from "@/components/form/x-nullable-date-picker-field";
import { XNullableTextField } from "@/components/form/x-nullable-text-field";
import { XTextField } from "@/components/form/x-text-field";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCreateContactMutation } from "@/modules/contacts/mutations";
import {
  type CreateContactFormType,
  createContactFormSchema,
} from "@/modules/contacts/schemas/create-contact-form-schema";

export function CreateContactForm() {
  const form = useForm<CreateContactFormType>({
    resolver: zodResolver(createContactFormSchema),
    defaultValues: {
      fullName: "",
      subtitle: null,
      isBusiness: false,
      dob: null,
      ignoreDobYear: false,
      phoneNumbers: [],
      emails: [],
      addresses: [],
    },
  });

  const {
    fields: phoneNumbers,
    append: appendPhoneNumber,
    remove: removePhoneNumber,
  } = useFieldArray({
    control: form.control,
    name: "phoneNumbers",
  });

  const {
    fields: emails,
    append: appendEmail,
    remove: removeEmail,
  } = useFieldArray({
    control: form.control,
    name: "emails",
  });

  const {
    fields: addresses,
    append: appendAddress,
    remove: removeAddress,
  } = useFieldArray({
    control: form.control,
    name: "addresses",
  });

  const mutation = useCreateContactMutation();

  function onValidSubmit(values: CreateContactFormType) {
    mutation.mutate(values);
  }

  // TODO: fix position of "remove" buttons
  return (
    <form
      onSubmit={form.handleSubmit(onValidSubmit)}
      onReset={() => form.reset()}
      className="max-w-lg mx-auto"
    >
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Basic info</FieldLegend>
          <FieldGroup>
            <XTextField
              control={form.control}
              name="fullName"
              label="Full name"
            />
            <XNullableTextField
              control={form.control}
              name="subtitle"
              label="Subtitle"
            />
            <XCheckboxField
              control={form.control}
              name="isBusiness"
              label="Business"
            />
            <XNullableDatePickerField
              control={form.control}
              name="dob"
              label="Date of birth"
            />
            <XCheckboxField
              control={form.control}
              name="ignoreDobYear"
              label="Ignore year"
            />
          </FieldGroup>
        </FieldSet>
        <FieldSeparator />
        <FieldSet>
          <div className="flex items-center justify-between">
            <FieldLegend>Phone numbers</FieldLegend>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => appendPhoneNumber({ value: "" })}
                >
                  <Plus />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Add</TooltipContent>
            </Tooltip>
          </div>
          <FieldGroup>
            {phoneNumbers.map((phoneNumber, index) => (
              <div
                key={phoneNumber.id}
                className="flex items-end justify-between gap-2"
              >
                <div className="flex-1">
                  <XTextField
                    key={phoneNumber.id}
                    control={form.control}
                    name={`phoneNumbers.${index}.value`}
                    label={`Phone number #${index + 1}`}
                  />
                </div>
                <div>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => removePhoneNumber(index)}
                      >
                        <X />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Remove</TooltipContent>
                  </Tooltip>
                </div>
              </div>
            ))}
          </FieldGroup>
        </FieldSet>
        <FieldSeparator />
        <FieldSet>
          <div className="flex items-center justify-between">
            <FieldLegend>Emails</FieldLegend>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => appendEmail({ value: "" })}
                >
                  <Plus />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Add</TooltipContent>
            </Tooltip>
          </div>
          <FieldGroup>
            {emails.map((email, index) => (
              <div
                key={email.id}
                className="flex items-end justify-between gap-2"
              >
                <div className="flex-1">
                  <XTextField
                    key={email.id}
                    control={form.control}
                    name={`emails.${index}.value`}
                    label={`Email #${index + 1}`}
                  />
                </div>
                <div>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => removeEmail(index)}
                      >
                        <X />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Remove</TooltipContent>
                  </Tooltip>
                </div>
              </div>
            ))}
          </FieldGroup>
        </FieldSet>
        <FieldSeparator />
        <FieldSet>
          <div className="flex items-center justify-between">
            <FieldLegend>Addresses</FieldLegend>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => appendAddress({ value: "" })}
                >
                  <Plus />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Add</TooltipContent>
            </Tooltip>
          </div>
          <FieldGroup>
            {addresses.map((address, index) => (
              <div
                key={address.id}
                className="flex items-end justify-between gap-2"
              >
                <div className="flex-1">
                  <XTextField
                    key={address.id}
                    control={form.control}
                    name={`addresses.${index}.value`}
                    label={`Address #${index + 1}`}
                  />
                </div>
                <div>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => removeAddress(index)}
                      >
                        <X />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Remove</TooltipContent>
                  </Tooltip>
                </div>
              </div>
            ))}
          </FieldGroup>
        </FieldSet>
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
