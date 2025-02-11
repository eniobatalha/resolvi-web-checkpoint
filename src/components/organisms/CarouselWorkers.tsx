import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function CarouselWorkers() {
  return (
      <div className="flex items-center justify-center">
        <Carousel className="w-full max-w-3xl py-6">
          <CarouselContent className="-ml-1">
            {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
                    <a href="#">
                        <div className="p-1">
                            <Card className="w-full">
                                <CardContent className="flex flex-col p-0">
                                    <img
                                        className="w-full h-auto object-cover rounded-t-2xl"
                                        src="https://maymont.org/wp-content/uploads/2020/04/banner-red-fox.jpg"
                                        alt="image"
                                    />

                                    <h2 className="p-2 text-indigo-900 font-bold">Info job</h2>
                                    <h3 className="px-2 text-indigo-900">subcategoria</h3>
                                    <p className="px-2">Lorem ipsum dolor</p>
                                </CardContent>
                            </Card>
                        </div>
                    </a>
                </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
  );
}
