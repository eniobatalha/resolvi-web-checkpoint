"use client";
import { Badge } from "@/components/ui/badge";
import React from "react";

const TagsPopulares: React.FC = () => {
  const popularTags = ["Diarista", "Eletricista", "Pintor", "Adestrador", "Encanador"];

  return (
    <div className="flex items-center mt-4 justify-center">
      {/* Texto antes das tags */}
      <p className="text-lg font-semibold mr-4">Populares:</p>

      {/* Tags */}
      <div className="flex space-x-4">
        {popularTags.map((tag) => (
          <Badge
            key={tag}
            variant="outline"
            className="cursor-pointer hover:bg-indigo-800 hover:text-white text-base py-2 px-4" // Ajustei o tamanho das tags
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default TagsPopulares;
