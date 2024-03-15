"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
// import { useSession } from "next-auth/react";
import { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { RecordsOfficeFormModal } from "./RecordsOfficeModal";
const formSchema = z.object({
  date: z.date({
    required_error: "Please select a date and time",
    invalid_type_error: "That's not a date!",
  }),
  userName: z.string().optional(),
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

const RecordsOfficeFormPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const { data: session } = useSession();


  const { toast } = useToast();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      officeVisited: "",
      userName: "",
      servicesReceived: "",
      internalClient: "",
      externalClient: "",
      sex: "",
      pointOfOrigin: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsOpen(true);

  };

  const submissionData = form.getValues();
  //popover Content
  const languages = [
    { label: "Student / Estudyante", value: "Student" },
    { label: "Faculty / Titser", value: "Faculty" },
    { label: "Staff / Kawani Na Di Nagtuturo", value: "Staff" },
  ] as const;

  const externalClientOptions = [
    { label: "General Public / Pribadong Indibidwal", value: "General Public" },
    {
      label: "Goverment Employee  / Kawari ng Pamahalaan",
      value: "Government Employee",
    },
    {
      label: "Private Employee / Nagtatrabaho sa Proibadong Ahensya",
      value: "Private Employee",
    },
  ] as const;

  /*-------------------------------------------------------------------------------------------------------------------*/
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="py-20 grid gap-10 lg:grid-cols-2 border w-full h-auto border-red-500 place-items-center"
        >
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-2xl">Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value || null}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="officeVisited"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-2xl">Office Visited</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Office Visited"
                    {...field}
                    className="h-[60px]"
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="servicesReceived"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-2xl">Services Received</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Services Received"
                    {...field}
                    className="h-[60px]"
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="internalClient"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel className="text-2xl">
                  Internal Client /Taga WVSU
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[300px] md:w-[500px] justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? languages.find(
                              (language) => language.value === field.value
                            )?.label
                          : "Internal Client"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Options..." className="h-9" />
                      <CommandEmpty>Nothing found.</CommandEmpty>
                      <CommandGroup>
                        {languages.map((language) => (
                          <CommandItem
                            value={language.label}
                            key={language.value}
                            onSelect={() => {
                              form.setValue("internalClient", language.value);
                            }}
                          >
                            {language.label}
                            <CheckIcon
                              className={cn(
                                "ml-auto h-4 w-4",
                                language.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  This is the language that will be used in the dashboard.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="externalClient"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel className="text-2xl">
                  External Client /HindeTaga WVSU
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[300px] md:w-[500px] overflow-hidden justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? externalClientOptions.find(
                              (options) => options.value === field.value
                            )?.label
                          : "External Client"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Options..." className="h-9" />
                      <CommandEmpty>Nothing found.</CommandEmpty>
                      <CommandGroup>
                        {externalClientOptions.map((options) => (
                          <CommandItem
                            value={options.label}
                            key={options.value}
                            onSelect={() => {
                              form.setValue("externalClient", options.value);
                            }}
                          >
                            {options.label}
                            <CheckIcon
                              className={cn(
                                "ml-auto h-4 w-4",
                                options.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  This is the language that will be used in the dashboard.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sex"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-2xl">Sex / Kasarian</FormLabel>
                <FormControl>
                  <Input placeholder="Sex" {...field} className="h-[60px]" />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pointOfOrigin"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-2xl">Point Of Origin</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Point Of Origin" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="luzon">Luzon</SelectItem>
                    <SelectItem value="visayas">Visayas</SelectItem>
                    <SelectItem value="mindanao">Mindanao</SelectItem>
                    <SelectItem value="abroad">Abroad</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <RecordsOfficeFormModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        adminProps={submissionData}
      />
    </>
  );
};

export default RecordsOfficeFormPage;
