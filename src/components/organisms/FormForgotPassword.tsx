"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const FormForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { toast } = useToast();
  const router = useRouter();

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Por favor, insira um email válido.");
      toast({
        title: "Erro",
        description: "O campo de email não pode estar vazio.",
        variant: "destructive",
      });
    } else {
      setError("");
      // Lógica para envio do email de recuperação
      toast({
        title: "Sucesso",
        description: "Email de recuperação enviado!",
        variant: "default",
      });
      router.push("/login"); // Redireciona para a página de login
    }
  };

  return (
    <Card className="w-full bg-white max-w-lg mx-auto p-6">
      <CardHeader>
        <CardTitle className="text-4xl font-bold">Esqueci minha senha</CardTitle>
        <p className="text-base">
          Lembra da sua senha?{" "}
          <Button
            variant="link"
            onClick={() => router.push("/login")}
            className="p-0 text-primary"
          >
            <span className="text-indigo-900 font-bold">Faça login!</span>
          </Button>
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleForgotPassword} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-base font-medium">
              Insira seu e-mail cadastrado
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
      </CardContent>
    </Card>
  );
};

export default FormForgotPassword;
