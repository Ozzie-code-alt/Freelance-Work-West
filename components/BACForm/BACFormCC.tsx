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
import sendEmail from '@/lib/emailjs';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  cc1: z.string().min(1),
  cc2: z.string().min(1),
  cc3: z.string().min(1)
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
import { BACFormModal } from './BACFormModal';

export const BACFormCC = ({ isOpen, setIsOpen, adminProps }: any) => {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cc1: '',
      cc2: '',
      cc3: ''
    }
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsFormModalOpen(true)
  };
  const submissionData = 'hello';
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className='bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer'
        >
          <motion.div
            initial={{ scale: 0, rotate: '12.5deg' }}
            animate={{ scale: 1, rotate: '0deg' }}
            exit={{ scale: 0, rotate: '0deg' }}
            onClick={(e) => e.stopPropagation()}
            className='bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-6 rounded-lg w-full max-w-lg h-full shadow-xl cursor-default relative '
          >
            <FiAlertCircle className='text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24' />

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className=' py-0  md:py-20 grid md:gap-10 lg:grid-cols-2  mt overflow-y-scroll w-full space-y-8 h-full md:h-auto  place-items-center'
              >
                <FormField
                  control={form.control}
                  name='cc1'
                  render={({ field }) => (
                    <FormItem className='flex flex-col'>
                      <FormLabel>
                        {' '}
                        Which of The Follow best Descibes Your awareness of a CC ?
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
                                : 'Select language'}
                              <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className='w-[200px] p-0'>
                          <Command>
                            <CommandInput placeholder='Search framework...' className='h-9' />
                            <CommandEmpty>No framework found.</CommandEmpty>
                            <CommandGroup>
                              {criteria.map((language) => (
                                <CommandItem
                                  value={language.label}
                                  key={language.value}
                                  onSelect={() => {
                                    form.setValue('cc1', language.value);
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
                          This is the language that will be used in the dashboard.
                        </p>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='cc2'
                  render={({ field }) => (
                    <FormItem className='flex flex-col'>
                      <FormLabel>
                        {' '}
                        <p> if aware of CC, would you say that the CC of this office was ?</p>
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
                                : 'Select language'}
                              <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className='w-[200px] p-0'>
                          <Command>
                            <CommandInput placeholder='Search framework...' className='h-9' />
                            <CommandEmpty>No framework found.</CommandEmpty>
                            <CommandGroup>
                              {criteria.map((language) => (
                                <CommandItem
                                  value={language.label}
                                  key={language.value}
                                  onSelect={() => {
                                    form.setValue('cc2', language.value);
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
                          This is the language that will be used in the dashboard.
                        </p>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='cc3'
                  render={({ field }) => (
                    <FormItem className='flex flex-col'>
                      <FormLabel>
                        If aware of CC, how much did the CC help you in your transaction ?
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
                                : 'Select language'}
                              <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className='w-[200px] p-0'>
                          <Command>
                            <CommandInput placeholder='Search framework...' className='h-9' />
                            <CommandEmpty>No framework found.</CommandEmpty>
                            <CommandGroup>
                              {criteria.map((language) => (
                                <CommandItem
                                  value={language.label}
                                  key={language.value}
                                  onSelect={() => {
                                    form.setValue('cc3', language.value);
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
                          This is the language that will be used in the dashboard.
                        </p>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type='submit'>Next</Button>
              </form>
            </Form>
          </motion.div>
        </motion.div>
      )}
      <BACFormModal
        isOpen={isFormModalOpen}
        setIsOpen={setIsFormModalOpen}
        adminProps={submissionData}
      />
    </AnimatePresence>
  );
};
