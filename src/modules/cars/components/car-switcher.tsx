import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useCarsGetAllQuery } from "@/modules/cars/cars-queries";
import { CarCreateForm } from "@/modules/cars/components/forms/car-create-form";
import { CarRead } from "@/modules/cars/schemas/car-read-schema";
import { CheckIcon, ChevronsUpDown, CirclePlus } from "lucide-react";
import { useState } from "react";

interface CarSwitcherProps {
  selectedCar: CarRead | undefined;
  onSelectCar: (car: CarRead | undefined) => void;
}

export function CarSwitcher(props: CarSwitcherProps) {
  const [open, setOpen] = useState(false);
  const [showNewCarDialog, setShowNewCarDialog] = useState(false);

  const query = useCarsGetAllQuery();

  if (query.isFetching) {
    return <Skeleton className="h-10 w-full" />;
  }

  return (
    <Dialog open={showNewCarDialog} onOpenChange={setShowNewCarDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={!!open}
            aria-label="Select a team"
            className={cn("w-full justify-between")}
          >
            {props.selectedCar
              ? `${props.selectedCar.make} ${props.selectedCar.model}`
              : "No car selected"}
            <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="end">
          <Command>
            <CommandList>
              <CommandItem
                onSelect={() => {
                  props.onSelectCar(undefined);
                  setOpen(false);
                }}
              >
                No car selected
              </CommandItem>
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandEmpty>No car found.</CommandEmpty>
              {query.data?.map((car) => (
                <CommandItem
                  key={car.id}
                  onSelect={() => {
                    props.onSelectCar(car);
                    setOpen(false);
                  }}
                  className="gap-2 text-sm"
                >
                  <span className="font-mono text-xs text-muted-foreground">{car.year}</span>
                  <p>
                    {car.make} {car.model}
                  </p>
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      props.selectedCar?.id === car.id ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setShowNewCarDialog(true);
                      setOpen(false);
                    }}
                  >
                    <CirclePlus className="mr-2 h-5 w-5" />
                    Add car...
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Add car</DialogTitle>
          <DialogDescription>Add a new car to manage refuelings.</DialogDescription>
        </DialogHeader>
        <CarCreateForm onSubmit={() => setShowNewCarDialog(false)} />
      </DialogContent>
    </Dialog>
  );
}
