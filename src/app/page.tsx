'use client';

import { useState, useEffect } from 'react';
import { InputForm } from '@/components/InputForm';
import { Results } from '@/components/Results';
import { SimulationInput, SimulationResult } from '@/types';
import { simulateCDB, simulatePoupanca } from '@/services/simulator';

export default function Home() {
  const [indices, setIndices] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [cdbResult, setCdbResult] = useState<SimulationResult | undefined>();
  const [poupancaResult, setPoupancaResult] = useState<SimulationResult | undefined>();

  // Fetch indices ao montar
  useEffect(() => {
    const fetchIndices = async () => {
      try {
        const response = await fetch('/api/indices');
        if (response.ok) {
          const data = await response.json();
          setIndices(data);
        }
      } catch (error) {
        console.error('Erro ao buscar índices:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchIndices();
    const interval = setInterval(fetchIndices, 3600000); // Atualizar a cada hora
    return () => clearInterval(interval);
  }, []);

  const handleSimulate = (input: SimulationInput, cdiRate: number, poupancaRate: number) => {
    const cdbSim = simulateCDB(input, cdiRate);
    setCdbResult(cdbSim);

    if (input.simulatePoupanca) {
      const poupancaSim = simulatePoupanca(input, poupancaRate);
      setPoupancaResult(poupancaSim);
    } else {
      setPoupancaResult(undefined);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Calculadora de Renda Fixa</h1>
          <p className="text-gray-600 text-lg">Simule seus investimentos em CDB, Poupança e mais</p>
        </div>

        {/* Main Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Form */}
          <div className="lg:col-span-1">
            <InputForm onSimulate={handleSimulate} indices={indices} loading={loading} />
          </div>

          {/* Results */}
          <div className="lg:col-span-2">
            {cdbResult || poupancaResult ? (
              <Results cdbResult={cdbResult} poupancaResult={poupancaResult} />
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                <p className="text-gray-600 text-lg">
                  Preencha os parâmetros e clique em <span className="font-bold">Simular</span> para ver os resultados
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-600 text-sm">
          <p>
            Dados atualizados em tempo real via{' '}
            <a href="https://www.bcb.gov.br/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              API do Banco Central
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
