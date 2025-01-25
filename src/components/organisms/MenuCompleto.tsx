"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FaSignInAlt } from "react-icons/fa"; // Ícone de login
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

const MenuCompleto: React.FC = () => {
  const router = useRouter();

  const user = {
    nome: "Resolvi App",
    email: "resolvi@app.com",
    avatarUrl: "", // URL da imagem do avatar, deixe vazio para fallback
  };

  return (
    <div className="flex h-24 items-center px-20 bg-black justify-between">
      {/* Logo */}
      <a href="/" className="flex items-center">
        <img
          src="/img/logo.svg"
          alt="Resolvi Logo"
          className="w-32 h-auto"
        />
      </a>

      {/* Links de navegação */}
      <nav className="flex items-center space-x-8 text-lg">
        <a
          href="/"
          className="text-white hover:text-indigo-500"
        >
          Seja um profissional
        </a>
        <a
          href="/"
          className="text-white hover:text-indigo-500"
        >
          Como funciona?
        </a>
        <a
          href="/"
          className="flex items-center text-indigo-500 font-semibold hover:text-indigo-900"
        >
          <FaSignInAlt className="mr-2" /> Entrar
        </a>
      </nav>
    </div>
  );
};

export default MenuCompleto;
