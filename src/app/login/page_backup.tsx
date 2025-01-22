"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import FormLogin from '@/components/organisms/FormLogin';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const { toast } = useToast();
    const router = useRouter();

    return (
        <div className="flex h-screen bg-white 
        bg-cover bg-center" 
        // style={{ backgroundImage: "url('/img/bg.png')" }}
        >
            {/* Coluna esquerda com a logo, com fundo translúcido opcional */}
            <div className="flex flex-col items-center justify-center w-1/2 h-full bg-slate-200 bg-opacity-10">
                <img
                    src="/img/logo-2.svg"
                    alt="Logo Mata Fome Delivery"
                    className="w-48 h-auto"
                />
            </div>

            {/* Coluna direita com um contêiner menor para o formulário de login */}
            <div className="flex items-center justify-center w-1/2 h-full bg-slate-200 bg-opacity-10">
                <FormLogin />
            </div>
        </div >
    );
};

export default LoginPage;
