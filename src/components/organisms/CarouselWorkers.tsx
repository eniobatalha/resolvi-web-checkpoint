import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

<<<<<<< HEAD
interface WorkerResponseDTO {
  id: number;
  name: string;
  rating: number;
  category: string;
  photoUrl: string;
}

interface CarouselWorkersProps {
  workers?: WorkerResponseDTO[];
}

export function CarouselWorkers({ workers }: CarouselWorkersProps) {
  if (!workers || workers.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Nenhum profissional encontrado
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-4">
      <Carousel className="w-full max-w-4xl">
        <CarouselContent className="-ml-2">
          {workers.map((worker) => (
            <CarouselItem
              key={worker.id}
              className="pl-2 basis-full sm:basis-1/2 lg:basis-1/3"
            >
              <div className="p-2">
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-4 gap-2 h-[300px]">
                    <div className="w-32 h-32 rounded-full bg-gray-100 overflow-hidden">
                      {worker.photoUrl ? (
                        <img
                          src={worker.photoUrl}
                          alt={worker.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-indigo-100">
                          <span className="text-2xl font-bold text-indigo-600">
                            {worker.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="text-center">
                      <h3 className="font-semibold text-lg">{worker.name}</h3>
                      <p className="text-sm text-gray-500">{worker.category}</p>
                      <div className="flex items-center justify-center mt-2">
                        {[...Array(5)].map((_, index) => (
                          <span
                            key={index}
                            className={`text-xl ${
                              index < Math.round(worker.rating)
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
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
=======
export function CarouselWorkers() {
    return (
        <div className="flex items-center justify-center">
            <Carousel className="w-full max-w-6xl py-6">
                <CarouselContent className="-ml-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/4">
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
                                            <p className="px-2 pb-4">Lorem ipsum dolor</p>
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
>>>>>>> dev-thiago
