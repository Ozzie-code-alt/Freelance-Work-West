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
import { useRouter } from "next/navigation";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const formSchema = z.object({
  date: z.date({
    required_error: "Please select a date and time",
    invalid_type_error: "That's not a date!",
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

const AdminOfficeandFinancePage = () => {
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      officeVisited: "",
      servicesReceived: "",
      internalClient: "",
      externalClient: "",
      sex: "",
      pointOfOrigin: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    try {
     const res =  await fetch("/api/personal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values }),
      });
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
    
      const data = await res.json();
      console.log(data);

    } catch (error) {
      console.log("Error During Registration", error);
    }
  };

  return (
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
            <FormItem className="w-full">
              <FormLabel className="text-2xl">
                internal Client / Taga WVSU
              </FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} className="h-[60px]" />
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
          name="externalClient"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-2xl">
                External Client / Hinde Taga WVSU
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="External Client"
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
              <FormLabel className="text-2xl">
                Point of Origin / Taga Saan
              </FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} className="h-[60px]" />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default AdminOfficeandFinancePage;
