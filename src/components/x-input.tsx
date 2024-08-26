import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useId } from "react";
import { Control, FieldValue, FieldValues, Path, useController } from "react-hook-form";

export type XInputProps<T extends FieldValue<K>, K extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  id?: string;
  type?: "text" | "number";
  disabled?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  step?: "any" | number;
  label?: string;
};

// TODO: find a better name
export function XInput<T extends FieldValue<K>, K extends FieldValues>({
  name,
  control,
  ...props
}: XInputProps<T, K>) {
  const { fieldState } = useController({
    name,
    control,
  });
  const defaultId = useId();

  const id = props.id ?? defaultId;
  const type = props.type ?? "text";
  const inputProps = control.register(name, {
    valueAsNumber: type === "number",
  });

  return (
    <div className="space-y-2">
      {!!props.label && (
        <Label htmlFor={id} className={!!fieldState.error?.message ? "text-destructive" : ""}>
          {props.label}
        </Label>
      )}

      <div className="relative">
        <Input
          {...inputProps}
          type={type}
          id={id}
          disabled={props.disabled || inputProps.disabled}
          placeholder={props.placeholder}
          readOnly={props.readOnly}
          step={props.step}
        />
        {!!fieldState.error?.message && (
          <div className="pointer-events-none absolute right-0 z-10 rounded-md border bg-background px-2 py-1 text-xs text-destructive shadow-md">
            {fieldState.error?.message}
          </div>
        )}
      </div>
    </div>
  );
}
