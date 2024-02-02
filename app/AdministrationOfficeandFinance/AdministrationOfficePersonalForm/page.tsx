import AdminOfficeandFinancePage from "@/components/AdminOfficeAndFinance/AdminOfficeandFinancePage";
const page = () => {
  return (
    <div className="border border-blue-500 w-screen h-auto px-10 py-20">
      <div className="border border-green-500 w-full h-auto text-center">
        <h1 className="text-4xl lg:text-7xl">
          Aministration Office and Finance <br /> Feedback Form{" "}
          <span className="text-sm">(Personal Information)</span>
        </h1>
      </div>
      <AdminOfficeandFinancePage />
    </div>
  );
};

export default page;
