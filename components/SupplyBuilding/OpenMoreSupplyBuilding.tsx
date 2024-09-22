import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import { Dispatch, SetStateAction, useState, useEffect } from "react";

export const SupplyOfficeModalOpenMore = ({ isOpen, setIsOpen, formIDValue }:any) => {
  const [adminInfo, setAdminInfo] = useState({});

  useEffect(() => {
    async function fetchTopics() {
      try {
        const response = await fetch(`/api/supplyOffice/${formIDValue}`); // Make sure this URL is correct
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("this is data", data);
        console.log("typeof data", typeof(data))

        if (!data.hasOwnProperty("supplyOfficeInfo")) {
          throw new Error(
            "Expected property adminInfo not found in the response"
          );
        }
        const { supplyOfficeInfo } = data;

        setAdminInfo(supplyOfficeInfo);
      } catch (error) {
        console.error("Fetching topics failed:", error);
      }
    }

    fetchTopics();
  }, [formIDValue]); // Add formIDValue as a dependency

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-6 rounded-lg w-full  shadow-xl cursor-default relative overflow-hidden"
          >
            <FiAlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            <div className="w-full grid grid-cols-3 place-items-center">
            {Object.entries(adminInfo).map(([key, value]) => (
              <div
                key={key}
                className="p-4 border border-slate-300 my-3 w-[300px] flex justify-between gap-5 items-start"
              >
              
                  <h2 className="font-bold text-lg text-white">{key}</h2>
                  <p className="text-white">{String(value)}</p>
           
              </div>
            ))}
               </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
