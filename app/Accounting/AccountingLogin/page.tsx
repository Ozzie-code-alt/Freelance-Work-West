import LoginModal from "@/components/LoginModal";
import ParticleRing from "@/components/ParticleRing";
const page = () => {
  return (
    <div className=" bg-purple-500 w-screen h-screen flex flex-col justify-center  items-center px-10 py-20">
      <div className="absolute w-screen h-full z-0">
        <ParticleRing />
      </div>

      <div className="w-full pb-20 h-auto text-center text-white z-10">
        <h1 className="text-4xl lg:text-7xl">
          Accounting <br />
        </h1>
      </div>
      {/*Pass Props Here then*/}
      <div className="z-10">
        <LoginModal route="/Accounting/AccountingPersonalForm" />
      </div>
    </div>
  );
};

export default page;
