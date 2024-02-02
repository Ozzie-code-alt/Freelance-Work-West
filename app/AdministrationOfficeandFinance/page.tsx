import AdminOfficeandFinancePage from "@/components/AdminOfficeAndFinance/AdminOfficeandFinancePage";
import LoginModal from "@/components/LoginModal";
const page = () => {
  return (
    <div className="border border-blue-500 w-screen h-auto flex flex-col justify-center  items-center px-10 py-20">
      <div className="border border-green-500 w-full pb-20 h-auto text-center">
        <h1 className="text-4xl lg:text-7xl">
          Aministration Office and Finance <br /> 

        </h1>
      </div>
      {/*Pass Props Here then*/}
      <LoginModal route="/AdministrationOfficeandFinance/AdministrationOfficePersonalForm"/>
    </div>
  );
};

export default page;
