import { type ComponentProps, useId } from "react";
import {
  type Control,
  type FieldValue,
  type FieldValues,
  type Path,
  useController,
} from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface XCheckboxProps<T extends FieldValue<K>, K extends FieldValues>
  extends ComponentProps<"input"> {
  control: Control<T>;
  name: Path<T>;
  label: string;
}

export function XCheckbox<T extends FieldValue<K>, K extends FieldValues>(
  props: XCheckboxProps<T, K>,
) {
  const { field, fieldState } = useController({
    name: props.name,
    control: props.control,
  });

  const defaultId = useId();
  const id = props.id ?? defaultId;

  return (
    <div className="space-y-2">
      <div className="relative">
        <div className="flex items-end gap-3">
          <Checkbox
            checked={field.value}
            onCheckedChange={field.onChange}
            id={id}
          />
          <Label
            htmlFor={id}
            className={fieldState.error?.message ? "text-destructive" : ""}
          >
            {props.label}
          </Label>
        </div>
        {!!fieldState.error?.message && (
          <div className="pointer-events-none absolute top-0 right-0 z-10 rounded-md border bg-background px-2 py-1 text-xs text-destructive shadow-md">
            {fieldState.error?.message}
          </div>
        )}
      </div>
    </div>
  );
}
