// EditeProfile.jsx
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "../ui/select";
import { SelectOptions } from "./SelectComponet";

interface categoryprops {
  onCategoryChange: (value: string) => void, 
  onSubCategoryChange: (value: string) => void, 
  currentCategory: string, 
  currentSubCategory: string
}

export function EditeCategory({ onCategoryChange, onSubCategoryChange, currentCategory, currentSubCategory }: categoryprops) {
  const [newCategory, setNewCategory] = useState(currentCategory); // Estado local para o nome
  const [subCategories, setSubCategories] = useState([]); // Estado local para o nome
  const [newSubCategory, setNewSubCategory] = useState(currentSubCategory); // Estado local para o username

  const handleCategoryChange = (e: any) => {
    setNewCategory(e.id)

    const subcategory = categories.filter(al => al.id == e.id);
    setSubCategories(subcategory);
  };
  const handleSubCategoryChange = (e: any) => setNewSubCategory(e.target.value);

  // Mova o useState para dentro do componente
  const [categories, setCategories] = useState([]); // Estado local para o nome

  // Fetch categories and subcategories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/category");
        if (!response.ok) {
          throw new Error("Erro ao buscar categorias.");
        }
        const data: [] = await response.json(); // Tipo esperado do endpoint
        setCategories(data);
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSave = () => {
    // Passa os novos valores para o componente pai
    onCategoryChange(newCategory);
    onSubCategoryChange(newSubCategory);
  };

  return (
      <div className="items-center justify-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Editar Categoria</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Editar Categoria</DialogTitle>
              <DialogDescription>
                Faça as mudanças de sua categoria aqui, Clique em salvar mudanças.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Categoria
                </Label>
                  <SelectOptions
                  type="categoria"
                  options={categories}
                  handleOptionChange={handleCategoryChange}
                  />
                {/* <Input
                    id="name"
                    value={newCategory}
                    onChange={handleCategoryChange}
                    className="col-span-3"
                /> */}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Subcategoria
                </Label>
                <SelectOptions
                  type="subcategoria"
                  options={subCategories}
                  handleOptionChange={handleSubCategoryChange}
                  />
                {/* <Input
                    id="username"
                    value={newSubCategory}
                    onChange={handleSubCategoryChange}
                    className="col-span-3"
                /> */}
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSave}>Salvar mudanças</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
  );
}
