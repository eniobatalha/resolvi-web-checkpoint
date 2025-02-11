"use client";
import React, { useState, useEffect } from "react";
import Menu from "@/components/organisms/Menu";
import HeroSection from "@/components/organisms/HeroSection";
import { FiSearch } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import TagsPopulares from "@/components/organisms/TagsPopulares";
import { CarouselWorkers } from "@/components/organisms/CarouselWorkers";
import DownloadAppSection from "@/components/organisms/DownloadAppSection";
import InsetHome1 from "@/components/organisms/InsetHome";
import ServicesSection from "@/components/organisms/ServicesSection";
import { useRouter } from "next/router";

interface Subcategory {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
  subcategories: Subcategory[];
}

interface WorkerResponseDTO {
  id: number;
  name: string;
  rating: number;
  category: string;
  photoUrl: string;
  // Adicione outros campos conforme retornado pela API
}

const HomeUserNormal = () => {
  //const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [workers, setWorkers] = useState<WorkerResponseDTO[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/category");
        if (!response.ok) throw new Error("Erro ao buscar categorias.");
        const data: Category[] = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
        setError("Não foi possível carregar as categorias");
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

  const handleSuggestionClick = async (suggestion: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const [categoryName, subcategoryName] = suggestion.split(" - ");
      const category = categories.find(c => c.name === categoryName);
      const subcategory = category?.subcategories.find(s => s.name === subcategoryName);

      if (!category || !subcategory) {
        throw new Error("Categoria não encontrada");
      }

      let apiUrl = `http://localhost:8080/api/worker/subcategory/${subcategory.id}`;
      
      // Se não encontrar por subcategoria, tenta por categoria
      const response = await fetch(apiUrl);
      if (!response.ok) {
        apiUrl = `http://localhost:8080/api/worker/category/${category.id}`;
        const fallbackResponse = await fetch(apiUrl);
        if (!fallbackResponse.ok) throw new Error("Nenhum profissional encontrado");
        const fallbackData = await fallbackResponse.json();
        setWorkers(fallbackData);
      } else {
        const data = await response.json();
        setWorkers(data);
      }

      //router.push('#resultados');
    } catch (error) {
      console.error("Erro na busca:", error);
      setError(error instanceof Error ? error.message : "Erro desconhecido");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex min-h-screen">
        <Menu />
        <main className="flex-1 bg-white overflow-y-auto">
          <div className="space-y-8">
            <HeroSection />

            <div className="relative flex flex-col items-center w-3/4 mx-auto">
              <div className="relative w-full">
                <FiSearch className="absolute left-4 top-3 text-gray-500" size={20} />
                <Input
                  type="text"
                  placeholder="Procure o que você deseja resolver"
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

            {isLoading && (
              <div className="text-center py-4">
                <p>Carregando profissionais...</p>
              </div>
            )}

            {error && (
              <div className="text-center text-red-500 py-4">
                {error}
              </div>
            )}

            {workers.length > 0 ? (
              <div id="resultados" className="py-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-indigo-900">
                    Profissionais encontrados
                  </h2>
                  <p className="text-gray-600 mt-2">
                    {workers.length} resultados para "{searchTerm}"
                  </p>
                </div>
                <CarouselWorkers workers={workers} />
              </div>
            ) : (
              <>
                <TagsPopulares />
                <div className="py-6 mb-4">
                  <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900">Principais serviços pedidos</h1>
                    <h2 className="text-xl text-gray-900 mt-2">Os serviços mais realizados de cada categoria</h2>
                  </div>
                  <CarouselWorkers />
                </div>

                <div>
                  <DownloadAppSection />
                </div>

                <div className="flex justify-evenly items-center py-5">
                  <img src="/img/business.png" className="w-[30%]" alt="Resolvi Staff" />
                  <div className="h-[50vh] flex flex-col justify-center">
                    <h1 className="text-6xl text-gray-900">
                      O que é o <span className="text-indigo-900 font-bold">Resolvi</span>?
                    </h1>
                    <p className="text-lg text-gray-700 mt-4">
                      O <span className="font-bold text-indigo-900">Resolvi</span> é uma aplicação que conecta você aos melhores
                      profissionais de qualquer área. <br />
                      Seja para contratar serviços residenciais, projetos especializados ou cuidados pessoais, <br />
                      o <span className="font-bold text-indigo-900">Resolvi</span> oferece uma solução simples, rápida e
                      confiável.<br />
                      Com apenas alguns cliques, você encontra profissionais qualificados <br />
                      e resolve suas necessidades com segurança e praticidade.
                    </p>
                  </div>
                </div>

                <div>
                  <div className="text-center">
                    <h1 className="text-3xl font-bold text-indigo-900">Pedidos mais frequentes</h1>
                    <h2 className="text-xl text-gray-900 mt-2">Mais de 30 pedidos realizados por dia</h2>
                  </div>
                  <CarouselWorkers />
                </div>

                <div className=" py-6 mb-4">
                  <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900">Dicas antes de contratar </h1>
                    <h2 className="text-xl text-gray-900 mt-2">Informações sobre diversos tipos de serviços e como são
                      executados</h2>
                  </div>
                  <InsetHome1 />
                </div>

                <div>
                  <ServicesSection />
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default HomeUserNormal;