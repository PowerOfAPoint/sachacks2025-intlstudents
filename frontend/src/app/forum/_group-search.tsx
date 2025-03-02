"use client";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getBaseUrl } from "@/lib/utils";
import { Group } from "@/lib/db/forum";
import { Result } from "@/lib/types";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export const GroupSearch = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<Group | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: results = [], isLoading } = useQuery({
    queryKey: ["search", searchQuery],
    queryFn: async ({ signal }) => {
      const res = await fetch(
        `${getBaseUrl()}/api/forum/groups?query=${searchQuery}`,
        {
          signal,
        },
      );

      const json = (await res.json()) as Result<Group[], string>;

      if (!json.ok) {
        toast.error("An error occurred", {
          description: json.error,
        });
        return [];
      }

      return json.data;
    },
  });

  useImperativeHandle(ref, () => ({
    value: selectedValue,
  }));

  const handleSelect = (value: Group) => {
    setSelectedValue(value);
    setOpen(false);
  };

  return (
    <>
      <Button
        variant={selectedValue ? "default" : "outline"}
        className="px-4 py-2"
        onClick={() => setOpen(true)}
      >
        {selectedValue?.name
          ? `Group: ${selectedValue.name}`
          : "Select a group"}
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search for a group..."
          onValueChange={setSearchQuery}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            {results.map((result) => (
              <CommandItem
                key={result.id}
                value={result.id}
                onSelect={() => handleSelect(result)}
              >
                {/* <Settings /> */}
                <span>{result.name}</span>
                {/* <CommandShortcut>⌘S</CommandShortcut> */}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
});
