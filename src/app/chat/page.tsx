"use client";

import React, { useState, useEffect } from "react";
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  addDoc,
  orderBy,
  QuerySnapshot,
  DocumentData
} from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
 // Ajuste o caminho conforme necessário
import SidebarClient from "@/components/organisms/SidebarClient";
import { db } from "../../../firebaseinitialize";

interface Message {
  id: string;
  content: string;
  authorId: string;
  timestamp: Timestamp;
  authorName: string;
}

interface Chat {
  id: string;
  clientId: string;
  workerId: string;
  status: string;
  orderId: string;
  clientName: string;
  workerName: string;
}

const ChatApp = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentUser, setCurrentUser] = useState<{id: string, name: string} | null>(null);

  useEffect(() => {
    const role = localStorage.getItem("role");
    const name = localStorage.getItem("name");
  
    let id: string | null = null;
  
    if (role === "Client") {
      id = localStorage.getItem("clientId");
    } else if (role === "Worker") {
      id = localStorage.getItem("id");
    }
  
    // Verificação robusta dos valores
    if (id && name) {
      setCurrentUser({
        id: id.trim(), // Remove espaços em branco
        name: name.trim()
      });
    } else {
      console.error("Dados do usuário incompletos ou inválidos:");
      console.log("Role:", role);
      console.log("ID:", id);
      console.log("Name:", name);
    }
  
  }, []);

  useEffect(() => {
    console.log('Chats atualizados:', chats);
  }, [chats]);
  
  useEffect(() => {
    console.log('Usuário atual:', currentUser);
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser?.id) return;

    const unsubscribeCallbacks: Array<() => void> = [];

    // Query para chats onde o usuário é cliente
    const qClient = query(
      collection(db, "chats"),
      where("participants.clientId", "==", currentUser.id)
    );

    const unsubClient = onSnapshot(qClient, (snapshot) => {
      handleSnapshot(snapshot);
      console.log("Chats do cliente:", snapshot.docs.map(d => d.data()));
    });

    // Query para chats onde o usuário é worker
    const qWorker = query(
      collection(db, "chats"),
      where("participants.workerId", "==", currentUser.id)
    );

    const unsubWorker = onSnapshot(qWorker, (snapshot) => {
      handleSnapshot(snapshot);
      console.log("Chats do worker:", snapshot.docs.map(d => d.data()));
    });

    unsubscribeCallbacks.push(unsubClient, unsubWorker);

    return () => {
      unsubscribeCallbacks.forEach(unsub => unsub());
    };
  }, [currentUser]);

  const handleSnapshot = (snapshot: QuerySnapshot<DocumentData>) => {
    const newChats: Chat[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      console.log('Documento recebido:', doc.id, data); // Log detalhado
      
      // Converter IDs para string para garantir compatibilidade
      const chat = {
        id: doc.id,
        clientId: String(data.participants.clientId),
        workerId: String(data.participants.workerId),
        status: data.status,
        orderId: data.orderId,
        clientName: data.clientName,
        workerName: data.workerName
      };
  
      // Verificar se o chat já existe
      if (!chats.some(c => c.id === chat.id)) {
        newChats.push(chat);
      }
    });
  
    setChats(prev => {
      const updatedChats = [...prev, ...newChats];
      // Remover duplicatas usando Set
      return Array.from(new Set(updatedChats.map(c => c.id)))
        .map(id => updatedChats.find(c => c.id === id)!);
    });
  };

  useEffect(() => {
    if (!selectedChatId) return;

    const messagesRef = collection(db, "chats", selectedChatId, "messages");
    const q = query(messagesRef, orderBy("timestamp"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData: Message[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        messagesData.push({
          id: doc.id,
          content: data.content,
          authorId: data.authorId,
          timestamp: data.timestamp,
          authorName: data.authorName
        });
      });
      console.log("Mensagens recebidas:", messagesData);
      setMessages(messagesData);
    });

    return unsubscribe;
  }, [selectedChatId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedChatId || !currentUser) return;

    try {
      const docRef = await addDoc(
        collection(db, "chats", selectedChatId, "messages"), 
        {
          content: newMessage,
          authorId: currentUser.id,
          authorName: currentUser.name,
          timestamp: Timestamp.now()
        }
      );
      console.log("Mensagem enviada com ID:", docRef.id);
      setNewMessage("");
    } catch (error) {
      console.error("Erro detalhado ao enviar mensagem:", error);
    }
  };

  const getChatTitle = (chat: Chat) => {
    return currentUser?.id === chat.clientId 
      ? chat.workerName 
      : chat.clientName;
  };

  const formatTime = (timestamp: Timestamp) => {
    try {
      return timestamp.toDate().toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      console.error("Erro ao formatar timestamp:", e);
      return "";
    }
  };

  return (
    <div className="flex h-screen w-full bg-gray-100">
      <SidebarClient />
      
      {/* Lista de conversas */}
      <div className="flex-1 overflow-y-auto">
  {chats.length === 0 && (
    <div className="p-4 text-center text-gray-500">
      Nenhum chat disponível. Seus chats aparecerão aqui quando houver conversas ativas.
    </div>
  )}

  {chats.map((chat) => {
    console.log('Renderizando chat:', chat); // Log para verificar os dados
    return (
      <div
        key={chat.id}
        className={`p-4 cursor-pointer border-b hover:bg-gray-200 ${
          selectedChatId === chat.id ? "bg-gray-300" : ""
        }`}
        onClick={() => setSelectedChatId(chat.id)}
      >
        <p className="font-semibold">{getChatTitle(chat)}</p>
        <p className="text-sm">Ordem #{chat.orderId}</p>
        <div className="flex items-center mt-1">
          <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
            chat.status === 'active' ? 'bg-green-500' : 'bg-red-500'
          }`}></span>
          <p className="text-sm text-gray-500">
            {chat.status === 'active' ? 'Online' : 'Offline'}
          </p>
        </div>
      </div>
    );
  })}
</div>

      {/* Área do chat */}
      <div className="w-2/3 flex flex-col">
        <div className="h-16 bg-gray-200 flex items-center px-4 border-b border-gray-300">
          <h2 className="text-xl font-bold">
            {selectedChatId 
              ? `Chat da Ordem #${chats.find(c => c.id === selectedChatId)?.orderId}`
              : "Selecione uma conversa"}
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 bg-white">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 mt-4">
              Nenhuma mensagem ainda. Seja o primeiro a enviar!
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex mb-4 ${
                message.authorId === currentUser?.id ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-md p-3 rounded-lg ${
                  message.authorId === currentUser?.id
                    ? "bg-indigo-100"
                    : "bg-gray-100"
                }`}
              >
                <p className="font-medium text-sm text-indigo-800">
                  {message.authorName}
                </p>
                <p className="text-gray-800 break-words">{message.content}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="h-16 bg-gray-200 flex items-center px-4 border-t border-gray-300">
          <input
            type="text"
            className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Digite sua mensagem..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            className="ml-2 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 disabled:opacity-50"
            disabled={!newMessage.trim()}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;