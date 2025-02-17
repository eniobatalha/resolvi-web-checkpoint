"use client"
import MenuCompleto from "@/components/organisms/MenuCompleto";
import MenuCategoria from "@/components/organisms/MenuCategoria";
import Menu from "@/components/organisms/SidebarClient";
import React, { useState, useEffect } from "react";
import Footer from "@/components/organisms/Footer";

const ProfessionalCheckout = () => { // Nome do componente em PascalCase
    const [preco, setPreco] = useState('');
    const [imagemPreview, setImagemPreview] = useState<string | null>(null);

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

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagemPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // Cleanup da preview da imagem
    useEffect(() => {
        return () => {
            if (imagemPreview) {
                URL.revokeObjectURL(imagemPreview);
            }
        };
    }, [imagemPreview]);

    return (
        <>
            <MenuCompleto/>
            <MenuCategoria />
            <main>
                <Menu/>
                <section className="flex">
                    <div className="w-[32%] py-10 flex flex-col items-center">
                        <div className="flex flex-col w-full items-center">
                            <img
                                className="rounded-full w-[120px] h-[120px] object-cover"
                                src="https://foxbombas.com.br/2020b/wp-content/uploads/2021/08/pexels-funny-foxy-pride-5872242-768x509.jpg"
                                alt="Professional"
                            />
                            <h2 className="text-indigo-900 text-2xl font-bold py-4">Nome do profissional</h2>
                            <p>Categoria - Subcategoria</p>
                        </div>

                        <div className="w-full mt-4 flex flex-col items-center">
                            <label className="text-indigo-900 font-medium mb-2 block">
                                Descrição do profissional
                            </label>
                            <p className="px-8 text-justify">
                            </p>
                        </div>
                        <button className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors">
                            Contratar
                        </button>
                    </div>

                    <div className="w-[68%] pr-10 py-10">

                        <div className="mt-6">
                            <label className="text-indigo-900 block mb-2 font-bold" htmlFor="anexo-arquivo">
                                Enviar arquivo (opcional)
                            </label>
                            <input
                                id="anexo-arquivo"
                                type="file"
                                onChange={handleImageUpload}
                                accept="image/*"
                                className="w-full rounded-md px-3 py-2
                                    file:mr-4 file:py-2 file:px-4 file:rounded-md
                                    file:border-0 file:bg-indigo-500 file:text-white
                                    hover:file:bg-indigo-600 cursor-pointer"
                            />
                            {imagemPreview && (
                                <div className="mt-4">
                                    <p className="text-sm text-gray-600 mb-2">Pré-visualização:</p>
                                    <img
                                        src={imagemPreview}
                                        alt="Preview do arquivo"
                                        className="rounded-lg max-w-[300px] max-h-[200px] object-cover border-2 border-indigo-100"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </main>
            <Footer profissional={true}/>
        </>
    );
};

export default ProfessionalCheckout;