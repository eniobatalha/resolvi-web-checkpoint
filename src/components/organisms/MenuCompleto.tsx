"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MenuCompleto: React.FC = () => {
  const router = useRouter();

  const [profissional, setProfissional] = useState(false);



  const [user, setUser] = useState({
    nome: "Usuário",
    email: "",
    avatarUrl: "",
  });

  // Carrega os dados do usuário do localStorage
  useEffect(() => {
    const nome = localStorage.getItem("name") || "Usuário";
    const email = localStorage.getItem("email") || "";
    const avatarUrl = ""; // Você pode adicionar lógica para avatar no futuro
    setUser({ nome, email, avatarUrl });
  }, []);

  const handleLogout = () => {
    // Remove informações do localStorage e redireciona para login
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("role");

    router.push("/");
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
        { profissional ? ( <a
            href="/"
            className="text-white hover:text-indigo-500"
        >
          Seja um profissional
        </a> ) : null }

        <a
          href="/"
          className="text-white hover:text-indigo-500"
        >
          Como funciona?
        </a>

        {/* Avatar com Dropdown Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src={user.avatarUrl} alt={user.nome} />
              <AvatarFallback>
                {user.nome.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white text-black w-64">
            {/* Informações do Usuário */}
            <DropdownMenuLabel className="flex flex-col items-start">
              <span className="text-black text-base font-bold">{user.nome}</span>
              <span className="text-gray-500 text-sm">{user.email}</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            {/* Opções do Menu */}
            <DropdownMenuItem onClick={() => router.push("/gerenciar-dados")}>
              Gerenciar Dados
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/gerenciar-endereco")}>
              Gerenciar Endereço
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/gerenciar-pagamento")}>
              Gerenciar Formas de Pagamento
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout} className="text-red-500">
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </div>
  );
};

export default MenuCompleto;
