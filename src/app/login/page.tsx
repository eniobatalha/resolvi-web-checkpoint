"use client";
import React, { useState } from "react";
//import { useRouter } from "next/navigation";
//import { useToast } from "@/hooks/use-toast";
import FormLogin from "@/components/organisms/FormLogin";
import FormRegister from "@/components/organisms/FormRegister";

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    //const { toast } = useToast();
    //const router = useRouter();

    return (
        <div
            className="flex h-screen bg-white bg-cover bg-center relative"
            style={{ backgroundImage: "url('/img/bg.png')" }}
        >
            <video
                src="/video/clients-bg.mp4"
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
                autoPlay
                loop
                muted
            />

            <div className="flex flex-col items-center justify-center w-1/2 h-full z-10">
                <img
                    src="/img/logo.svg"
                    alt="Logo Resolvi"
                    className="w-48 h-auto"
                />
            </div>

            <div className="flex flex-col items-center justify-center w-1/2 h-full z-10">
                {isLogin ? (
                    <>
                        <FormLogin />
                        <p className="mt-4 text-sm text-white">
                            Não tem uma conta?{"  "}
                            <button
                                onClick={() => setIsLogin(false)}
                                className="text-indigo-900 underline font-bold"
                            >
                                Registre-se
                            </button>
                        </p>
                    </>
                ) : (
                    <>
                        <FormRegister />
                        <p className="mt-4 text-sm text-white">
                            Já tem uma conta?{"  "}
                            <button
                                onClick={() => setIsLogin(true)}
                                className="text-indigo-900 underline font-bold"
                            >
                                Faça login
                            </button>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default AuthPage;
