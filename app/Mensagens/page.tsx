"use client";
import { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

const MessagesPage = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadMessages = async () => {
    try {
      const q = query(collection(db, "mensagens"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);

      const messagesData = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      setMessages(messagesData);
    } catch (error) {
      console.error("Erro ao carregar mensagens:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-blue-400">
        <p className="text-white text-xl">Carregando mensagens...</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-400 to-blue-600 min-h-screen flex flex-col justify-center items-center text-black relative overflow-hidden">
      <h1 className="fixed top-6 left-6 animate-bounce text-3xl font-bold font-serif drop-shadow-lg text-[#C0C0C0]">
        Mensagens Recebidas 💬
      </h1>
      <section className="flex flex-col items-center w-full max-w-4xl p-6">
        {messages.length === 0 ? (
          <p className="text-white font-serif text-xl">Nenhuma mensagem encontrada.</p>
        ) : (
          <div className="space-y-6 w-full">
            {messages.map((message) => {
              const createdAtDate = message.createdAt
                ? new Date(message.createdAt.seconds * 1000).toLocaleString()
                : "Data não disponível";

              return (
                <div key={message.id} className="bg-white p-6 rounded-3xl shadow-2xl flex flex-col space-y-4 break-words max-w-xl">
                  <p className="text-lg font-serif text-gray-800">{message.message}</p>
                  <p className="text-sm text-gray-500">
                    {message.primeiroNome} {message.ultimoNome} {message.opcao && (
                      <span className="text-gray-600"> - {message.opcao}</span>
                    )}
                  </p>
                  <p className="text-xs text-gray-400">{createdAtDate}</p>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default MessagesPage;

