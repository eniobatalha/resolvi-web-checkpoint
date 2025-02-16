"use client";
import React, { useEffect, useState } from "react";
import MenuCompleto from "@/components/organisms/MenuCompleto";
import { CarouselCategory } from "@/components/organisms/CarouselCategory";


interface Subcategory {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
  subcategories: Subcategory[];
}



const CategoryPage = () => {
  // Mova o useState para dentro do componente
  const [categories, setCategories] = useState<Category[]>([]); // Estado local para o nome

  // Fetch categories and subcategories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/category");
        if (!response.ok) {
          throw new Error("Erro ao buscar categorias.");
        }
        const data: Category[] = await response.json(); // Tipo esperado do endpoint
        setCategories(data);
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
      }
    };

    fetchCategories();
  }, []);

  // Função para atualizar o username
  const handleCategorySubcategoryChange = (idCategory: number, idSubCategory: number) => {
    console.log('category', idCategory);
    console.log('subcategory', idSubCategory);
    fetchAddCategories(idCategory);
    fetchAddSubCategories(idSubCategory);
  };

      const fetchAddCategories = async (idCategory: number) => {
        console.log('idCategory add worker', idCategory)
     
      let workedId = 0
      try {
        const response = await fetch(`http://localhost:8080/api/worker/${workedId}/addCategory`);
        
        if (!response.ok) {
          throw new Error("Erro ao buscar categorias.");
        }
        const data: Category[] = await response.json(); // Tipo esperado do endpoint
        setCategories(data);
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
      }
    };

      const fetchAddSubCategories = async (idsubcategory: number) => {
        console.log('idsubcategory add worker', idsubcategory)

      let workedId = 0
      try {
        const response = await fetch(`http://localhost:8080/api/worker/${workedId}/subcategories`);
        
        if (!response.ok) {
          throw new Error("Erro ao buscar categorias.");
        }
        const data: Category[] = await response.json(); // Tipo esperado do endpoint
        setCategories(data);
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
      }
    };

  return (
    <>
      <MenuCompleto />
      <div className="flex min-h-screen">
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
