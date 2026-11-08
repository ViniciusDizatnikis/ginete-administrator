import { useState, type FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { LogIn } from "lucide-react";
import { Navigate, useLocation } from "react-router";

import { useAuth } from "@/hooks/useAuth";
import styles from "./styles.module.css";

import Logo from "@/assets/images/Logo.png";
import { MoonLoader } from "react-spinners";

const getErrorMessage = (error: unknown) => {
  if (isAxiosError(error)) {
    if (error.response?.status === 401) {
      return "Usuário ou senha incorretos.";
    }
    if (!error.response) {
      return "Não foi possível falar com o servidor.";
    }
  }
  return "Algo deu errado. Tente novamente.";
};

const LoginPage = () => {
  const { user, login } = useAuth();
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const from = (location.state as { from?: string } | null)?.from ?? "/";

  const loginMutation = useMutation({
    mutationFn: () => login(username.trim(), password),
  });

  if (user) {
    return <Navigate to={from} replace />;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    loginMutation.mutate();
  };

  const isPending = loginMutation.isPending;

  return (
    <div className={styles.page}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <div className={styles.brand}>
          <img src={Logo} alt="" className={styles.logo} />
          <h1 className={styles.brandName}>Ginete</h1>
          <span className={styles.brandTag}>Painel administrativo</span>
        </div>

        <div className={styles.fields}>
          <div className={styles.heading}>
            <h2 className={styles.title}>Entrar</h2>
            <p className="hint">Use sua conta de administrador.</p>
          </div>

          <div>
            <label className="field-label" htmlFor="login-username">
              Usuário
            </label>
            <input
              id="login-username"
              className="input"
              autoComplete="username"
              autoFocus
              required
              disabled={isPending}
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>

          <div>
            <label className="field-label" htmlFor="login-password">
              Senha
            </label>
            <input
              id="login-password"
              type="password"
              className="input"
              autoComplete="current-password"
              required
              disabled={isPending}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          {loginMutation.isError && (
            <p className="error-text" role="alert">
              {getErrorMessage(loginMutation.error)}
            </p>
          )}

          <button
            type="submit"
            className={`btn btn-primary ${styles.submit}`}
            disabled={isPending}
          >
            {isPending ? (
              <MoonLoader size={14} color="currentColor" aria-hidden />
            ) : (
              <LogIn aria-hidden size={16} />
            )}
            {!isPending ? "Entrar" : null}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
