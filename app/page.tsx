"use client"
import QrcodePage from "@/components/qrcodePage";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter()
  return (
    <div className="h-screen w-screen  flex flex-col justify-center items-center">
      <QrcodePage />

      <div className="border-2 rounded-xl border-black bg-black/50  hover:cursor-pointer mt-10 px-20 py-10">
        <button className=" text-white hover:text-slate-400 duration-500 text-3xl border" onClick={()=>router.push("/LoginPage")}>Proceed here</button>
      </div>
    </div>
  );
}
