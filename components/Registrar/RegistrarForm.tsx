'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
// import { useSession } from "next-auth/react";
import { useState } from 'react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from '@/components/ui/command';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { RegistrarFormCC } from './RegistrarFormCC';
const formSchema = z.object({
  date: z.date({
    required_error: 'Please select a date and time',
    invalid_type_error: "That's not a date!"
  }),
  userName: z.string().optional(),
  officeVisited: z.string().min(2, {
    message: 'Office Visited must be at least filled in.'
  }),
  servicesReceived: z.string().min(2, {
    message: 'Services Received must be at least filled in.'
  }),
  age: z.string().min(2, {
    message: 'Internal Client must be at least filled in.'
  }),
  clientType: z.string().min(2, {
    message: 'External Client must be at least filled in.'
  }),
  sex: z.string().min(2, {
    message: 'Sex must be at least filled in.'
  }),
  pointOfOrigin: z.string().min(2, {
    message: 'Point Of Origin must be at least filled in.'
  })
});

const RegistrarFormPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const { data: session } = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      officeVisited: '',
      userName: '',
      servicesReceived: '',
      age: '',
      clientType: '',
      sex: '',
      pointOfOrigin: '',
      date: new Date()
    }
  });

  const onSubmit = async () => {
    setIsOpen(true);
  };

  const grabDate = form.getValues('date').toDateString();
  const submissionData = {
    ...form.getValues(),
    date: grabDate
  };
  //popover Content
  // const languages = [
  //   { label: 'Student / Estudyante', value: 'Student' },
  //   { label: 'Faculty / Titser', value: 'Faculty' },
  //   { label: 'Staff / Kawani Na Di Nagtuturo', value: 'Staff' }
  // ] as const;

  const externalClientOptions = [
    { label: 'General Public / Pribadong Indibidwal', value: 'General Public' },
    {
      label: 'Goverment Employee  / Kawari ng Pamahalaan',
      value: 'Government Employee'
    },
    {
      label: 'Private Employee / Nagtatrabaho sa Proibadong Ahensya',
      value: 'Private Employee'
    }
  ] as const;

  /*-------------------------------------------------------------------------------------------------------------------*/
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='py-20 grid gap-10 lg:grid-cols-2  w-full h-auto  place-items-center'
        >
          <FormField
            control={form.control}
            name='date'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className='text-2xl mr-5'>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-[240px] pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                        <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                      mode='single'
                      selected={field.value || null}
                      onSelect={field.onChange}
                      disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <FormDescription>Please Select the Current Date</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='officeVisited'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className='text-2xl'>Office Visited</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Office Visited'
                    {...field}
                    className='h-[60px] w-[300px] md:w-full'
                  />
                </FormControl>
                <FormDescription>Kindly write which Office you have just visited</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='servicesReceived'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className='text-2xl'>Services Received</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Services Received'
                    {...field}
                    className='h-[60px] w-[300px] md:w-full'
                  />
                </FormControl>
                <FormDescription>
                  Kindly Write which Services you have just received
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='age'
            render={({ field }) => (
              <FormItem className='flex flex-col w-full'>
                <FormLabel className='text-2xl'>Age</FormLabel>

                <FormControl>
                  <Input placeholder='Age' {...field} className='h-[60px] w-[300px] md:w-full' />
                </FormControl>

                <FormDescription>How old are you ?</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='clientType'
            render={({ field }) => (
              <FormItem className='flex flex-col w-full'>
                <FormLabel className='text-2xl'>Client Type</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant='outline'
                        role='combobox'
                        className={cn(
                          ' w-[300px] md:w-[500px] overflow-hidden justify-between',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value
                          ? externalClientOptions.find((options) => options.value === field.value)
                              ?.label
                          : 'External Client'}
                        <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-[300px] md:w-full p-0'>
                    <Command>
                      <CommandInput placeholder='Options...' className='h-9' />
                      <CommandEmpty>Nothing found.</CommandEmpty>
                      <CommandGroup>
                        {externalClientOptions.map((options) => (
                          <CommandItem
                            value={options.label}
                            key={options.value}
                            onSelect={() => {
                              form.setValue('clientType', options.value);
                            }}
                          >
                            {options.label}
                            <CheckIcon
                              className={cn(
                                'ml-auto h-4 w-4',
                                options.value === field.value ? 'opacity-100' : 'opacity-0'
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>Kindly Select which of the Options apply to you</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='sex'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className='text-2xl'>Sex / Kasarian</FormLabel>
                <FormControl>
                  <Input placeholder='Sex' {...field} className='h-[60px]' />
                </FormControl>
                <FormDescription>Kindly fill out which Gender applies to you</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='pointOfOrigin'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className='text-2xl'>Point Of Origin</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select Point Of Origin' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='luzon'>Luzon</SelectItem>
                    <SelectItem value='visayas'>Visayas</SelectItem>
                    <SelectItem value='mindanao'>Mindanao</SelectItem>
                    <SelectItem value='abroad'>Abroad</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>Next</Button>
        </form>
      </Form>
      <RegistrarFormCC isOpen={isOpen} setIsOpen={setIsOpen} adminProps={submissionData} />
    </>
  );
};

export default RegistrarFormPage;
