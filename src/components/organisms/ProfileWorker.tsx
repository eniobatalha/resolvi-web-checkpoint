"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import OrderStatus from "@/components/organisms/OrderStatus";

interface AddressEntity {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface WorkerData {
  name: string;
  email: string;
  phone: string;
  cnpj?: string;
  profilePic?: string;
  address?: AddressEntity;
  // etc. Ajuste conforme seu model
}

interface ProfileWorkerProps {
  data: WorkerData | null;
}

export default function ProfileWorker({ data }: ProfileWorkerProps) {
  if (!data) {
    return <div className="flex-1 p-8">Carregando dados do trabalhador...</div>;
  }

  const { name, email, phone, cnpj, profilePic, address } = data;

  return (
    <main className="flex-1 bg-white overflow-y-auto flex">
      {/* Lado esquerdo: dados do Worker */}
      <div className="w-1/3 p-10 flex flex-col items-center">
        <Avatar className="w-40 h-40 mb-4">
          <AvatarImage src={profilePic || "https://via.placeholder.com/150"} />
          <AvatarFallback>W</AvatarFallback>
        </Avatar>
        
        <h2 className="pt-4 font-bold text-[32px] text-indigo-900">{name}</h2>
        <p className="text-xl pb-1 text-gray-600">{email}</p>
        <p className="text-xl pb-1 text-gray-600">{phone}</p>
        {cnpj && <p className="text-xl pb-4 text-gray-600">CNPJ: {cnpj}</p>}

        {address && (
          <div className="text-center mt-4">
            <h3 className="pt-2 font-bold text-[24px] text-indigo-900">Endereço</h3>
            <p className="text-md text-gray-600">
              {address.street}, {address.city}/{address.state}, {address.country} -{" "}
              {address.postalCode}
            </p>
          </div>
        )}
      </div>

      {/* Lado direito: ordens concluídas */}
      <div className="w-2/3 p-10">
        <h2 className="text-4xl font-bold text-orange-500">Ordens Concluídas</h2>
        <div className="grid grid-cols-2 gap-8 pt-4">
          {[...Array(5)].map((_, i) => (
            <OrderStatus
              key={i}
              orderStatus="Concluído"
              className="w-full"
              title={`Trabalho Concluído ${i + 1}`}
              description="Descrição da ordem concluída."
              price={100 + i}
              category="Categoria Exemplo"
            />
          ))}
        </div>
      </div>
    </main>
  );
}
