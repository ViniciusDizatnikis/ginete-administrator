import type { LucideIcon } from "lucide-react";

import styles from "./styles.module.css";
import { Link } from "react-router";

import SkeletonLoader from "@/components/shared/SkeletonLoader";

// Formatação de números para o padrão brasileiro
const numberFormat = new Intl.NumberFormat("pt-BR");

interface StatCardProps {
  label: string;
  value: number | undefined;
  icon: LucideIcon;
  to: string;
}

const StatCard = ({ label, value, icon: Icon, to }: StatCardProps) => {
  return (
    <Link to={to} className={styles.card}>
      <span className={styles.cardIcon}>
        <Icon aria-hidden size={22} />
      </span>

      <span className={styles.cardBody}>
        <span className={styles.cardLabel}>{label}</span>
        {value === undefined ? (
          <>
            <SkeletonLoader width={72} height={34} />
            <span className="visually-hidden">Carregando...</span>
          </>
        ) : (
          <span className={styles.cardValue}>{numberFormat.format(value)}</span>
        )}
      </span>
    </Link>
  );
};

export default StatCard;
