"use client";
import { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getUserData } from "../firebase/add.Data";

const MensagemPage = () => {
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchUserData = async () => {
        try {
          const data = await getUserData(userId);
          setUserData(data);
        } catch (error) {
          setErrorMessage("Erro ao obter dados do usuário.");
        }
      };
      fetchUserData();
    }
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId || !userData) {
      setErrorMessage("Usuário não encontrado. Faça login primeiro.");
      return;
    }

    if (!message.trim()) {
      setErrorMessage("Mensagem não pode estar vazia.");
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const docRef = await addDoc(collection(db, "mensagens"), {
        message,
        userId,
        primeiroNome: userData.primeiroNome,
        ultimoNome: userData.ultimoNome,
        opcao: userData.opcao,
        createdAt: serverTimestamp(),
      });

      console.log("Mensagem enviada com ID:", docRef.id);
      setIsSent(true);
      setMessage("");
    } catch (error) {
      setErrorMessage("Erro ao enviar mensagem.");
      console.error("Erro ao enviar mensagem:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-400 to-blue-600 min-h-screen flex flex-col justify-center items-center text-black relative overflow-hidden">
      <h1 className="absolute top-6 left-6 animate-bounce text-3xl font-bold font-serif drop-shadow-lg text-white">
        Escreva Sua Mensagem!! 🥰
      </h1>
      {!isSent ? (
        <section className="flex flex-col items-center w-full max-w-4xl">
          <div className="bg-white rounded-3xl shadow-2xl w-full h-[80vh] p-6 flex flex-col relative break-words">
            <div className="flex-grow relative">
              {errorMessage && (
                <div className="bg-blue-500 text-white p-1 rounded mb-4">
                  {errorMessage}
                </div>
              )}
              <textarea
                className="w-full h-full p-6 rounded-xl border-2 border-transparent bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none shadow-lg text-lg text-gray-900 placeholder:text-gray-400"
                placeholder="Digite sua mensagem aqui..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              {!message.trim() && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#C0C0C0] text-lg font-lobster">
                  A mensagem não pode estar vazia!
                </div>
              )}
            </div>
            <div className="flex items-center justify-between mt-14">
              <label
                htmlFor="imageInput"
                className="flex items-center gap-2 text-2xl text-[#C0C0C0] hover:text-gray-800 cursor-pointer font-lobster animate-pulse"
              >
                Hum, lembrou de mim kk.🤗
              </label>
              <button
                className="bg-blue-600 text-white py-3 px-8 rounded-full hover:bg-blue-700 transition duration-300 text-lg font-serif"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Enviando..." : "Enviar"}
              </button>
            </div>
          </div>
        </section>
      ) : (
        <section className="flex flex-col items-center w-full max-w-4xl">
          <div className="bg-white rounded-3xl shadow-2xl w-full h-[80vh] p-6 flex flex-col items-center justify-center">
            <p className="mt-4 text-lg font-serif text-gray-600 italic">
              "O valor da gratidão é imensurável, pois ela é o reconhecimento do
              infinito potencial de cada ato." - Albert Einstein
            </p>
            <h2 className="text-2xl font-serif text-blue-600">
              Muito obrigado pela sua mensagem! 💫
            </h2>
            <p className="mt-4 text-lg font-serif text-gray-600">
              ELSA CHIMBA fuiiiiii!🤩🤩🤩
            </p>
          </div>
        </section>
      )}
    </div>
  );
};

export default MensagemPage;
