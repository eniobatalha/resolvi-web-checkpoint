"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const CarouselHome1 = () => {
  return (
    <div className="w-2/4 h-64 mx-auto mb-10">
      {/* Componente de carrossel */}
      <Carousel>
        <CarouselContent>
          {/* Substitua estas imagens com as de sua escolha */}
          
          <CarouselItem className="flex justify-center items-center bg-gray-300">
            <img
              src="/img/banner1.png"
              alt="Propaganda 1"
              className="object-cover w-full h-full rounded-lg"
            />
          </CarouselItem>
          <CarouselItem className="flex justify-center items-center bg-gray-300">
            <img
              src="/img/banner2.png"
              alt="Propaganda 2"
              className="object-cover w-full h-full rounded-lg"
            />
          </CarouselItem>
          <CarouselItem className="flex justify-center items-center bg-gray-300">
            <img
              src="/img/banner3.png"
              alt="Propaganda 3"
              className="object-cover w-full h-full rounded-lg"
            />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CarouselHome1;
