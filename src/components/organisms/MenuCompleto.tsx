import React from "react";
import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const MenuCompleto: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex h-24 items-center px-20 bg-black justify-between">
      {/* Logo */}
      <a href="/" className="flex items-center">
        <img src="/img/logo.svg" alt="Resolvi Logo" className="w-32 h-auto" />
      </a>

      {/* Links de navegação */}
      <nav className="flex items-center space-x-8 text-lg">
        <a href="/" className="text-white hover:text-indigo-500">Seja um profissional</a>
        <a href="/" className="text-white hover:text-indigo-500">Como funciona?</a>

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src={user.photoURL || ""} alt={user.displayName || "Avatar"} />
                <AvatarFallback>{user.displayName?.[0] || "?"}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={logout}>Sair</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <a href="/login" className="flex items-center text-indigo-500 font-semibold hover:text-indigo-900">
            Entrar
          </a>
        )}
      </nav>
    </div>
  );
};

export default MenuCompleto;
