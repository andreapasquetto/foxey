import { numberFormatter } from "@/common/formatters";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Service } from "@/db/types/mobility";
import { format } from "date-fns";
import { Notebook } from "lucide-react";

export function ServiceList(props: { services: Service[] }) {
  const { services } = props;

  if (!services.length) {
    return <ComponentEmptyState />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="min-w-36">Date</TableHead>
          <TableHead>
            Odometer (<code>km</code>)
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {services.slice(0, 10).map((service) => (
          <TableRow key={service.id}>
            <TableCell>
              <code>{format(service.datetime, "ccc y-MM-dd HH:mm")}</code>
            </TableCell>
            <TableCell>
              <code>{numberFormatter.format(Number(service.odometer))}</code>
            </TableCell>
            <TableCell>
              <div className="flex items-center justify-end gap-1">
                {service.notes && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Dialog>
                        <DialogTrigger>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <Notebook className="h-5 w-5" />
                                <span className="sr-only">View notes</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="top">View notes</TooltipContent>
                          </Tooltip>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Service notes</DialogTitle>
                            <DialogDescription>
                              {format(service.datetime, "ccc y-MM-dd HH:mm")}
                            </DialogDescription>
                          </DialogHeader>
                          <pre className="max-w-full text-wrap">{service.notes}</pre>
                        </DialogContent>
                      </Dialog>
                    </TooltipTrigger>
                    <TooltipContent side="top">View notes</TooltipContent>
                  </Tooltip>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function ComponentEmptyState() {
  return (
    <div className="my-6">
      <p className="text-center text-sm text-muted-foreground">
        There are no services for this car.
      </p>
    </div>
  );
}
