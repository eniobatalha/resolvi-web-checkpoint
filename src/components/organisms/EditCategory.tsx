// EditeProfile.jsx
import React, { useState } from "react";
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

export function EditeCategory({ onCategoryChange, onSubCategoryChange, currentCategory, currentSubCategory }) {
  const [newCategory, setNewCategory] = useState(currentCategory); // Estado local para o nome
  const [newSubCategory, setNewSubCategory] = useState(currentSubCategory); // Estado local para o username

  const handleCategoryChange = (e: any) => setNewCategory(e.target.value);
  const handleSubCategoryChange = (e: any) => setNewSubCategory(e.target.value);

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
                <Input
                    id="name"
                    value={newCategory}
                    onChange={handleCategoryChange}
                    className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Número
                </Label>
                <Input
                    id="username"
                    value={newSubCategory}
                    onChange={handleSubCategoryChange}
                    className="col-span-3"
                />
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
