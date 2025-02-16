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

interface EditProfileProps {
  onNameChange: (name: string) => void;
  onUsernameChange: (username: string) => void;
  currentName: string;
  currentUsername: string;
}

export function EditeProfile({ onNameChange, onUsernameChange, currentName, currentUsername }: EditProfileProps) {
  const [newName, setNewName] = useState(currentName); // Estado local para o nome
  const [newUsername, setNewUsername] = useState(currentUsername); // Estado local para o username

  const handleNameChange = (e: { target: { value: React.SetStateAction<string>; }; }) => setNewName(e.target.value);
  const handleUsernameChange = (e: { target: { value: React.SetStateAction<string>; }; }) => setNewUsername(e.target.value);

  const handleSave = () => {
    // Passa os novos valores para o componente pai
    onNameChange(newName);
    onUsernameChange(newUsername);
  };

  return (
      <div className="items-center justify-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Editar Perfil</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Editar perfil</DialogTitle>
              <DialogDescription>
                Faça as mudanças do seu perfil aqui, Clique em salvar mudanças.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nome
                </Label>
                <Input
                    id="name"
                    value={newName}
                    onChange={handleNameChange}
                    className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input
                    id="username"
                    value={newUsername}
                    onChange={handleUsernameChange}
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
