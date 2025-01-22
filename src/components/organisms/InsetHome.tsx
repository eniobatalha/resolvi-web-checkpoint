"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {Button} from "@/components/ui/button";

const infoexemplo = [
  {title: 'Saiba como Contratar profissionais', legend: 'Quando estamos realizando uma obra sempre surgem dúvidas de quais profissionais para realizar determinadas tarefas'},
  {title: 'Saiba como calcular o custo total', legend: 'Sempre surgem dúvidas quanto ao custo total das contratações de profissionais'},
  {title: 'Saiba como avaliar o profissional', legend: 'Quando o profssional termina as atividades gostamos de dá nosso feedback'},
  {title: 'Saiba como avaliar o profissional', legend: 'Quando o profssional termina as atividades gostamos de dá nosso feedback'},
  {title: 'Saiba como avaliar o profissional', legend: 'Quando o profssional termina as atividades gostamos de dá nosso feedback'},
  {title: 'Saiba como avaliar o profissional', legend: 'Quando o profssional termina as atividades gostamos de dá nosso feedback'},
  {title: 'Saiba como avaliar o profissional', legend: 'Quando o profssional termina as atividades gostamos de dá nosso feedback'},
  {title: 'Lorem ipsum', legend: 'Quando o profssional termina as atividades gostamos de dá nosso feedback'},
]

const InsetHome1 = () => {
  return (
    <div className="flex items-center justify-center">
    <Carousel className="w-full py-6 w-[1200px]">
      <CarouselContent className="-ml-1">
        {infoexemplo.map((e, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card className="shadow-lg flex justify-center">
                <CardContent className="min-h-[500px] max-w-[300px] flex flex-col aspect-square items-center justify-evenly p-6">
                  <img          
                    src="img\worker1.png"
                    alt="Profissional"
                    className="w-40 h-40 object-cover transform scale-x-[-1]" 
                  />
                  <span className="text-2xl font-semibold p-4 text-center">{e?.title}</span>
                  <p className="text-center text-ellipsis overflow-hidden">{e?.legend}</p>

                  <Button variant="indigo" className="mt-4 w-full"><a className="text-left" href="/home">Ler Mais</a></Button>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
  </div>
  );
};

export default InsetHome1;
