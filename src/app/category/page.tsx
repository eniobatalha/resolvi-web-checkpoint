"use client";
import React, { useEffect, useState } from "react";
import MenuCompleto from "@/components/organisms/MenuCompleto";
import TagsPopulares from "@/components/organisms/TagsPopulares";
import { CarouselWorkers } from "@/components/organisms/CarouselWorkers";
import DownloadAppSection from "@/components/organisms/DownloadAppSection";
import { DataTableDemo } from "@/components/organisms/ListaInfo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EditeProfile } from "@/components/organisms/EditProfile";
import { GraphicProfile } from "@/components/organisms/GraphicProfile";
import { Card } from "@/components/ui/card";
import { FaStar } from "react-icons/fa";
import Menu from "@/components/organisms/Menu";
import Footer from "@/components/organisms/Footer";
import { EditeAddress } from "@/components/organisms/EditAddress";
import { CarouselCategory } from "@/components/organisms/CarouselCategory";
import axiosInstance from "../../../axiosInstance";

interface Subcategory {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
  subcategories: Subcategory[];
}

const CategoryPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  // Buscar categorias na montagem do componente
  useEffect(() => {

    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get<Category[]>("/api/category");
        const formattedData = response.data.map((category) => ({
          ...category,
          id: String(category.id), // Converte id para string
        }));
        setCategories(formattedData);
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
      }
    };


    fetchCategories();
  }, []);

  // Função para manipular a escolha da categoria/subcategoria
  const handleCategorySubcategoryChange = async (idCategory: string, idSubCategory: string) => {
    console.log("category:", idCategory);
    console.log("subcategory:", idSubCategory);

    await fetchAddCategories(idCategory);
    await fetchAddSubCategories(idSubCategory);
  };

  // Adicionar categoria ao trabalhador
  const fetchAddCategories = async (idCategory: string) => {
    console.log("Adicionando categoria ao trabalhador:", idCategory);
    const workedId = 0;

    try {
      const response = await axiosInstance.post<Category[]>(`/api/worker/${workedId}/addCategory`, { idCategory });
      setCategories(response.data);
    } catch (error) {
      console.error("Erro ao adicionar categoria:", error);
    }
  };

  // Adicionar subcategoria ao trabalhador
  const fetchAddSubCategories = async (idSubCategory: string) => {
    console.log("Adicionando subcategoria ao trabalhador:", idSubCategory);
    const workedId = 0;

    try {
      const response = await axiosInstance.post<Category[]>(`/api/worker/${workedId}/subcategories`, { idSubCategory });
      setCategories(response.data);
    } catch (error) {
      console.error("Erro ao adicionar subcategoria:", error);
    }
  };

  return (
    <>
      <MenuCompleto />
      <div className="flex min-h-screen">
        <Menu />
        <main className="flex-1 bg-white overflow-y-auto">
          <div className="space-y-12">
            <div className="flex p-10 justify-center items-center">
              <div className="w-1/5 flex-col justify-center items-center">
                <div className="flex p-10 justify-center items-center">
                  <div className="flex flex-col gap-10 justify-center items-center">
                    <div className="flex p-2 justify-center items-center">
                      <h2>Escolha a categoria dos serviços que você realiza</h2>
                    </div>
                    <CarouselCategory
                      categories={categories}
                      handleCategorySubcategoryChange={handleCategorySubcategoryChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default CategoryPage;
