import MedicalFormPage from "@/components/Medical/MedicalForm";
import UserInfo from "@/components/userInfo";
const page = () => {
  return (
    <div className="border border-blue-500 w-screen h-auto px-10 py-20">
      {/*We Can also Put Navbar Here */}
      <div className="border flex border-yellow-500 w-full">
        <UserInfo />
      </div>
      <div className="border border-green-500 w-full h-auto text-center">
        <h1 className="text-4xl lg:text-7xl">
          Medical <br /> Feedback Form{" "}
          <span className="text-sm">(Personal Information)</span>
        </h1>
      </div>
      <MedicalFormPage />
    </div>
  );
};

export default page;
