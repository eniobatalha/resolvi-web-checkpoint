import OrderStatus from "@/components/organisms/OrderStatus";
import MenuCompleto from "@/components/organisms/MenuCompleto";
import Menu from "@/components/organisms/Menu";
import React from "react";
import Footer from "@/components/organisms/Footer";
import MenuCategoria from "@/components/organisms/MenuCategoria";

const OrderPage = () => {
    return (
        <>
            <MenuCompleto />
            <MenuCategoria />
            <Menu />
            <main className="flex">
                <div className="w-2/5 px-24 flex flex-col items-center h-screen overflow-y-auto">
                    <div className="w-[32%] py-10 flex flex-col items-center">
                        <div className="flex flex-col w-full items-center justify-center py-10">
                            <img
                                className="rounded-full w-[120px] h-[120px] object-cover"
                                src="https://foxbombas.com.br/2020b/wp-content/uploads/2021/08/pexels-funny-foxy-pride-5872242-768x509.jpg"
                                alt="Professional image"
                            />
                            <h2 className="text-indigo-900 text-2xl font-bold py-4">Nome do Cliente</h2>
                        </div>

                        <div className="w-full mt-4 flex flex-col items-center">
                            <label className="text-indigo-900 font-bold mb-2 block" htmlFor="descricao-profissional">
                                Trabalhos
                            </label>
                            <div className="flex flex-col items-center text-indigo-900">
                                <h3 className="font-bold text-[24px]">Concluídos</h3>
                                <span className="text-black">12</span>
                            </div>

                            <div className="flex flex-col items-center">
                                <h3 className="font-bold text-[24px] text-orange-500">Em progresso</h3>
                                <span className="text-black">2</span>
                            </div>

                            <div className="flex flex-col items-center">
                                <h3 className="font-bold text-[24px] text-red-500">Cancelados</h3>
                                <span className="text-black">0</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-[60%] flex flex-col justify-center gap-8 pr-4 h-screen">
                    <div>
                        <h2 className="text-[48px] font-bold mb-4 text-indigo-900">Concluídos</h2>
                        <div className="flex overflow-x-auto pb-4 scrollbar scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-indigo-100 hover:scrollbar-thumb-indigo-600">
                            <div className="flex gap-10 flex-nowrap min-h-[200px] px-2">
                                <OrderStatus orderStatus="Concluído" />
                                <OrderStatus orderStatus="Concluído" />
                                <OrderStatus orderStatus="Cancelado" />
                                <OrderStatus orderStatus="Concluído" />
                                <OrderStatus orderStatus="Concluído" />
                                <OrderStatus orderStatus="Concluído" />
                                <OrderStatus orderStatus="Concluído" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-[48px] font-bold mb-4 text-orange-500">Em progresso</h2>
                        <div className="flex overflow-x-auto pb-4 scrollbar scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-orange-100 hover:scrollbar-thumb-orange-600">
                            <div className="flex gap-10 flex-nowrap min-h-[200px] px-2">
                                <OrderStatus orderStatus="Trabalhando" />
                                <OrderStatus orderStatus="Trabalhando" />
                                <OrderStatus orderStatus="Trabalhando" />
                                <OrderStatus orderStatus="Trabalhando" />
                                <OrderStatus orderStatus="Trabalhando" />
                                <OrderStatus orderStatus="Trabalhando" />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer profissional={false} />
        </>
    );
};

export default OrderPage;