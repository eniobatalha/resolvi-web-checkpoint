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
import Menu from "@/components/organisms/Menu";
import Footer from "@/components/organisms/Footer";
import { EditeAddress } from "@/components/organisms/EditAddress";
import { EditeCategory } from "@/components/organisms/EditCategory";
import axiosInstance from "../../../axiosInstance";
import axios from "axios";

interface ProfileUserProps {
  name: string;
  username: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  handleNameChange: (value: string) => void;
  handleUsernameChange: (value: string) => void;
  handleStreetChange: (value: string) => void;
  handleCityChange: (value: string) => void;
  handleStateChange: (value: string) => void;
  handlePostalCodeChange: (value: string) => void;
  handleCountryChange: (value: string) => void;
}

interface ProfileWorkerProps {
  name: string;
  username: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  category: string;
  subCategory: string;
  handleNameChange: (value: string) => void;
  handleUsernameChange: (value: string) => void;
  handleStreetChange: (value: string) => void;
  handleCityChange: (value: string) => void;
  handleStateChange: (value: string) => void;
  handlePostalCodeChange: (value: string) => void;
  handleCountryChange: (value: string) => void;
  handleCategoryChange: (value: string) => void;
  handleSubCategoryChange: (value: string) => void;
}

const ProfilePage = () => {
  // Mova o useState para dentro do componente
  const [user, setUser] = React.useState(false);
  const [name, setName] = useState("João Campus"); // Nome do usuário
  const [username, setUsername] = useState("@joaocampus"); // Username do usuário

  const [street, setStreet] = useState("Rua albert saib"); // Estado local para o nome
  const [city, setCity] = useState("Recife"); // Estado local para o nome
  const [state, setState] = useState("PE"); // Estado local para o nome
  const [postalCode, setPostalCode] = useState("1011167"); // Estado local para o username
  const [country, setCountry] = useState("BRAZIL"); // Estado local para o username

  const [category, setCategory] = useState("09");
  const [subCategory, setSubCategory] = useState("09");

  // Função para atualizar o nome
  const handleNameChange = (newName: any) => {
    setName(newName);
  };

  // Função para atualizar o username
  const handleUsernameChange = (newUsername: any) => {
    setUsername(newUsername);
  };
  // Função para atualizar o username

  const handleStreetChange = (newStreet: any) => {
    setStreet(newStreet);
  };

  const handleCityChange = (newCity: any) => {
    setCity(newCity);
  };

  const handleStateChange = (newState: any) => {
    setState(newState);
  };

  const handlePostalCodeChange = (newPostalCode: any) => {
    setPostalCode(newPostalCode);
  };

  const handleCountryChange = (newCountry: any) => {
    setCountry(newCountry);
  };

  const handleCategoryChange = (newCategory: any) => {
    setCategory(newCategory);
  };

  const handleSubCategoryChange = (newSubCategory: any) => {
    setSubCategory(newSubCategory);
  };

  // Fetch categories and subcategories on component mount
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        let clientId = 2;
        const response = await fetch(
          "http://localhost:8080/api/client/address/" + clientId
        );
        if (!response.ok) {
          throw new Error("Erro ao buscar categorias.");
        }
        const data: [] = await response.json(); // Tipo esperado do endpoint
        console.log("data", data);
        // setCategories(data);
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
      }
    };

    fetchAddress();
  }, []);

  // Fetch categories and subcategories on component mount
  useEffect(() => {
    // Função para buscar informações do usuário no endpoint Google
    const fetchUserClient = async (token: string) => {
      try {
        let clientId = 0;
        // Envia o token no corpo da requisição usando axiosInstance
        const response = await axiosInstance.get(
          "/api/client/" + clientId,
          { token }
        );

        // Axios já retorna os dados em response.data
        return response.data;
      } catch (error) {
        console.error("Erro ao buscar ou criar usuário com Google:", error);

        // Se for um erro do Axios, podemos extrair mais detalhes
        if (axios.isAxiosError(error)) {
          const serverMessage =
            error.response?.data?.message || "Erro desconhecido no servidor";
          throw new Error(
            `Erro na comunicação com o servidor: ${serverMessage}`
          );
        }

        throw new Error("Erro ao processar autenticação com Google");
      }

      fetchUserClient("");
    };
  }, []);

  // Fetch categories and subcategories on component mount
  useEffect(() => {
    // Função para buscar informações do usuário no endpoint Google
    const fetchClientAddress = async (token: string) => {
      try {
        let clientId = 0;
        // Envia o token no corpo da requisição usando axiosInstance
        const response = await axiosInstance.get(
          "/api/client/address" + clientId,
          { token }
        );

        // Axios já retorna os dados em response.data
        return response.data;
      } catch (error) {
        console.error("Erro ao buscar ou criar usuário com Google:", error);

        // Se for um erro do Axios, podemos extrair mais detalhes
        if (axios.isAxiosError(error)) {
          const serverMessage =
            error.response?.data?.message || "Erro desconhecido no servidor";
          throw new Error(
            `Erro na comunicação com o servidor: ${serverMessage}`
          );
        }

        throw new Error("Erro ao processar autenticação com Google");
      }

      fetchClientAddress("");
    };
  }, []);

  // Fetch categories and subcategories on component mount
  useEffect(() => {
    // Função para buscar informações do usuário no endpoint Google
    const fetchAltClientAddress = async (token: string) => {
      try {
        let clientId = 0;
        // Envia o token no corpo da requisição usando axiosInstance
        const response = await axiosInstance.path(
          "/api/client/address" + clientId,
          { token }, 
          {
            "street": street,
            "city": city,
            "state": state,
            "postalCode": postalCode,
            "country": country
          }
        );

        // Axios já retorna os dados em response.data
        return response.data;
      } catch (error) {
        console.error("Erro ao buscar ou criar usuário com Google:", error);

        // Se for um erro do Axios, podemos extrair mais detalhes
        if (axios.isAxiosError(error)) {
          const serverMessage =
            error.response?.data?.message || "Erro desconhecido no servidor";
          throw new Error(
            `Erro na comunicação com o servidor: ${serverMessage}`
          );
        }

        throw new Error("Erro ao processar autenticação com Google");
      }

      // fetchAltClientAddress("");
    };
  }, []);

  return (
    <>
      <MenuCompleto />
      <div className="flex min-h-screen">
        <Menu />
        {user ? (
          <ProfileUserNormal
            name={name}
            username={username}
            street={street}
            city={city}
            state={state}
            postalCode={postalCode}
            country={country}
            handleNameChange={handleNameChange}
            handleUsernameChange={handleUsernameChange}
            handleStreetChange={handleStreetChange}
            handleCityChange={handleCityChange}
            handleStateChange={handleStateChange}
            handlePostalCodeChange={handlePostalCodeChange}
            handleCountryChange={handleCountryChange}
          />
        ) : (
          <ProfileProfessional
            name={name}
            username={username}
            street={street}
            city={city}
            state={state}
            postalCode={postalCode}
            country={country}
            category={category}
            subCategory={subCategory}
            handleNameChange={handleNameChange}
            handleUsernameChange={handleUsernameChange}
            handleStreetChange={handleStreetChange}
            handleCityChange={handleCityChange}
            handleStateChange={handleStateChange}
            handlePostalCodeChange={handlePostalCodeChange}
            handleCountryChange={handleCountryChange}
            handleCategoryChange={handleCategoryChange}
            handleSubCategoryChange={handleSubCategoryChange}
          />
        )}
      </div>
    </>
  );
};

function ProfileProfessional({
  name,
  username,
  street,
  city,
  state,
  postalCode,
  country,
  category,
  subCategory,
  handleNameChange,
  handleUsernameChange,
  handleStreetChange,
  handleCityChange,
  handleStateChange,
  handlePostalCodeChange,
  handleCountryChange,
  handleCategoryChange,
  handleSubCategoryChange,
}: ProfileWorkerProps) {
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
                {street}, {city}/{state}, {country} - {postalCode}
              </p>
              {/* Passa a função de atualização de nome e username */}
              <EditeAddress
                onStreetChange={handleStreetChange}
                onCityChange={handleCityChange}
                onStateChange={handleStateChange}
                onPostalCodeChange={handlePostalCodeChange}
                onCountryChange={handleCountryChange}
                currentStreet={street}
                currentCity={city}
                currentState={state}
                currentPostalCode={postalCode}
                currentCountry={country}
              />
            </div>
            <div className="flex flex-col justify-center items-center">
              {/* Exibe a categoria e o subcategoria do usuário */}
              <h3 className="pt-4 font-bold text-[32px] text-indigo-900">
                Categoria
              </h3>
              <p className="text-xl pb-4 text-gray-600">
                {street}, {city}/{state}, {country} - {postalCode}
              </p>
              {/* Passa a função de atualização de nome e username */}
              <EditeCategory
                onCategoryChange={handleCategoryChange}
                onSubCategoryChange={handleSubCategoryChange}
                currentCategory={category}
                currentSubCategory={subCategory}
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
  street,
  city,
  state,
  postalCode,
  country,
  handleNameChange,
  handleUsernameChange,
  handleStreetChange,
  handleCityChange,
  handleStateChange,
  handlePostalCodeChange,
  handleCountryChange,
}: ProfileUserProps) {
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
                <p>EU SOU UM TESTE</p>
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
              <h3 className="pt-4 font-bold text-[32px] text-indigo-900">
                Endereço
              </h3>
              <p className="text-xl pb-4 text-gray-600">
                {street}, {city}/{state}, {country} - {postalCode}
              </p>
              {/* Passa a função de atualização de nome e username */}
              <EditeAddress
                onStreetChange={handleStreetChange}
                onCityChange={handleCityChange}
                onStateChange={handleStateChange}
                onPostalCodeChange={handlePostalCodeChange}
                onCountryChange={handleCountryChange}
                currentStreet={street}
                currentCity={city}
                currentState={state}
                currentPostalCode={postalCode}
                currentCountry={country}
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
