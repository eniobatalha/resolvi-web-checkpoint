import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface selectprop {
  type: string;
  options: { id: string; name: string }[];
  handleOptionChange: (value: any) => void;
}

export function SelectOptions({
  type,
  options,
  handleOptionChange,
}: selectprop) {
  return (
    <Select onValueChange={(e: any) => handleOptionChange(e)} >
      <SelectTrigger className="w-[270px]">
        <SelectValue placeholder={"Selecione a " + type} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup >
          <SelectLabel>{type}</SelectLabel>
          {options?.map((option, index) => (
            <SelectItem key={index + 1} value={option}>
              {option.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
