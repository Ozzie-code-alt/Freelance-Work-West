
import LoginModal from "@/components/LoginModal";
import React from "react";

const Loginpage = () => {
  return (
    <section className="w-full h-screen border border-yellow-500">
      <div className="flex h-full justify-center border border-red-500 items-center">
        <LoginModal route="/OfficePage"/>
      </div>
    </section>
  );
};

export default Loginpage;
