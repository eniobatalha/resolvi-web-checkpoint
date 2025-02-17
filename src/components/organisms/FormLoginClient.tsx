"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { FiArrowLeft } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import firebaseConfig from "../../../firebaseinitialize";

const FormLogin: React.FC = () => {
  const [email, setEmail] = useState<string>(""); // E-mail digitado
  const [password, setPassword] = useState<string>(""); // Senha digitada
  const [error, setError] = useState<string>(""); // Mensagem de erro
  const [step, setStep] = useState<number>(1); // 1 para e-mail, 2 para senha
  const { toast } = useToast();
  const router = useRouter();

  initializeApp(firebaseConfig);
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const loginWithGoogle = async () => {
    try {
      // Faz a autenticação com o Google
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Obtém o accessToken do Firebase
      const accessToken = await user.getIdToken();

      console.log("Firebase AccessToken:", accessToken);

      // Faz a requisição para o endpoint correto
      const userInfo = await fetchUserWithGoogle(accessToken);

      // Salva as informações no localStorage
      localStorage.setItem("token", accessToken);
      localStorage.setItem("name", userInfo.name);
      localStorage.setItem("email", userInfo.email);
      localStorage.setItem("role", userInfo.role);
      localStorage.setItem("clientId", userInfo.id);

      toast({
        title: "Login bem-sucedido",
        description: "Redirecionando para a página inicial...",
        variant: "default",
      });

        router.push("/homeClient");

    } catch (error) {
      console.error("Erro ao autenticar ou buscar usuário com Google:", error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao autenticar com o Google.",
        variant: "destructive",
      });
    }
  };

  // Função para buscar informações do usuário no endpoint Google
  const fetchUserWithGoogle = async (token: string) => {
    try {
      const response = await fetch("http://localhost:8080/api/client/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar ou criar usuário com Google.");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erro ao buscar ou criar usuário com Google:", error);
      throw error;
    }
  };



  // Função para autenticação com Firebase usando e-mail e senha
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos para continuar.",
        variant: "destructive",
      });
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Pega o accessToken do Firebase
      const token = await user.getIdToken();

      console.log("Firebase AccessToken:", token);

      // Etapa adicional: Obter informações do usuário a partir do token
      const userInfo = await fetchUserInfo(token);

      // Salvar informações no localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("name", userInfo.name);
      localStorage.setItem("email", userInfo.email);
      localStorage.setItem("role", userInfo.role);
      localStorage.setItem("clientId", userInfo.id);

      toast({
        title: "Login bem-sucedido",
        description: "Redirecionando para a página inicial...",
        variant: "default",
      });

      router.push("/homeClient");
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro",
        description: "E-mail ou senha incorretos.",
        variant: "destructive",
      });
    }
  };

  // Função para buscar informações do usuário no endpoint
  const fetchUserInfo = async (token: string) => {
    try {
      const response = await fetch("http://localhost:8080/api/client/login-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        throw new Error("Usuário não encontrado.");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };

  const createUser = async (user: any) => {
    try {
      console.log("Payload enviado para o registro do usuário:", user); // Log do payload enviado

      const response = await fetch("http://localhost:8080/api/client/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const errorDetails = await response.text(); // Captura os detalhes do erro
        console.error("Erro na resposta do servidor:", errorDetails);
        throw new Error("Erro ao criar usuário.");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      throw error;
    }
  };


  // Voltar para o estado de e-mail
  const handleBackToEmail = () => {
    setStep(1);
    setPassword(""); // Limpa a senha ao voltar
    setError(""); // Limpa mensagens de erro
  };

  // Avançar para o estado de senha
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Por favor, insira um e-mail válido.");
      return;
    }

    // Apenas avança para o próximo estado
    setStep(2);
    setError("");
  };

  return (
    <Card className="w-full bg-white max-w-lg mx-auto p-6">
      <CardHeader>
        <div className="flex items-center space-x-2">
          {step === 2 && (
            <Button
              variant="ghost"
              onClick={handleBackToEmail}
              className="p-0 text-gray-600"
            >
              <FiArrowLeft size={32} />
            </Button>
          )}
          <CardTitle className="text-4xl font-bold">
            {step === 1 ? "Fazer Login" : "Insira sua senha"}
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent>
        {step === 1 ? (
          // Formulário de e-mail
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base font-medium">
                Endereço de email
              </Label>
              <Input
                type="email"
                id="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full ${error ? "border-red-500" : ""}`}
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
            <Button type="submit" variant="indigo" className="w-full">
              Continuar
            </Button>
          </form>
        ) : (
          // Formulário de senha
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-base font-medium">
                Digite sua senha
              </Label>
              <Input
                type="password"
                id="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full ${error ? "border-red-500" : ""}`}
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
            <Button type="submit" variant="indigo" className="w-full">
              Acessar
            </Button>
          </form>
        )}
        {/* Botão para Login com Google */}
        <Button
          className="w-full mt-4"
          onClick={loginWithGoogle}
        >
          <FcGoogle className="mr-2" />
          Continue com Google
        </Button>
      </CardContent>
    </Card>
  );
};

export default FormLogin;
