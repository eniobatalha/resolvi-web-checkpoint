import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import * as React from "react";

const CardJobs = () => {
    return (
        <div>
            <Carousel className="w-full max-w-3xl py-6">
                <CarouselContent className="-ml-1">

                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>

        </div>
    )
}

export default CardJobs;