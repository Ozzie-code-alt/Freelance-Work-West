
import LoginModal from "@/components/LoginModal";
import React from "react";

const Loginpage = () => {
  return (
    <section className="w-full h-screen ">
      <div className="flex h-full justify-center items-center">
        <LoginModal route="/OfficePage"/>
      </div>
    </section>
  );
};

export default Loginpage;
