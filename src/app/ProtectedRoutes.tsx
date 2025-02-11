"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();

  // Define quais rotas são protegidas
  const isProtectedRoute =
    pathname.startsWith("/home") ||
    pathname.startsWith("/category") ||
    pathname.startsWith("/info") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/order");

  useEffect(() => {
    const token = localStorage.getItem("token"); // O token correto
    const role = localStorage.getItem("role"); // A role do usuário

    if (isProtectedRoute) {
      if (!token) {
        // Se não houver token, redireciona para login
        router.push("/login");
      } else {
        // Redireciona baseado na role
        if (pathname.startsWith("/home") && role === "Worker") {
          router.push("/category"); // Redireciona se for worker
          router.push("/home-worker"); // Redireciona se for worker
        } else if (pathname.startsWith("/home-worker") && role === "Client") {
          router.push("/home"); // Redireciona se for client
        }
      }
    }
  }, [pathname, router]);

  return <>{children}</>;
};

export default ProtectedRoutes;
