"use client";
// import Lottie from 'react-lottie';
// import Verify from '../../../../src/lotttie/verify.json'
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { FcGoogle } from "react-icons/fc";
import firebaseConfig from "../../../firebaseinitialize";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

// const defaultOptions = {
//     loop: true,
//     autoplay: true,
//     animationData: Verify,
//     rendererSettings: {
//         preserveAspectRatio: "xMidYMid slice"
//     }
// };

const FormLogin: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  //const [checked, setChecked] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1); // 1 for email, 2 for password
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false); // Estado para controle de transição
  const { toast } = useToast();
  const router = useRouter();

  initializeApp(firebaseConfig);

  const auth = getAuth();

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;

      if (token && user) {
        localStorage.setItem("authToken", token);
        localStorage.setItem("authUser", JSON.stringify(user));
        router.push("/home"); // Redireciona para a página principal
      }
    } catch (error) {
      console.error("Erro ao logar com o Google:", error);
      toast({
        title: "Erro",
        description: "Não foi possível fazer login com o Google.",
        variant: "destructive",
      });
    }
  };


  const loginWithEmail = async () => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user)
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
      });
  }


  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Email de usuário não encontrado.");
      toast({
        title: "Erro",
        description: "Por favor, insira um email válido.",
        variant: "destructive",
      });
    } else {
      if (email == "aluno@gmail.com") {
        setError("Email já cadastrado em nosso sistema.");
        toast({
          title: "Erro",
          description: "Por favor, insira um email válido.",
          variant: "destructive",
        });
      } else {
        setError("");
        // Aqui você faria a verificação do e-mail na base de dados
        setIsTransitioning(true); // Começa a transição
        setTimeout(() => {
          setStep(2); // Avança para o próximo passo
          setIsTransitioning(false); // Finaliza a transição
        }, 300); // Duração da transição
      }
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("email: " + email)
    console.log("senha: " + password)
    //setIsLoggingIn(true);
    loginWithEmail();
  };


  return (
    <Card className="w-full bg-white max-w-lg mx-auto p-6">
      <CardHeader>
        <CardTitle className="text-4xl font-bold">
          {isLoggingIn ? (
            "Verifique seu email"
          ) : step === 1 ? (
            <>
              Fazer <span className="text-indigo-900">Login</span>
            </>
          ) : (
            <>
              Insira <span className="text-indigo-900">sua senha</span>
            </>
          )}
        </CardTitle>

      </CardHeader>
      <CardContent>
        {isLoggingIn ? (
          <div>
            <div className="mx-auto p-6 relative">
              <div className="absolute bottom-3 left-20 z-10">
                {/* {checked &&

                                    <Lottie
                                        options={defaultOptions}
                                        height={80}
                                        width={80}
                                    />
                                } */}
              </div>
              <InputOTP maxLength={6}>
                <InputOTPGroup className="gap-4">
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <Button
              type="submit"
              variant="default"
              className="w-full"
            //onClick={() => setChecked(true)}
            >
              Continuar
            </Button>
          </div>
        ) : (
          <form
            onSubmit={step === 1 ? handleEmailSubmit : handlePasswordSubmit}
            className="space-y-4"
          >
            <div
              className={`transition-opacity duration-300 ${isTransitioning ? "opacity-0" : "opacity-100"
                }`}
            >
              {step === 1 && (
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
              )}
              {step === 2 && (
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
                  <div className="flex justify-end">
                    <Button
                      variant="link"
                      onClick={() => {
                        // Redireciona para a página de recuperação de senha
                        router.push("/forgot-password");
                      }}
                      className="text-sm p-0 text-primary"
                    >
                      Esqueci minha senha
                    </Button>
                  </div>
                </div>
              )}

            </div>
            <Button type="submit" variant="indigo" className="w-full">
              {step === 1 ? "Continuar" : "Acessar"}
            </Button>

          </form>

        )}
        <>
          <Button
            className="w-full mt-4"
            // onClick={() => alert("Login com Google")}
            onClick={() => loginWithGoogle()}
          >
            <FcGoogle />
            Continue com Google
          </Button>
        </>
      </CardContent>
    </Card>
  );
};

export default FormLogin;
