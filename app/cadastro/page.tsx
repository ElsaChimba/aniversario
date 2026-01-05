"use client";
import '../styles/globals.css';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addUser } from '../firebase/add.Data'; 

const CadastroPage = () => {
  const [form, setForm] = useState({
    primeiroNome: '',
    ultimoNome: '',
    opcao: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.primeiroNome || !form.ultimoNome || !form.opcao) {
      setMessage('Todos os campos são obrigatórios.');
      return;
    }

    setLoading(true);
    try {
      const userId = await addUser(form.primeiroNome, form.ultimoNome, form.opcao);
      setMessage('Cadastro realizado com sucesso!');
      localStorage.setItem('userId', userId); 
      router.push('/mensagem');
      setForm({ primeiroNome: '', ultimoNome: '', opcao: '' });
    } catch (error) {
      setMessage('Erro ao realizar o cadastro.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div className="bg-gradient-to-r from-[#3b82f6] to-[#A5ACB0] min-h-screen flex flex-col justify-center items-center text-white">
      <h1 className="text-4xl mb-8 font-semibold font-lobster text-center animate-bounce">
        Primeiro adoraria saber quem és!! 😊
      </h1>
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
        <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
          <label className="block">
            <span className="text-lg font-medium text-[#3b82f6]">Qual o Seu Nome?</span>
            <input
              type="text"
              name="primeiroNome"
              value={form.primeiroNome}
              onChange={handleChange}
              placeholder="Primeiro Nome"
              className="w-full p-3 rounded-lg border-2 border-[#3b82f6] focus:outline-none focus:ring-2 focus:ring-[#3b82f6] text-black"
              required
            />
            <input
              type="text"
              name="ultimoNome"
              value={form.ultimoNome}
              onChange={handleChange}
              placeholder="Segundo Nome"
              className="w-full p-3 mt-2 rounded-lg border-2 border-[#3b82f6] focus:outline-none focus:ring-2 focus:ring-[#3b82f6] text-black"
              required
            />
          </label>
          <label className="block">
            <span className="text-lg font-medium text-[#3b82f6]">Você é meu?</span>
            <select
              name="opcao"
              value={form.opcao}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border-2 border-[#3b82f6] bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
              required
            >
              <option value="">Selecione uma opção</option>
              <option value="Pai">Pai</option>
              <option value="Mãe">Mãe</option>
              <option value="Chefe">Chefe</option>
              <option value="Colega">Colega</option>
              <option value="Diretor">Diretor</option>
              <option value="Professor">Professor</option>
              <option value="Amigo/Amiga">Amigo/Amiga</option>
              <option value="Irmão/Irmã">Irmão/Irmã</option>
              <option value="Aluno/Aluna">Aluno/Aluna</option>
              <option value="Sobrinho/Sobrinha">Sobrinho/Sobrinha</option>
              <option value="Conhecido/Conhecida">Conhecido/Conhecida</option>
            </select>
          </label>
          <button
            type="submit"
            className="bg-[#3b82f6] py-2 px-6 rounded-full hover:bg-[#C0C0C0] hover:scale-105 transition duration-300 font-semibold text-white shadow-lg"
          >
            {loading ? 'Enviando...' : 'Enviar Cadastro'}
          </button>
        </form>
        {message && (
          <div className="mt-4 p-3 bg-green-500 text-white rounded-md text-center">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default CadastroPage;
