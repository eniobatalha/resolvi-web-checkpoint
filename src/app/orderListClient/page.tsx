"use client";
import OrderStatus from "@/components/organisms/OrderStatus";
import MenuCompleto from "@/components/organisms/MenuCompleto";
import Menu from "@/components/organisms/SidebarClient";
import React, { useEffect, useState } from "react";
import Footer from "@/components/organisms/Footer";
import axiosInstance from "../../../axiosInstance";

interface Order {
  id: number;
  serviceName: string;
  description: string;
  price: number;
  status: string;
  categoryName: string;
  subcategoryName: string
  startDate: string;
}

const OrderPage = () => {
  const [nomeClient, setNomeClient] = useState("Nome do Cliente");
  const [clientId, setClientId] = useState<number | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    const storedClientId = localStorage.getItem("clientId");

    if (storedName) setNomeClient(storedName);
    if (storedClientId) setClientId(Number(storedClientId));
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!clientId) return;

      try {
        const response = await axiosInstance.get(`/api/order/client-orders/${clientId}`);
        setOrders(response.data);
      } catch (err) {
        setError("Erro ao carregar ordens");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [clientId]);

  const formatCategory = (order: Order) => {
    return order.subcategoryName 
      ? `${order.categoryName} > ${order.subcategoryName}`
      : order.categoryName;
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  return (
    <>
      <MenuCompleto />
      <Menu />
      <main className="flex">
        {/* Coluna lateral esquerda */}
        <div className="w-[30%] px-10 flex flex-col items-center h-screen overflow-y-auto border-r-2 border-gray-100">
          <div className="w-full py-10 flex flex-col items-center pl-20">
            <div className="flex flex-col items-center justify-center py-10">
              <img
                className="rounded-full w-32 h-32 object-cover"
                src="https://foxbombas.com.br/2020b/wp-content/uploads/2021/08/pexels-funny-foxy-pride-5872242-768x509.jpg"
                alt="Professional"
              />
              <h2 className="text-indigo-900 text-2xl font-bold py-4">
                {nomeClient}
              </h2>
            </div>
          </div>
        </div>

        {/* Coluna direita */}
        <div className="w-[70%] h-screen flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            <div className="sticky top-[-10px] bg-white z-10 pb-4 px-4 pt-4">
              <h2 className="text-4xl font-bold text-orange-500">
                Ordens Em Progresso
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-8 pt-4 px-6">
              {orders.map((order) => (
                <OrderStatus
                  key={order.id}
                  title={order.serviceName}
                  description={order.description}
                  orderStatus={order.status}
                  price={order.price}
                  category={formatCategory(order)}
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