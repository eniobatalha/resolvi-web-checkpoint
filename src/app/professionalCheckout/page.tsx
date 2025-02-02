"use client"
import MenuCompleto from "@/components/organisms/MenuCompleto";
import MenuCategoria from "@/components/organisms/MenuCategoria";
import Menu from "@/components/organisms/Menu";
import React, { useState, useRef } from "react";

const professionalCheckout = () => {
    const [preco, setPreco] = useState('');

    const formatarPreco = (valor) => {
        // Remove caracteres não numéricos exceto vírgula
        let valorLimpo = valor.replace(/[^\d,]/g, '');

        // Divide em partes inteira e decimal
        let [inteira, decimal] = valorLimpo.split(',');

        // Processa parte inteira
        inteira = inteira.replace(/\D/g, '');
        inteira = inteira.replace(/^0+/, '') || '0'; // Remove zeros à esquerda
        inteira = inteira.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Adiciona separadores

        // Processa parte decimal
        decimal = decimal ?
            decimal.replace(/\D/g, '').slice(0, 2) : // Mantém apenas 2 dígitos
            '';

        // Combina as partes
        return decimal ? `${inteira},${decimal}` : inteira;
    };

    const handlePrecoChange = (e) => {
        const { value } = e.target;
        const valorFormatado = formatarPreco(value);
        setPreco(valorFormatado);
    };

    return (
        <main>
            <MenuCompleto />
            <MenuCategoria />
            <Menu/>
            <section className="flex">
                <div className="w-[32%] py-10 flex flex-col items-center">
                    <div className="flex flex-col w-full items-center">
                        <img className="rounded-full w-[120px] h-[120px] object-cover"
                             src="https://foxbombas.com.br/2020b/wp-content/uploads/2021/08/pexels-funny-foxy-pride-5872242-768x509.jpg"
                             alt="Professional image"/>
                        <h2 className="text-indigo-900 text-2xl font-bold py-4">Nome do profissional</h2>
                        <p>Categoria - Subcategoria</p>
                    </div>

                    <div className="w-full mt-4 flex flex-col items-center">
                        <label className="text-indigo-900 font-medium mb-2 block" htmlFor="descricao-profissional">
                            Descrição do profissional
                        </label>
                        <p className="pl-32 pr-10">
                            Um desenvolvedor frontend é responsável por criar e implementar a interface visual e interativa de websites e aplicações web. Utilizando tecnologias como HTML, CSS e JavaScript, ele transforma designs e protótipos em código funcional, garantindo responsividade (adaptação a diferentes dispositivos), acessibilidade e performance. Domina frameworks modernos como React, Angular ou Vue.js para construir interfaces dinâmicas e trabalha em conjunto com designers (para fidelidade ao layout) e backend developers (para integração de APIs). Suas habilidades incluem otimização de experiência do usuário (UX), versionamento de código (ex: Git) e testes de compatibilidade entre navegadores. Focado em detalhes, ele equilibra estética, usabilidade e eficiência para entregar produtos intuitivos e de alto desempenho.
                        </p>
                    </div>

                    <button>Contratar</button>
                </div>

                <div className="w-[68%] pr-10 py-10">
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
                        />
                    </div>

                    <div className="mb-6">
                        <label className="text-indigo-900 text-xl block mb-2 font-bold" htmlFor="detalhes-servico">
                            Detalhes do serviço
                        </label>
                        <textarea
                            id="detalhes-servico"
                            className="w-full h-32 px-3 py-2 border-2 border-indigo-500 rounded-md
                                    focus:ring-2 focus:ring-indigo-500 resize-none"
                            placeholder="Descreva os detalhes do serviço a ser realizado..."
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="text-indigo-900 block mb-2 font-bold" htmlFor="data-trabalho">
                                Data do trabalho
                            </label>
                            <input
                                id="data-trabalho"
                                type="date"
                                className="w-full border-2 border-indigo-500 rounded-md px-3 py-2
                                        focus:ring-2 focus:ring-indigo-500"
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
                        />
                    </div>
                </div>
            </section>
        </main>
    );
};

export default professionalCheckout;