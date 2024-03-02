import CashierFormPage from "@/components/Cashier/CashierForm";
const page = () => {
  return (
    <div className="border border-blue-500 w-screen h-auto px-10 py-20">
      <div className="border border-green-500 w-full h-auto text-center">
        <h1 className="text-4xl lg:text-7xl">
          Cashier <br /> Feedback Form{" "}
          <span className="text-sm">(Personal Information)</span>
        </h1>
      </div>
      <CashierFormPage/>
    </div>
  );
};

export default page;
