"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import MenuCompleto from "@/components/organisms/MenuCompleto";
import { FaHome } from "react-icons/fa";
import { BsChatLeftText } from "react-icons/bs";
import { MdMoreHoriz } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/organisms/HeroSection";  // Importando o HeroSection
import TagsPopulares from "@/components/organisms/TagsPopulares";
import MenuCategoria from "@/components/organisms/MenuCategoria";  // Importando MenuCategoria
import { CarouselWorkers } from "@/components/organisms/CarouselWorkers";
import DownloadAppSection from "@/components/organisms/DownloadAppSection";
import InfoSection from "@/components/organisms/InfoSection";
import { DataTableDemo } from "@/components/organisms/ListaInfo";

const InfoPage = () => {
    return (
        <>
            {/* Menu fixo no topo */}
            <MenuCompleto />

            {/* Menu Categoria */}
            {/* <MenuCategoria /> */}

            {/* Divisão da página */}
            <div className="flex min-h-screen">
                {/* Menu lateral flutuante */}
                <aside className="w-16 h-fit bg-gray-900 text-white flex flex-col items-center py-4 space-y-4 sticky top-1/2 transform -translate-y-1/2 rounded-xl shadow-lg ml-4">
                    <Button className="p-3 hover:bg-indigo-800">
                        <FaHome size={20} />
                    </Button>
                    <Button className="p-3 hover:bg-indigo-800">
                        <BsChatLeftText size={20} />
                    </Button>
                    <Button className="p-3 hover:bg-indigo-800">
                        <MdMoreHoriz size={20} />
                    </Button>
                </aside>

                {/* Conteúdo principal */}
                <main className="flex-1 bg-white p-6 overflow-y-auto ml-4">
                    <div className="space-y-8">
                        {/* Componente Hero (Título, Subtítulo e Imagem do Profissional) */}
                          <InfoSection />

                        {/* Input de busca */}
                        <div className="relative flex items-center w-3/4 mx-auto">
                            <FiSearch className="absolute left-4 text-gray-500" size={20} />
                            <Input
                                type="text"
                                placeholder="Procure o que você deseja resolver"
                                className="pl-12 pr-4 py-6 text-lg border-2 border-indigo-500 rounded-md focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Componente de Tags Populares */}
                        <TagsPopulares />

                        <DataTableDemo/>

                        <div className="bg-slate-100 py-6 mb-4">
                            {/* Componente de Categorias */}
                            <div className="text-center">
                                <h1 className="text-3xl font-bold text-gray-900">Principais serviços pedidos</h1>
                                <h2 className="text-xl text-gray-900 mt-2">Os serviços mais realizados de cada categoria</h2>
                            </div>

                            {/* Componente de Carousel de Profissionais */}
                            <CarouselWorkers />
                        </div>
                        <div>
                            <DownloadAppSection />
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default InfoPage;
