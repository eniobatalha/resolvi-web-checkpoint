"use client";

import { menuData } from "@/lib/menuData";
import React, { useState } from "react";

const MenuCategoria: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <div className="relative bg-white shadow-lg px-20"> {/* Adicionando a classe px-20 aqui */}
      {/* Menu Principal */}
      <div
        className="flex justify-between items-center p-4 border-b"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {menuData.map((category) => (
          <div
            key={category.category}
            onMouseEnter={() => setActiveCategory(category.category)}
            onMouseLeave={() => setActiveCategory(null)}
            className="flex flex-col items-center cursor-pointer hover:text-indigo-800 group"
          >
            {/* Renderize o ícone como componente */}
            <category.icon className="h-8 w-8 text-gray-600 group-hover:text-indigo-800" />
            <span className="text-lg font-medium group-hover:text-indigo-800">
              {category.category}
            </span>
          </div>
        ))}
      </div>

      {/* Submenu */}
      {(isHovered || activeCategory) && activeCategory && (
        <div
          className="absolute top-full left-0 w-full bg-white shadow-md p-4 px-20 z-10 mt-4"
          onMouseEnter={() => setIsHovered(true)} // Garantir que o submenu fique visível
          onMouseLeave={() => setIsHovered(false)} // Submenu só desaparecerá se o mouse sair de ambos
        >
          {menuData
            .find((category) => category.category === activeCategory)
            ?.subcategories.map((subcategory) => (
              <div key={subcategory.title} className="mb-4">
                <h3 className="text-lg font-semibold">{subcategory.title}</h3>
                <ul className="mt-2 space-y-1">
                  {subcategory.services.map((service) => (
                    <li key={service.name}>
                      <a
                        href={service.link}
                        className="text-gray-700 hover:text-indigo-800"
                      >
                        {service.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default MenuCategoria;
