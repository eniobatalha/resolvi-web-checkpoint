import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';
import axiosInstance from "../../../axiosInstance";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ResolveProblemProps {
  confirmarInscricao: (orderId: string) => Promise<void>; // Ajustando para aceitar orderId
  ordemDescricao: string;
  orderId: string;
}

export function ResolveProblem({ confirmarInscricao, ordemDescricao, orderId }: ResolveProblemProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await confirmarInscricao(orderId); // Passa orderId ao chamar a função
      toast({
        variant: "default",
        title: "Inscrição realizada com sucesso!",
        description: "Você agora está registrado nesta ordem.",
      });
      setOpen(false); // Fecha o modal ao concluir a inscrição
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao se inscrever na ordem",
        description: "Tente novamente mais tarde.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="items-center justify-center">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Sinalizar interesse</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Descrição do serviço</DialogTitle>
            <DialogDescription>
              Preste atenção à descrição feita pelo cliente antes de se inscrever.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="w-full grid items-center gap-4">
              <p className="w-full">{ordemDescricao}</p>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleConfirm} disabled={loading}>
              {loading ? "Registrando..." : "Confirmar interesse"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
