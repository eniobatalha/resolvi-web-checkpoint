"use client";

import React from "react";
// import { IoLogoGooglePlaystore } from "react-icons/io5";
// import { FaAppStoreIos } from "react-icons/fa6";

const ServicesSection: React.FC = () => {
  return (
    <div className="relative flex flex-row bg-slate-50 py-48 px-6 overflow-hidden">

      {/* Imagem do smartphone */}
      <div className="bg-amber-200 z-10 max-w-lg ml-16">
      <img
        src="/img/worker1.png" // Substitua pelo caminho da sua imagem
        alt="Aplicativo"
        className=" h-full"
        style={{ height: "130%", maxHeight: "none" }} // Ajusta a altura da imagem
      />
      </div>

      {/* Texto e botões */}
      <div className="bg-white z-10 max-w-lg ml-16">
        <h1 className="text-4xl font-bold text-gray-900">
          Reformas e Reparos
        </h1>
        <h2 className="text-lg text-gray-700 mt-4">
        Serviços de Reformas e Reparos para a sua casa ou empresa. Os melhores profissionais.
        </h2>
        <div className="mt-6 flex space-x-4">
          {/* Botão Google Play */}
          <a
            href="https://play.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 border border-gray-800 text-white bg-sky-700 rounded-lg shadow hover:bg-gray-800 hover:text-white transition"
          >
            {/* <IoLogoGooglePlaystore className="text-2xl mr-2" /> */}
            <span>Ver serviços de reformas</span>
          </a>

        </div>
      </div>

    </div>
  );
};

export default ServicesSection;
