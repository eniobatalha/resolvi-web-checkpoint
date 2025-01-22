"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import FormForgotPassword from '@/components/organisms/FormForgotPassword';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const { toast } = useToast();
    const router = useRouter();

    return (
        <div className="flex h-screen bg-white 
        bg-cover bg-center" style={{ backgroundImage: "url('/img/bg.png')" }} 
        // style={{ backgroundImage: "url('/img/bg.png')" }}
        >
            {/* Coluna esquerda com a logo, com fundo translúcido opcional */}
            <div className="flex flex-col items-center justify-center w-1/2 h-full bg-black bg-opacity-50">
                <img
                    src="/img/logo.svg"
                    alt="Logo Resolvi"
                    className="w-48 h-auto"
                />
            </div>

            {/* Coluna direita com um contêiner menor para o formulário de login */}
            <div className="flex items-center justify-center w-1/2 h-full bg-black bg-opacity-50">
                <FormForgotPassword />
            </div>
        </div >
    );
};

export default LoginPage;
