"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import MenuCompleto from "@/components/organisms/MenuCompleto";
import Menu from "@/components/organisms/Menu";
import { FiSearch } from "react-icons/fi";
import HeroSection from "@/components/organisms/HeroSection";  // Importando o HeroSection
import TagsPopulares from "@/components/organisms/TagsPopulares";
import MenuCategoria from "@/components/organisms/MenuCategoria";  // Importando MenuCategoria
import { CarouselWorkers } from "@/components/organisms/CarouselWorkers";
import DownloadAppSection from "@/components/organisms/DownloadAppSection";
import InsetHome1 from "@/components/organisms/InsetHome";
import ServicesSection from "@/components/organisms/ServicesSection";
import Footer from "@/components/organisms/Footer";
import ModalInfoOrder from "@/components/modalnfoOrder/ModalInfoOrder";

const HomePage = () => {
    return (
        <>
            {/* Menu fixo no topo */}
            <MenuCompleto />

            {/* Menu Categoria */}
            <MenuCategoria />

            {/* Divisão da página */}
            <div className="flex min-h-screen">
                {/* Menu lateral flutuante */}
                <Menu />


                {/* Conteúdo principal */}
                <main className="flex-1 bg-white overflow-y-auto">
                    <div className="space-y-8">
                        {/* Componente Hero (Título, Subtítulo e Imagem do Profissional) */}
                        <HeroSection/>

                        {/* Input de busca */}
                        <div className="relative flex items-center w-3/4 mx-auto">
                            <FiSearch className="absolute left-4 text-gray-500" size={20}/>
                            <Input
                                type="text"
                                placeholder="Procure o que você deseja resolver"
                                className="pl-12 pr-4 py-6 text-lg border-2 border-indigo-500 rounded-md focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Componente de Tags Populares */}
                        <TagsPopulares/>

                        <div className="py-6 mb-4">
                            {/* Componente de Categorias */}
                            <div className="text-center">
                                <h1 className="text-3xl font-bold text-gray-900">Principais serviços pedidos</h1>
                                <h2 className="text-xl text-gray-900 mt-2">Os serviços mais realizados de cada
                                    categoria</h2>
                                <ModalInfoOrder/>
                            </div>

                            {/* Componente de Carousel de Profissionais */}
                            <CarouselWorkers/>
                        </div>

                        <div>
                            <DownloadAppSection/>
                        </div>

                        <div className="flex justify-evenly items-center py-5">

                            <img src="/img/business.png" className="w-[30%]" alt="Resolvi Staff"/>

                            <div className="h-[50vh] flex flex-col justify-center">
                                <h1 className="text-6xl text-gray-900">
                                    O que é o <span className="text-indigo-900 font-bold">Resolvi</span>?
                                </h1>
                                <p className="text-lg text-gray-700 mt-4">
                                    O <span className="font-bold text-indigo-900">Resolvi</span> é uma aplicação que
                                    conecta você aos melhores profissionais de qualquer área. <br/>
                                    Seja para contratar serviços residenciais, projetos especializados ou cuidados
                                    pessoais, <br/>
                                    o <span className="font-bold text-indigo-900">Resolvi</span> oferece uma
                                    solução simples, rápida e confiável.<br/>
                                    Com apenas alguns cliques, você encontra profissionais qualificados <br/>
                                    e resolve suas necessidades com segurança e praticidade.
                                </p>
                            </div>

                        </div>


                        <div>
                        {/* Componente de Categorias */}
                            <div className="text-center">
                                <h1 className="text-3xl font-bold text-indigo-900">Pedidos mais frequentes</h1>
                                <h2 className="text-xl text-gray-900 mt-2">Mais de 30 pedidos realizados por dia</h2>
                            </div>

                            {/* Componente de Carousel de Profissionais */}
                            <CarouselWorkers/>
                        </div>

                        <div className=" py-6 mb-4">
                            {/* Componente de Categorias */}
                            <div className="text-center">
                                <h1 className="text-3xl font-bold text-gray-900">Dicas antes de contratar </h1>
                                <h2 className="text-xl text-gray-900 mt-2">Informações sobre diversos tipos de serviços
                                    e como são executados</h2>
                            </div>

                            {/* Componente de Carousel de Profissionais */}
                            <InsetHome1/>
                        </div>

                        <div>
                            <ServicesSection/>
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </>
    );
};

export default HomePage;
