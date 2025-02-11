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
      <div className="flex items-center justify-center p-4">
        <Carousel className="w-full max-w-4xl">
          <CarouselContent className="-ml-2">
            {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem
                    key={index}
                    className="pl-2 basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-2">
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center p-4 gap-2 h-[300px]">
                        <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center">
                      <span className="text-4xl font-bold text-gray-400">
                        {index + 1}
                      </span>
                        </div>
                        <div className="text-center">
                          <h3 className="font-semibold text-lg">Funcionário {index + 1}</h3>
                          <p className="text-sm text-gray-500">Cargo {index + 1}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-4 gap-2 flex items-center justify-center">
            <CarouselPrevious className="relative top-0 left-0 translate-y-0" />
            <CarouselNext className="relative top-0 right-0 translate-y-0" />
          </div>
        </Carousel>
      </div>
  );
}