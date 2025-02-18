"use client";

import React, { useState, useEffect } from "react";
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  addDoc, 
  doc, 
  getDoc,
  Timestamp, 
  getFirestore,
  orderBy
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../../../firebaseinitialize";
import SidebarClient from "@/components/organisms/SidebarClient";

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

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
    // Buscar usuário do localStorage
    const id = localStorage.getItem("id") || "";
    const name = localStorage.getItem("name") || "";
    if (id) {
      setCurrentUser({
        id: id,
        name: name
      });
    }
  }, []);

  useEffect(() => {
    if (!currentUser?.id) return;

    const q = query(
      collection(db, "chats"),
      where("participants.clientId", "==", currentUser.id)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const chatsData: Chat[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        chatsData.push({
          id: doc.id,
          clientId: data.participants.clientId,
          workerId: data.participants.workerId,
          status: data.status,
          orderId: data.orderId,
          clientName: data.clientName,
          workerName: data.workerName
        });
      });
      setChats(chatsData);
    });

    return () => unsubscribe();
  }, [currentUser]);

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
      setMessages(messagesData);
    });

    return () => unsubscribe();
  }, [selectedChatId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedChatId || !currentUser) return;

    try {
      await addDoc(collection(db, "chats", selectedChatId, "messages"), {
        content: newMessage,
        authorId: currentUser.id,
        authorName: currentUser.name,
        timestamp: Timestamp.now()
      });
      setNewMessage("");
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
    }
  };

  const getChatTitle = (chat: Chat) => {
    return currentUser?.id === chat.clientId 
      ? chat.workerName 
      : chat.clientName;
  };

  return (
    <div className="flex h-screen w-full bg-gray-100">
      <SidebarClient />
      
      {/* Lista de conversas */}
      <div className="w-1/3 border-r border-gray-300 flex flex-col">
        <div className="h-16 bg-gray-200 flex items-center px-4">
          <h2 className="text-xl font-bold">Minhas Conversas</h2>
        </div>

        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`p-4 cursor-pointer border-b hover:bg-gray-200 ${
                selectedChatId === chat.id ? "bg-gray-300" : ""
              }`}
              onClick={() => setSelectedChatId(chat.id)}
            >
              <p className="font-semibold">{getChatTitle(chat)}</p>
              <p className="text-sm">Ordem #{chat.orderId}</p>
              <p className="text-sm text-gray-500">Status: {chat.status}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Área do chat */}
      <div className="w-2/3 flex flex-col">
        <div className="h-16 bg-gray-200 flex items-center px-4">
          <h2 className="text-xl font-bold">
            {selectedChatId 
              ? `Chat da Ordem #${chats.find(c => c.id === selectedChatId)?.orderId}`
              : "Selecione uma conversa"}
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 bg-white">
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
                <p className="font-medium text-sm">{message.authorName}</p>
                <p className="text-gray-800">{message.content}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(message.timestamp?.toDate()).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="h-16 bg-gray-200 flex items-center px-4">
          <input
            type="text"
            className="flex-1 p-2 border rounded"
            placeholder="Digite sua mensagem..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
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