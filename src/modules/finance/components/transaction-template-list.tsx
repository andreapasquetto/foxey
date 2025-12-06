"use client";

import { ChevronsRight, MoreHorizontal } from "lucide-react";
import { rawCurrencyFormatter } from "@/common/formatters";
import { usePagination } from "@/common/hooks/use-pagination";
import { CopyToClipboardButton } from "@/components/copy-to-clipboard-button";
import { EmptyStateMessage } from "@/components/empty-state/empty-state-message";
import { Pagination } from "@/components/pagination";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { TransactionTemplate } from "@/db/types/finance";
import { cn } from "@/lib/utils";

export function TransactionTemplateList({
  templates,
  total,
}: {
  templates: TransactionTemplate[];
  total: number;
}) {
  const pagination = usePagination(total);

  if (!templates.length) {
    return <EmptyStateMessage message="There are no transactions." />;
  }

  return (
    <div className="space-y-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Wallet</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Place</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {templates.map((template) => (
            <TableRow key={template.id}>
              <TableCell>{template.name}</TableCell>
              <TableCell>
                <div>
                  <div className="space-x-1 text-sm text-muted-foreground">
                    {template.from && <span>{template.from.name}</span>}
                    {template.from && template.to && (
                      <ChevronsRight className="inline-block size-5" />
                    )}
                    {template.to && <span>{template.to.name}</span>}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <div>{template.category?.name}</div>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <div>{template.place?.name}</div>
                  {template.place?.category && (
                    <div className="space-x-2 text-sm text-muted-foreground">
                      <span>{template.place.category.name}</span>
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-right">
                {
                  <code
                    className={cn({
                      "text-green-500 dark:text-green-400":
                        template.to && !template.from,
                      "text-red-500 dark:text-red-400":
                        template.from && !template.to,
                      "text-muted-foreground": template.from && template.to,
                    })}
                  >
                    {template.amount &&
                      rawCurrencyFormatter.format(parseFloat(template.amount))}
                  </code>
                }
              </TableCell>
              <TableCell className="flex items-center justify-end gap-1">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="size-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[250px]">
                    <DropdownMenuItem asChild>
                      <CopyToClipboardButton content={template.id} />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination {...pagination} />
    </div>
  );
}
