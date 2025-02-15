"use client"
import MenuCompleto from "@/components/organisms/MenuCompleto";
import MenuCategoria from "@/components/organisms/MenuCategoria";
import Menu from "@/components/organisms/Menu";
import React from "react";
import ProfessionalListComponent from "@/components/organisms/ProfessionalListComponent";
import Footer from "@/components/organisms/Footer";

const Page = () => {
    const [inputValue, setInputValue] = React.useState<string>("");
    const [submittedSearch, setSubmittedSearch] = React.useState<string>("");

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            setSubmittedSearch(inputValue);
        }
    };

    const professionalData = {
        imageSrc: "https://i.ytimg.com/vi/j7KjFYFcgpY/maxresdefault.jpg",
        name: "Thiago Henrique",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nunc nec ultricies. " +
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nunc nec ultricies."
    };

    return (
        <main>
            <MenuCompleto/>
            <MenuCategoria/>
            <Menu/>
            <section className="w-full max-w-[1200px] mx-auto py-[48px]">
                <input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    type="text"
                    placeholder="Procure o que deseja"
                    className="pl-12 pr-4 py-6 text-lg border-2 border-indigo-500 rounded-md focus:ring-2 focus:ring-indigo-500 w-full"
                />
                <h1 className="text-[32px] py-4">
                    Você está procurando por: {" "}
                    <span className="font-bold text-indigo-900 underline">
                        {submittedSearch || "Desenvolvedores"}
                    </span>
                </h1>
                <div className="flex flex-wrap gap-[32px]">
                    <ProfessionalListComponent professional={professionalData}/>
                    <ProfessionalListComponent professional={professionalData}/>
                    <ProfessionalListComponent professional={professionalData}/>
                    <ProfessionalListComponent professional={professionalData}/>
                    <ProfessionalListComponent professional={professionalData}/>
                    <ProfessionalListComponent professional={professionalData}/>
                    <ProfessionalListComponent professional={professionalData}/>
                    <ProfessionalListComponent professional={professionalData}/>
                    <ProfessionalListComponent professional={professionalData}/>
                </div>
            </section>
            <Footer profissional={false}/>
        </main>
    )
}

export default Page;