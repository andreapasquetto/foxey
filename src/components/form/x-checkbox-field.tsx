import { useId } from "react";
import {
  type Control,
  type FieldPathByValue,
  type FieldValues,
  useController,
} from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

export function XCheckboxField<
  TFieldValues extends FieldValues,
  TPath extends FieldPathByValue<TFieldValues, boolean>,
>({
  control,
  name,
  id,
  label,
}: {
  control: Control<TFieldValues>;
  name: TPath;
  id?: string;
  label?: string;
}) {
  const { field, fieldState } = useController({
    control,
    name,
  });

  const defaultId = useId();
  const fieldId = id ?? defaultId;

  return (
    <Field orientation="horizontal" data-invalid={fieldState.invalid}>
      <Checkbox
        {...field}
        id={fieldId}
        checked={field.value}
        onCheckedChange={field.onChange}
      />
      {label && <FieldLabel htmlFor={fieldId}>{label}</FieldLabel>}
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  );
}
