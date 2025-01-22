"use client";

import { useAuth } from "@/hooks/use-auth";
import { useEffect } from "react";
import { usePathname, redirect } from "next/navigation";

const withAuth = (WrappedComponent: React.FC) => {
  const AuthenticatedComponent = (props: any) => {
    const { user } = useAuth();
    const pathname = usePathname();

    useEffect(() => {
      if (!user) {
        redirect("/login"); // Redireciona para a página de login
      }
    }, [user, pathname]);

    if (!user) {
      return null; // Evita renderizar o componente antes do redirecionamento
    }

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
