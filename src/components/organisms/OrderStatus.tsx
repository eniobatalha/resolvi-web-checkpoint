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
                                                     description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum dignissim aliquam tellus ac ornare. Aliquam erat volutpat. In a turpis at massa vehicula venenatis at ut risus. Morbi sed tellus augue. Donec velit tellus, pellentesque in dignissim sed, sollicitudin ac odio. Duis in sagittis sapien, sed posuere justo. Orci.',
                                                     orderStatus = 'Em aberto',
                                                     price = 123,
                                                     category = 'auto',
                                                 }) => {
    const statusColors: Record<OrderStatusType, string> = {
        'Em aberto': 'bg-blue-500',
        'Trabalhando': 'bg-orange-500',
        'Concluído': 'bg-indigo-900',
        'Cancelado': 'bg-red-500',
    };

    return (
        <div className="my-4 w-[640px] h-[240px] border rounded-[16px] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
                <div className="px-4 pt-4">
                    <h2 className="font-bold text-indigo-900 text-[24px]">{title}</h2>
                </div>

                <div className="flex flex-col flex-1 px-4 pb-4">
                    <div className="flex-1 mb-4">
                        <p className="text-gray-600 break-words whitespace-normal">
                            {description.length > 80
                                ? `${description.substring(0, 180)}...`
                                : description}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col px-4">
                    <p className="text-gray-600 break-words whitespace-normal">
                        <span className="font-bold text-indigo-900">Categoria:</span> {category}
                    </p>
                    <p className="text-gray-600 break-words whitespace-normal">
                        <span className="font-bold text-indigo-900">Preço:</span> R$ {price}
                    </p>
                </div>
            </div>

            <span
                className={`${statusColors[orderStatus as OrderStatusType]} text-center text-white py-2 rounded-b-[16px]`}
            >
        {orderStatus}
      </span>
        </div>
    );
};

export default OrderStatus;