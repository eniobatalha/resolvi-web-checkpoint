"use client";
import { useState, useEffect } from "react";
import OrderStatus from "@/components/organisms/OrderStatus";
import MenuCompleto from "@/components/organisms/MenuCompleto";
import Menu from "@/components/organisms/SidebarClient";
import Footer from "@/components/organisms/Footer";
import axiosInstance from "../../../axiosInstance";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation"; // Para navegação

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
  registeredWorkers: Worker[];
}

const OrderPage = () => {
  const [nomeClient, setNomeClient] = useState("Nome do Cliente");
  const [clientId, setClientId] = useState<number | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Para navegação

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
      .then((response) => setOrders(response.data))
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
      <main className="flex">
        <div className="w-[70%] h-screen flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-2 gap-8 pt-4 px-6">
              {orders.map((order) => (
                <div key={order.id}>
                  <OrderStatus
                    title={order.serviceName}
                    description={order.description}
                    orderStatus={order.status}
                    price={order.price}
                    category={`${order.categoryName} > ${order.subcategoryName}`}
                    className="w-full"
                  />
                  {/* Botão para abrir o modal de profissionais interessados */}
                  <Button
                    className="mt-2 w-full"
                    variant="outline"
                    onClick={() => openWorkerModal(order)}
                  >
                    Ver profissionais interessados ({order.registeredWorkers.length})
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer profissional={false} />

      {/* Modal de seleção de workers */}
      {selectedOrder && (
        <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Selecionar um Profissional</DialogTitle>
            </DialogHeader>
            {selectedOrder.registeredWorkers.length > 0 ? (
              selectedOrder.registeredWorkers.map((worker) => (
                <div key={worker.id} className="flex items-center justify-between p-2 border-b">
                  <img
                    src={worker.profilePic}
                    alt={worker.name}
                    className="w-10 h-10 rounded-full"
                  />
                  {/* Nome clicável para ver perfil */}
                  <span
                    className="flex-1 ml-2 cursor-pointer text-indigo-600 hover:underline"
                    onClick={() => router.push(`/workerProfile/${worker.id}`)}
                  >
                    {worker.name}
                  </span>
                  <Button onClick={() => selectWorker(worker.id)}>Contratar</Button>
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-center py-4">Nenhum profissional se inscreveu ainda.</p>
            )}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default OrderPage;
