"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

type DrawerProps = {
  route: string;
};
const Globaldrawer = ({ route }: DrawerProps) => {
  const router = useRouter();
  const handleLogout = () => {
    signOut();
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="bg-black">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent className="flex  justify-center items-center">
        <div className="w-[800px]">
          <DrawerHeader>
            <DrawerTitle>About - Know More about The Office</DrawerTitle>
            <DrawerDescription>
              Logout - Remove Account from this device
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button>About</Button>
            <Button onClick={handleLogout}>Logout</Button>
            <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default Globaldrawer;
