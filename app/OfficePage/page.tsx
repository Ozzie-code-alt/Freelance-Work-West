import OfficesContianer from "@/components/OfficesContianer";
const Officepage = () => {
  return (
    <section className="w-screen h-screen">
      <div className="flex  border border-blue-500">
        {/*Left Div */}
        <div className=" border h-screen px-20 py-10 w-auto border-blue-500">
          <h1> <span className="text-5xl">Welcome Back</span> <br /> .. Insert Name Here ..</h1>

        </div>

        <div className="w-full h-full flex flex-col justify-center gap-20 items-center">
          <div className="border border-red-500 px-10 py-10">
            <h1 className="text-5xl text-center">
              West Visayas State <br /> Feedback Forms
            </h1>
          </div>

          <OfficesContianer />
        </div>
      </div>
    </section>
  );
};

export default Officepage;
