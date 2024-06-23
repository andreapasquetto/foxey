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
import { cn } from "@/lib/utils";
import { Car, mockedCars } from "@/mocks/cars";
import { CarCreateForm } from "@/modules/cars/components/car-create-form";
import { CheckIcon, ChevronsUpDown, CirclePlus } from "lucide-react";
import { useState } from "react";

interface CarSwitcherProps {
  selectedCar: Car;
  onSelectCar: (car: Car) => void;
}

export function CarSwitcher(props: CarSwitcherProps) {
  const [open, setOpen] = useState(false);
  const [showNewCarDialog, setShowNewCarDialog] = useState(false);

  return (
    <Dialog open={showNewCarDialog} onOpenChange={setShowNewCarDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={!!open}
            aria-label="Select a team"
            className={cn("w-[250px] justify-between")}
          >
            {props.selectedCar.make} {props.selectedCar.model}
            <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[250px] p-0">
          <Command>
            <CommandList>
              <CommandEmpty>No car found.</CommandEmpty>
              {mockedCars.map((car) => (
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
                      props.selectedCar.id === car.id ? "opacity-100" : "opacity-0",
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
                      setOpen(false);
                      setShowNewCarDialog(true);
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add car</DialogTitle>
          <DialogDescription>Add a new car to manage refuelings.</DialogDescription>
        </DialogHeader>
        <CarCreateForm />
      </DialogContent>
    </Dialog>
  );
}
