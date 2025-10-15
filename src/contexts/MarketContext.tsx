'use client';

import { ReactNode, createContext, useContext, useState, useEffect } from 'react';
import { MarketIndex } from '@/types';

interface MarketContextType {
  indices: MarketIndex | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

const MarketContext = createContext<MarketContextType | undefined>(undefined);

export function MarketProvider({ children }: { children: ReactNode }) {
  const [indices, setIndices] = useState<MarketIndex | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchIndices = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/indices');
      if (!response.ok) throw new Error('Erro ao buscar índices');
      const data = await response.json();
      setIndices(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIndices();
    const interval = setInterval(fetchIndices, 3600000); // Atualizar a cada hora
    return () => clearInterval(interval);
  }, []);

  return (
    <MarketContext.Provider value={{ indices, loading, error, refresh: fetchIndices }}>
      {children}
    </MarketContext.Provider>
  );
}

export function useMarketIndices() {
  const context = useContext(MarketContext);
  if (!context) {
    throw new Error('useMarketIndices deve ser usado dentro de MarketProvider');
  }
  return context;
}
