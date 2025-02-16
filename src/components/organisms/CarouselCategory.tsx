import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Subcategory {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
  subcategories: Subcategory[];
}

interface CategoriesProps {
  categories: Category[];
  handleCategorySubcategoryChange: (idCategory: number, idSubCategory: number) => void;
}

export function CarouselCategory({ categories, handleCategorySubcategoryChange }: CategoriesProps) {
  const [idCategory, setIdCategory] = React.useState(0);
  const [idSubCategory, setIdSubCategory] = React.useState(0);
  const [subCategory, setSubCategory] = React.useState<Subcategory[]>([]);
  const itemsPerPage = 6; // Exibir 6 categorias por vez (3 linhas x 2 colunas)

  const handleIdCategoryChange = (chosenCategory: Category) => {
    setIdCategory(chosenCategory.id);
    setSubCategory(chosenCategory.subcategories);
  };

  const handleIdSubCategoryChange = (subCategoryId: number) => {
    setIdSubCategory(subCategoryId);
    handleCategorySubcategoryChange(idCategory, subCategoryId);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <Carousel opts={{ align: "start" }} className="w-full max-w-2xl">
        {idCategory === 0 ? (
          <CarouselContent className="grid grid-cols-2 gap-4">
            {categories.slice(0, itemsPerPage).map((category, index) => (
              <CarouselItem
                onClick={() => handleIdCategoryChange(category)}
                key={index}
                className="cursor-pointer transform transition-all hover:scale-105"
              >
                <Card className="shadow-lg rounded-lg bg-white">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <span className="text-lg font-semibold">{category.name}</span>
                    <div className="text-xs text-gray-600 text-center">
                      {category.subcategories.map((element, idx) => (
                        <span key={idx} className="mr-2">{element.name},</span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        ) : (
          <CarouselContent className="grid grid-cols-2 gap-4">
            {subCategory.map((subcategory, index) => (
              <CarouselItem
                onClick={() => handleIdSubCategoryChange(subcategory.id)}
                key={index}
                className="cursor-pointer transform transition-all hover:scale-105"
              >
                <Card className="shadow-lg rounded-lg bg-white">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <span className="text-lg font-semibold">{subcategory.name}</span>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        )}
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
