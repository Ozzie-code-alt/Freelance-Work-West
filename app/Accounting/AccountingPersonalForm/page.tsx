import AccountingPage from "@/components/Accounting/AccountingForm";
import UserInfo from "@/components/userInfo";

const page = () => {
  return (
    <div className=" w-screen h-auto px-10 py-20">
      {/*We Can also Put Navbar Here */}
      <div className=" flex  w-full">
        <UserInfo />
      </div>
      <div className=" w-full h-auto text-center">
        <h1 className="text-4xl lg:text-7xl">
          Accounting<br /> Feedback Form{" "}
          <span className="text-sm">(Personal Information)</span>
        </h1>
      </div>
      <AccountingPage />
    </div>
  );
};

export default page;
