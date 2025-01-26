"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

const FormRegister: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>(""); // Sem +55 no campo
  const [cpf, setCpf] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const { toast } = useToast();
  const router = useRouter();

  // Máscara de telefone
  const formatPhone = (value: string) => {
    const rawValue = value.replace(/\D/g, ""); // Remove tudo que não for número
    const phoneFormatted = rawValue
      .replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3") // Aplica a máscara
      .replace(/^(\(\d{2}\) \d{4,5}-\d{0,4}).*/, "$1"); // Limita o tamanho
    return phoneFormatted;
  };

  // Remove máscara de telefone para envio
  const getRawPhone = (value: string) => "+55" + value.replace(/\D/g, ""); // Adiciona +55 ao número limpo

  // Máscara de CPF
  const formatCpf = (value: string) => {
    const rawValue = value.replace(/\D/g, ""); // Remove tudo que não for número
    return rawValue
      .replace(/^(\d{3})(\d{3})(\d{3})(\d{2}).*/, "$1.$2.$3-$4") // Aplica a máscara
      .replace(/^(\d{3}\.\d{3}\.\d{3}-\d{2}).*/, "$1"); // Limita o tamanho
  };

  // Remove máscara de CPF para envio
  const getRawCpf = (value: string) => value.replace(/\D/g, "");

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password || !phone || !birthday || !cpf) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    // Prepara os dados sem máscara para envio
    const userInfo = {
      name,
      email,
      password,
      phone: getRawPhone(phone), // Remove a máscara do telefone e adiciona +55
      cpf: getRawCpf(cpf), // Remove a máscara do CPF
      birthday,
      profilePic: "string", // Valor estático
    };

    try {
      const response = await axios.post("http://localhost:8080/api/client/register", userInfo);

      if (response.status === 200) {
        toast({
          title: "Sucesso",
          description: "Registro realizado com sucesso! Recarregando a página...",
          variant: "default",
        });

        setTimeout(() => {
          window.location.reload(); // Recarrega a página
        }, 2000);
      }
    } catch (error: any) {
      console.error("Erro ao registrar:", error);

      if (error.response?.data?.details?.includes("EMAIL_EXISTS")) {
        toast({
          title: "Erro",
          description: "Esse e-mail já foi usado em um outro registro.",
          variant: "destructive",
        });
      } else if (error.response?.data?.details?.includes("PHONE_NUMBER_EXISTS")) {
        toast({
          title: "Erro",
          description: "Esse telefone já foi usado em um outro registro.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Erro",
          description: "Ocorreu um erro ao processar seu registro. Tente novamente mais tarde.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <Card className="w-full bg-white max-w-lg mx-auto p-6">
      <CardHeader>
        <CardTitle className="text-4xl font-bold">Crie sua conta</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRegisterSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-base font-medium">
              Nome
            </Label>
            <Input
              id="name"
              placeholder="Digite seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <Label htmlFor="phone" className="text-base font-medium">
              Telefone
            </Label>
            <Input
              id="phone"
              placeholder="(XX) XXXXX-XXXX"
              value={phone}
              onChange={(e) => setPhone(formatPhone(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <Label htmlFor="cpf" className="text-base font-medium">
              CPF
            </Label>
            <Input
              id="cpf"
              placeholder="XXX.XXX.XXX-XX"
              value={cpf}
              onChange={(e) => setCpf(formatCpf(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-base font-medium">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-base font-medium">
              Senha
            </Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
              />
              <div
                className="absolute top-2/4 right-3 -translate-y-2/4 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="birthday" className="text-base font-medium">
              Data de Nascimento
            </Label>
            <Input
              type="date"
              id="birthday"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              className="w-full"
            />
          </div>

          <Button type="submit" variant="indigo" className="w-full">
            Registrar
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default FormRegister;
