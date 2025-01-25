"use client";
import React, { useState } from "react";
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

const ProfilePage = () => {
  const [name, setName] = useState("João Campus"); // Nome do usuário
  const [username, setUsername] = useState("@joaocampus"); // Username do usuário

  // Função para atualizar o nome
  const handleNameChange = (newName) => {
    setName(newName);
  };

  // Função para atualizar o username
  const handleUsernameChange = (newUsername: any) => {
    setUsername(newUsername);
  };

  return (
      <>
        <MenuCompleto />
        <div className="flex min-h-screen">
          <Menu />
          <main className="flex-1 bg-white overflow-y-auto">
            <div className="space-y-12">
              <div className="flex p-10 justify-center items-center">
                <div className="w-1/5 flex-col justify-center items-center">
                  <div className="flex p-10 justify-center items-center">
                    <div className="flex flex-col justify-center items-center">
                      <Avatar className="w-40 h-40 mb-4">
                        <AvatarImage
                            src="https://marcasdecredibilidade.com.br/wp-content/uploads/2024/02/joaocampos.jpeg"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      {/* Exibe o nome e o username do usuário */}
                      <h2 className="pt-4 font-bold text-[32px] text-indigo-900">{name}</h2>
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
                </div>
              </div>

              <div className="px-24">
                <DataTableDemo />
              </div>

              <div className="py-6 mb-4">
                <div className="text-center">
                  <h1 className="text-3xl font-bold text-gray-900">Serviços perto de você</h1>
                  <h2 className="text-xl text-gray-900 mt-2">Seja resolvi premium para conferir mais serviços</h2>
                </div>

                <CarouselWorkers />
              </div>

              {/* Seção de Download do App */}
              <DownloadAppSection />
            </div>
            <Footer />
          </main>
        </div>
      </>
  );
};

export default ProfilePage;
