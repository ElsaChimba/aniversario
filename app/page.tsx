"use client";
import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { useRouter } from "next/navigation";

const Homepage = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="relative min-h-screen flex flex-col justify-center items-center text-white overflow-hidden bg-cover"
      style={{
        backgroundImage: "url('./Elsa2.jpg')",
        backgroundPosition: "center 50%", 
      }}
    >
      <div className="bg-black/50 absolute inset-0"></div>

      <div className="z-10 text-center max-w-lg px-4">
        <h1 className="text-5xl md:text-6xl font-bold font-lobster mb-4 drop-shadow-lg animate-bounce">
          Meu Aniversário!!🥳
        </h1>
        <p className="text-lg md:text-xl font-semibold mb-6 drop-shadow-lg">
          Hoje é o meu aniversário de{" "}
          <span className="text-blue-300">22 Anos</span>. Fique à vontade para 
          deixar uma mensagem especial para mim.
        </p>
        <button
          onClick={() => router.push("/cadastro")}
          className="bg-gradient-to-r bg-blue-400 hover:bg-[#C0C0C0] py-3 px-8  text-lg font-semibold hover:scale-110 transition transform duration-300 shadow-lg hover:shadow-xl rounded-full"
        >
          Bora!!!
        </button>
      </div>

      <footer className="absolute bottom-4 text-sm z-10 text-gray-300">
        <p className="animate__animated animate__fadeIn animate__delay-2s">
          Made by Elsa Chimba
        </p>
      </footer>

      {showConfetti && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
    </div>
  );
};

export default Homepage;
