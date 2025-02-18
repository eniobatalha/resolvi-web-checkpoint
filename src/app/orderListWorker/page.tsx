"use client";
import { useState, useEffect } from "react";
import axiosInstance from "../../../axiosInstance";
import MenuCompleto from "@/components/organisms/MenuCompleto";
import Footer from "@/components/organisms/Footer";
import OrderStatus from "@/components/organisms/OrderStatus";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import SidebarWorker from "@/components/organisms/SiderbarWorker";
import { useToast } from "@/hooks/use-toast"; // Hook para exibir toasts

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
  clientName: string;
  startDate: string;
  registeredWorkers: Worker[];
}

const OrderListWorker = () => {
  const [workerId, setWorkerId] = useState<number | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast(); // Hook de toast para feedback do usuário
  const router = useRouter();

  // Obtém o ID do worker do localStorage
  useEffect(() => {
    const storedWorkerId = localStorage.getItem("id");
    if (storedWorkerId) {
      setWorkerId(Number(storedWorkerId));
    }
  }, []);

  // Faz a requisição para buscar as ordens aceitas
  useEffect(() => {
    if (!workerId) return;

    axiosInstance
      .get(`/api/order/worker/${workerId}`)
      .then((response) => setOrders(response.data))
      .catch(() => setError("Erro ao carregar ordens"))
      .finally(() => setLoading(false));
  }, [workerId]);

  const confirmPayment = async (orderId: number) => {
    try {
      await axiosInstance.patch(`/api/order/${orderId}/confirm-payment`);

      // Atualiza o status da ordem localmente para "Pago"
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: "Pago" } : order
        )
      );

      toast({
        variant: "default",
        title: "Pagamento Confirmado!",
        description: "O pagamento da ordem foi concluído com sucesso.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao confirmar pagamento",
        description: "Houve um problema ao processar o pagamento.",
      });
    }
  };

  if (loading) return <div className="text-center p-6">Carregando...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <>
      <MenuCompleto />
      <div className="flex">
        <SidebarWorker /> {/* 🔹 Menu lateral para profissionais */}

        <main className="flex flex-col items-center min-h-screen flex-1">
          <h1 className="text-2xl font-bold text-indigo-900 mt-6">Ordens Aceitas</h1>

          {orders.length > 0 ? (
            <div className="w-3/4 mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {orders.map((order) => (
                <div key={order.id} className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition">
                  <OrderStatus
                    title={order.serviceName}
                    description={order.description}
                    orderStatus={order.status}
                    price={order.price}
                    category={`${order.categoryName} > ${order.subcategoryName}`}
                    className="w-full"
                  />

                  {/* 🔹 Exibe o status da ordem abaixo do preço */}
                  <p className={`text-center mt-2 font-semibold ${
                    order.status === "Aberto"
                      ? "text-green-600"
                      : order.status === "Andamento"
                      ? "text-blue-600"
                      : order.status === "Concluído"
                      ? "text-yellow-600"
                      : "text-gray-600"
                  }`}>
                    Status: {order.status}
                  </p>

                  {/* Botão "Confirmar Pagamento" aparece apenas para ordens "Pagamento" */}
                  {order.status === "Pagamento" && (
                    <div className="text-center mt-4">
                      <Button className="bg-green-600 text-white" onClick={() => confirmPayment(order.id)}>
                        Confirmar Pagamento
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 mt-6">Nenhuma ordem aceita até o momento.</p>
          )}
        </main>
      </div>
      <Footer profissional />
    </>
  );
};

export default OrderListWorker;
