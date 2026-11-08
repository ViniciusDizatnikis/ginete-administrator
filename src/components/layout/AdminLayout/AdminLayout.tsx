import { LogOut, Music2 } from "lucide-react";
import { Link, Outlet } from "react-router";

import { useAuth } from "@/hooks/useAuth";
import styles from "./styles.module.css";

const AdminLayout = () => {
  const { user, logout } = useAuth();

  return (
    <>
      <header className={styles.header}>
        <Link to="/" className={styles.brand}>
          <Music2 aria-hidden size={22} />
          <span className={styles.brandName}>Ginete</span>
        </Link>

        <div className={styles.end}>
          {user && <span className={styles.user}>{user.username}</span>}
          <button type="button" className="btn btn-sm" onClick={logout}>
            <LogOut aria-hidden size={14} />
            Sair
          </button>
        </div>
      </header>

      {/* Aqui o React Router encaixa a tela da rota filha */}
      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  );
};

export default AdminLayout;
