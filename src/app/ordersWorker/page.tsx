"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiSearch } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import MenuCompleto from "@/components/organisms/MenuCompleto";
import Footer from "@/components/organisms/Footer";

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
}

interface Worker {
  id: string;
  name: string;
  profilePic: string;
  email: string;
  subcategory: Subcategory[];
}

const OrdersWorker = () => {
  const router = useRouter();
  const [workerId, setWorkerId] = useState<string | null>(null);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState<Subcategory | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSubcategoryDialog, setShowSubcategoryDialog] = useState(false);

  useEffect(() => {
    // Recupera o ID do worker do localStorage
    const storedWorkerId = localStorage.getItem("id");
    if (storedWorkerId) {
      setWorkerId(storedWorkerId);
    }
  }, []);

  useEffect(() => {
    // Se o workerId estiver definido, busca as subcategorias associadas a ele
    if (workerId) {
      const fetchWorkerData = async () => {
        try {
          const response = await fetch(`http://localhost:8080/api/worker/${workerId}`);
          if (!response.ok) throw new Error("Erro ao buscar dados do worker.");

          const data: Worker = await response.json();
          setSubcategories(data.subcategory);

          // Se houver apenas uma subcategoria, seleciona automaticamente
          if (data.subcategory.length === 1) {
            setSelectedSubcategory(data.subcategory[0]);
          } else {
            // Caso tenha mais de uma, mostra o diálogo de escolha
            setShowSubcategoryDialog(true);
          }
        } catch (error) {
          console.error("Erro ao carregar worker:", error);
          setError("Não foi possível carregar as informações do trabalhador.");
        }
      };

      fetchWorkerData();
    }
  }, [workerId]);

  useEffect(() => {
    // Se uma subcategoria for selecionada, busca as orders para aquela subcategoria
    if (selectedSubcategory) {
      setIsLoading(true);
      setError(null);

      const fetchOrders = async () => {
        try {
          const response = await fetch(`http://localhost:8080/api/order/subcategory/${selectedSubcategory.id}`);
          if (!response.ok) throw new Error("Nenhuma ordem disponível para esta subcategoria.");

          const data: Order[] = await response.json();
          setOrders(data);
        } catch (error) {
          console.error("Erro na busca:", error);
          setError(error instanceof Error ? error.message : "Erro desconhecido");
        } finally {
          setIsLoading(false);
        }
      };

      fetchOrders();
    }
  }, [selectedSubcategory]);

  return (
    <>
      <MenuCompleto />
      <div className="flex flex-col min-h-screen items-center">
        {/* Se houver mais de uma subcategoria, mostra o diálogo de escolha */}
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

        {/* Texto de Categoria Selecionada */}
        {selectedSubcategory && (
          <div className="w-3/4 mt-6 text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              Você está visualizando ordens para:{" "}
              <span className="text-indigo-900">{selectedSubcategory.name}</span>
            </h2>
          </div>
        )}

        {/* Exibir resultado da busca */}
        {isLoading && <p className="text-gray-600 mt-4">Carregando ordens...</p>}
        {error && <p className="text-red-500 mt-4">{error}</p>}

        {orders.length > 0 && (
          <div className="w-3/4 mt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition cursor-pointer"
                  onClick={() => router.push(`/orderDetail/${order.id}`)}
                >
                  <h3 className="text-center text-lg font-bold mt-4">{order.serviceName}</h3>
                  <p className="text-center text-gray-600 mt-2">{order.categoryName} - {order.subcategoryName}</p>
                  <p className="text-center text-gray-500 mt-2">{order.description}</p>
                  <p className="text-center text-indigo-600 font-bold mt-2">R$ {order.price.toFixed(2)}</p>
                  <p className="text-center text-gray-400 text-sm mt-2">Cliente: {order.clientName}</p>
                  <p className="text-center text-gray-400 text-sm">Criado em: {order.startDate}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer profissional={false} />
    </>
  );
};

export default OrdersWorker;
