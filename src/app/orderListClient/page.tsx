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
import { useToast } from "@/hooks/use-toast"; // 🔹 Importação do hook de toast

interface Worker {
  id: number;
  name: string;
  profilePic: string;
  email: string;
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
  const [showWorkerModal, setShowWorkerModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast(); // 🔹 Hook para exibir toasts
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
    setShowWorkerModal(true);
  };

  const selectWorker = async (workerId: number) => {
    if (!selectedOrder) return;

    try {
      await axiosInstance.post(`/api/order/${selectedOrder.id}/select-worker/${workerId}`);

      // Atualiza a ordem selecionada para "Andamento" e fecha o modal
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === selectedOrder.id ? { ...order, status: "Andamento" } : order
        )
      );

      setShowWorkerModal(false);

      // 🔹 Exibe um toast de sucesso
      toast({
        variant: "default",
        title: "Profissional Aceito!",
        description: `Você aceitou ${selectedOrder.registeredWorkers?.find(w => w.id === workerId)?.name || "o profissional"} para esta ordem.`,
      });
    } catch (err) {
      console.error("Erro ao selecionar trabalhador:", err);

      // 🔹 Exibe um toast de erro
      toast({
        variant: "destructive",
        title: "Erro ao aceitar profissional",
        description: "Houve um problema ao tentar aceitar este profissional. Tente novamente.",
      });
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <>
      <MenuCompleto />
      <Menu />
      <main className="flex pl-[250px]">
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

                  {/* Exibir status da ordem abaixo do preço */}
                  <p className={`text-center mt-2 font-semibold ${
                    order.status === "Aberto" ? "text-green-600" : "text-blue-600"
                  }`}>
                    Status: {order.status}
                  </p>

                  {/* Ocultar botão se a ordem estiver em andamento */}
                  {order.status !== "Andamento" && (
                    <Button
                      className="mt-2 w-full"
                      variant="outline"
                      onClick={() => openWorkerModal(order)}
                    >
                      Ver profissionais interessados
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Modal de Profissionais Interessados */}
      {showWorkerModal && selectedOrder && (
        <Dialog open={showWorkerModal} onOpenChange={setShowWorkerModal}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Profissionais Interessados</DialogTitle>
            </DialogHeader>

            {selectedOrder.registeredWorkers && selectedOrder.registeredWorkers.length > 0 ? (
              <div className="space-y-4">
                {selectedOrder.registeredWorkers.map((worker) => (
                  <div
                    key={worker.id}
                    className="flex items-center justify-between p-2 border rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={worker.profilePic}
                        alt={worker.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <p className="font-bold">{worker.name}</p>
                        <p className="text-sm text-gray-500">{worker.email}</p>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="secondary">Ver Perfil</Button>
                      <Button variant="default" onClick={() => selectWorker(worker.id)}>
                        Aceitar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Nenhum profissional registrado nesta ordem.</p>
            )}
          </DialogContent>
        </Dialog>
      )}

      <Footer profissional={false} />
    </>
  );
};

export default OrderPage;
