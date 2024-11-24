'use client';
import { useState } from 'react';
import { date, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Puff } from 'react-loader-spinner';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from '@/components/ui/command';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  sqd0: z.string().min(1),
  sqd1: z.string().min(1),
  sqd2: z.string().min(1),
  sqd3: z.string().min(1),
  sqd4: z.string().min(1),
  sqd5: z.string().min(1),
  sqd6: z.string().min(1),
  sqd7: z.string().min(1),
  sqd8: z.string().min(1),
  mean: z.string(),
  comments: z.string()
});

const criteria = [
  { label: '1 - Very Dissatisfied', value: '1' },
  { label: '2 - Dissatisfied', value: '2' },
  { label: '3 - Neutral', value: '3' },
  { label: '4 - Satisfied', value: '4' },
  { label: '5 - Very Satisfied', value: '5' }
] as const;

import { AnimatePresence, motion } from 'framer-motion';

import { FiAlertCircle } from 'react-icons/fi';

{
  /*Modal Function Here -------------------------------------------- */
}
export const IndustrialTechFormModal = ({ isOpen, setIsOpen, adminProps }: any) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sqd0: '',
      sqd1: '',
      sqd2: '',
      sqd3: '',
      sqd4: '',
      sqd5: '',
      sqd6: '',
      sqd7: '',
      sqd8: '',
      mean: '',
      comments: ''
    }
  });
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);

    console.log('Submitted');
    const total =
      parseInt(values.sqd0) +
      parseInt(values.sqd1) +
      parseInt(values.sqd2) +
      parseInt(values.sqd3) +
      parseInt(values.sqd4) +
      parseInt(values.sqd5) +
      parseInt(values.sqd6) +
      parseInt(values.sqd7) +
      parseInt(values.sqd8);

    const userNameContainer = session?.user?.name || '';

    const submittedValues = {
      ...adminProps,
      userName: userNameContainer,
      ...values,
      mean: (total / 8).toString()
    };
    console.log('this is the final Submitted Values', submittedValues);

    try {
      const res = await fetch('/api/industrialTech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...submittedValues })
      });
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      const data = await res.json();

      toast({
        title: 'Up and Ready to Go !!',
        variant: 'success',
        description: 'Form Successfully Sent'
      });

      console.log(data);
      router.push('/Thankyou');
      setLoading(false);
    } catch (error) {
      console.log('Error During Registration', error);
      setLoading(false);
    }
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className='bg-slate-900/20 backdrop-blur p-8 fixed overflow-y-scroll inset-0 z-50 grid place-items-center  cursor-pointer'
        >
          <motion.div
            initial={{ scale: 0, rotate: '12.5deg' }}
            animate={{ scale: 1, rotate: '0deg' }}
            exit={{ scale: 0, rotate: '0deg' }}
            onClick={(e) => e.stopPropagation()}
            className='bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-6 rounded-lg w-full  h-fit shadow-xl cursor-default relative '
          >
            <FiAlertCircle className='text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24' />

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className=' py-0  md:py-20 grid md:gap-10 lg:grid-cols-3  mt  w-full  h-full md:h-auto  '
              >
                <FormField
                  control={form.control}
                  name='sqd0'
                  render={({ field }) => (
                    <FormItem className='flex flex-col gap-3'>
                      <FormLabel className='text-2xl'>
                        {' '}
                        I am satisfied with the service that i availed
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant='outline'
                              role='combobox'
                              className={cn(
                                'w-[200px] justify-between ',
                                !field.value && 'bg-white text-black'
                              )}
                            >
                              {field.value
                                ? criteria.find((language) => language.value === field.value)?.label
                                : ''}
                              <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className='w-[200px] p-0'>
                          <Command>
                            <CommandInput placeholder='Search framework...' className='h-9' />
                            <CommandEmpty>Input not found</CommandEmpty>
                            <CommandGroup>
                              {criteria.map((language) => (
                                <CommandItem
                                  value={language.label}
                                  key={language.value}
                                  onSelect={() => {
                                    form.setValue('sqd0', language.value);
                                  }}
                                >
                                  {language.label}
                                  <CheckIcon
                                    className={cn(
                                      'ml-auto h-4 w-4',
                                      language.value === field.value ? 'opacity-100' : 'opacity-0'
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        <p className='text-yellow-500'>
                          Kindly Choose to the best of your ability please
                        </p>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='sqd1'
                  render={({ field }) => (
                    <FormItem className='flex flex-col gap-3'>
                      <FormLabel className='text-2xl'>
                        {' '}
                        <p>I spent a reasonable amont of time for my transaction</p>
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant='outline'
                              role='combobox'
                              className={cn(
                                'w-[200px] justify-between',
                                !field.value && 'bg-white text-black'
                              )}
                            >
                              {field.value
                                ? criteria.find((language) => language.value === field.value)?.label
                                : ''}
                              <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className='w-[200px] p-0'>
                          <Command>
                            <CommandInput placeholder='Search framework...' className='h-9' />
                            <CommandEmpty>Input not found</CommandEmpty>
                            <CommandGroup>
                              {criteria.map((language) => (
                                <CommandItem
                                  value={language.label}
                                  key={language.value}
                                  onSelect={() => {
                                    form.setValue('sqd1', language.value);
                                  }}
                                >
                                  {language.label}
                                  <CheckIcon
                                    className={cn(
                                      'ml-auto h-4 w-4',
                                      language.value === field.value ? 'opacity-100' : 'opacity-0'
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        <p className='text-yellow-500'>
                          Kindly Choose to the best of your ability please
                        </p>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='sqd2'
                  render={({ field }) => (
                    <FormItem className='flex flex-col gap-3'>
                      <FormLabel className='text-2xl'>
                        The office followed the transaction requirements and steps based on the
                        information provided
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant='outline'
                              role='combobox'
                              className={cn(
                                'w-[200px] justify-between',
                                !field.value && 'bg-white text-black'
                              )}
                            >
                              {field.value
                                ? criteria.find((language) => language.value === field.value)?.label
                                : ''}
                              <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className='w-[200px] p-0'>
                          <Command>
                            <CommandInput placeholder='Search framework...' className='h-9' />
                            <CommandEmpty>Input not found</CommandEmpty>
                            <CommandGroup>
                              {criteria.map((language) => (
                                <CommandItem
                                  value={language.label}
                                  key={language.value}
                                  onSelect={() => {
                                    form.setValue('sqd2', language.value);
                                  }}
                                >
                                  {language.label}
                                  <CheckIcon
                                    className={cn(
                                      'ml-auto h-4 w-4',
                                      language.value === field.value ? 'opacity-100' : 'opacity-0'
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        <p className='text-yellow-500'>
                          Kindly Choose to the best of your ability please
                        </p>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='sqd3'
                  render={({ field }) => (
                    <FormItem className='flex flex-col gap-3'>
                      <FormLabel className='text-2xl'>
                        The steps i needed to do for my transaction were easy and simple
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant='outline'
                              role='combobox'
                              className={cn(
                                'w-[200px] justify-between',
                                !field.value && 'bg-white text-black'
                              )}
                            >
                              {field.value
                                ? criteria.find((language) => language.value === field.value)?.label
                                : ''}
                              <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className='w-[200px] p-0'>
                          <Command>
                            <CommandInput placeholder='Search framework...' className='h-9' />
                            <CommandEmpty>Input not found</CommandEmpty>
                            <CommandGroup>
                              {criteria.map((language) => (
                                <CommandItem
                                  value={language.label}
                                  key={language.value}
                                  onSelect={() => {
                                    form.setValue('sqd3', language.value);
                                  }}
                                >
                                  {language.label}
                                  <CheckIcon
                                    className={cn(
                                      'ml-auto h-4 w-4',
                                      language.value === field.value ? 'opacity-100' : 'opacity-0'
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        <p className='text-yellow-500'>
                          Kindly Choose to the best of your ability please
                        </p>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='sqd4'
                  render={({ field }) => (
                    <FormItem className='flex flex-col gap-3'>
                      <FormLabel className='text-2xl'>
                        I easily found information about my tranaction from the office or its
                        website
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant='outline'
                              role='combobox'
                              className={cn(
                                'w-[200px] justify-between',
                                !field.value && 'bg-white text-black'
                              )}
                            >
                              {field.value
                                ? criteria.find((language) => language.value === field.value)?.label
                                : ''}
                              <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className='w-[200px] p-0'>
                          <Command>
                            <CommandInput placeholder='Search framework...' className='h-9' />
                            <CommandEmpty>Input not found</CommandEmpty>
                            <CommandGroup>
                              {criteria.map((language) => (
                                <CommandItem
                                  value={language.label}
                                  key={language.value}
                                  onSelect={() => {
                                    form.setValue('sqd4', language.value);
                                  }}
                                >
                                  {language.label}
                                  <CheckIcon
                                    className={cn(
                                      'ml-auto h-4 w-4',
                                      language.value === field.value ? 'opacity-100' : 'opacity-0'
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        <p className='text-yellow-500'>
                          Kindly Choose to the best of your ability please
                        </p>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />{' '}
                <FormField
                  control={form.control}
                  name='sqd5'
                  render={({ field }) => (
                    <FormItem className='flex flex-col gap-3'>
                      <FormLabel className='text-2xl'>
                        I paid a reasonable amount of fees for my transaction
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant='outline'
                              role='combobox'
                              className={cn(
                                'w-[200px] justify-between',
                                !field.value && 'bg-white text-black'
                              )}
                            >
                              {field.value
                                ? criteria.find((language) => language.value === field.value)?.label
                                : ''}
                              <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className='w-[200px] p-0'>
                          <Command>
                            <CommandInput placeholder='Search framework...' className='h-9' />
                            <CommandEmpty>Input not found</CommandEmpty>
                            <CommandGroup>
                              {criteria.map((language) => (
                                <CommandItem
                                  value={language.label}
                                  key={language.value}
                                  onSelect={() => {
                                    form.setValue('sqd5', language.value);
                                  }}
                                >
                                  {language.label}
                                  <CheckIcon
                                    className={cn(
                                      'ml-auto h-4 w-4',
                                      language.value === field.value ? 'opacity-100' : 'opacity-0'
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        <p className='text-yellow-500'>
                          Kindly Choose to the best of your ability please
                        </p>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='sqd6'
                  render={({ field }) => (
                    <FormItem className='flex flex-col gap-3'>
                      <FormLabel className='text-2xl'>
                        I feel the office was fair to everyone dring my transaction
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant='outline'
                              role='combobox'
                              className={cn(
                                'w-[200px] justify-between',
                                !field.value && 'bg-white text-black'
                              )}
                            >
                              {field.value
                                ? criteria.find((language) => language.value === field.value)?.label
                                : ''}
                              <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className='w-[200px] p-0'>
                          <Command>
                            <CommandInput placeholder='Search framework...' className='h-9' />
                            <CommandEmpty>Input not found</CommandEmpty>
                            <CommandGroup>
                              {criteria.map((language) => (
                                <CommandItem
                                  value={language.label}
                                  key={language.value}
                                  onSelect={() => {
                                    form.setValue('sqd6', language.value);
                                  }}
                                >
                                  {language.label}
                                  <CheckIcon
                                    className={cn(
                                      'ml-auto h-4 w-4',
                                      language.value === field.value ? 'opacity-100' : 'opacity-0'
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        <p className='text-yellow-500'>
                          Kindly Choose to the best of your ability please
                        </p>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='sqd7'
                  render={({ field }) => (
                    <FormItem className='flex flex-col gap-3'>
                      <FormLabel className='text-2xl'>
                        I was treated courteously by the staff and the staff was helpful
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant='outline'
                              role='combobox'
                              className={cn(
                                'w-[200px] justify-between',
                                !field.value && 'bg-white text-black'
                              )}
                            >
                              {field.value
                                ? criteria.find((language) => language.value === field.value)?.label
                                : ''}
                              <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className='w-[200px] p-0'>
                          <Command>
                            <CommandInput placeholder='Search framework...' className='h-9' />
                            <CommandEmpty>Input not found</CommandEmpty>
                            <CommandGroup>
                              {criteria.map((language) => (
                                <CommandItem
                                  value={language.label}
                                  key={language.value}
                                  onSelect={() => {
                                    form.setValue('sqd7', language.value);
                                  }}
                                >
                                  {language.label}
                                  <CheckIcon
                                    className={cn(
                                      'ml-auto h-4 w-4',
                                      language.value === field.value ? 'opacity-100' : 'opacity-0'
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        <p className='text-yellow-500'>
                          Kindly Choose to the best of your ability please
                        </p>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='sqd8'
                  render={({ field }) => (
                    <FormItem className='flex flex-col gap-3'>
                      <FormLabel className='text-2xl'>
                        I got what I needed from the goverment office
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant='outline'
                              role='combobox'
                              className={cn(
                                'w-[200px] justify-between',
                                !field.value && 'bg-white text-black'
                              )}
                            >
                              {field.value
                                ? criteria.find((language) => language.value === field.value)?.label
                                : ''}
                              <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className='w-[200px] p-0'>
                          <Command>
                            <CommandInput placeholder='Search framework...' className='h-9' />
                            <CommandEmpty>Input not found</CommandEmpty>
                            <CommandGroup>
                              {criteria.map((language) => (
                                <CommandItem
                                  value={language.label}
                                  key={language.value}
                                  onSelect={() => {
                                    form.setValue('sqd8', language.value);
                                  }}
                                >
                                  {language.label}
                                  <CheckIcon
                                    className={cn(
                                      'ml-auto h-4 w-4',
                                      language.value === field.value ? 'opacity-100' : 'opacity-0'
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>{' '}
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant='outline'
                                    role='combobox'
                                    className={cn(
                                      'w-[200px] justify-between',
                                      !field.value && 'bg-white text-black'
                                    )}
                                  >
                                    {field.value
                                      ? criteria.find((language) => language.value === field.value)
                                          ?.label
                                      : ''}
                                    <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className='w-[200px] p-0'>
                                <Command>
                                  <CommandInput placeholder='Search framework...' className='h-9' />
                                  <CommandEmpty>Input not found</CommandEmpty>
                                  <CommandGroup>
                                    {criteria.map((language) => (
                                      <CommandItem
                                        value={language.label}
                                        key={language.value}
                                        onSelect={() => {
                                          form.setValue('sqd7', language.value);
                                        }}
                                      >
                                        {language.label}
                                        <CheckIcon
                                          className={cn(
                                            'ml-auto h-4 w-4',
                                            language.value === field.value
                                              ? 'opacity-100'
                                              : 'opacity-0'
                                          )}
                                        />
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </Command>
                              </PopoverContent>
                            </Popover>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        {' '}
                        <p className='text-yellow-500'>
                          Kindly Choose to the best of your ability please
                        </p>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='comments'
                  render={({ field }) => (
                    <FormItem className='flex flex-col gap-3'>
                      <FormLabel className='text-2xl'>Message or Suggestions - Optional</FormLabel>

                      <FormControl>
                        <Input placeholder='shadcn' className='text-black' {...field} />
                      </FormControl>

                      <FormDescription>
                        {' '}
                        <p className='text-yellow-500'>Message or Suggestions</p>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {loading ? (
                  <Puff color='#00BFFF' height={50} width={50} />
                ) : (
                  <Button type='submit' className='w-fit'>
                    SUBMIT
                  </Button>
                )}
              </form>
            </Form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
