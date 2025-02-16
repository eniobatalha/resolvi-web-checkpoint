import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface subcategories {
  id: number;
  name: string;
}

interface CategoriesProps {
  categories: { id: number; name: string; subcategories: subcategories[] }[];
  handleCategorySubcategoryChange: (idCategory: number, idSubCategory: number) => void;
}

export function CarouselCategory({
  categories,
  handleCategorySubcategoryChange,
}: CategoriesProps) {
 
  interface subcateg {
    id: string, 
    name: string
  }

  const [idCategory, setIdCategory] = React.useState(0);
  const [idSubCategory, setIdSubCategory] = React.useState(0);
  const [subCategory, setSubCategory] = React.useState<subcateg[]>([]); // Estado local para o nome

  const handleIdCategoryChange = (choseCategory: any) => {
    setIdCategory(choseCategory?.id);
    setSubCategory(choseCategory?.subcategories);
  };

  const handleIdSubCategoryChange = (idSubCategory: any) => {
    setIdSubCategory(idSubCategory);
    handleCategorySubcategoryChange(idCategory, idSubCategory);
  };

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      orientation="vertical"
      className="w-full max-w-xs"
    >
      {idCategory == 0 ? 
      <CarouselContent className="-mt-1 h-[200px]">
          {categories.map((category, index) => 
            <CarouselItem
              onClick={() => handleIdCategoryChange(category)}
              key={index}
              className="pt-1 md:basis-1/2"
            >
              <div className="p-1">
                <Card>
                  <CardContent className="w-250 flex-col items-center justify-center p-6">
                    <span className="text-3xl font-semibold">
                      {category?.name}
                    </span>

                    <div className="flex truncate w-120 gap-1">
                      {category?.subcategories.map((element, index) => (
                        <p>{element.name}, </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          )}
        </CarouselContent>
       : 
        <CarouselContent className="-mt-1 h-[200px]">
          {subCategory.map((subcategories, index) => (
            <CarouselItem
              onClick={() => handleIdSubCategoryChange(subcategories?.id)}
              key={index}
              className="pt-1 md:basis-1/2"
            >
              <div className="p-1">
                <Card>
                  <CardContent className="w-250 flex-col items-center justify-center p-6">
                    <span className="text-3xl font-semibold">
                      {subcategories?.name}
                    </span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      }
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
