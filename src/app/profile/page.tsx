"use client";
import React, { useEffect, useState } from "react";
import MenuCompleto from "@/components/organisms/MenuCompleto";
import TagsPopulares from "@/components/organisms/TagsPopulares";
import { CarouselWorkers } from "@/components/organisms/CarouselWorkers";
import DownloadAppSection from "@/components/organisms/DownloadAppSection";
import { DataTableDemo } from "@/components/organisms/ListaInfo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EditeProfile } from "@/components/organisms/EditProfile";
import { GraphicProfile } from "@/components/organisms/GraphicProfile";
import { Card } from "@/components/ui/card";
import { FaStar } from "react-icons/fa";
import Menu from "@/components/organisms/Menu";
import Footer from "@/components/organisms/Footer";
import { EditeAddress } from "@/components/organisms/EditAddress";

interface ProfileProps {
  name: string;
  username: string;
  address: string;
  number: string;
  zipCode: string;
  handleNameChange: (value: string) => void;
  handleUsernameChange: (value: string) => void;
  handleAddressChange: (value: string) => void;
  handleNumberChange: (value: string) => void;
  handleZipCodeChange: (value: string) => void;
}

const ProfilePage = () => {
  // Mova o useState para dentro do componente
  const [user, setUser] = React.useState(false);
  const [name, setName] = useState("João Campus"); // Nome do usuário
  const [username, setUsername] = useState("@joaocampus"); // Username do usuário

  const [address, setAddress] = useState("IFOPE"); // Estado local para o nome
  const [number, setNumber] = useState("09"); // Estado local para o username
  const [zipCode, setZipCode] = useState("90878"); // Estado local para o username

  // Função para atualizar o nome
  const handleNameChange = (newName: any) => {
    setName(newName);
  };

  // Função para atualizar o username
  const handleUsernameChange = (newUsername: any) => {
    setUsername(newUsername);
  };
  // Função para atualizar o username

  const handleAddressChange = (newAddress: any) => {
    setAddress(newAddress);
  };

  // Função para atualizar o username
  const handleNumberChange = (newNumber: any) => {
    setNumber(newNumber);
  };
  // Função para atualizar o username

  const handleZipCodeChange = (newZipCode: any) => {
    setZipCode(newZipCode);
  };

  return (
    <>
      <MenuCompleto />
      <div className="flex min-h-screen">
        <Menu />
        {user ? (
          <ProfileUserNormal
            name={name}
            username={username}
            address={address}
            number={number}
            zipCode={zipCode}
            handleNameChange={handleNameChange}
            handleUsernameChange={handleUsernameChange}
            handleAddressChange={handleAddressChange}
            handleNumberChange={handleNumberChange}
            handleZipCodeChange={handleZipCodeChange}
          />
        ) : (
          <ProfileProfessional
            name={name}
            username={username}
            address={address}
            number={number}
            zipCode={zipCode}
            handleNameChange={handleNameChange}
            handleUsernameChange={handleUsernameChange}
            handleAddressChange={handleAddressChange}
            handleNumberChange={handleNumberChange}
            handleZipCodeChange={handleZipCodeChange}
          />
        )}
      </div>
    </>
  );
};

function ProfileProfessional({
  name,
  username,
  address,
  number,
  zipCode,
  handleNameChange,
  handleUsernameChange,
  handleAddressChange,
  handleNumberChange,
  handleZipCodeChange,
}: ProfileProps) {
  const fetchOrdersWorker = async () => {
    let clientId = 0;
    try {
      const response = await fetch(
        `http://localhost:8080/api/order/client-orders/${clientId}`
      );

      if (!response.ok) {
        throw new Error("Erro ao buscar categorias.");
      }
      // const data: Category[] = await response.json(); // Tipo esperado do endpoint
      // setCategories(data);
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
    }
  };

  useEffect(() => {
    fetchOrdersWorker();
  }, []);

  return (
    <main className="flex-1 bg-white overflow-y-auto">
      <div className="space-y-12">
        <div className="flex p-10 justify-center items-center">
          <div className="w-1/5 flex-col justify-center items-center">
            <div className="flex p-10 justify-center items-center">
              <div className="flex flex-col justify-center items-center">
                <Avatar className="w-40 h-40 mb-4">
                  <AvatarImage src="https://marcasdecredibilidade.com.br/wp-content/uploads/2024/02/joaocampos.jpeg" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                {/* Exibe o nome e o username do usuário */}
                <h2 className="pt-4 font-bold text-[32px] text-indigo-900">
                  {name}
                </h2>
                <p className="text-xl pb-4 text-gray-600">{username}</p>
                <p className="text-xl pb-4 text-gray-600">Professional</p>
                {/* Passa a função de atualização de nome e username */}
                <EditeProfile
                  onNameChange={handleNameChange}
                  onUsernameChange={handleUsernameChange}
                  currentName={name}
                  currentUsername={username}
                />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              {/* Exibe o nome e o username do usuário */}
              <h3 className="pt-4 font-bold text-[32px] text-indigo-900">
                Endereço
              </h3>
              <p className="text-xl pb-4 text-gray-600">
                {address}, {number} - {zipCode}
              </p>
              {/* Passa a função de atualização de nome e username */}
              <EditeAddress
                onAddressChange={handleAddressChange}
                onNumberChange={handleNameChange}
                onZipCodeChange={handleZipCodeChange}
                currentAddress={address}
                currentNumber={number}
                currentZipCode={zipCode}
              />
            </div>
          </div>
        </div>

        <div className="px-24">
          <DataTableDemo type="worker" orders={[]} />
        </div>

        <div className="py-6 mb-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Serviços perto de você
            </h1>
            <h2 className="text-xl text-gray-900 mt-2">
              Seja resolvi premium para conferir mais serviços
            </h2>
          </div>

          <CarouselWorkers />
        </div>

        {/* Seção de Download do App */}
        <DownloadAppSection />
      </div>
      <Footer />
    </main>
  );
}
function ProfileUserNormal({
  name,
  username,
  address,
  number,
  zipCode,
  handleNameChange,
  handleUsernameChange,
  handleAddressChange,
  handleNumberChange,
  handleZipCodeChange,
}: ProfileProps) {
  const fetchOrdersClient = async () => {
    let clientId = 0;
    try {
      const response = await fetch(
        `http://localhost:8080/api/order/client-orders/${clientId}`
      );

      if (!response.ok) {
        throw new Error("Erro ao buscar categorias.");
      }
      // const data: Category[] = await response.json(); // Tipo esperado do endpoint
      // setCategories(data);
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
    }
  };

  useEffect(() => {
    fetchOrdersClient();
  }, []);

  return (
    <main className="flex-1 bg-white overflow-y-auto">
      <div className="space-y-12">
        <div className="flex p-10 justify-center items-center">
          <div className="w-1/5 flex-col justify-center items-center">
            <div className="flex p-10 justify-center items-center">
              <div className="flex flex-col justify-center items-center">
                <Avatar className="w-40 h-40 mb-4">
                  <AvatarImage src="https://marcasdecredibilidade.com.br/wp-content/uploads/2024/02/joaocampos.jpeg" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                {/* Exibe o nome e o username do usuário */}
                <h2 className="pt-4 font-bold text-[32px] text-indigo-900">
                  {name}
                </h2>
                <p className="text-xl pb-4 text-gray-600">{username}</p>
                {/* Passa a função de atualização de nome e username */}
                <EditeProfile
                  onNameChange={handleNameChange}
                  onUsernameChange={handleUsernameChange}
                  currentName={name}
                  currentUsername={username}
                />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              {/* Exibe o nome e o username do usuário */}
              <h2 className="pt-4 font-bold text-[32px] text-indigo-900">
                {name}
              </h2>
              <p className="text-xl pb-4 text-gray-600">{username}</p>
              {/* Passa a função de atualização de nome e username */}
              <EditeAddress
                onAddressChange={handleAddressChange}
                onNumberChange={handleNameChange}
                onZipCodeChange={handleZipCodeChange}
                currentAddress={address}
                currentNumber={number}
                currentZipCode={zipCode}
              />
            </div>
          </div>
        </div>

        <div className="px-24">
          <DataTableDemo type="client" orders={[]} />
        </div>

        <div className="py-6 mb-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Serviços perto de você
            </h1>
            <h2 className="text-xl text-gray-900 mt-2">
              Seja resolvi premium para conferir mais serviços
            </h2>
          </div>

          <CarouselWorkers />
        </div>

        {/* Seção de Download do App */}
        <DownloadAppSection />
      </div>
      <Footer />
    </main>
  );
}

export default ProfilePage;
