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
    <Select>
      <SelectTrigger className="w-[270px]">
        <SelectValue placeholder={"Selecione a " + type} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup onClick={(e) => handleOptionChange(e.target.value)}>
          <SelectLabel>{type}</SelectLabel>
          {options?.map((option, index) => (
            <SelectItem key={index + 1} value={option.id}>
              {option.name}
            </SelectItem>
          ))}
          {/* <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem> */}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
