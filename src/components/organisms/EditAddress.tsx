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

export function EditeAddress({ onAddressChange, onNumberChange, onZipCodeChange, currentAddress, currentNumber, currentZipCode }) {
  const [newAddress, setNewAddress] = useState(currentAddress); // Estado local para o nome
  const [newNumber, setNewNumber] = useState(currentNumber); // Estado local para o username
  const [newZipCode, setNewZipCode] = useState(currentZipCode); // Estado local para o username

  const handleAddressChange = (e) => setNewAddress(e.target.value);
  const handleNumberChange = (e) => setNewNumber(e.target.value);
  const handleZipCodeChange = (e) => setNewZipCode(e.target.value);

  const handleSave = () => {
    // Passa os novos valores para o componente pai
    onAddressChange(newAddress);
    onNumberChange(newNumber);
    onZipCodeChange(newZipCode);
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
                  Endereço
                </Label>
                <Input
                    id="name"
                    value={newAddress}
                    onChange={handleAddressChange}
                    className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Número
                </Label>
                <Input
                    id="username"
                    value={newNumber}
                    onChange={handleNumberChange}
                    className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  CEP
                </Label>
                <Input
                    id="username"
                    value={newZipCode}
                    onChange={handleZipCodeChange}
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
