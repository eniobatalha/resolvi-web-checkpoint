"use client";
import MenuCompleto from "@/components/organisms/MenuCompleto";
import MenuCategoria from "@/components/organisms/MenuCategoria";
import Menu from "@/components/organisms/SidebarClient";
import React, { useState, useEffect } from "react";
import Footer from "@/components/organisms/Footer";
import axiosInstance from "../../../axiosInstance";
import { useRouter } from "next/navigation";

const NewOrder = () => {
    const [preco, setPreco] = useState("");
    const [categorias, setCategorias] = useState<{ id: number; name: string; subcategories: { id: number; name: string }[] }[]>([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState<number | null>(null);
    const [subcategoriaSelecionada, setSubcategoriaSelecionada] = useState<number | null>(null);
    const [clientId, setClientId] = useState<number | null>(null);
    const router = useRouter();


    useEffect(() => {
        // Busca categorias
        axiosInstance
          .get("/api/category")
          .then((response) => setCategorias(response.data))
          .catch((error) => console.error("Erro ao buscar categorias", error));
    

        const storedId = localStorage.getItem("clientId");

        if (storedId) {
          
          setClientId(parseInt(storedId, 10));
        }
      }, []);

    const subcategoriasFiltradas = categorias.find((categoria) => categoria.id === categoriaSelecionada)?.subcategories || [];

    const formatarPreco = (valor: string) => {
        const valorLimpo = valor.replace(/[^\d,]/g, "");
        let [inteira, decimal] = valorLimpo.split(",");

        inteira = inteira.replace(/\D/g, "").replace(/^0+/, "") || "0";
        inteira = inteira.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        decimal = decimal?.replace(/\D/g, "").slice(0, 2) || "";

        return decimal ? `${inteira},${decimal}` : inteira;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Converter preço para formato numérico
        const precoNumerico = parseFloat(
            preco.replace(/\./g, '').replace(',', '.')
        );
    
        // Montar payload
        const orderData = {
            serviceName: (e.target as any).elements['titulo-trabalho'].value,
            description: (e.target as any).elements['detalhes-servico'].value,
            price: precoNumerico,
            categoryId: categoriaSelecionada,
            subcategoryId: subcategoriaSelecionada,
            clientId: clientId // Buscar de contexto de autenticação real
        };
    
        try {
            const response = await axiosInstance.post('/api/order/create-new-order', orderData);
          
            console.log('Ordem criada:', response.data);
            router.push("/orderListClient")
        } catch (error) {
            console.error('Erro ao criar ordem:', error);
           
        }
    };

    return (
        <>
            <MenuCompleto />
            <Menu />
            <main className="flex justify-center">
                <div className="container max-w-4xl px-4 py-10">
                    <h1 className="text-3xl font-bold text-indigo-900 text-center mb-6">Criar Ordem Aberta</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label className="text-indigo-900 text-2xl font-bold py-2 block" htmlFor="titulo-trabalho">
                                Título do trabalho
                            </label>
                            <input
                                id="titulo-trabalho"
                                className="text-lg border-2 px-2 h-10 border-indigo-500 rounded-md w-full"
                                type="text"
                                placeholder="Insira aqui o título"
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label className="text-indigo-900 text-xl block mb-2 font-bold" htmlFor="detalhes-servico">
                                Detalhes do serviço
                            </label>
                            <textarea
                                id="detalhes-servico"
                                className="w-full min-h-32 px-3 py-2 border-2 border-indigo-500 rounded-md resize-y"
                                placeholder="Descreva os detalhes do serviço..."
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-indigo-900 block mb-2 font-bold" htmlFor="categoria">
                                    Categoria
                                </label>
                                <select
                                    id="categoria"
                                    className="w-full border-2 border-indigo-500 rounded-md px-3 py-2"
                                    value={categoriaSelecionada || ""}
                                    onChange={(e) => setCategoriaSelecionada(Number(e.target.value))}
                                    required
                                >
                                    <option value="">Selecione uma categoria</option>
                                    {categorias.map((categoria) => (
                                        <option key={categoria.id} value={categoria.id}>
                                            {categoria.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="text-indigo-900 block mb-2 font-bold" htmlFor="subcategoria">
                                    Subcategoria (Opcional)
                                </label>
                                <select 
                                    id="subcategoria" 
                                    value={subcategoriaSelecionada || ""}
                                    onChange={(e) => setSubcategoriaSelecionada(
                                        e.target.value ? Number(e.target.value) : null
                                    )}
                                    className="w-full border-2 border-indigo-500 rounded-md px-3 py-2" 
                                    disabled={!categoriaSelecionada}
                                >
                                    <option value="">Selecione uma subcategoria</option>
                                    {subcategoriasFiltradas.map((subcategoria) => (
                                        <option key={subcategoria.id} value={subcategoria.id}>
                                            {subcategoria.name}
                                        </option>
                                    ))}
                                </select>
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
                                onChange={(e) => setPreco(formatarPreco(e.target.value))}
                                className="w-full px-3 py-2 border-2 border-indigo-500 rounded-md"
                                placeholder="Ex: 1.234,56"
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
                                className="w-full rounded-md px-3 py-2 file:bg-indigo-500 file:text-white hover:file:bg-indigo-600 cursor-pointer"
                                accept=".pdf,.doc,.docx,.jpg,.png"
                            />
                        </div>

                        <button type="submit" className="mt-8 w-full bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 font-bold">
                            Publicar Pedido
                        </button>
                    </form>
                </div>
            </main>
            <Footer profissional={false} />
        </>
    );
};

export default NewOrder;
