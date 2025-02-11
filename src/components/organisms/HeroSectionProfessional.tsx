"use client";

import React from "react";

const HeroSectionProfessional: React.FC = () => {
    return (
        <div className="flex items-center justify-evenly bg-white shadow-md pt-10">
            {/* Text Content */}
            <div className="flex flex-col max-w-max">
                <h1 className="text-6xl text-gray-900">
                    Conecte-se a <span className="text-indigo-900 font-bold">milhares</span> de clientes <br/>
                    e <span className="font-bold">cresça</span> sua carreira
                </h1>

                <span className="text-lg text-gray-600">
          Ofereça seus serviços e encontre oportunidades de trabalho na sua região
        </span>
            </div>

            <div className="hidden lg:block">
                <img
                    src="https://img.freepik.com/free-photo/workman-with-his-arms-crossed-white-background_1368-5759.jpg"
                    alt="Profissional"
                    className="w-64 h-64 object-cover"
                />
            </div>
        </div>
    );
};

export default HeroSectionProfessional;