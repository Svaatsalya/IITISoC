import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import ImageSlider from "./components/Carousel";
import FloatingShapes from "./components/FloatingShapes";

export default function App() {
  return (
    <main>
      
      <img className="absolute top-0 right-0 opacity-60 -z-10" src="./gradient.png" alt="Gradient-img" />
      <div className="h-0 w-[40rem] absolute top-[20%] right-[-5%] shadow-[0_0_900px_20px_#b456ec] -rotate-[-30deg] -z-10"></div>
      <Header />
      
      <Hero/>
      <img className="absolute bottom-0 left-0 opacity-60 -z-10" src="./gradient.png" alt="Gradient-img" />
      <div className="h-0 w-[40rem] absolute bottom-[20%] left-[-5%] shadow-[0_0_900px_20px_#b456ec] -rotate-[-30deg] -z-10"></div>
      <About/>
      <ImageSlider/>
      <FloatingShapes/>
    </main>
  )
}