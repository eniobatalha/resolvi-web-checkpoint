"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import FormRegister from '@/components/organisms/FormRegister';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const { toast } = useToast();
    const router = useRouter();

    return (
        <div className="flex h-screen bg-white 
        bg-cover bg-center relative"
             style={{backgroundImage: "url('/img/bg.png')"}}
        >

            <video
                src="/video/clients-bg.mp4"
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
                autoPlay
                loop
                muted
            />

            {/* Coluna esquerda com a logo, com fundo translúcido opcional */}
            <div className="flex flex-col items-center justify-center w-1/2 h-full z-10">
                <img
                    src="/img/logo.svg"
                    alt="Logo Resolvi"
                    className="w-48 h-auto"
                />
            </div>

            {/* Coluna direita com um contêiner menor para o formulário de login */}
            <div className="flex items-center justify-center w-1/2 h-full bg-opacity-50 z-10">
                <FormRegister/>
            </div>
        </div>
    );
};

export default LoginPage;
