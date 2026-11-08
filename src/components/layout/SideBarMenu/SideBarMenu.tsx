import { NavLink } from "react-router";

import { NAV_SECTIONS } from "@/navigation";
import styles from "./styles.module.css";

interface SideBarMenuProps {
  id: string;
  open: boolean;
  onNavigate: () => void;
}

const SideBarMenu = ({ id, open, onNavigate }: SideBarMenuProps) => {
  return (
    <nav
      id={id}
      className={styles.sidebar}
      data-open={open || undefined}
      aria-label="Seções do painel"
    >
      <ul className={styles.list}>
        {NAV_SECTIONS.map(({ path, label, icon: Icon }) => (
          <li key={path}>
            <NavLink
              to={path}
              end={path === "/"}
              className={styles.link}
              onClick={onNavigate}
            >
              <Icon aria-hidden size={18} />
              <span className={styles.label}>{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideBarMenu;
