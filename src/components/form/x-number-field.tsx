import { useId } from "react";
import {
  type Control,
  type FieldPathByValue,
  type FieldValues,
  useController,
} from "react-hook-form";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function XNumberField<
  TFieldValues extends FieldValues,
  TPath extends FieldPathByValue<TFieldValues, number>,
>({
  control,
  name,
  id,
  label,
  placeholder,
  description,
}: {
  control: Control<TFieldValues>;
  name: TPath;
  id?: string;
  label?: string;
  placeholder?: string;
  description?: string;
}) {
  const { field, fieldState } = useController({
    control,
    name,
  });

  const defaultId = useId();
  const fieldId = id ?? defaultId;

  return (
    <Field data-invalid={fieldState.invalid}>
      {label && <FieldLabel htmlFor={fieldId}>{label}</FieldLabel>}
      <Input
        {...field}
        type="number"
        id={fieldId}
        placeholder={placeholder}
        aria-invalid={fieldState.invalid}
        value={field.value}
        onChange={(e) => {
          const value = e.target.value;
          field.onChange(value.length ? +value : NaN);
        }}
      />
      {description && <FieldDescription>{description}</FieldDescription>}
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  );
}
