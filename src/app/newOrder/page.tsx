"use client"
import MenuCompleto from "@/components/organisms/MenuCompleto";
import MenuCategoria from "@/components/organisms/MenuCategoria";
import React, { useState } from "react";
import Footer from "@/components/organisms/Footer";

const NewOrder = () => { // 1. Nome do componente em PascalCase
    const [preco, setPreco] = useState('');

    const formatarPreco = (valor: string) => {
        const valorLimpo = valor.replace(/[^\d,]/g, '');
        let [inteira, decimal] = valorLimpo.split(',');

        inteira = inteira.replace(/\D/g, '');
        inteira = inteira.replace(/^0+/, '') || '0';
        inteira = inteira.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

        decimal = decimal?.replace(/\D/g, '').slice(0, 2) || '';

        return decimal ? `${inteira},${decimal}` : inteira;
    };

    const handlePrecoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPreco(formatarPreco(e.target.value));
    };

    return (
        <>
            <MenuCompleto />
            <MenuCategoria />
            <main className="flex justify-center">
                <div className="container max-w-4xl px-4 py-10"> {/* 2. Container responsivo */}
                    <form> {/* 3. Adicionado formulário */}
                        <div className="mb-6">
                            <label className="text-indigo-900 text-2xl font-bold py-2 block" htmlFor="titulo-trabalho">
                                Título do trabalho
                            </label>
                            <input
                                id="titulo-trabalho"
                                className="text-lg border-2 px-2 h-10 border-indigo-500 rounded-md
                         focus:ring-2 focus:ring-indigo-500 w-full"
                                type="text"
                                placeholder="Insira aqui o título"
                                required // 4. Validação HTML5
                            />
                        </div>

                        <div className="mb-6">
                            <label className="text-indigo-900 text-xl block mb-2 font-bold" htmlFor="detalhes-servico">
                                Detalhes do serviço
                            </label>
                            <textarea
                                id="detalhes-servico"
                                className="w-full min-h-32 px-3 py-2 border-2 border-indigo-500 rounded-md
                         focus:ring-2 focus:ring-indigo-500 resize-y"
                                placeholder="Descreva os detalhes do serviço a ser realizado..."
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> {/* 5. Grid responsivo */}
                            <div>
                                <label className="text-indigo-900 block mb-2 font-bold" htmlFor="data-trabalho">
                                    Data do trabalho
                                </label>
                                <input
                                    id="data-trabalho"
                                    type="date"
                                    className="w-full border-2 border-indigo-500 rounded-md px-3 py-2
                           focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-indigo-900 block mb-2 font-bold" htmlFor="horario-trabalho">
                                    Horário previsto
                                </label>
                                <input
                                    id="horario-trabalho"
                                    type="time"
                                    className="w-full border-2 border-indigo-500 rounded-md px-3 py-2
                           focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>
                        </div>

                        <div className="my-6">
                            <label className="text-indigo-900 text-xl block mb-2 font-bold" htmlFor="preco-trabalho">
                                Preço do trabalho
                            </label>
                            <input
                                id="preco-trabalho"
                                type="text"
                                value={preco}
                                onChange={handlePrecoChange}
                                className="w-full px-3 py-2 border-2 border-indigo-500 rounded-md
                         focus:ring-2 focus:ring-indigo-500"
                                placeholder="Ex: 1.234,56"
                                inputMode="decimal"
                                required
                            />
                        </div>

                        <div className="mt-6">
                            <label className="text-indigo-900 block mb-2 font-bold" htmlFor="anexo-arquivo">
                                Enviar arquivo (opcional)
                            </label>
                            <input
                                id="anexo-arquivo"
                                type="file"
                                className="w-full rounded-md px-3 py-2
                         file:mr-4 file:py-2 file:px-4 file:rounded-md
                         file:border-0 file:bg-indigo-500 file:text-white
                         hover:file:bg-indigo-600 cursor-pointer"
                                accept=".pdf,.doc,.docx,.jpg,.png" // 6. Tipos de arquivo específicos
                            />
                        </div>

                        {/* 7. Botão de submissão */}
                        <button
                            type="submit"
                            className="mt-8 w-full bg-indigo-600 text-white py-3 px-6 rounded-md
                       hover:bg-indigo-700 transition-colors duration-200 font-bold"
                        >
                            Publicar Pedido
                        </button>
                    </form>
                </div>
            </main>
            <Footer profissional={true} />
        </>
    )
}

export default NewOrder;