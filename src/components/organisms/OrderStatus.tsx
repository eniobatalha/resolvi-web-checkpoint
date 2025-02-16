import React from 'react';

type OrderStatusType = 'Em aberto' | 'Trabalhando' | 'Concluído' | 'Cancelado';

interface OrderStatusProps {
  title?: string;
  description?: string;
  orderStatus?: string;
  className?: string;
  price?: number;
  category?: string;
}

const OrderStatus: React.FC<OrderStatusProps> = ({
  title = 'titulo pedido aqui',
  description = 'testetestetestetestetestetestetestetestetestetestetestetestetesteteste',
  orderStatus = 'Em aberto',
  price = 123,
  category = 'auto'
}) => {
  const statusColors: Record<OrderStatusType, string> = {
    'Em aberto': 'bg-blue-500',
    'Trabalhando': 'bg-orange-500',
    'Concluído': 'bg-indigo-900',
    'Cancelado': 'bg-red-500'
  };

  return (
    <div className="my-4 w-[640px] h-[240px] border rounded-[16px] shadow-sm hover:shadow-md transition-shadow flex flex-col">
      {/* Título */}
      <div className="p-4">
        <h2 className="font-bold text-indigo-900 text-[24px] mb-2">{title}</h2>
      </div>

      {/* Conteúdo principal */}
      <div className="flex flex-1 px-4 pb-4">
        {/* Lado esquerdo: Descrição */}
        <div className="w-1/2 pr-2 flex flex-col">
          <div className="flex-1">
            <p className="text-gray-600 break-words whitespace-normal">
              {description}
            </p>
          </div>
        </div>

        {/* Lado direito: Categoria, Preço, Botão Chat */}
        <div className="w-1/2 pl-2 flex flex-col">
          <p className="text-gray-600 mb-2 break-words whitespace-normal">
            {category}
          </p>
          <p className="text-gray-600 mb-2 break-words whitespace-normal">
            {price}
          </p>
          <button className="bg-indigo-500 text-white p-2 rounded mt-auto self-end">
            Chat
          </button>
        </div>
      </div>

      {/* Barra de status na parte inferior */}
      <span
        className={`text-center text-white py-2 rounded-b-[16px] `}
      >
        {orderStatus}
      </span>
    </div>
  );
};

export default OrderStatus;
