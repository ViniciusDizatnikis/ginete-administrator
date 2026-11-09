import { ListMusic, MicVocal, RefreshCw } from "lucide-react";

import StatCard from "@/components/features/HomePage/StatCard/StatCard";
import { useDashboardStats } from "@/hooks/useDashboard";
import styles from "./styles.module.css";

const HomePage = () => {
  const { data, isError, isFetching, refetch } = useDashboardStats();

  return (
    <div className={styles.page}>
      <div className={styles.heading}>
        <h1 className={styles.title}>Início</h1>
        <p className="hint">Resumo do acervo do Ginete.</p>
      </div>

      {isError ? (
        <div className={styles.error} role="alert">
          <p className="error-text">Não foi possível carregar os números.</p>
          <button
            type="button"
            className="btn btn-sm"
            disabled={isFetching}
            onClick={() => refetch()}
          >
            <RefreshCw aria-hidden size={14} />
            Tentar de novo
          </button>
        </div>
      ) : (
        <div className={styles.grid}>
          <StatCard
            label="Músicas"
            value={data?.songs}
            icon={ListMusic}
            to="/musicas"
          />
          <StatCard
            label="Artistas"
            value={data?.artists}
            icon={MicVocal}
            to="/artistas"
          />
        </div>
      )}
    </div>
  );
};

export default HomePage;
