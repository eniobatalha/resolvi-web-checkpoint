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

interface addressProps {
  onStreetChange: (value: string) => void, 
  onCityChange: (value: string) => void, 
  onStateChange: (value: string) => void, 
  onPostalCodeChange: (value: string) => void, 
  onCountryChange: (value: string) => void,  
  currentStreet: string,
  currentCity: string,
  currentState: string,
  currentPostalCode: string,
  currentCountry: string
}

export function EditeAddress({ 
  onStreetChange, 
  onCityChange, 
  onStateChange, 
  onPostalCodeChange, 
  onCountryChange,  
  currentStreet,
  currentCity,
  currentState,
  currentPostalCode,
  currentCountry
 }: addressProps) {
  const [newStreet, setNewStreet] = useState(currentStreet); // Estado local para o nome
  const [newCity, setNewCity] = useState(currentCity); // Estado local para o nome
  const [newState, setNewState] = useState(currentState); // Estado local para o nome
  const [newPostalCode, setNewPostalCode] = useState(currentPostalCode); // Estado local para o username
  const [newCountry, setNewCountry] = useState(currentCountry); // Estado local para o username
  
  const handleStreetChange = (e: any) => setNewStreet(e.target.value);
  const handleCityChange = (e: any) => setNewCity(e.target.value);
  const handleStateChange = (e: any) => setNewState(e.target.value);
  const handlePostalCodeChange = (e: any) => setNewPostalCode(e.target.value);
  const handleCountryChange = (e: any) => setNewCountry(e.target.value);

  const handleSave = () => {
    // Passa os novos valores para o componente pai
    onStreetChange(newStreet);
    onCityChange(newCity);
    onStateChange(newState);
    onPostalCodeChange(newPostalCode);
    onCountryChange(newCountry);
  };

  return (
      <div className="items-center justify-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Editar Endereço</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Editar Endereço</DialogTitle>
              <DialogDescription>
                Faça as mudanças do seu endereço aqui, Clique em salvar mudanças.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Rua
                </Label>
                <Input
                    id="street"
                    value={newStreet}
                    onChange={handleStreetChange}
                    className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Cidade
                </Label>
                <Input
                    id="city"
                    value={newCity}
                    onChange={handleCityChange}
                    className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Estado
                </Label>
                <Input
                    id="state"
                    value={newState}
                    onChange={handleStateChange}
                    className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  CEP
                </Label>
                <Input
                    id="postalCode"
                    value={newPostalCode}
                    onChange={handlePostalCodeChange}
                    className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  País
                </Label>
                <Input
                    id="country"
                    value={newCountry}
                    onChange={handleCountryChange}
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
