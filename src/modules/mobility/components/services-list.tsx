import { format } from "date-fns";
import Decimal from "decimal.js";
import { Notebook } from "lucide-react";
import { numberFormatter } from "@/common/formatters";
import { EmptyStateMessage } from "@/components/empty-state/empty-state-message";
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
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Service } from "@/db/types/mobility";

export function ServicesList(props: { services: Service[] }) {
  const { services } = props;

  if (!services.length) {
    return <EmptyStateMessage message="There are no services for this car." />;
  }

  return (
    <div className="space-y-3">
      {services
        .toReversed()
        .slice(0, 3)
        .map((service, i, services) => (
          <Item key={service.id} variant="outline" className="relative">
            {service.notes && (
              <div className="absolute top-2 right-2">
                <Dialog>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Notebook />
                        </Button>
                      </DialogTrigger>
                    </TooltipTrigger>
                    <TooltipContent>View notes</TooltipContent>
                  </Tooltip>
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
              </div>
            )}
            <ItemContent>
              <ItemDescription>
                {format(service.datetime, "ccc y-MM-dd HH:mm")}
              </ItemDescription>
              <ItemTitle>
                {numberFormatter.format(Number(service.odometer))} km
              </ItemTitle>
              {i < services.length - 1 && (
                <ItemDescription>
                  {numberFormatter.format(
                    new Decimal(service.odometer)
                      .sub(services[i + 1].odometer)
                      .toNumber(),
                  )}{" "}
                  km
                </ItemDescription>
              )}
            </ItemContent>
          </Item>
        ))}
    </div>
  );
}
