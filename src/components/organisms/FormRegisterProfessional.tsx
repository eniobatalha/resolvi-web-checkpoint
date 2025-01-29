"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const FormRegisterProfessional: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [step, setStep] = useState<number>(1);
    const [name, setName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [specialty, setSpecialty] = useState<string>("");
    const [cnpj, setCnpj] = useState<string>("");
    const [categories, setCategories] = useState<string[]>([]);
    const { toast } = useToast();
    const router = useRouter();

    useEffect(() => {
        const validationError = emailValidation(email);
        setError(validationError);
    }, [email]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const emailValidation = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (email === "") return "";
        if (email.length >= 8 && !email.includes("@"))
            return "O e-mail precisa conter o símbolo '@'.";
        if (!email.match(emailRegex))
            return "Por favor, insira um e-mail válido.";
        return "";
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/category");
            const data = await response.json();
            const categoryNames = data.map((category: { name: string }) => category.name);
            setCategories(categoryNames);
        } catch (error) {
            console.error("Erro ao buscar categorias:", error);
            toast({
                title: "Erro",
                description: "Não foi possível carregar as categorias.",
                variant: "destructive",
            });
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast({
                title: "Erro",
                description: "As senhas não coincidem.",
                variant: "destructive",
            });
            return;
        }

        // Formatar o telefone com "+55" no início
        const formattedPhone = `+55${phone.replace(/\D/g, "")}`;

        const payload = {
            name,
            email,
            phone: formattedPhone,
            password,
            cnpj: cnpj || "",
        };

        try {
            const response = await fetch("http://localhost:8080/api/worker/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                toast({
                    title: "Sucesso",
                    description: "Cadastro realizado com sucesso.",
                    variant: "default",
                });

                router.push("/login");
            } else {
                const errorData = await response.json(); // Extrai os detalhes do erro do servidor
                if (errorData?.details?.includes("EMAIL_EXISTS")) {
                    toast({
                        title: "Erro",
                        description: "Esse e-mail já foi usado em um outro registro.",
                        variant: "destructive",
                    });
                } else if (errorData?.details?.includes("PHONE_NUMBER_EXISTS")) {
                    toast({
                        title: "Erro",
                        description: "Esse telefone já foi usado em um outro registro.",
                        variant: "destructive",
                    });
                } else {
                    toast({
                        title: "Erro",
                        description: "Ocorreu um erro ao registrar o profissional. Tente novamente mais tarde.",
                        variant: "destructive",
                    });
                }
            }
        } catch (error) {
            console.error("Erro ao registrar profissional:", error);
            toast({
                title: "Erro",
                description: "Ocorreu um erro inesperado ao registrar o profissional.",
                variant: "destructive",
            });
            console.log("Payload:", payload);
        }

    };

    const handleBack = () => {
        setStep((prev) => Math.max(prev - 1, 1));
    };

    const isEmailButtonDisabled = !!error || !email.includes("@");
    const isNextButtonDisabled = !name || !phone;
    const isPasswordButtonDisabled = !password || !confirmPassword;
    const isSpecialtyButtonDisabled = !specialty;

    return (
        <Card className="w-full bg-white max-w-lg mx-auto py-10 px-6">
            <CardContent>
                <CardTitle className="text-4xl font-bold">
                    Resolva ser <span className="text-indigo-900 font-bold">profissional</span>
                </CardTitle>

                {step === 1 && (
                    <form onSubmit={() => setStep(2)} className="space-y-4">
                        <div>
                            <Label htmlFor="email" className="text-base font-medium">
                                Insira seu melhor e-mail
                            </Label>
                            <Input
                                type="email"
                                id="email"
                                placeholder="Digite seu e-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`w-full ${error ? "border-red-500" : ""}`}
                            />
                            {error && email.length >= 8 && <p className="text-sm text-red-500">{error}</p>}
                        </div>
                        <Button
                            disabled={isEmailButtonDisabled}
                            type="submit"
                            variant="indigo"
                            className="w-full"
                        >
                            Avançar
                        </Button>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={() => setStep(3)} className="space-y-4">
                        <div>
                            <Label htmlFor="name" className="text-base font-medium">
                                Nome
                            </Label>
                            <Input
                                type="text"
                                id="name"
                                placeholder="Nome completo"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full"
                            />
                        </div>
                        <div>
                            <Label htmlFor="phone" className="text-base font-medium">
                                Celular
                            </Label>
                            <Input
                                type="text"
                                id="phone"
                                placeholder="9 9999-9999"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full"
                            />
                        </div>
                        <div>
                            <Label htmlFor="cnpj" className="text-base font-medium">
                                CNPJ (opcional)
                            </Label>
                            <Input
                                type="text"
                                id="cnpj"
                                placeholder="Digite seu CNPJ"
                                value={cnpj}
                                onChange={(e) => setCnpj(e.target.value)}
                                className="w-full"
                            />
                        </div>
                        <Button
                            disabled={isNextButtonDisabled}
                            type="submit"
                            variant="indigo"
                            className="w-full"
                        >
                            Continuar
                        </Button>
                        <Button variant="ghost" onClick={handleBack} className="w-full">
                            Voltar
                        </Button>
                    </form>
                )}

                {step === 3 && (
                    <form onSubmit={() => setStep(4)} className="space-y-4">
                        <Label htmlFor="specialty" className="text-base font-medium">
                            Selecione sua área de especialidade
                        </Label>
                        <select
                            id="specialty"
                            value={specialty}
                            onChange={(e) => setSpecialty(e.target.value)}
                            className="w-full border rounded-md p-2"
                        >
                            <option value="" disabled>
                                Selecione uma especialidade
                            </option>
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                        <Button
                            disabled={isSpecialtyButtonDisabled}
                            type="submit"
                            variant="indigo"
                            className="w-full"
                        >
                            Continuar
                        </Button>
                        <Button variant="ghost" onClick={handleBack} className="w-full">
                            Voltar
                        </Button>
                    </form>
                )}

                {step === 4 && (
                    <form onSubmit={handleRegister} className="space-y-4">
                        <div>
                            <Label htmlFor="password" className="text-base font-medium">
                                Senha
                            </Label>
                            <Input
                                type="password"
                                id="password"
                                placeholder="Digite sua senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full"
                            />
                        </div>
                        <div>
                            <Label htmlFor="confirmPassword" className="text-base font-medium">
                                Confirmar Senha
                            </Label>
                            <Input
                                type="password"
                                id="confirmPassword"
                                placeholder="Confirme sua senha"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full"
                            />
                        </div>
                        <Button
                            disabled={isPasswordButtonDisabled}
                            type="submit"
                            variant="indigo"
                            className="w-full"
                        >
                            Concluir
                        </Button>
                        <Button variant="ghost" onClick={handleBack} className="w-full">
                            Voltar
                        </Button>
                    </form>
                )}
            </CardContent>
        </Card>
    );
};

export default FormRegisterProfessional;
