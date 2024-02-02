"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

type LoginModalProps={
  route: string
}

const LoginModal = ({route}:LoginModalProps) => {
  const [accountData, setAccountData] = useState({ email: "", password: "" });
  const router = useRouter();
  const [passwordData, setPasswordData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { toast } = useToast()

  const handleLoginChange = (e) => {
    setAccountData({ ...accountData, [e.target.id]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.id]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = accountData;
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res?.error) {
        console.log("Invalid Credentials");
        toast({
          variant: "destructive",
          title: "Invalid Credentials",
          description: "Import correct information in the necessary fields",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
        return;
      }
      console.log("Login Works");
      toast({
        variant: "success",
        title: "Success",
        description: "Noice, Correct informaiton",
      })
      router.push(route);
    } catch (error) {
      console.log("Login Error", error);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    console.log(passwordData); // This will log the password form data to the console

    try {
      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...passwordData,
        }),
      });
      if (res.ok) {
        const form = e.target;
        form.reset();
        window.location.reload();
      } else {
        console.log("User Registration Failed");
      }
    } catch (error) {
      console.log("Error During Registration", error);
    }
  };

  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="register">Register</TabsTrigger>
      </TabsList>

      {/*Login Account Account */}
      <TabsContent value="account">
        <form onSubmit={handleLoginSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Login to your account here. Click Submit when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Name</Label>
                <Input id="email" onChange={handleLoginChange} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  onChange={handleLoginChange}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Login</Button>
              
            </CardFooter>
          </Card>
        </form>
      </TabsContent>

      {/*Register Account */}
      <TabsContent value="register">
        <form onSubmit={handleRegisterSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Register</CardTitle>
              <CardDescription>
                Register here, if it is successfull you may Login
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="username"
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  onChange={handlePasswordChange}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  onChange={handlePasswordChange}
                />
              </div>
            </CardContent>

            <CardFooter>
              <Button type="submit" value="Submit">
                Register
              </Button>
            </CardFooter>
          </Card>
        </form>
      </TabsContent>
    </Tabs>
  );
};

export default LoginModal;
