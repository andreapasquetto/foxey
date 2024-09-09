import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ComponentProps, useId } from "react";
import { Control, FieldValue, FieldValues, Path, useController } from "react-hook-form";

interface XSelectProps<T extends FieldValue<K>, K extends FieldValues>
  extends ComponentProps<"select"> {
  control: Control<T>;
  name: Path<T>;
  children: React.ReactElement<XSelectOptionProps>[];
  label?: string;
  placeholder?: string;
}

export function XSelect<T extends FieldValue<K>, K extends FieldValues>(props: XSelectProps<T, K>) {
  const { field, fieldState } = useController({
    name: props.name,
    control: props.control,
  });

  const defaultId = useId();
  const id = props.id ?? defaultId;

  return (
    <div className="space-y-2">
      {!!props.label && (
        <Label htmlFor={id} className={!!fieldState.error?.message ? "text-destructive" : ""}>
          {props.label}
        </Label>
      )}

      <div className="relative">
        <Select
          defaultValue={field.value}
          onValueChange={field.onChange}
          disabled={field.disabled || props.disabled}
        >
          <SelectTrigger id={id}>
            <SelectValue placeholder={props.placeholder ?? "Select an option"} />
          </SelectTrigger>
          <SelectContent>{props.children}</SelectContent>
        </Select>
        {!!fieldState.error?.message && (
          <div className="pointer-events-none absolute right-0 z-10 rounded-md border bg-background px-2 py-1 text-xs text-destructive shadow-md">
            {fieldState.error?.message}
          </div>
        )}
      </div>
    </div>
  );
}

interface XSelectOptionProps {
  value: string;
  children: React.ReactNode;
}

export function XSelectOption(props: XSelectOptionProps) {
  return <SelectItem value={props.value}>{props.children}</SelectItem>;
}
