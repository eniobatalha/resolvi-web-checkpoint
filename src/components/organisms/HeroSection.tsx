"use client";

import React from "react";

const HeroSection: React.FC = () => {
  return (
    <div className="flex items-center justify-evenly bg-white shadow-md pt-10">
      {/* Text Content */}
      <div className="flex flex-col max-w-max">
        <h1 className="text-6xl text-gray-900">
          Mais de <span className="text-indigo-900 font-bold">500</span> tipos de <br/>
            serviços <span className="font-bold">em um só lugar</span>
        </h1>

        <span className="text-lg text-gray-600">
          Encontre profissionais e contrate serviços para tudo o que precisar
        </span>
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

export default HeroSection;
