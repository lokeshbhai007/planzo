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
              <div className={`relative inline-flex items-center bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-1.5 rounded-full mb-4
                             cursor-pointer transform transition-all duration-500 ease-in-out
                            hover:scale-110 
                            hover:bg-gradient-to-r hover:from-blue-200 hover:to-purple-200
                            active:scale-95
                            animate-pulse
                            group
                            border border-blue-200/50
                            backdrop-blur-sm
                            hover:border-blue-300/70
                            overflow-hidden`}>
                
                {/* Animated background sparkles - always visible and animating */}
                <div className="absolute inset-0 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-1 left-2 w-1 h-1 bg-yellow-400 rounded-full animate-ping" style={{animationDelay: '0.1s'}}></div>
                  <div className="absolute top-2 right-3 w-1.5 h-1.5 bg-pink-400 rounded-full animate-ping" style={{animationDelay: '0.3s'}}></div>
                  <div className="absolute bottom-1 left-1/3 w-1 h-1 bg-green-400 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
                  <div className="absolute bottom-2 right-1/4 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping" style={{animationDelay: '0.7s'}}></div>
                  <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-blue-400 rounded-full animate-ping" style={{animationDelay: '0.9s'}}></div>
                  <div className="absolute top-3 left-1/2 w-1 h-1 bg-indigo-400 rounded-full animate-ping" style={{animationDelay: '1.1s'}}></div>
                  <div className="absolute bottom-3 right-1/3 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping" style={{animationDelay: '1.3s'}}></div>
                </div>
                
                {/* Main sparkles icon with enhanced animation */}
                <Sparkles className={`w-3 h-3 text-blue-600 mr-2 z-10 relative
                                   transition-all duration-500
                                   group-hover:text-purple-600
                                   group-hover:rotate-180
                                   group-hover:scale-125
                                   group-hover:drop-shadow-sm
                                   animate-pulse`} />
                
                <span className={`text-xs font-semibold text-purple-500 z-10 relative
                               transition-all duration-500
                               group-hover:text-purple-800
                               group-hover:font-bold`}>
                  Smart & AI-Powered
                </span>
                
                {/* Hover glow effect */}
                <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 
                               opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm scale-110`}></div>
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