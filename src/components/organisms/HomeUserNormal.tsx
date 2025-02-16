"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Importamos useRouter para navegação
import { FiSearch } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import TagsPopulares from "@/components/organisms/TagsPopulares";
import { CarouselWorkers } from "@/components/organisms/CarouselWorkers";
import DownloadAppSection from "@/components/organisms/DownloadAppSection";
import InsetHome1 from "@/components/organisms/InsetHome";
import ServicesSection from "@/components/organisms/ServicesSection";
import Menu from "@/components/organisms/SidebarClient";
import HeroSection from "@/components/organisms/HeroSection";

interface Subcategory {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
  subcategories: Subcategory[];
}

const HomeUserNormal = () => {
  const router = useRouter(); // Hook para navegação
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/category");
        if (!response.ok) throw new Error("Erro ao buscar categorias.");
        const data: Category[] = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredSuggestions([]);
      return;
    }

    const suggestions: string[] = [];
    categories.forEach((category) => {
      category.subcategories.forEach((subcategory) => {
        const combined = `${category.name} - ${subcategory.name}`;
        if (combined.toLowerCase().includes(searchTerm.toLowerCase())) {
          suggestions.push(combined);
        }
      });
    });

    setFilteredSuggestions(suggestions);
  }, [searchTerm, categories]);

  // Redirecionar ao clicar em uma sugestão do input de busca
  const handleSuggestionClick = (suggestion: string) => {
    const [categoryName, subcategoryName] = suggestion.split(" - ");
    const category = categories.find((c) => c.name === categoryName);
    const subcategory = category?.subcategories.find((s) => s.name === subcategoryName);

    if (subcategory) {
      router.push(`/profissionalList?categoryId=${category?.id}&subcategoryId=${subcategory.id}`);
    } else if (category) {
      router.push(`/profissionalList?categoryId=${category.id}`);
    }
  };

  return (
    <>
      <div className="flex min-h-screen">
        <Menu />
        <main className="flex-1 bg-white overflow-y-auto">
          <div className="space-y-8">
            <HeroSection />

            {/* Campo de busca */}
            <div className="relative flex flex-col items-center w-3/4 mx-auto">
              <div className="relative w-full">
                <FiSearch className="absolute left-4 top-3 text-gray-500" size={20} />
                <Input
                  type="text"
                  placeholder="Procure o que deseja resolver"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-6 text-lg border-2 border-indigo-500 rounded-md focus:ring-2 focus:ring-indigo-500 w-full"
                />
              </div>

              {filteredSuggestions.length > 0 && (
                <ul className="absolute top-14 bg-white border border-gray-300 rounded-md shadow-md w-full z-10 max-h-60 overflow-y-auto">
                  {filteredSuggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="cursor-pointer px-4 py-2 hover:bg-indigo-500 hover:text-white"
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Listagem de Categorias - Agora clicáveis */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-8">
              {categories.map((category) => (
                <div key={category.id} className="bg-white shadow-lg rounded-lg p-4">
                  <h3 className="text-xl font-semibold text-indigo-900 cursor-pointer hover:underline"
                    onClick={() => router.push(`/profissionalList?categoryId=${category.id}`)}
                  >
                    {category.name}
                  </h3>
                  <ul className="mt-2">
                    {category.subcategories.map((subcategory) => (
                      <li
                        key={subcategory.id}
                        className="text-gray-700 cursor-pointer hover:text-indigo-500"
                        onClick={() => router.push(`/profissionalList?categoryId=${category.id}&subcategoryId=${subcategory.id}`)}
                      >
                        {subcategory.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Seções existentes */}
            <TagsPopulares />
            <div className="py-6 mb-4">
              <CarouselWorkers />
            </div>
            <DownloadAppSection />
            <div className="py-6 mb-4">
              <InsetHome1 />
            </div>
            <ServicesSection />
          </div>
        </main>
      </div>
    </>
  );
};

export default HomeUserNormal;
