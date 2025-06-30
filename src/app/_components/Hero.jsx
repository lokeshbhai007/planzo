import React from "react";
import Image from "next/image";
import { ContainerScroll } from "../../components/ui/container-scroll-animation";
import WorkStep from "./WorkStep";
import { Sparkles } from "lucide-react";

function Hero() {
  return (
    <section className="bg-gray-50 flex items-center flex-col">
      <div className="flex flex-col overflow-hidden">
        <ContainerScroll
          titleComponent={
            <>
              <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-1.5 rounded-full mb-4 
                            cursor-pointer transform transition-all duration-300 ease-in-out
                            hover:scale-105 hover:shadow-lg hover:shadow-blue-200/50
                            hover:bg-gradient-to-r hover:from-blue-200 hover:to-purple-200
                            active:scale-95
                            animate-pulse
                            group">
                <Sparkles className="w-3 h-3 text-blue-600 mr-2 
                                  transition-all duration-300 
                                  group-hover:text-blue-700 
                                  group-hover:rotate-12 
                                  group-hover:scale-110" />
                <span className="text-xs font-semibold text-blue-700
                               transition-all duration-300
                               group-hover:text-blue-800">
                  Smart & AI-Powered
                </span>
              </div>
              <h1 className="text-4xl font-semibold text-black dark:text-white">
                Manage your Money with AI-Driven Personal <br />
                <span className="text-4xl md:text-[6rem] text-blue-800 font-bold mt-1 leading-none">
                  Finance Advisor
                </span>
              </h1>
            </>
          }
        >
          <Image
            src={`/banner.png`}
            alt="hero"
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-cover h-full object-left-top"
            draggable={false}
          />
        </ContainerScroll>
        <WorkStep />
      </div>
    </section>
  );
}

export default Hero;