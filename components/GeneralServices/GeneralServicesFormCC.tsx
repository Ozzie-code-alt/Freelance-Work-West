'use client';
import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from '@/components/ui/command';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
const formSchema = z.object({
  cc1: z.string().min(1),
  cc2: z.string().min(1),
  cc3: z.string().min(1)
});

const cc1criteria = [
  { label: '1 - I know what a CC is and i Saw this office CC', value: '1' },
  { label: '2 - I know what a CC is but i did not see this office CC', value: '2' },
  { label: '3 - I learned of the CC only when i saw this office CCC', value: '3' },
  { label: '4 - i do not know what a CC is and i did not see one in this office', value: '4' }
] as const;

const cc2criteria = [
  { label: '1 - Easy to See', value: '1' },
  { label: '2 - Somewhat easy to see', value: '2' },
  { label: '3 - Difficult to see', value: '3' },
  { label: '4 - Not Visible at all', value: '4' },
  { label: '5 - N/A', value: '5' }
] as const;

const cc3criteria = [
  { label: '1 - Helped very much', value: '1' },
  { label: '2 - Somewhat helped', value: '2' },
  { label: '3 - Did not help', value: '3' },
  { label: '4 - N/A', value: '4' }
] as const;

import { AnimatePresence, motion } from 'framer-motion';

import { FiAlertCircle } from 'react-icons/fi';
import { GeneralServicesFormModal } from './GeneralServicesFormModal';

export const GeneralServicesFormCC = ({ isOpen, setIsOpen, adminProps }: any) => {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cc1: '',
      cc2: '',
      cc3: ''
    }
  });
  const onSubmit = async () => {
    console.log(adminProps);
    setIsFormModalOpen(true);
  };
  const submissionData = {
    ...adminProps,
    ...form.getValues()
  };

  console.log('this is submission data', submissionData);
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className='bg-slate-900/20 backdrop-blur p-20 fixed inset-0 z-50 grid place-items-center cursor-pointer'
        >
          <motion.div
            initial={{ scale: 0, rotate: '12.5deg' }}
            animate={{ scale: 1, rotate: '0deg' }}
            exit={{ scale: 0, rotate: '0deg' }}
            onClick={(e) => e.stopPropagation()}
            className='bg-gradient-to-br from-violet-600 to-indigo-600 mb-60 text-white p-6 rounded-lg w-full  h-auto shadow-xl cursor-default relative '
          >
            <FiAlertCircle className='text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24' />

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className=' py-0  md:py-20 md:gap-10 flex flex-col   w-full space-y-8 h-full md:h-auto '
              >
                <FormField
                  control={form.control}
                  name='cc1'
                  render={({ field }) => (
                    <FormItem className='flex flex-col gap-5'>
                      <FormLabel className='text-5xl'>
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
                                'w-fit justify-between ',
                                !field.value && 'bg-white text-black'
                              )}
                            >
                              {field.value
                                ? cc1criteria.find((language) => language.value === field.value)
                                    ?.label
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
                              {cc1criteria.map((language) => (
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
                      {/* <FormDescription>
                        <p className='text-yellow-500'>
                          This is the language that will be used in the dashboard.
                        </p>
                      </FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='cc2'
                  render={({ field }) => (
                    <FormItem className='flex flex-col gap-5 '>
                      <FormLabel className='text-5xl'>
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
                                'w-fit justify-between',
                                !field.value && 'bg-white text-black'
                              )}
                            >
                              {field.value
                                ? cc2criteria.find((language) => language.value === field.value)
                                    ?.label
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
                              {cc2criteria.map((language) => (
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='cc3'
                  render={({ field }) => (
                    <FormItem className='flex flex-col gap-5'>
                      <FormLabel className='text-5xl'>
                        If aware of CC, how much did the CC help you in your transaction ?
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant='outline'
                              role='combobox'
                              className={cn(
                                'w-fit justify-between',
                                !field.value && 'bg-white text-black'
                              )}
                            >
                              {field.value
                                ? cc3criteria.find((language) => language.value === field.value)
                                    ?.label
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
                              {cc3criteria.map((language) => (
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
                      {/* <FormDescription>
                        <p className='text-yellow-500'>
                          This is the language that will be used in the dashboard.
                        </p>
                      </FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type='submit' className='w-fit'>
                  Next
                </Button>
              </form>
            </Form>
          </motion.div>
        </motion.div>
      )}
      <GeneralServicesFormModal
        isOpen={isFormModalOpen}
        setIsOpen={setIsFormModalOpen}
        adminProps={submissionData}
      />
    </AnimatePresence>
  );
};
