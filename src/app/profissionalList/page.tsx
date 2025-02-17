"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiSearch } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import MenuCompleto from "@/components/organisms/MenuCompleto";
import Footer from "@/components/organisms/Footer";

interface Subcategory {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
  subcategories: Subcategory[];
}

interface Worker {
  id: string;
  name: string;
  profilePic: string;
  email: string;
  category: Category;
  subcategory: Subcategory[];
}

const ProfissionalList = () => {
  const router = useRouter();

  // Estados
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [subcategoryId, setSubcategoryId] = useState<string | null>(null);
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

  // Captura os parâmetros da URL manualmente (sem `useSearchParams()`)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setCategoryId(params.get("categoryId"));
      setSubcategoryId(params.get("subcategoryId"));
    }
  }, []);

  // Buscar categorias no carregamento
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

  // Buscar trabalhadores conforme a categoria/subcategoria da URL
  useEffect(() => {
    if (!categoryId && !subcategoryId) return;

    setIsLoading(true);
    setError(null);

    const fetchWorkers = async () => {
      try {
        let apiUrl = subcategoryId
          ? `http://localhost:8080/api/worker/subcategory/${subcategoryId}`
          : `http://localhost:8080/api/worker/category/${categoryId}`;

        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Nenhum profissional encontrado.");

        const data: Worker[] = await response.json();
        setWorkers(data);

        // Definir a categoria e subcategoria encontrada
        if (data.length > 0) {
          setSelectedCategory(data[0].category.name);
          setSelectedSubcategory(
            data[0].subcategory.find((s) => s.id.toString() === subcategoryId)?.name || null
          );
        }
      } catch (error) {
        console.error("Erro na busca:", error);
        setError(error instanceof Error ? error.message : "Erro desconhecido");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkers();
  }, [categoryId, subcategoryId]);

  // Filtragem dinâmica do input de busca
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

  // Redireciona para nova busca ao clicar em uma sugestão
  const handleSuggestionClick = (suggestion: string) => {
    const [categoryName, subcategoryName] = suggestion.split(" - ");
    const category = categories.find((c) => c.name === categoryName);
    const subcategory = category?.subcategories.find((s) => s.name === subcategoryName);

    if (subcategory) {
      router.push(`/profissionalList?subcategoryId=${subcategory.id}`);
    } else if (category) {
      router.push(`/profissionalList?categoryId=${category.id}`);
    }
  };

  return (
    <>
      <MenuCompleto />
      <div className="flex flex-col min-h-screen items-center">
        {/* Input de busca */}
        <div className="relative w-3/4 mt-8">
          <FiSearch className="absolute left-4 top-3 text-gray-500" size={20} />
          <Input
            type="text"
            placeholder="Procure o que deseja"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 pr-4 py-4 text-lg border-2 border-indigo-500 rounded-md focus:ring-2 focus:ring-indigo-500 w-full"
          />
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

        {/* Texto de Categoria Selecionada */}
        {(selectedCategory || selectedSubcategory) && (
          <div className="w-3/4 mt-6 text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              Você está procurando por:{" "}
              <span className="text-indigo-900">
                {selectedCategory}
                {selectedSubcategory ? ` - ${selectedSubcategory}` : ""}
              </span>
            </h2>
          </div>
        )}

        {/* Exibir resultado da busca */}
        {isLoading && <p className="text-gray-600 mt-4">Carregando profissionais...</p>}
        {error && <p className="text-red-500 mt-4">{error}</p>}

        {workers.length > 0 && (
          <div className="w-3/4 mt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {workers.map((worker) => (
                <div
                  key={worker.id}
                  className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition cursor-pointer"
                  onClick={() => router.push(`/perfil/${worker.id}`)}
                >
                  <img
                    src={worker.profilePic || "/img/default-avatar.png"}
                    alt={worker.name}
                    className="w-24 h-24 rounded-full mx-auto"
                  />
                  <h3 className="text-center text-lg font-bold mt-4">{worker.name}</h3>
                  <p className="text-center text-gray-600 mt-2">
                    {worker.category.name} - {worker.subcategory.map(s => s.name).join(", ")}
                  </p>
                  <p className="text-center text-gray-500 mt-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer profissional={false} />
    </>
  );
};

export default ProfissionalList;
