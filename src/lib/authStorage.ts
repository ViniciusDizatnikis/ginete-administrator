export interface Session {
  token: string;
  username: string;
  expiresAt: string;
}

// Guarda a sessão no localStorage para o login sobreviver a um F5.
const STORAGE_KEY = "ginete-admin:session";

/** Devolve a sessão salva, ou null se não existir ou já tiver vencido. */
export const loadSession = (): Session | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const session = JSON.parse(raw) as Session;
    if (new Date(session.expiresAt).getTime() <= Date.now()) {
      clearSession();
      return null;
    }

    return session;
  } catch {
    return null;
  }
};

export const clearSession = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export const saveSession = (session: Session) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
};
