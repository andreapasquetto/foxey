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
    <div className="space-y-3">
      {services
        .toReversed()
        .slice(0, 3)
        .map((service, i, services) => (
          <Card key={service.id} className="relative">
            {service.notes && (
              <div className="absolute top-2 right-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Notebook className="size-5" />
                      <span className="sr-only">view notes</span>
                    </Button>
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
