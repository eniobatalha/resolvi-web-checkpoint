import React from "react";

type OrderStatusType = "Em aberto" | "Trabalhando" | "Concluído" | "Cancelado";

interface OrderStatusProps {
  title?: string;
  description?: string;
  orderStatus?: string;
  className?: string;
  price?: number;
  category?: string;
  buscarInformacao?: () => void;
  onViewWorkers?: () => void; // Novo: Função para abrir modal de profissionais
}

const OrderStatus: React.FC<OrderStatusProps> = ({
  title = "Título aqui",
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum dignissim aliquam tellus ac ornare. Aliquam erat volutpat.",
  orderStatus = "Em aberto",
  price = 123,
  category = "auto",
  buscarInformacao,
  onViewWorkers, // Novo
  className = "",
}) => {
  const statusColors: Record<OrderStatusType, string> = {
    "Em aberto": "bg-blue-500",
    "Trabalhando": "bg-orange-500",
    "Concluído": "bg-indigo-900",
    "Cancelado": "bg-red-500",
  };

  return (
    <div className={`my-4 w-[640px] h-[260px] border rounded-[16px] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between ${className}`}>

      <div className="px-4 pt-4">
        <h2 className="font-bold text-indigo-900 text-[24px]">{title}</h2>
      </div>

      <div className="flex flex-col flex-1 px-4 pb-4">
        <p className="text-gray-600 break-words whitespace-normal">
          {description.length > 180 ? `${description.substring(0, 180)}...` : description}
        </p>
      </div>

      <div className="flex flex-col px-4">
        <p className="text-gray-600">
          <span className="font-bold text-indigo-900">Categoria:</span> {category}
        </p>
        <p className="text-gray-600">
          <span className="font-bold text-indigo-900">Preço:</span> R$ {price}
        </p>
      </div>

      <div className="flex justify-between items-center p-4">
        {/* Botão para buscar informações */}
        {buscarInformacao && (
          <button
            onClick={buscarInformacao}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Ver detalhes
          </button>
        )}

        {/* Botão para ver profissionais interessados */}
        {onViewWorkers && (
          <button
            onClick={onViewWorkers}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
          >
            Ver profissionais interessados
          </button>
        )}
      </div>

      <span className={`${statusColors[orderStatus as OrderStatusType]} text-center text-white py-2 rounded-b-[16px]`}>
        {orderStatus}
      </span>
    </div>
  );
};

export default OrderStatus;
