"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ContactList } from "@/modules/contacts/components/contact-list";
import { useState } from "react";

export function ContactListWithFilters() {
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [onlyArchived, setOnlyArchived] = useState(false);

  return (
    <>
      <div className="flex-wrap items-center gap-3 space-y-3 sm:flex sm:space-y-0">
        <div className="shrink-0 sm:w-[250px]">
          <Input
            id="searchPlace"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search..."
          />
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="onlyArchived" className="font-normal">
            Only archived contacts
          </Label>
          <Switch id="onlyArchived" checked={onlyArchived} onCheckedChange={setOnlyArchived} />
        </div>
      </div>
      <ContactList searchFilter={searchFilter} onlyArchived={onlyArchived} />
    </>
  );
}
