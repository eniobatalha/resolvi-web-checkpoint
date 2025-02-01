import MenuCompleto from "@/components/organisms/MenuCompleto";
import MenuCategoria from "@/components/organisms/MenuCategoria";
import Menu from "@/components/organisms/Menu";
import React from "react";
import ProfessionalListComponent from "@/components/organisms/ProfessionalListComponent";

const Page = () => {

    const professionalData = {
        imageSrc: "https://i.redd.it/glx7ljdu2fb91.jpg",
        name: "Thiago Henrique",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nunc nec ultricies. " +
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nunc nec ultricies."

    };

    return (
        <main>
            <MenuCompleto />
            <MenuCategoria />
            <Menu/>
            <section className="w-full max-w-[1200px] h-screen mx-auto py-[48px]">
                <input type="text" placeholder="Procure o que deseja" className="pl-12 pr-4 py-6 text-lg border-2 border-indigo-500 rounded-md focus:ring-2 focus:ring-indigo-500 w-full"/>
                <h1 className="text-[32px] py-4">Você está procurando por: <span className="font-bold text-indigo-900 underline">Desenvolvedores</span></h1>
                <div className="flex flex-wrap gap-[32px]">
                    <ProfessionalListComponent professional={professionalData}/>
                    <ProfessionalListComponent professional={professionalData}/>
                    <ProfessionalListComponent professional={professionalData}/>
                    <ProfessionalListComponent professional={professionalData}/>
                    <ProfessionalListComponent professional={professionalData}/>
                    <ProfessionalListComponent professional={professionalData}/>
                </div>
            </section>
        </main>
    )
}

export default Page;
