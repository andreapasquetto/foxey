"use client";

import { Barcode } from "lucide-react";
import { toast } from "sonner";
import { copyToClipboard } from "@/common/utils/clipboard";
import { Button } from "@/components/ui/button";

export function CopyToClipboardButton({
  content,
}: {
  content: string | number;
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      className="w-full cursor-pointer items-center justify-between"
      onClick={() => {
        copyToClipboard(String(content));
        toast("Content copied to the clipboard");
      }}
    >
      Copy to clipboard <Barcode />
    </Button>
  );
}
