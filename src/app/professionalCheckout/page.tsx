import MenuCompleto from "@/components/organisms/MenuCompleto";
import MenuCategoria from "@/components/organisms/MenuCategoria";
import Menu from "@/components/organisms/Menu";
import React from "react";

const professionalCheckout =  () => {
    return (
        <main>
            <MenuCompleto />
            <MenuCategoria />
            <Menu/>
            <section className="flex">
                <div className="w-[32%] py-10 flex flex-col items-center">
                    <div className="flex flex-col w-full items-center">
                        <img className="rounded-full w-[120px] h-[120px] object-cover" src="https://foxproject.org.uk
                        /cdn/shop/files/bobby_fox_small_2821c266-337d-4fac-be0a-a0784f71d194.jpg?v=1706250016"
                             alt="Professional image"/>
                        <h2 className="text-indigo-900 text-2xl font-bold py-4">Nome do profissional</h2>
                        <p>Categoria - Subcategoria</p>
                    </div>

                    <p>descrição</p>
                </div>

                <div className="w-[68%] bg-blue-900">
                    <h2>Título do trabalho</h2>
                    <input type="text" placeholder="Insira aqui o título"/>

                    <p>Título</p>
                </div>
            </section>
        </main>
    )
}

export default professionalCheckout;