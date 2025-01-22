"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../../../firebaseinitialize";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axiosInstance from "../../../axiosInstance";

const FormRegister: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const { toast } = useToast();
  const router = useRouter();

  initializeApp(firebaseConfig);
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const loginWithGoogle = async () => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        console.log("user: " + user);
        console.log("token: " + token);
        router.push("/home");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Campos vazios.");
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
    }

    registerUser();
    router.push("/login");
  };

  const registerUser = async () => {
    const userInfo = { name, email, password, phone };

    try {
      console.log(userInfo);
      await axiosInstance.post("/Users", userInfo);
    } catch (error) {
      console.error("Erro ao criar usuario:", error);
    }
  };

  // Validações de senha
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  return (
    <Card className="w-full bg-white max-w-lg mx-auto p-6">
      <CardHeader>
        <CardTitle className="text-4xl font-bold">Crie sua conta</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRegisterSubmit} className="space-y-4">
          <div>
            <div>
              <Label htmlFor="nome" className="text-base font-medium">
                Nome
              </Label>
              <Input
                id="nome"
                placeholder="Digite seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full ${error ? "border-[#FF6E71]" : ""}`}
              />
              {error && <p className="text-sm border-[#FF6E71]">{error}</p>}
            </div>
            <div className="mt-4">
              <Label htmlFor="phone" className="text-base font-medium">
                Telefone
              </Label>
              <Input
                id="phone"
                placeholder="Digite seu telefone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`w-full ${error ? "border-[#FF6E71]" : ""}`}
              />
              {error && <p className="text-sm border-[#FF6E71]">{error}</p>}
            </div>

            <div className="mt-4">
              <Label htmlFor="email" className="text-base font-medium">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full ${error ? "border-[#FF6E71]" : ""}`}
              />
              {error && <p className="text-sm border-[#FF6E71]">{error}</p>}
            </div>

            <div className="relative mt-4 mb-4">
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
                  className={`w-full ${error ? "border-[#FF6E71]" : ""}`}
                />
                <div
                  className="absolute top-2/4 right-3 -translate-y-2/4 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </div>
              </div>
              <div style={{ fontSize: "10px", fontWeight: "bold" }} className="mt-2">
                <p>Sua senha deve conter: </p>
                <ul>
                  <li style={{ color: hasSpecialChar ? "#56CA00" : "#FF6E71" }}>
                    {hasSpecialChar ? "Um caracter especial ✔" : "Um caracter especial"}
                  </li>
                  <li style={{ color: hasUppercase ? "#56CA00" : "#FF6E71" }}>
                    {hasUppercase ? "Uma letra maiúscula ✔" : "Uma letra maiúscula"}
                  </li>
                  <li style={{ color: hasNumber ? "#56CA00" : "#FF6E71" }}>
                    {hasNumber ? "Um número ✔" : "Um número"}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <Button
            disabled={
              !hasNumber || 
              !hasUppercase || 
              !hasSpecialChar
            }
            type="submit"
            variant="indigo"
            className="w-full"
          >
            Registrar
          </Button>
        </form>
        <>
          <Button className="w-full mt-4" onClick={() => loginWithGoogle()}>
            <FcGoogle />
            Criar conta com Google
          </Button>
        </>
      </CardContent>
    </Card>
  );
};

export default FormRegister;
