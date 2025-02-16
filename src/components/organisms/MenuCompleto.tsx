"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FiMenu } from "react-icons/fi"; // Ícone de Menu Hambúrguer

const MenuCompleto: React.FC = () => {
  const router = useRouter();
  const [profissional, setProfissional] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // Estado para abrir/fechar menu

  const [user, setUser] = useState({
    nome: "Usuário",
    email: "",
    avatarUrl: "",
  });

  useEffect(() => {
    const nome = localStorage.getItem("name") || "Usuário";
    const email = localStorage.getItem("email") || "";
    const avatarUrl = "";
    setUser({ nome, email, avatarUrl });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    router.push("/");
  };

  return (
    <div className="flex h-20 items-center px-6 md:px-20 bg-black justify-between w-full">
      {/* Logo */}
      <a href="/" className="flex items-center">
        <img src="/img/logo.svg" alt="Resolvi Logo" className="w-24 md:w-32 h-auto" />
      </a>

      {/* Ícone de Menu Hambúrguer (Visível no Mobile) */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-white text-2xl">
          <FiMenu />
        </button>
      </div>

      {/* Menu Normal (Visível apenas em telas médias para cima) */}
      <nav
        className={`${
          menuOpen ? "flex" : "hidden"
        } flex-col absolute top-20 left-0 w-full bg-black text-center p-4 md:flex md:flex-row md:items-center md:space-x-8 md:static md:w-auto`}
      >
        {profissional ? (
          <a href="/" className="text-white hover:text-indigo-500 py-2">
            Seja um profissional
          </a>
        ) : null}

        <a href="/" className="text-white hover:text-indigo-500 py-2">
          Como funciona?
        </a>

        {/* Avatar com Dropdown Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer w-10 h-10 md:w-12 md:h-12">
              <AvatarImage src={user.avatarUrl} alt={user.nome} />
              <AvatarFallback>{user.nome.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white text-black w-64">
            <DropdownMenuLabel className="flex flex-col items-start">
              <span className="text-black text-base font-bold">{user.nome}</span>
              <span className="text-gray-500 text-sm">{user.email}</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
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
