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
    const [nome, setNome] = useState<string>("");
    const [celular, setCelular] = useState<string>("");
    const [cep, setCep] = useState<string>("");
    const [especialidade, setEspecialidade] = useState<string>("");
    const { toast } = useToast();
    const router = useRouter();

    const emailValidation = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (email === "") return "";
        if (email.length >= 8 && !email.includes('@')) return "O e-mail precisa conter o símbolo '@'.";
        if (!email.match(emailRegex)) return "Por favor, insira um e-mail válido.";

        const validDomainsPattern = /@(gmail\.com|outlook\.com|hotmail\.com|gmail\.[a-z]+|outlook\.[a-z]+|hotmail\.[a-z]+)$/;
        if (!validDomainsPattern.test(email)) {
            return "Por favor, insira um e-mail com domínio válido (gmail.com, outlook.com, hotmail.com ou similares).";
        }
        return "";
    };

    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStep(2);
    };

    const handleNextStep = (e: React.FormEvent) => {
        e.preventDefault();
        setStep(3);
    };

    const handleConclude = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Especialidade selecionada:", especialidade);
        router.push("/conclusion"); // Exemplo de redirecionamento final
    };

    useEffect(() => {
        const validationError = emailValidation(email);
        setError(validationError);
    }, [email]);

    const isEmailButtonDisabled = !!error || !email.includes('@');
    const isNextButtonDisabled = !nome || !celular || !cep;
    const isConcludeButtonDisabled = !especialidade;

    return (
        <Card className="w-full bg-white max-w-lg mx-auto py-10 px-6">
            <CardContent>
                <CardTitle className="text-4xl font-bold">
                    Resolva ser <span className="text-indigo-900 font-bold pt-4">profissional</span>
                </CardTitle>

                {step === 1 && (
                    <form onSubmit={handleEmailSubmit} className="space-y-4">
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
                            <div className="mt-4">
                                <p className="text-sm text-gray-600">
                                    <span className="text-indigo-900 font-bold">Dica</span>: Utilize um e-mail
                                    profissional
                                    para criar a sua conta. Não
                                    utilize:
                                </p>
                                <ul className="list-disc pl-5 text-sm text-gray-600">
                                    <li>Um nick de jogo;</li>
                                    <li>Apelidos;</li>
                                    <li>Gírias.</li>
                                </ul>
                            </div>
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

                {
                    step === 2 && (
                        <form onSubmit={handleNextStep} className="space-y-4">
                            <div>
                                <Label htmlFor="nome" className="text-base font-medium">
                                    Nome
                                </Label>
                                <Input
                                type="text"
                                id="nome"
                                placeholder="Nome completo"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                className="w-full"
                            />
                        </div>
                        <div>
                            <Label htmlFor="celular" className="text-base font-medium">
                                Celular
                            </Label>
                            <Input
                                type="text"
                                id="celular"
                                placeholder="9 9999-9999"
                                value={celular}
                                onChange={(e) => setCelular(e.target.value)}
                                className="w-full"
                            />
                        </div>
                        <div>
                            <Label htmlFor="cep" className="text-base font-medium">
                                CEP
                            </Label>
                            <Input
                                type="text"
                                id="cep"
                                placeholder="99999-999"
                                value={cep}
                                onChange={(e) => setCep(e.target.value)}
                                className="w-full"
                            />

                            <div className="mt-2">
                                <a href="#" target="_blank" className="text-indigo-900 font-bold text-[12px] underline">Não lembra seu CEP?</a>
                            </div>
                        </div>
                        <Button
                            disabled={isNextButtonDisabled}
                            type="submit"
                            variant="indigo"
                            className="w-full"
                        >
                            Continuar
                        </Button>
                    </form>
                )}

                {step === 3 && (
                    <form onSubmit={handleConclude} className="space-y-4">
                        <p className="text-base font-medium text-gray-800">
                            Selecione a área <br /> de sua especialidade
                        </p>
                        <div className="space-y-2">
                            {["Programador", "Pedreiro", "Cozinheiro", "Outros"].map((option) => (
                                <div key={option}>
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            name="especialidade"
                                            value={option}
                                            onChange={(e) => setEspecialidade(e.target.value)}
                                            className="form-radio"
                                        />
                                        <span>{option}</span>
                                    </label>
                                </div>
                            ))}
                        </div>
                        <Button
                            disabled={isConcludeButtonDisabled}
                            type="submit"
                            variant="indigo"
                            className="w-full"
                        >
                            Concluir
                        </Button>
                    </form>
                )}
            </CardContent>
        </Card>
    );
};

export default FormRegisterProfessional;
