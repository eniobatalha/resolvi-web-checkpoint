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

interface addressProps {
  confirmarInscricao: () => void, 
  ordemDescricao: string
}

export function ResolveProblem({ 
  confirmarInscricao, 
  ordemDescricao
 }: addressProps) {

  // const handleSave = () => {
  //   // Passa os novos valores para o componente pai
  //   confirmarInscricao();
  // };

  return (
      <div className="items-center justify-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Se inscrever em Ordem</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Descrição do serviço</DialogTitle>
              <DialogDescription>
                Preste atenção a descrição feita pelo cliente.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="w-full grid  items-center gap-4">
              <p className="w-full">{ordemDescricao}</p>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={confirmarInscricao}>Confirmar inscrição</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
  );
}
