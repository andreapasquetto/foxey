import { CheckIcon, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export function ChipCombobox<T extends { id: string; name: string }>({
  label,
  selectedValue,
  onSelectValue,
  options,
  optionIndexer,
  optionFormatter,
  withSearch,
}: {
  label: string;
  selectedValue: T | undefined;
  onSelectValue: (value?: T) => void;
  options: T[] | undefined;
  optionIndexer?: (value: T) => string;
  optionFormatter: (value: T) => React.ReactNode;
  withSearch?: boolean;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-label="Select a team"
          className={cn(
            "w-full justify-between gap-2 overflow-hidden border-dashed px-3 py-2 font-normal text-muted-foreground",
            selectedValue && "border-muted-foreground",
          )}
        >
          {label}
          {!selectedValue && <Plus className="shrink-0 opacity-50" />}
          {selectedValue && (
            <span className="text-foreground">{selectedValue.name}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-1" align="start">
        <Command>
          {withSearch && <CommandInput placeholder="Search..." />}
          <CommandList>
            <CommandEmpty>No option found</CommandEmpty>
            {options?.map((option) => (
              <CommandItem
                key={option.id}
                value={optionIndexer ? optionIndexer(option) : option.name}
                onSelect={() => {
                  if (selectedValue && selectedValue.id === option.id) {
                    onSelectValue(undefined);
                  } else {
                    onSelectValue(option);
                  }
                }}
                className="gap-2 text-sm"
              >
                {optionFormatter(option)}
                <CheckIcon
                  className={cn(
                    "ml-auto",
                    selectedValue?.id === option.id
                      ? "opacity-100"
                      : "opacity-0",
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
