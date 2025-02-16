import React, { useState } from "react";
import Menu from "./SidebarClient";

interface Message {
  id: number;
  author: string;
  content: string;
  timestamp: string;
}

interface Conversation {
  id: number;
  name: string;
  messages: Message[];
}

const ChatApp: React.FC = () => {
  // Exemplo de lista de conversas
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 1,
      name: "João",
      messages: [
        {
          id: 1,
          author: "João",
          content: "Olá, tudo bem?",
          timestamp: "10:00 AM",
        },
        {
          id: 2,
          author: "Você",
          content: "Tudo ótimo, e você?",
          timestamp: "10:02 AM",
        },
      ],
    },
    {
      id: 2,
      name: "Maria",
      messages: [
        {
          id: 1,
          author: "Maria",
          content: "Oi, como está o projeto?",
          timestamp: "09:15 AM",
        },
      ],
    },
    {
      id: 3,
      name: "Grupo de Estudos",
      messages: [
        {
          id: 1,
          author: "Carlos",
          content: "Reunião hoje às 14h!",
          timestamp: "08:50 AM",
        },
        {
          id: 2,
          author: "Ana",
          content: "Estarei presente!",
          timestamp: "09:05 AM",
        },
      ],
    },
  ]);

  // ID da conversa selecionada
  const [selectedConversationId, setSelectedConversationId] = useState<number>(1);

  // Estado para mensagem nova
  const [newMessage, setNewMessage] = useState("");

  // Função para recuperar a conversa selecionada
  const selectedConversation = conversations.find(
    (conv) => conv.id === selectedConversationId
  );

  // Função para enviar nova mensagem
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    if (!selectedConversation) return;

    const updatedMessages = [
      ...selectedConversation.messages,
      {
        id: selectedConversation.messages.length + 1,
        author: "Você",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ];

    // Atualiza a conversa selecionada
    const updatedConversations = conversations.map((conv) =>
      conv.id === selectedConversation.id
        ? { ...conv, messages: updatedMessages }
        : conv
    );

    setConversations(updatedConversations);
    setNewMessage("");
  };

  return (
    <div className="flex h-screen w-full bg-gray-100">
        <Menu />
      {/* Lado esquerdo: Lista de conversas */}
      <div className="w-1/3 border-r border-gray-300 flex flex-col">
        {/* Topo da barra lateral */}
        <div className="h-16 bg-gray-200 flex items-center px-4">
          <h2 className="text-xl font-bold">Minhas Conversas</h2>
        </div>

        {/* Campo de busca (opcional) */}
        <div className="p-2">
          <input
            type="text"
            className="w-full p-2 border rounded focus:outline-none"
            placeholder="Procurar ou começar nova conversa"
          />
        </div>

        {/* Lista de conversas */}
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              className={`p-4 cursor-pointer border-b border-gray-200 hover:bg-gray-200 ${
                selectedConversationId === conv.id ? "bg-gray-300" : ""
              }`}
              onClick={() => setSelectedConversationId(conv.id)}
            >
              <p className="font-semibold">{conv.name}</p>
              {/* Exibir última mensagem (opcional) */}
              {conv.messages.length > 0 && (
                <p className="text-sm text-gray-600 truncate">
                  {conv.messages[conv.messages.length - 1].content}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lado direito: Chat */}
      <div className="w-2/3 flex flex-col">
        {/* Cabeçalho do chat */}
        <div className="h-16 bg-gray-200 flex items-center px-4 border-b border-gray-300">
          <h2 className="text-xl font-bold">
            {selectedConversation?.name || "Selecione uma conversa"}
          </h2>
        </div>

        {/* Área das mensagens */}
        <div className="flex-1 overflow-y-auto p-4 bg-white">
          {selectedConversation?.messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex mb-2 ${
                msg.author === "Você" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`rounded-md p-2 max-w-xs ${
                  msg.author === "Você"
                    ? "bg-indigo-100 text-indigo-900"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <p className="text-sm mb-1">
                  <strong>{msg.author}</strong>
                </p>
                <p>{msg.content}</p>
                <p className="text-xs text-gray-500 mt-1 text-right">
                  {msg.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Barra de envio de mensagem */}
        <div className="h-16 bg-gray-200 flex items-center px-4 border-t border-gray-300">
          <input
            type="text"
            className="flex-1 p-2 border rounded focus:outline-none"
            placeholder="Digite sua mensagem..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendMessage();
            }}
          />
          <button
            onClick={handleSendMessage}
            className="ml-2 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
