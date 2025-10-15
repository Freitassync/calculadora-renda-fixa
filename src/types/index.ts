export interface MarketIndex {
  selicEfetiva: number; // a.a %
  cdi: number; // a.a %
  ipca: number; // a.a %
  tr: number; // a.m %
  poupancaRendimento: number; // a.m %
  updatedAt: Date;
}

export interface SimulationInput {
  initialInvestment: number;
  monthlyContribution: number;
  period: number; // em meses
  cdbType: 'prefixado' | 'pos-fixado';
  cdbRate: number; // % para prefixado ou % do CDI para pós-fixado
  simulatePoupanca: boolean;
}

export interface MonthlyData {
  mes: number;
  aporte: number;
  cdbSaldo: number;
  cdbRendimento: number;
  poupancaSaldo?: number;
  poupancaRendimento?: number;
}

export interface SimulationResult {
  type: 'cdb' | 'poupanca';
  inputs: SimulationInput;
  monthly: MonthlyData[];
  totalInvested: number;
  totalEarnings: number;
  finalAmount: number;
}
