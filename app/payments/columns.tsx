"use client";

import { ColumnDef } from "@tanstack/react-table";
import * as z from "zod";
import { MoreHorizontal } from "lucide-react";
import { SpringModal } from "@/components/OpenMoreModal";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
const formSchema = z.object({
  date: z.date({
    required_error: "Please select a date and time",
    invalid_type_error: "That's not a date!",
  }),
  userName: z.string().min(2, {
    message: "Office Visited must be at least 2 characters.",
  }),
  officeVisited: z.string().min(2, {
    message: "Office Visited must be at least 2 characters.",
  }),
  servicesReceived: z.string().min(2, {
    message: "Services Received must be at least 2 characters.",
  }),
  internalClient: z.string().min(2, {
    message: "Internal Client must be at least 2 characters.",
  }),
  externalClient: z.string().min(2, {
    message: "External Client must be at least 2 characters.",
  }),
  sex: z.string().min(2, {
    message: "Sex must be at least 2 characters.",
  }),
  pointOfOrigin: z.string().min(2, {
    message: "Point Of Origin must be at least 2 characters.",
  }),
});

export type FormData = z.infer<typeof formSchema>;

export const columns: ColumnDef<FormData>[] = [
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "userName",
    header: "Name",
  },
  {
    accessorKey: "officeVisited",
    header: "Office Visited",
  },
  {
    accessorKey: "servicesReceived",
    header: "Services Received",
  },
  {
    accessorKey: "internalClient",
    header: "Internal Client",
  },
  {
    accessorKey: "externalClient",
    header: "External Client",
  },
  {
    accessorKey: "sex",
    header: "Sex",
  },
  {
    accessorKey: "pointOfOrigin",
    header: "Point Of Origin",
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const form = row.original;
      const [isOpen, setIsOpen] = useState(false);

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(form.userName)}
            >
              Delete
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsOpen(true)}>
              View More
            </DropdownMenuItem>
          </DropdownMenuContent>
          <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} />
        </DropdownMenu>
      );
    },
  },
];
