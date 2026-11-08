import { useEffect, useId, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, Outlet } from "react-router";

import SideBarMenu from "../SideBarMenu/SideBarMenu";
import UserMenu from "../UserMenu/UserMenu";
import styles from "./styles.module.css";

import Logo from "@/assets/images/Logo.png";

const AdminLayout = () => {
  // Gaveta do menu lateral (só usada no celular)
  const [menuOpen, setMenuOpen] = useState(false);
  const sidebarId = useId();

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.start}>
          <button
            type="button"
            className={`btn btn-sm ${styles.menuButton}`}
            aria-expanded={menuOpen}
            aria-controls={sidebarId}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <X aria-hidden size={18} />
            ) : (
              <Menu aria-hidden size={18} />
            )}
          </button>

          <Link to="/" className={styles.brand} onClick={closeMenu}>
            <img src={Logo} alt="" className={styles.brandLogo} />
            <span className={styles.brandName}>Ginete</span>
          </Link>
        </div>

        <div className={styles.end}>
          <UserMenu />
        </div>
      </header>

      <div className={styles.body}>
        <SideBarMenu id={sidebarId} open={menuOpen} onNavigate={closeMenu} />
        {menuOpen && (
          <div className={styles.backdrop} aria-hidden onClick={closeMenu} />
        )}

        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default AdminLayout;
