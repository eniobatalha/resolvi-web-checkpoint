"use client";

import React from "react";
import { AiFillSafetyCertificate } from "react-icons/ai"
import { FaStar, FaYoutube } from "react-icons/fa"

const InfoSection: React.FC = () => {
  return (
    <div className="flex items-center justify-between px-64 bg-white shadow-md">
      {/* Text Content */}
      <div className="flex flex-col max-w-max space-y-4">
        <h1 className="text-5xl font-bold text-gray-900">
          Precisando de {`{Profissao}`}?
        </h1>
        <p className="text-2xl text-gray-600">
        Milhares de profissionais avaliados por clientes, permitindo você negociar apenas com os melhores.
        </p>

        <div>
          <div className="flex gap-2"> <AiFillSafetyCertificate color="#00008B" /> Até 4 orçamentos grátis e seguros</div>
          <div className="flex gap-2"><FaStar color="#ffb000"  /> Profissionais avaliados</div>
          <div className="flex gap-2"><FaYoutube color="#8B0000" /> Como funciona o GetNinjas?</div>
        </div>
      </div>

      {/* Professional Image */}
      <div className="hidden lg:block">
        <img
          src="img\worker1.png"
          alt="Profissional"
          className="w-64 h-64 object-cover transform scale-x-[-1]"
        />
      </div>
    </div>
  );
};

export default InfoSection;
