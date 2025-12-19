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
  min,
  step = 1,
  max,
}: {
  control: Control<TFieldValues>;
  name: TPath;
  id?: string;
  label?: string;
  placeholder?: string;
  description?: string;
  min?: number;
  step?: number;
  max?: number;
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
        min={min}
        step={step}
        max={max}
        aria-invalid={fieldState.invalid}
        value={Number.isNaN(field.value) ? "" : field.value}
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
