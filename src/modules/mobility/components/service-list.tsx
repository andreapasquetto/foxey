import { numberFormatter } from "@/common/formatters";
import { EmptyStateMessage } from "@/components/empty-state/empty-state-message";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Service } from "@/db/types/mobility";
import { format } from "date-fns";
import Decimal from "decimal.js";
import { Notebook } from "lucide-react";

export function ServiceList(props: { services: Service[] }) {
  const { services } = props;

  if (!services.length) {
    return <EmptyStateMessage message="There are no services for this car." />;
  }

  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
      {services.toReversed().map((service, i, services) => (
        <Card key={service.id} className="relative">
          {service.notes && (
            <div className="absolute right-2 top-2">
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
            </div>
          )}
          <CardHeader>
            <CardDescription>{format(service.datetime, "ccc y-MM-dd HH:mm")}</CardDescription>
            <CardTitle>{numberFormatter.format(Number(service.odometer))} km</CardTitle>
            {i < services.length - 1 && (
              <CardDescription>
                {numberFormatter.format(
                  new Decimal(service.odometer).sub(services[i + 1].odometer).toNumber(),
                )}{" "}
                km
              </CardDescription>
            )}
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
