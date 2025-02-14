import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";


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
