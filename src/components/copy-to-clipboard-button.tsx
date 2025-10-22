"use client";

import { copyToClipboard } from "@/common/utils/clipboard";
import { Button } from "@/components/ui/button";
import { Barcode } from "lucide-react";

export function CopyToClipboardButton({ content }: { content: string | number }) {
  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={() => copyToClipboard(String(content))}
    >
      <Barcode className="size-5" />
    </Button>
  );
}
