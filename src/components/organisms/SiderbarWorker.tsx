"use client";
import { Button } from "@/components/ui/button";
import { FaHome, FaBell } from "react-icons/fa";
import { BsChatLeftText } from "react-icons/bs";
import { CiStickyNote } from "react-icons/ci";
import { ImProfile } from "react-icons/im";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const SidebarWorker = () => {
    const router = useRouter();
    const [orderCount, setOrderCount] = useState<number>(0);
    const [workerId, setWorkerId] = useState<string | null>(null);

    useEffect(() => {
        // Obtém o ID do worker do localStorage
        const storedWorkerId = localStorage.getItem("id");
        if (storedWorkerId) {
            setWorkerId(storedWorkerId);
            fetchOrdersCount(storedWorkerId);
        }
    }, []);

    const fetchOrdersCount = async (workerId: string) => {
        try {
            // Buscar as subcategorias do worker
            const workerResponse = await fetch(`http://localhost:8080/api/worker/${workerId}`);
            if (!workerResponse.ok) throw new Error("Erro ao buscar worker.");
            
            const workerData = await workerResponse.json();
            const subcategories = workerData.subcategory.map((sub: any) => sub.id);

            // Se tiver subcategorias, buscar as ordens para cada uma
            let totalOrders = 0;
            for (const subcategoryId of subcategories) {
                const orderResponse = await fetch(`http://localhost:8080/api/order/subcategory/${subcategoryId}`);
                if (orderResponse.ok) {
                    const orders = await orderResponse.json();
                    totalOrders += orders.length;
                }
            }

            setOrderCount(totalOrders);
        } catch (error) {
            console.error("Erro ao buscar ordens:", error);
        }
    };

    return (
        <aside
            className="w-16 h-fit bg-gray-900 text-white flex flex-col items-center py-4 space-y-4 fixed top-1/2 transform -translate-y-1/2 rounded-xl shadow-lg ml-4 z-50">
            
            {/* Home */}
            <div className="relative group">
                <Button onClick={() => router.push("/homeProfessional")} className="p-3 hover:bg-indigo-800">
                    <FaHome size={20} />
                </Button>
                <span className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Home
                </span>
            </div>

            {/* Mensagens */}
            <div className="relative group">
                <Button onClick={() => router.push("/chat")} className="p-3 hover:bg-indigo-800">
                    <BsChatLeftText size={20} />
                </Button>
                <span className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Mensagens
                </span>
            </div>

            {/* Notificações de Ordens */}
            <div onClick={() => router.push("/ordersWorker")} className="relative group">
                <Button className="p-[16px] hover:bg-indigo-800 relative">
                    <FaBell size={20} />
                    {orderCount > 0 && (
                        <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                            {orderCount}
                        </span>
                    )}
                </Button>
                <span className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Notificações ({orderCount})
                </span>
            </div>

            {/* Lista de Trabalhos */}
            <div onClick={() => router.push("/orderListWorker")} className="relative group">
                <Button className="p-[16px] hover:bg-indigo-800">
                    <CiStickyNote size={20} />
                </Button>
                <span className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Trabalhos
                </span>
            </div>

            {/* Perfil */}
            <div className="relative group">
                <Button onClick={() => router.push("/profileWorker")} className="p-[16px] hover:bg-indigo-800">
                    <ImProfile size={20} />
                </Button>
                <span className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Perfil
                </span>
            </div>
        </aside>
    );
};

export default SidebarWorker;
