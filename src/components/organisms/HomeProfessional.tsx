import Menu from "@/components/organisms/Menu";
import HeroSectionProfessional from "@/components/organisms/HeroSectionProfessional";
import {FiSearch} from "react-icons/fi";
import {Input} from "@/components/ui/input";
import TagsPopulares from "@/components/organisms/TagsPopulares";
import {CarouselWorkers} from "@/components/organisms/CarouselWorkers";
import DownloadAppSection from "@/components/organisms/DownloadAppSection";
import InsetHome1 from "@/components/organisms/InsetHome";
import ServicesSection from "@/components/organisms/ServicesSection";
import React from "react";

const HomeProfessional = () => {
    return (
        <>
            <div className="flex min-h-screen">
                <Menu />

                <main className="flex-1 bg-white overflow-y-auto">
                    <div className="space-y-8">
                        {/* Hero Section para Profissionais */}
                        <HeroSectionProfessional />

                        {/* Barra de Pesquisa */}
                        <div className="relative flex items-center w-3/4 mx-auto">
                            <FiSearch className="absolute left-4 text-gray-500" size={20}/>
                            <Input
                                type="text"
                                placeholder="Procure serviços ou clientes próximos"
                                className="pl-12 pr-4 py-6 text-lg border-2 border-indigo-500 rounded-md focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Tags Populares */}
                        <TagsPopulares />

                        {/* Serviços Próximos */}
                        <div className="py-6 mb-4">
                            <div className="text-center">
                                <h1 className="text-3xl font-bold text-gray-900">Serviços perto de você</h1>
                                <h2 className="text-xl text-gray-900 mt-2">Encontre oportunidades de trabalho na sua região</h2>
                            </div>
                            <CarouselWorkers/>
                        </div>

                        {/* Seção de Download do App */}
                        <div>
                            <DownloadAppSection/>
                        </div>

                        {/* Benefícios de Trabalhar com a Resolvi */}
                        <div className="flex justify-evenly items-center py-5">
                            <img src="/img/workes-profile.jpg" className="w-[30%]" alt="Profissional Resolvi"/>
                            <div className="h-[50vh] flex flex-col justify-center">
                                <h1 className="text-6xl text-gray-900">
                                    Benefícios de trabalhar com a <span className="text-indigo-900 font-bold">Resolvi</span>
                                </h1>
                                <p className="text-lg text-gray-700 mt-4">
                                    No <span className="font-bold text-indigo-900">Resolvi</span>, você tem:
                                </p>
                                <ul className="text-lg text-gray-700 mt-4 list-disc pl-8">
                                    <li><span className="font-bold text-indigo-900">Visibilidade:</span> Seu perfil é visto por milhares de clientes.</li>
                                    <li><span className="font-bold text-indigo-900">Autonomia:</span> Defina seus horários, preços e serviços.</li>
                                    <li><span className="font-bold text-indigo-900">Segurança:</span> Ambiente confiável com avaliações e verificações.</li>
                                    <li><span className="font-bold text-indigo-900">Oportunidades:</span> Conecte-se a diversos serviços em várias áreas.</li>
                                </ul>
                            </div>
                        </div>

                        {/* Pedidos Frequentes */}
                        <div>
                            <div className="text-center">
                                <h1 className="text-3xl font-bold text-indigo-900">Pedidos mais frequentes</h1>
                                <h2 className="text-xl text-gray-900 mt-2">Mais de 30 pedidos realizados por dia</h2>
                            </div>
                            <CarouselWorkers/>
                        </div>

                        {/* Dicas para Profissionais */}
                        <div className="py-6 mb-4">
                            <div className="text-center">
                                <h1 className="text-3xl font-bold text-gray-900">Dicas para profissionais</h1>
                                <h2 className="text-xl text-gray-900 mt-2">Aprenda a se destacar e aumentar suas chances de ser contratado</h2>
                            </div>
                            <InsetHome1/>
                        </div>

                        {/* Seção de Serviços */}
                        <div>
                            <ServicesSection/>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default HomeProfessional;