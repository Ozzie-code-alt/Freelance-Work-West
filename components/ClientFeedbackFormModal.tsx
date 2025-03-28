'use client';
import { date, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Puff } from 'react-loader-spinner';
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

const formSchema = z.object({
  responsiveness: z.string().min(1),
  reliability: z.string().min(1),
  access: z.string().min(1),
  communication: z.string().min(1),
  costs: z.string().min(1),
  integrity: z.string().min(1),
  assurance: z.string().min(1),
  outcome: z.string().min(1),
  message: z.string().min(1).max(100)
});

const criteria = [
  { label: '1 - Very Dissatisfied', value: '1' },
  { label: '2 - Dissatisfied', value: '2' },
  { label: '3 - Neutral', value: '3' },
  { label: '4 - Satisfied', value: '4' },
  { label: '5 - Very Satisfied', value: '5' }
] as const;

import { AnimatePresence, motion } from 'framer-motion';
import { Dispatch, SetStateAction, useState } from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
{
  /*Modal Function Here -------------------------------------------- */
}
export const AdministrationOfficeAndFinanceModal = ({ isOpen, setIsOpen, adminProps }: any) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      responsiveness: '',
      reliability: '',
      access: '',
      communication: '',
      costs: '',
      integrity: '',
      assurance: '',
      outcome: '',
      message: ''
    }
  });
  const router = useRouter();
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values);
    console.log('Submitted');
    const total =
      parseInt(values.responsiveness) +
      parseInt(values.reliability) +
      parseInt(values.access) +
      parseInt(values.communication) +
      parseInt(values.costs) +
      parseInt(values.integrity) +
      parseInt(values.assurance) +
      parseInt(values.outcome);

    console.log('Submitted');

    const userNameContainer = session?.user?.name || '';
    const submittedValues = {
      ...adminProps,
      userName: userNameContainer,
      ...values,
      mean: (total / 8).toString()
    };
    // console.log(submittedValues)
    try {
      const res = await fetch('/api/personal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...submittedValues })
      });
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
        setLoading(false);
      }
      const data = await res.json();
      toast({
        title: 'Up and Ready to Go !!',
        variant: 'success',
        description: 'Form Successfully Sent'
      });
      sendEmail({
        to_name: session?.user?.name || 'User',
        contact: 'contact Value Here',
        user_email: session?.user?.email || 'justinsantos731@gmail.com',
        type: 'Form Type Here',
        subject: 'Wedding Inquiry Here',
        message: 'it is DONE'
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
          className='bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer'
        >
          <motion.div
            initial={{ scale: 0, rotate: '12.5deg' }}
            animate={{ scale: 1, rotate: '0deg' }}
            exit={{ scale: 0, rotate: '0deg' }}
            onClick={(e) => e.stopPropagation()}
            className='bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-6 rounded-lg w-full h-full max-w-lg shadow-xl cursor-default relative overflow-hidden'
          >
            <FiAlertCircle className='text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24' />

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='py-0 md:py-20 grid gap-10 lg:grid-cols-2  overflow-hidden w-full space-y-8 h-auto  place-items-center'
              >
                <FormField
                  control={form.control}
                  name='responsiveness'
                  render={({ field }) => (
                    <FormItem className='flex flex-col'>
                      <FormLabel> Responsiveness</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant='outline'
                              role='combobox'
                              className={cn(
                                'w-[200px] justify-between text-black',
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
                            <CommandEmpty>No framework found.</CommandEmpty>
                            <CommandGroup>
                              {criteria.map((language) => (
                                <CommandItem
                                  value={language.label}
                                  key={language.value}
                                  onSelect={() => {
                                    form.setValue('responsiveness', language.value);
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
                        <p className='text-yellow-500'>Please Answer to the best of your ability</p>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='reliability'
                  render={({ field }) => (
                    <FormItem className='flex flex-col'>
                      <FormLabel>
                        {' '}
                        <p>Realibility - Maasahan </p>
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
                            <CommandEmpty>No framework found.</CommandEmpty>
                            <CommandGroup>
                              {criteria.map((language) => (
                                <CommandItem
                                  value={language.label}
                                  key={language.value}
                                  onSelect={() => {
                                    form.setValue('reliability', language.value);
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
                        <p className='text-yellow-500'>Please Answer to the best of your ability</p>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='access'
                  render={({ field }) => (
                    <FormItem className='flex flex-col'>
                      <FormLabel>Accees & Facilities - Lokasyon at Pasilad</FormLabel>
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
                            <CommandEmpty>No framework found.</CommandEmpty>
                            <CommandGroup>
                              {criteria.map((language) => (
                                <CommandItem
                                  value={language.label}
                                  key={language.value}
                                  onSelect={() => {
                                    form.setValue('access', language.value);
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
                        <p className='text-yellow-500'>Please Answer to the best of your ability</p>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='communication'
                  render={({ field }) => (
                    <FormItem className='flex flex-col'>
                      <FormLabel>Pakikipag-usap</FormLabel>
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
                            <CommandEmpty>No framework found.</CommandEmpty>
                            <CommandGroup>
                              {criteria.map((language) => (
                                <CommandItem
                                  value={language.label}
                                  key={language.value}
                                  onSelect={() => {
                                    form.setValue('communication', language.value);
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
                        <p className='text-yellow-500'>Please Answer to the best of your ability</p>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='costs'
                  render={({ field }) => (
                    <FormItem className='flex flex-col'>
                      <FormLabel>Costs - Gastos</FormLabel>
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
                            <CommandEmpty>No framework found.</CommandEmpty>
                            <CommandGroup>
                              {criteria.map((language) => (
                                <CommandItem
                                  value={language.label}
                                  key={language.value}
                                  onSelect={() => {
                                    form.setValue('costs', language.value);
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
                        <p className='text-yellow-500'>Please Answer to the best of your ability</p>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />{' '}
                <FormField
                  control={form.control}
                  name='integrity'
                  render={({ field }) => (
                    <FormItem className='flex flex-col'>
                      <FormLabel>Integrity - Kawastuhan ng mga Kilos</FormLabel>
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
                            <CommandEmpty>No framework found.</CommandEmpty>
                            <CommandGroup>
                              {criteria.map((language) => (
                                <CommandItem
                                  value={language.label}
                                  key={language.value}
                                  onSelect={() => {
                                    form.setValue('integrity', language.value);
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
                        <p className='text-yellow-500'>Please Answer to the best of your ability</p>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='assurance'
                  render={({ field }) => (
                    <FormItem className='flex flex-col'>
                      <FormLabel>Assurance - Pagtitiwala</FormLabel>
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
                            <CommandEmpty>No framework found.</CommandEmpty>
                            <CommandGroup>
                              {criteria.map((language) => (
                                <CommandItem
                                  value={language.label}
                                  key={language.value}
                                  onSelect={() => {
                                    form.setValue('assurance', language.value);
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
                        <p className='text-yellow-500'>Please Answer to the best of your ability</p>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='outcome'
                  render={({ field }) => (
                    <FormItem className='flex flex-col'>
                      <FormLabel>Outcome - Kinalabasan</FormLabel>
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
                            <CommandEmpty>No framework found.</CommandEmpty>
                            <CommandGroup>
                              {criteria.map((language) => (
                                <CommandItem
                                  value={language.label}
                                  key={language.value}
                                  onSelect={() => {
                                    form.setValue('outcome', language.value);
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
                        <p className='text-yellow-500'>Please Answer to the best of your ability</p>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='message'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Leave a Message :</FormLabel>
                      <FormControl>
                        <Input placeholder='shadcn' className='text-black' {...field} />
                      </FormControl>
                      <FormDescription>
                        {' '}
                        <p className='text-yellow-500'>Please Answer to the best of your ability</p>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {loading ? (
                  <Puff color='#fff' height={50} width={50} />
                ) : (
                  <Button type='submit'>Submit</Button>
                )}
              </form>
            </Form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
