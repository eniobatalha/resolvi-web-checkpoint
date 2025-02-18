"use client";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import OrderStatus from "@/components/organisms/OrderStatus";
import axiosInstance from "../../../axiosInstance";

interface AddressEntity {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface WorkerData {
  id: number;
  firebaseId: string;
  name: string;
  email: string;
  phone: string;
  cnpj?: string;
  birthday?: string;
  profilePic?: string;
  role: string;
  address?: AddressEntity;
  orders: any[];
  // etc. Ajuste conforme seu model
}

export default function ProfileWorker() {  

  const [workerData, setWorkerData] = useState<WorkerData | null>(null);
  const [editMode, setEditMode] = useState<"info" | "address" | null>(null);
  const [editedData, setEditedData] = useState<Partial<WorkerData> & { address: AddressEntity }>({
    address: { street: '', city: '', state: '', postalCode: '', country: '' }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkerData = async () => {
      try {
        const id = localStorage.getItem("id");
        if (!id) return;

        const response = await axiosInstance.get<WorkerData>(`/api/worker/${id}`);
        console.log('response', response)
        setWorkerData(response.data);
        setEditedData({
          ...response.data,
          address: response.data.address || { street: '', city: '', state: '', postalCode: '', country: '' }
        });
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkerData();
  
  }, []);

  const handleSaveInfo = async () => {
    if (!workerData) return;

    try {
      const payload = {
        name: editedData.name,
        birthday: editedData.birthday,
        cnpj: editedData.cnpj,
        profilePic: editedData.profilePic,
        phone: editedData.phone
      };

      const response = await axiosInstance.patch(
        `/api/worker/update/${workerData.id}`,
        payload
      );

      setWorkerData(response.data);
      setEditMode(null);
    } catch (error) {
      console.error("Erro ao salvar informações:", error);
    }
  };

  const handleSaveAddress = async () => {
    if (!workerData) return;

    try {
      const addressPayload = {
        street: editedData.address.street,
        city: editedData.address.city,
        state: editedData.address.state,
        postalCode: editedData.address.postalCode,
        country: editedData.address.country
      };

      const endpoint = `/api/worker/address/${workerData.id}`;
      const method = workerData.address ? 'patch' : 'post';

      const response = await axiosInstance[method]<WorkerData>(
        endpoint,
        addressPayload
      );

      setWorkerData(response.data);
      setEditMode(null);
    } catch (error) {
      console.error("Erro ao salvar endereço:", error);
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (!workerData) return <div>Profissional não encontrado</div>;

  return (
    <main className="flex-1 bg-white overflow-y-auto flex">
       {/* Seção esquerda (dados do cliente) */}
       <div className="w-1/3 p-10 flex flex-col items-center space-y-4">
        <Avatar className="w-40 h-40 mb-4">
          <AvatarImage src={workerData.profilePic || "https://via.placeholder.com/150"} />
          <AvatarFallback>{workerData.name[0]}</AvatarFallback>
        </Avatar>

        <h2 className="pt-4 font-bold text-[32px] text-indigo-900">{workerData.name}</h2>
        <p className="text-xl pb-1 text-gray-600">{workerData.email}</p>
        <p className="text-xl pb-1 text-gray-600">{workerData.phone}</p>
        {workerData.cnpj && <p className="text-xl pb-4 text-gray-600">CPF: {workerData.cnpj}</p>}

        <div className="flex gap-4">
          <button
            onClick={() => setEditMode("info")}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Editar Informações
          </button>
          <button
            onClick={() => setEditMode("address")}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Editar Endereço
          </button>
        </div>

        {/* Card de edição de informações */}
        {editMode === "info" && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
              <h3 className="text-xl font-bold mb-4">Editar Informações</h3>
              <FieldContainer
                label="Nome"
                value={editedData.name || ''}
                editMode={true}
                onChange={(value) => setEditedData({ ...editedData, name: value })}
              />
              <FieldContainer
                label="Telefone"
                value={editedData.phone || ''}
                editMode={true}
                onChange={(value) => setEditedData({ ...editedData, phone: value })}
              />
              <FieldContainer
                label="CPF"
                value={editedData.cnpj || ''}
                editMode={true}
                onChange={(value) => setEditedData({ ...editedData, cnpj: value })}
              />
              <FieldContainer
                label="Data de Nascimento"
                value={editedData.birthday || ''}
                editMode={true}
                type="date"
                onChange={(value) => setEditedData({ ...editedData, birthday: value })}
              />
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setEditMode(null)}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveInfo}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Card de edição de endereço */}
        {editMode === "address" && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
              <h3 className="text-xl font-bold mb-4">Editar Endereço</h3>
              <InputField
                label="Rua"
                value={editedData.address.street}
                onChange={(value) => setEditedData({
                  ...editedData,
                  address: { ...editedData.address, street: value }
                })}
              />
              <InputField
                label="Cidade"
                value={editedData.address.city}
                onChange={(value) => setEditedData({
                  ...editedData,
                  address: { ...editedData.address, city: value }
                })}
              />
              <InputField
                label="Estado"
                value={editedData.address.state}
                onChange={(value) => setEditedData({
                  ...editedData,
                  address: { ...editedData.address, state: value }
                })}
              />
              <InputField
                label="CEP"
                value={editedData.address.postalCode}
                onChange={(value) => setEditedData({
                  ...editedData,
                  address: { ...editedData.address, postalCode: value }
                })}
              />
              <InputField
                label="País"
                value={editedData.address.country}
                onChange={(value) => setEditedData({
                  ...editedData,
                  address: { ...editedData.address, country: value }
                })}
              />
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setEditMode(null)}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveAddress}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Seção direita (ordens) */}
      <div className="w-2/3 p-10">
        <h2 className="text-4xl font-bold text-orange-500">Ordens Concluídas</h2>
        <div className="grid grid-cols-2 gap-8 pt-4">
          {/* clientData.orders.map((order, i) => ( */}
            {/* <OrderStatus
              key={order.id || i}
              orderStatus="Concluído"
              className="w-full"
              title={`Pedido #${order.id}`}
              description={order.description}
              price={order.total}
              category={order.category}
            />
          )) */}
        </div>
      </div>
    </main>
  );
}

// Componentes auxiliares
interface FieldContainerProps {
  label: string;
  value: string;
  editMode: boolean;
  onChange: (value: string) => void;
  type?: string;
  disabled?: boolean;
}

const FieldContainer = ({ label, value, editMode, onChange, type = 'text', disabled = false }: FieldContainerProps) => (
  <div className="space-y-1 mb-4">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    {editMode ? (
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border rounded"
        disabled={disabled}
      />
    ) : (
      <p className="text-gray-600">{value || 'Não informado'}</p>
    )}
  </div>
);

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const InputField = ({ label, value, onChange }: InputFieldProps) => (
  <div className="mb-4">
    <label className="block text-sm text-gray-600">{label}</label>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-2 border rounded"
    />
  </div>
);