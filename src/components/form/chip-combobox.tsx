import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CheckIcon, Plus } from "lucide-react";

interface ChipComboboxProps<T extends { id: string; name: string }> {
  label: string;
  selectedValue: T | undefined;
  onSelectValue: (value?: T) => void;
  options: T[] | undefined;
  optionIndexer?: (value: T) => string;
  optionFormatter: (value: T) => React.ReactNode;
  withSearch?: boolean;
}

export function ChipCombobox<T extends { id: string; name: string }>(props: ChipComboboxProps<T>) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-label="Select a team"
          className={cn(
            "h-8 w-full justify-between gap-2 overflow-hidden border-dashed px-3 py-2 font-normal text-muted-foreground",
            props.selectedValue && "border-muted-foreground",
          )}
        >
          {props.label}
          {!props.selectedValue && <Plus className="size-4 shrink-0 opacity-50" />}
          {props.selectedValue && (
            <span className="text-foreground">{props.selectedValue.name}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-1" align="start">
        <Command>
          {props.withSearch && <CommandInput placeholder="Search..." />}
          <CommandList>
            <CommandEmpty>No option found</CommandEmpty>
            {props.options?.map((option) => (
              <CommandItem
                key={option.id}
                value={props.optionIndexer ? props.optionIndexer(option) : option.name}
                onSelect={() => {
                  if (props.selectedValue && props.selectedValue.id === option.id) {
                    props.onSelectValue(undefined);
                  } else {
                    props.onSelectValue(option);
                  }
                }}
                className="gap-2 text-sm"
              >
                {props.optionFormatter(option)}
                <CheckIcon
                  className={cn(
                    "ml-auto size-4",
                    props.selectedValue?.id === option.id ? "opacity-100" : "opacity-0",
                  )}
                />
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
