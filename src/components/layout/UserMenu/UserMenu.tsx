import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, CircleUserRound, LogOut } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";
import styles from "./styles.module.css";

const UserMenu = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) {
      return;
    }

    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (!user) {
    return null;
  }

  return (
    <div ref={containerRef} className={styles.container}>
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((current) => !current)}
      >
        <CircleUserRound />
        {user.username}
        <ChevronDown aria-hidden size={14} className={styles.chevron} />
      </button>

      {open && (
        <div id={menuId} className={styles.menu}>
          <button
            type="button"
            className={`${styles.item} ${styles.danger}`}
            onClick={logout}
          >
            <LogOut aria-hidden size={14} />
            Sair
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
