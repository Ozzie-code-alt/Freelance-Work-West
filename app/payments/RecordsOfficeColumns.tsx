'use client';

import { ColumnDef } from '@tanstack/react-table';
import * as z from 'zod';
import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { RecordsOfficeOpenMore } from '@/components/RecordsOffice/OpenMoreRecordsOffice';
import { Row } from '@tanstack/react-table'; // Import the Row type from @tanstack/react-table
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
const formSchema = z.object({
  date: z.date({
    required_error: 'Please select a date and time',
    invalid_type_error: "That's not a date!"
  }),
  userName: z.string().min(2, {
    message: 'Office Visited must be at least filled in.'
  }),
  officeVisited: z.string().min(2, {
    message: 'Office Visited must be at least filled in.'
  }),
  servicesReceived: z.string().min(2, {
    message: 'Services Received must be at least filled in.'
  }),
  internalClient: z.string().min(2, {
    message: 'Internal Client must be at least filled in.'
  }),
  externalClient: z.string().min(2, {
    message: 'External Client must be at least filled in.'
  }),
  sex: z.string().min(2, {
    message: 'Sex must be at least filled in.'
  }),
  pointOfOrigin: z.string().min(2, {
    message: 'Point Of Origin must be at least filled in.'
  })
});

export type FormData = z.infer<typeof formSchema> & { _id: string };

type ActionsCellProps = {
  row: Row<FormData>;
};

const ActionsCell: React.FC<ActionsCellProps> = ({ row }) => {
  const form = row.original;
  const [isOpen, setIsOpen] = useState(false);

  // Assuming you have a function to handle the delete action
  const handleDelete = (id: string) => {
    console.log(`ID for this one: ${id}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='h-8 w-8 p-0'>
          <span className='sr-only'>Open menu</span>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => handleDelete(form._id)}>Delete</DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => setIsOpen(true)}>View More</DropdownMenuItem>
      </DropdownMenuContent>
      <RecordsOfficeOpenMore isOpen={isOpen} setIsOpen={setIsOpen} formIDValue={form._id} />
    </DropdownMenu>
  );
};

export const RecordsOfficeColumns: ColumnDef<FormData>[] = [
  {
    accessorKey: '_id',
    header: 'ID'
  },
  {
    accessorKey: 'date',
    header: 'Date'
  },
  {
    accessorKey: 'userName',
    header: 'Name'
  },
  {
    accessorKey: 'officeVisited',
    header: 'Office Visited'
  },
  {
    accessorKey: 'servicesReceived',
    header: 'Services Received'
  },
  {
    accessorKey: 'internalClient',
    header: 'Internal Client'
  },
  {
    accessorKey: 'externalClient',
    header: 'External Client'
  },
  {
    accessorKey: 'sex',
    header: 'Sex'
  },
  {
    accessorKey: 'pointOfOrigin',
    header: 'Point Of Origin'
  },

  {
    id: 'actions',
    cell: ({ row }) => <ActionsCell row={row} />
  }
];
