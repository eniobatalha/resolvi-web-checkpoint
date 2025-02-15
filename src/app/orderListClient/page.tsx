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
                <div className="w-[30%] px-10 flex flex-col items-center h-screen overflow-y-auto border-r-2 border-gray-100">
                    <div className="w-full py-10 flex flex-col items-center pl-20">
                        <div className="flex flex-col items-center justify-center py-10">
                            <img
                                className="rounded-full w-32 h-32 object-cover"
                                src="https://foxbombas.com.br/2020b/wp-content/uploads/2021/08/pexels-funny-foxy-pride-5872242-768x509.jpg"
                                alt="Professional"
                            />
                            <h2 className="text-indigo-900 text-2xl font-bold py-4">Nome do Cliente</h2>
                        </div>

                        <div className="w-full space-y-6">
                            <div className="text-center">
                                <h3 className="text-indigo-900 font-bold text-xl mb-4">Trabalhos</h3>
                                <div className="space-y-4">
                                    <div className="bg-indigo-50 p-4 rounded-lg">
                                        <p className="text-indigo-900 font-semibold">Concluídos</p>
                                        <span className="text-gray-600 text-lg font-medium">12</span>
                                    </div>

                                    <div className="bg-orange-50 p-4 rounded-lg">
                                        <p className="text-orange-500 font-semibold">Em progresso</p>
                                        <span className="text-gray-600 text-lg font-medium">2</span>
                                    </div>

                                    <div className="bg-red-50 p-4 rounded-lg">
                                        <p className="text-red-500 font-semibold">Cancelados</p>
                                        <span className="text-gray-600 text-lg font-medium">0</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-[70%] h-screen flex flex-col overflow-hidden">
                    <div className="flex-1 border-b-2 border-gray-100 overflow-y-auto">
                        <div className="sticky top-[-10px] bg-white z-10 pb-4 px-4 pt-4">
                            <h2 className="text-4xl font-bold text-orange-500">Em progresso</h2>
                        </div>
                        <div className="grid grid-cols-2 gap-8 pt-4 px-6">
                            {[...Array(20)].map((_, i) => (
                                <OrderStatus
                                    key={`progress-${i}`}
                                    orderStatus="Trabalhando"
                                    className="w-full"
                                />
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        <div className="sticky top-[-10px] bg-white z-10 pb-4 px-4 pt-4">
                            <h2 className="text-4xl font-bold text-indigo-900">Concluídos</h2>
                        </div>
                        <div className="grid grid-cols-2 gap-8 pt-4 px-6">
                            {[...Array(20)].map((_, i) => (
                                <OrderStatus
                                    key={`completed-${i}`}
                                    orderStatus="Concluído"
                                    className="w-full"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </main>
            <Footer profissional={false} />
        </>
    );
};

export default OrderPage;