"use client";

import React from "react";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { FaAppStoreIos } from "react-icons/fa6";

const DownloadAppSection: React.FC = () => {
    return (
        <div className="flex justify-evenly relative bg-gradient-to-b from-indigo-900 to-indigo-400 py-48 px-6">
            {/* Texto e botões */}
            <div className="relative z-10 max-w-lg ml-16 w-[60%]">
                <h1 className="text-6xl font-bold text-white">
                    Faça <span className="text-green-300">download</span> <br />
                    do nosso aplicativo
                </h1>
                <h2 className="text-lg text-white">
                    Tenha acesso aos melhores serviços diretamente do seu celular.
                </h2>
                <div className="mt-6 flex space-x-4">
                    {/* Botão Google Play */}
                    <a
                        href="https://play.google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 border text-white rounded-lg shadow hover:bg-gray-800 hover:text-white transition"
                    >
                        <IoLogoGooglePlaystore className="text-2xl mr-2" />
                        <span>Google Play</span>
                    </a>

                    {/* Botão App Store */}
                    <a
                        href="https://www.apple.com/app-store/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 border text-white rounded-lg shadow hover:bg-gray-800 hover:text-white transition"
                    >
                        <FaAppStoreIos className="text-2xl mr-2" />
                        <span>App Store</span>
                    </a>
                </div>
            </div>

            {/* Imagem do smartphone */}
            <div className="w-[40%]">
                <img
                    src="/img/bg-teste.png" // Substitua pelo caminho da sua imagem
                    alt="Aplicativo"
                    className="absolute right-20 h-[50%]"
                    style={{
                        height: "120%",
                        maxHeight: "none",
                        bottom: "0", // Transborda acima do box
                    }}
                />
            </div>
        </div>
    );
};

export default DownloadAppSection;
