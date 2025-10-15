'use client';

import { SimulationResult, MonthlyData } from '@/types';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ResultsProps {
  cdbResult?: SimulationResult;
  poupancaResult?: SimulationResult;
}

export function Results({ cdbResult, poupancaResult }: ResultsProps) {
  if (!cdbResult && !poupancaResult) {
    return null;
  }

  // Preparar dados para gráfico
  const chartData = (cdbResult?.monthly || []).map((month) => {
    const poupancaMonth = poupancaResult?.monthly?.find((m) => m.mes === month.mes);
    return {
      mes: month.mes,
      cdbSaldo: month.cdbSaldo,
      poupancaSaldo: poupancaMonth?.poupancaSaldo,
    };
  });

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cdbResult && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Resultado - CDB</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Investido:</span>
                <span className="font-bold">R$ {cdbResult.totalInvested.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Rendimentos:</span>
                <span className="font-bold text-green-600">R$ {cdbResult.totalEarnings.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between border-t pt-3">
                <span className="text-gray-800 font-semibold">Montante Final:</span>
                <span className="font-bold text-xl text-blue-600">R$ {cdbResult.finalAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>
        )}

        {poupancaResult && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Resultado - Poupança</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Investido:</span>
                <span className="font-bold">R$ {poupancaResult.totalInvested.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Rendimentos:</span>
                <span className="font-bold text-green-600">R$ {poupancaResult.totalEarnings.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between border-t pt-3">
                <span className="text-gray-800 font-semibold">Montante Final:</span>
                <span className="font-bold text-xl text-orange-600">R$ {poupancaResult.finalAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Comparison */}
      {cdbResult && poupancaResult && (
        <div className="bg-blue-50 rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Comparação</h3>
          <div className="text-center">
            <p className="text-lg">
              {cdbResult.finalAmount > poupancaResult.finalAmount ? (
                <span className="text-green-600">
                  CDB é <strong>{((cdbResult.finalAmount / poupancaResult.finalAmount - 1) * 100).toFixed(2)}%</strong> mais rentável
                </span>
              ) : (
                <span className="text-orange-600">
                  Poupança tem <strong>{((poupancaResult.finalAmount / cdbResult.finalAmount - 1) * 100).toFixed(2)}%</strong> de vantagem
                </span>
              )}
            </p>
            <p className="text-gray-600 mt-2">
              Diferença: R$ {Math.abs(cdbResult.finalAmount - poupancaResult.finalAmount).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      )}

      {/* Chart */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Evolução do Saldo</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" label={{ value: 'Mês', position: 'insideBottomRight', offset: -5 }} />
            <YAxis label={{ value: 'Saldo (R$)', angle: -90, position: 'insideLeft' }} />
            <Tooltip formatter={(value) => `R$ ${value?.toFixed(2)}`} />
            <Legend />
            {cdbResult && <Line type="monotone" dataKey="cdbSaldo" stroke="#2563eb" name="CDB" isAnimationActive={false} />}
            {poupancaResult && <Line type="monotone" dataKey="poupancaSaldo" stroke="#f97316" name="Poupança" isAnimationActive={false} />}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Detailed Table */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Demonstrativo Detalhado</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Mês</th>
                <th className="px-4 py-2 text-right">Aporte</th>
                {cdbResult && (
                  <>
                    <th className="px-4 py-2 text-right">CDB - Rendimento</th>
                    <th className="px-4 py-2 text-right">CDB - Saldo</th>
                  </>
                )}
                {poupancaResult && (
                  <>
                    <th className="px-4 py-2 text-right">Poupança - Rendimento</th>
                    <th className="px-4 py-2 text-right">Poupança - Saldo</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {(cdbResult?.monthly || []).slice(0, 12).map((month, index) => {
                const poupancaMonth = poupancaResult?.monthly?.find((m) => m.mes === month.mes);
                return (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-4 py-2">{month.mes}</td>
                    <td className="px-4 py-2 text-right">R$ {month.aporte.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    {cdbResult && (
                      <>
                        <td className="px-4 py-2 text-right">R$ {month.cdbRendimento.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        <td className="px-4 py-2 text-right font-semibold">R$ {month.cdbSaldo.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                      </>
                    )}
                    {poupancaResult && (
                      <>
                        <td className="px-4 py-2 text-right">R$ {poupancaMonth?.poupancaRendimento?.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        <td className="px-4 py-2 text-right font-semibold">R$ {poupancaMonth?.poupancaSaldo?.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                      </>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
          {(cdbResult?.monthly.length || 0) > 12 && (
            <p className="text-center text-gray-500 mt-2 text-sm">Mostrando apenas os primeiros 12 meses de {cdbResult?.monthly.length || 0}</p>
          )}
        </div>
      </div>
    </div>
  );
}
