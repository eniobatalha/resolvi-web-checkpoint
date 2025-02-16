"use client";
import React from "react";
import MenuCompleto from "@/components/organisms/MenuCompleto";
import Menu from "@/components/organisms/MenuAside";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import Footer from "@/components/organisms/Footer";
import {FaMapPin} from "react-icons/fa";
import {CarouselWorkers} from "@/components/organisms/CarouselWorkers";
import InsetHome1 from "@/components/organisms/InsetHome";

const InfoOrder = () => {
    return (
        <>
            <MenuCompleto />
            <div className="flex min-h-screen">
                <Menu/>

                <div className="flex w-full flex-col items-center py-8">
                    <Avatar className="w-[320px] h-[320px]">
                        <AvatarImage src="https://p2.trrsf.com/image/fget/cf/1200/900/middle/images.terra.com/2023/06/15/programadora-us3i6jqikoxk.jpg" />
                        <AvatarFallback>Resolvi</AvatarFallback>
                    </Avatar>

                    <h2 className="font-bold text-indigo-900 text-[40px] pt-4">Programador React JS</h2>
                    <div className="flex justify-center items-center gap-10 bg-indigo-900 w-full h-12">
                        <div className="flex items-center gap-10">
                            <span className="text-green-500 text-[24px] font-bold">R$ 40/H</span>
                            <span className="text-white text-[24px]">Aventure inc</span>
                            <div className="flex items-center">
                                <FaMapPin className="text-white"/>
                                <span className="text-white text-[24px]">Recife</span>
                            </div>

                        </div>
                    </div>

                    <div className="w-1/2 pt-8">
                        <p>
                            Estamos buscando um programador React.js talentoso para integrar nossa equipe de
                            desenvolvimento. Nosso projeto envolve a criação e manutenção de interfaces dinâmicas
                            e interativas para uma plataforma web, e precisamos de alguém que tenha experiência
                            sólida com a biblioteca React.

                            Quem somos: Somos uma startup de tecnologia que desenvolve soluções inovadoras no setor
                            de educação. Nossa equipe é pequena, mas cheia de energia, e estamos crescendo rapidamente.
                            Buscamos sempre implementar as melhores práticas de desenvolvimento e priorizamos a criação
                            de experiências de usuário excepcionais.
                            Experiência em React.js: A pessoa deve ter experiência em desenvolvimento de aplicações
                            web utilizando React.js, incluindo hooks, componentes funcionais e gerenciamento de estado.
                            Integração com APIs: Familiaridade com integração de APIs RESTful ou GraphQL.
                            Boas práticas de desenvolvimento: Conhecimento de Git, testes, e desenvolvimento de
                            código limpo e reutilizável.
                            Design Responsivo: Capacidade de implementar designs responsivos, garantindo uma
                            experiência de usuário impecável em dispositivos móveis e desktop.
                            Colaboração e comunicação: A pessoa deve ser capaz de trabalhar em equipe, colaborar
                            com designers e outros desenvolvedores, e comunicar claramente o progresso do trabalho.

                            Qualificações desejáveis:

                            Familiaridade com ferramentas de build como Webpack, Babel ou similar.
                            Experiência com outras bibliotecas ou frameworks JavaScript (por exemplo, Redux, Next.js).
                            Experiência com integração de plataformas de backend e desenvolvimento de features escaláveis.

                            Se você é apaixonado por desenvolvimento front-end e quer fazer parte de uma equipe
                            inovadora, entre em contato com a gente. Estamos ansiosos para construir soluções
                            incríveis juntos!
                        </p>
                    </div>

                    <div className="flex gap-8 pt-10">
                        <Button
                            type="submit"
                            variant="indigo"
                            className="w-full"
                        >
                            Contratar
                        </Button>

                        <Button
                            type="submit"
                            variant="destructive"
                            className="w-full"
                        >
                            Voltar
                        </Button>
                    </div>

                    <div className="flex flex-col items-center py-10">
                        <h1 className="text-3xl font-bold text-gray-900">Confira também</h1>
                        <InsetHome1/>

                    </div>
                </div>

            </div>

            <Footer profissional={false}/>
        </>
    );
};

export default InfoOrder;
