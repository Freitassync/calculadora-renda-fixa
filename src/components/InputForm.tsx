'use client';

import { useState } from 'react';
import { SimulationInput } from '@/types';
import { TrendingUp, DollarSign, Calendar } from 'lucide-react';

interface InputFormProps {
  onSimulate: (input: SimulationInput, cdiRate: number, poupancaRate: number) => void;
  indices: any;
  loading: boolean;
}

export function InputForm({ onSimulate, indices, loading }: InputFormProps) {
  const [initialInvestment, setInitialInvestment] = useState<number>(1000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500);
  const [period, setPeriod] = useState<number>(12);
  const [cdbType, setCdbType] = useState<'prefixado' | 'pos-fixado'>('pos-fixado');
  const [cdbRate, setCdbRate] = useState<number>(100);
  const [simulatePoupanca, setSimulatePoupanca] = useState<boolean>(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const input: SimulationInput = {
      initialInvestment,
      monthlyContribution,
      period,
      cdbType,
      cdbRate,
      simulatePoupanca,
    };

    onSimulate(input, indices?.cdi || 10.43, indices?.poupancaRendimento || 0.79);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Parâmetros da Simulação</h2>

      {/* Índices de Mercado */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-blue-50 rounded-lg">
        <div className="text-center">
          <p className="text-sm text-gray-600">SELIC a.a</p>
          <p className="text-lg font-bold text-blue-600">{indices?.selicEfetiva?.toFixed(2) || '-'}%</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">CDI a.a</p>
          <p className="text-lg font-bold text-blue-600">{indices?.cdi?.toFixed(2) || '-'}%</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">IPCA a.a</p>
          <p className="text-lg font-bold text-blue-600">{indices?.ipca?.toFixed(2) || '-'}%</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">TR a.m</p>
          <p className="text-lg font-bold text-blue-600">{indices?.tr?.toFixed(2) || '-'}%</p>
        </div>
      </div>

      {/* Investimento Inicial */}
      <div>
        <label className="flex items-center text-lg font-semibold text-gray-700 mb-2">
          <DollarSign className="w-5 h-5 mr-2 text-blue-600" />
          Investimento Inicial
        </label>
        <input
          type="number"
          min="0"
          step="100"
          value={initialInvestment}
          onChange={(e) => setInitialInvestment(parseFloat(e.target.value))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <p className="text-sm text-gray-500 mt-1">R$ {initialInvestment.toLocaleString('pt-BR')}</p>
      </div>

      {/* Aportes Mensais */}
      <div>
        <label className="flex items-center text-lg font-semibold text-gray-700 mb-2">
          <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
          Aportes Mensais
        </label>
        <input
          type="number"
          min="0"
          step="100"
          value={monthlyContribution}
          onChange={(e) => setMonthlyContribution(parseFloat(e.target.value))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <p className="text-sm text-gray-500 mt-1">R$ {monthlyContribution.toLocaleString('pt-BR')}</p>
      </div>

      {/* Período */}
      <div>
        <label className="flex items-center text-lg font-semibold text-gray-700 mb-2">
          <Calendar className="w-5 h-5 mr-2 text-blue-600" />
          Período (meses)
        </label>
        <input
          type="number"
          min="1"
          max="360"
          step="1"
          value={period}
          onChange={(e) => setPeriod(parseInt(e.target.value))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <p className="text-sm text-gray-500 mt-1">{period} meses ({(period / 12).toFixed(1)} anos)</p>
      </div>

      {/* CDB Type */}
      <div>
        <label className="text-lg font-semibold text-gray-700 mb-2 block">Tipo de CDB</label>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="prefixado"
              checked={cdbType === 'prefixado'}
              onChange={(e) => setCdbType(e.target.value as 'prefixado' | 'pos-fixado')}
              className="w-4 h-4"
            />
            <span className="ml-2">Prefixado</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="pos-fixado"
              checked={cdbType === 'pos-fixado'}
              onChange={(e) => setCdbType(e.target.value as 'prefixado' | 'pos-fixado')}
              className="w-4 h-4"
            />
            <span className="ml-2">Pós-fixado (% do CDI)</span>
          </label>
        </div>
      </div>

      {/* CDB Rate */}
      <div>
        <label className="text-lg font-semibold text-gray-700 mb-2 block">
          Taxa CDB {cdbType === 'prefixado' ? '(% a.a)' : '(% do CDI)'}
        </label>
        <input
          type="number"
          min="0"
          step="0.1"
          value={cdbRate}
          onChange={(e) => setCdbRate(parseFloat(e.target.value))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <p className="text-sm text-gray-500 mt-1">
          {cdbType === 'prefixado' ? `${cdbRate}% a.a` : `${cdbRate}% do CDI`}
        </p>
      </div>

      {/* Simular Poupança */}
      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={simulatePoupanca}
            onChange={(e) => setSimulatePoupanca(e.target.checked)}
            className="w-4 h-4"
          />
          <span className="ml-2 text-lg font-semibold text-gray-700">Comparar com Poupança</span>
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition"
      >
        {loading ? 'Carregando...' : 'Simular'}
      </button>
    </form>
  );
}
