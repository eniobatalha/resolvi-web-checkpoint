"use client";
import { useState, useEffect } from "react";
import OrderStatus from "@/components/organisms/OrderStatus";
import MenuCompleto from "@/components/organisms/MenuCompleto";
import Menu from "@/components/organisms/SidebarClient";
import Footer from "@/components/organisms/Footer";
import axiosInstance from "../../../axiosInstance";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

interface Worker {
  id: number;
  name: string;
  profilePic: string;
}

interface Order {
  id: number;
  serviceName: string;
  description: string;
  price: number;
  status: string;
  categoryName: string;
  subcategoryName: string;
  startDate: string;
  registeredWorkers?: Worker[];
}

const OrderPage = () => {
  const [nomeClient, setNomeClient] = useState("Nome do Cliente");
  const [clientId, setClientId] = useState<number | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    const storedClientId = localStorage.getItem("clientId");

    if (storedName) setNomeClient(storedName);
    if (storedClientId) setClientId(Number(storedClientId));
  }, []);

  useEffect(() => {
    if (!clientId) return;

    axiosInstance
      .get(`/api/order/client-orders/${clientId}`)
      .then((response) => {
        setOrders(response.data);
      })
      .catch(() => setError("Erro ao carregar ordens"))
      .finally(() => setLoading(false));
  }, [clientId]);

  const openWorkerModal = (order: Order) => {
    setSelectedOrder(order);
  };

  const selectWorker = async (workerId: number) => {
    if (!selectedOrder) return;

    try {
      await axiosInstance.post(`/api/order/${selectedOrder.id}/select-worker/${workerId}`);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === selectedOrder.id ? { ...order, status: "Andamento" } : order
        )
      );
      setSelectedOrder(null);
    } catch (err) {
      console.error("Erro ao selecionar worker:", err);
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <>
      <MenuCompleto />
      <Menu />
      <main className="flex pl-[250px]"> {/* 🔹 Espaço lateral para o menu */}
        <div className="w-full h-screen flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto px-6 pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {orders.map((order) => (
                <div key={order.id} className="bg-white shadow rounded-lg p-4">
                  <OrderStatus
                    title={order.serviceName}
                    description={order.description}
                    orderStatus={order.status}
                    price={order.price}
                    category={`${order.categoryName} > ${order.subcategoryName}`}
                    className="w-full"
                  />

                  <Button
                    className="mt-2 w-full"
                    variant="outline"
                    onClick={() => openWorkerModal(order)}
                  >
                    Ver profissionais interessados
                  </Button>
                </div>
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
