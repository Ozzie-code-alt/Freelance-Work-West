"use client"

import { ColumnDef } from "@tanstack/react-table"
import * as z from "zod";
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
    accessorKey:"userName",
    header:"Name"
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
]
