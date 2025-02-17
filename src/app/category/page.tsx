"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
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
  const { toast } = useToast();
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/category");
        if (!response.ok) {
          throw new Error("Erro ao buscar categorias.");
        }
        const data: Category[] = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
        toast({
          title: "Erro ao carregar categorias",
          description: "Verifique sua conexão e tente novamente.",
          variant: "destructive",
        });
      }
    };

    fetchCategories();
  }, []);

  const workerId = typeof window !== "undefined" ? localStorage.getItem("id") : null;

  if (!workerId) {
    toast({
      title: "Erro",
      description: "ID do trabalhador não encontrado, faça login novamente.",
      variant: "destructive",
    });
    return null;
  }

  const handleCategorySubcategoryChange = async (idCategory: number, idSubCategory: number) => {
    console.log("Categoria:", idCategory);
    console.log("Subcategoria:", idSubCategory);

    const categorySuccess = await fetchAddCategories(idCategory);
    if (!categorySuccess) return;

    const subCategorySuccess = await fetchAddSubCategories(idSubCategory);
    if (!subCategorySuccess) return;

    toast({
      title: "Sucesso",
      description: "Categoria e subcategoria adicionadas com sucesso!",
      variant: "default",
    });

    setTimeout(() => {
      router.push("/homeProfessional");
    }, 1500);
  };

  const fetchAddCategories = async (idCategory: number) => {
    try {
      const response = await fetch(`http://localhost:8080/api/worker/${workerId}/addCategory?categoryId=${idCategory}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao adicionar categoria ao worker.");
      }

      toast({
        title: "Sucesso",
        description: "Categoria adicionada com sucesso!",
        variant: "default",
      });

      return true;
    } catch (error) {
      console.error("Erro ao adicionar categoria:", error);
      toast({
        title: "Erro",
        description: "Falha ao adicionar categoria. Tente novamente.",
        variant: "destructive",
      });
      return false;
    }
  };

  const fetchWorkerData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/worker/${workerId}`);

      if (!response.ok) {
        throw new Error("Erro ao buscar dados do trabalhador.");
      }

      const workerData = await response.json();
      return workerData;
    } catch (error) {
      console.error("Erro ao buscar dados do trabalhador:", error);
      return null;
    }
  };

  const fetchAddSubCategories = async (idSubCategory: number) => {
    try {
      const workerData = await fetchWorkerData();
      if (!workerData) return false;

      const alreadyExists = workerData.subcategory.some((sub: Subcategory) => sub.id === idSubCategory);

      if (alreadyExists) {
        toast({
          title: "Aviso",
          description: "Você já está associado a essa subcategoria. Escolha outra.",
          variant: "destructive",
        });
        return false;
      }

      const response = await fetch(`http://localhost:8080/api/worker/${workerId}/subcategories`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([idSubCategory]), 
      });

      if (!response.ok) {
        throw new Error("Erro ao adicionar subcategoria ao worker.");
      }

      toast({
        title: "Sucesso",
        description: "Subcategoria adicionada com sucesso!",
        variant: "default",
      });

      return true;
    } catch (error) {
      console.error("Erro ao adicionar subcategoria:", error);
      toast({
        title: "Erro",
        description: "Falha ao adicionar subcategoria. Tente novamente.",
        variant: "destructive",
      });
      return false;
    }
  };

  return (
    <>
      <MenuCompleto />
      <div className="flex min-h-screen">
        <main className="flex-1 bg-white overflow-y-auto">
          <div className="space-y-12">
            <div className="flex p-10 justify-center items-center">
              <div className="w-full flex flex-col justify-center items-center">
                <h2 className="text-xl font-bold text-center mb-4">
                  Escolha a categoria dos serviços que você realiza
                </h2>
                <CarouselCategory
                  categories={categories}
                  handleCategorySubcategoryChange={handleCategorySubcategoryChange}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default CategoryPage;
