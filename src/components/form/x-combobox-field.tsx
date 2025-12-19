import { Check, ChevronsUpDown } from "lucide-react";
import { useId } from "react";
import {
  type Control,
  type FieldPathByValue,
  type FieldValues,
  useController,
} from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export function XComboboxField<
  TFieldValues extends FieldValues,
  TPath extends FieldPathByValue<TFieldValues, string | null>,
>({
  control,
  name,
  options,
  id,
  label,
  description,
  triggerPlaceholder = "Select an option",
  searchPlaceholder = "Search...",
  emptyPlaceholder = "No option found.",
}: {
  control: Control<TFieldValues>;
  name: TPath;
  options: { label: string; value: string }[];
  id?: string;
  label?: string;
  description?: string;
  triggerPlaceholder?: string;
  searchPlaceholder?: string;
  emptyPlaceholder?: string;
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
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "justify-between px-3 py-2 font-normal",
              !field.value && "text-muted-foreground",
            )}
            aria-invalid={fieldState.invalid}
          >
            {field.value
              ? options.find((option) => option.value === field.value)?.label
              : triggerPlaceholder}
            <ChevronsUpDown className="ml-2 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Command>
            <CommandInput placeholder={searchPlaceholder} />
            <CommandList>
              <CommandEmpty>{emptyPlaceholder}</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    value={option.label}
                    key={option.value}
                    onSelect={() => {
                      if (field.value === option.value) {
                        field.onChange(null);
                        return;
                      }
                      field.onChange(option.value);
                    }}
                  >
                    <div>{option.label}</div>
                    <Check
                      className={cn(
                        "ml-auto",
                        option.value === field.value
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {description && <FieldDescription>{description}</FieldDescription>}
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  );
}
