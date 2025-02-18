"use client";

import React, { useEffect, useState } from "react";
import MenuCompleto from "@/components/organisms/MenuCompleto";
import Footer from "@/components/organisms/Footer";
import { ResolveProblem } from "@/components/organisms/ResolveProblem";
import { useToast } from "@/hooks/use-toast";
import axiosInstance from "../../../axiosInstance";

interface Subcategory {
  id: number;
  name: string;
}

interface Order {
  id: number;
  serviceName: string;
  description: string;
  price: number;
  status: string;
  categoryName: string;
  subcategoryName: string;
  clientName: string;
  startDate: string;
  registeredWorkers: { id: number }[]; // Lista de workers registrados
}

interface Worker {
  id: string;
  name: string;
  profilePic: string;
  email: string;
  subcategory: Subcategory[];
}

const OrdersWorker = () => {
  const [workerId, setWorkerId] = useState<string | null>(null);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState<Subcategory | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSubcategoryDialog, setShowSubcategoryDialog] = useState(false);
  const { toast } = useToast(); // Hook para exibir mensagens de toast

  useEffect(() => {
    const storedWorkerId = localStorage.getItem("id");
    if (storedWorkerId) {
      setWorkerId(storedWorkerId);
    }
  }, []);

  useEffect(() => {
    if (workerId) {
      const fetchWorkerData = async () => {
        try {
          const response = await axiosInstance.get(`/api/worker/${workerId}`);
          const data: Worker = response.data;
          setSubcategories(data.subcategory);

          if (data.subcategory.length === 1) {
            setSelectedSubcategory(data.subcategory[0]);
          } else {
            setShowSubcategoryDialog(true);
          }
        } catch (error) {
          setError("Erro ao carregar informações do trabalhador.");
        }
      };

      fetchWorkerData();
    }
  }, [workerId]);

  useEffect(() => {
    if (selectedSubcategory) {
      setIsLoading(true);
      setError(null);

      const fetchOrders = async () => {
        try {
          // 🔹 Faz a requisição correta para buscar as ordens pela subcategoria
          const response = await axiosInstance.get(
            `/api/order/subcategory/${selectedSubcategory.id}`
          );
          const allOrders: Order[] = response.data;

          // 🔹 Filtra apenas as ordens onde o worker **ainda não está registrado**
          const availableOrders = allOrders.filter(order =>
            !order.registeredWorkers.some(worker => worker.id === Number(workerId))
          );

          setOrders(availableOrders);
        } catch (error) {
          setError("Nenhuma ordem disponível para esta subcategoria.");
        } finally {
          setIsLoading(false);
        }
      };

      fetchOrders();
    }
  }, [selectedSubcategory, workerId]);

  const registerOrder = async (orderId: string) => {
    if (!workerId) return;
    try {
      await axiosInstance.post(`/api/order/${orderId}/register-worker/${workerId}`);

      setOrders(prevOrders =>
        prevOrders.filter(order => order.id !== Number(orderId))
      );

      toast({
        variant: "default",
        title: "Inscrição Confirmada",
        description: "Você se registrou nesta ordem com sucesso!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao se inscrever",
        description: "Houve um problema ao tentar se inscrever na ordem.",
      });
    }
  };

  return (
    <>
      <MenuCompleto />
      <div className="flex flex-col min-h-screen items-center">
        {showSubcategoryDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md shadow-md w-96">
              <h2 className="text-xl font-bold text-indigo-900 mb-4">Escolha uma subcategoria</h2>
              <ul>
                {subcategories.map((subcategory) => (
                  <li
                    key={subcategory.id}
                    onClick={() => {
                      setSelectedSubcategory(subcategory);
                      setShowSubcategoryDialog(false);
                    }}
                    className="cursor-pointer px-4 py-2 hover:bg-indigo-500 hover:text-white rounded-md mb-2"
                  >
                    {subcategory.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {selectedSubcategory && (
          <div className="w-3/4 mt-6 text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              Você está visualizando ordens para:{" "}
              <span className="text-indigo-900">{selectedSubcategory.name}</span>
            </h2>
          </div>
        )}

        {isLoading && <p className="text-gray-600 mt-4">Carregando ordens...</p>}
        {error && <p className="text-red-500 mt-4">{error}</p>}

        {orders.length > 0 && (
          <div className="w-3/4 mt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition cursor-pointer"
                >
                  <h3 className="text-center text-lg font-bold mt-4">{order.serviceName}</h3>
                  <p className="text-center text-gray-600 mt-2">
                    {order.categoryName} - {order.subcategoryName}
                  </p>
                  <p className="text-center text-gray-500 mt-2">{order.description}</p>
                  <p className="text-center text-indigo-600 font-bold mt-2">R$ {order.price.toFixed(2)}</p>
                  <p className="text-center text-gray-400 text-sm mt-2">Cliente: {order.clientName}</p>
                  <p className="text-center text-gray-400 text-sm">Criado em: {order.startDate}</p>

                  <div className="text-center">
                    <ResolveProblem
                      ordemDescricao={order.description}
                      orderId={order.id.toString()}
                      confirmarInscricao={registerOrder}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {orders.length === 0 && !isLoading && !error && (
          <p className="text-gray-600 mt-4">Nenhuma ordem disponível para inscrição.</p>
        )}
      </div>
      <Footer profissional={false} />
    </>
  );
};

export default OrdersWorker;
