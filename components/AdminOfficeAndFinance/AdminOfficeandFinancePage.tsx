"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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

const formSchema = z.object({
  Name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  Date: z.date({
    required_error: "Please select a date and time",
    invalid_type_error: "That's not a date!",
  }),
  OfficeVisited: z.string().min(2, {
    message: "Office Visited must be at least 2 characters.",
  }),
  ServicesReceived: z.string().min(2, {
    message: "Services Received must be at least 2 characters.",
  }),
  InternalClient: z.string().min(2, {
    message: "Internal Client must be at least 2 characters.",
  }),
  ExternalClient: z.string().min(2, {
    message: "External Client must be at least 2 characters.",
  }),
  Sex: z.string().min(2, {
    message: "Sex must be at least 2 characters.",
  }),
  PointOfOrigin: z.string().min(2, {
    message: "Point Of Origin must be at least 2 characters.",
  }),


});

const AdminOfficeandFinancePage = () => {
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Date: new Date(),
      Name: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    router.push("/AdministrationOfficeandFinance/ClientFeedbackForm");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="py-20 grid gap-10 lg:grid-cols-2 border w-full h-auto border-red-500 place-items-center"
      >
        <FormField
          control={form.control}
          name="Date"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-2xl">Date</FormLabel>
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
          name="OfficeVisited"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-2xl">Office Visited</FormLabel>
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
          name="ServicesReceived"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-2xl">Services Received</FormLabel>
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
          name="username"
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
          name="username"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-2xl">
                External Client / Hinde Taga WVSU
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
          name="username"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-2xl">Sex / Kasarian</FormLabel>
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
          name="username"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-2xl">Point of Origin / Taga Saan</FormLabel>
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
