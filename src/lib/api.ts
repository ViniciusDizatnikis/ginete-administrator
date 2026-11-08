import axios from "axios";
import { loadSession } from "./authStorage";


// Obter e validar se foi definido no .env
const apiURL = import.meta.env.VITE_API_URL;

if (!apiURL) {
  throw new Error("VITE_API_URL não definido");
}


// Configurando Cliente
export const api = axios.create({
  baseURL: apiURL,
});

let onUnauthorized: (() => void) | null = null;

/** O AuthProvider registra aqui o que fazer quando o backend responder 401. */
export const setUnauthorizedHandler = (handler: (() => void) | null) => {
  onUnauthorized = handler;
};

// Antes de cada pedido: anexa o token, se houver sessão
api.interceptors.request.use((config) => {
  const session = loadSession();
  if (session) {
    config.headers.Authorization = `Bearer ${session.token}`;
  }
  return config;
});

// Depois de cada resposta: 401 significa token inválido/vencido → desloga
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      onUnauthorized?.();
    }
    return Promise.reject(error);
  },
);
