"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
type SplashPageAnimatedProps = {
  onAnimationComplete?: any;
  pageRoute: string;
};

const SplashPageAnimated = ({
  onAnimationComplete,
  pageRoute,
}: SplashPageAnimatedProps) => {
  const [isAnimating, setIsAnimating] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const totalAnimationTime = 6000;

    const timer = setTimeout(() => {
      setIsAnimating(false);
      router.push(pageRoute);
    }, totalAnimationTime);

    return () => clearTimeout(timer);
  }, [onAnimationComplete]);
  return (
    <AnimatePresence>
      {isAnimating && (
        <motion.div
          className={cn(
            "relative h-screen w-full  overflow-hidden",
            !isAnimating ? "hidden" : ""
          )}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
        >
          <div className="absolute top-0 left-0 right-0 h-full w-full">
            <motion.div
              initial={{ y: 200, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                ease: "easeOut",
                duration: 1,
              }}
              className="flex h-full w-full items-center justify-center bg-white"
            >
              <img src="/WestLogoSplash.png" alt="West Logo" className="w-80" />
            </motion.div>
          </div>
          <motion.div
            initial={{ y: -650, x: -650 }}
            animate={{ y: 0, x: 0 }}
            transition={{
              ease: "easeOut",
              duration: 1,
              delay: 1.0,
            }}
            className="absolute top-0 left-0 right-0 h-full  w-full"
          >
            <img
              src="/bg-blur-cp.png"
              alt=""
              className="h-full w-full scale-[2]"
            />
          </motion.div>
          <div className="absolute top-0 left-0 right-0 h-full w-full">
            <div className="flex h-full w-full items-center justify-center">
              <motion.div
                initial={{ x: -700, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  ease: "easeInOut",
                  type: "spring",
                  duration: 2,
                  delay: 3.3,
                }}
                className="md:mr-80 md:mb-96 text-3xl md:text-9xl font-black italic tracking-widest text-white"
              >
                West Visayas
              </motion.div>
            </div>
          </div>
          <div className="absolute top-0 left-0 right-0 h-full w-full">
            <div className="flex h-full w-full items-center justify-center">
              <motion.div
                initial={{ opacity: 0, x: 700 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  ease: "easeInOut",
                  type: "spring",
                  duration: 2,
                  delay: 3.3,
                }}
                className="md:ml-[24rem] mt-40 md:mt-[30rem] text-3xl md:text-9xl font-black italic tracking-widest text-white"
              >
                Pototan Campus
              </motion.div>
            </div>
          </div>
          <div className="absolute top-0 left-0 right-0 h-full w-full">
            <motion.div
              initial={{ scale: 4, opacity: 0, rotate: 20 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{
                ease: "easeInOut",
                type: "spring",
                duration: 2.2,
                delay: 3.3,
              }}
              className="flex h-full w-full items-center justify-center"
            >
              <img src="/" alt="" className="mr-10 w-[1150px]" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashPageAnimated;
