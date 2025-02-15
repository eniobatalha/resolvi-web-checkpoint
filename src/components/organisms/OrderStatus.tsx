import React from 'react';

type OrderStatusType = 'Em aberto' | 'Trabalhando' | 'Concluído' | 'Cancelado';

interface OrderStatusProps {
    title?: string,
    description?: string,
    orderStatus?: OrderStatusType,
    className?: string
}

const OrderStatus: React.FC<OrderStatusProps> = ({
                                                     title = "titulo pedido aqui",
                                                     description = "lorem",
                                                     orderStatus = "Em aberto"
                                                 }) => {
    const statusColors: Record<OrderStatusType, string> = {
        "Em aberto": "bg-blue-500",
        "Trabalhando": "bg-orange-500",
        "Concluído": "bg-indigo-900",
        "Cancelado": "bg-red-500"
    };

    return (
        <a href="#" target="_blank" rel="noopener noreferrer" className="flex">
            <div
                className="my-4 flex flex-col justify-between w-[640px] h-[240px] border rounded-[16px] shadow-sm hover:shadow-md transition-shadow">
                <div className="h-full flex flex-col justify-center px-4">
                    <h2 className="font-bold text-indigo-900 text-[24px] mb-2">{title}</h2>
                    <p className="text-gray-600">{description}</p>
                </div>

                <span className={`text-center text-white rounded-bl-[16px] rounded-br-[16px] py-2 ${
                    statusColors[orderStatus]
                }`}>
                    {orderStatus}
                </span>
            </div>
        </a>
    );
};

export default OrderStatus;