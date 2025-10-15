import { SimulationInput, MonthlyData, SimulationResult } from '@/types';

export function simulateCDB(input: SimulationInput, cdiRate: number): SimulationResult {
  const monthlyData: MonthlyData[] = [];
  let saldo = input.initialInvestment;
  let totalInvested = input.initialInvestment;
  let totalEarnings = 0;

  // Calcular taxa mensal
  let monthlyRate: number;
  if (input.cdbType === 'prefixado') {
    // Taxa prefixada a.a para a.m
    monthlyRate = (1 + input.cdbRate / 100) ** (1 / 12) - 1;
  } else {
    // Taxa pós-fixada: % do CDI
    const cdiMonthly = (1 + cdiRate / 100) ** (1 / 12) - 1;
    monthlyRate = cdiMonthly * (input.cdbRate / 100);
  }

  for (let mes = 1; mes <= input.period; mes++) {
    // Calcular rendimento do mês
    const rendimento = saldo * monthlyRate;
    saldo += rendimento;
    totalEarnings += rendimento;

    // Aporte do mês (a partir do mês 2)
    if (mes > 1) {
      saldo += input.monthlyContribution;
      totalInvested += input.monthlyContribution;
    }

    monthlyData.push({
      mes,
      aporte: mes === 1 ? input.initialInvestment : input.monthlyContribution,
      cdbSaldo: saldo,
      cdbRendimento: rendimento,
    });
  }

  return {
    type: 'cdb',
    inputs: input,
    monthly: monthlyData,
    totalInvested,
    totalEarnings,
    finalAmount: saldo,
  };
}

export function simulatePoupanca(input: SimulationInput, poupancaRate: number): SimulationResult {
  const monthlyData: MonthlyData[] = [];
  let saldo = input.initialInvestment;
  let totalInvested = input.initialInvestment;
  let totalEarnings = 0;

  // Taxa mensal da poupança (já em decimal)
  const monthlyRate = poupancaRate / 100;

  for (let mes = 1; mes <= input.period; mes++) {
    // Calcular rendimento do mês
    const rendimento = saldo * monthlyRate;
    saldo += rendimento;
    totalEarnings += rendimento;

    // Aporte do mês (a partir do mês 2)
    if (mes > 1) {
      saldo += input.monthlyContribution;
      totalInvested += input.monthlyContribution;
    }

    monthlyData.push({
      mes,
      aporte: mes === 1 ? input.initialInvestment : input.monthlyContribution,
      poupancaSaldo: saldo,
      poupancaRendimento: rendimento,
      cdbSaldo: 0,
      cdbRendimento: 0,
    });
  }

  return {
    type: 'poupanca',
    inputs: input,
    monthly: monthlyData,
    totalInvested,
    totalEarnings,
    finalAmount: saldo,
  };
}

export function compareSimulations(cdb: SimulationResult, poupanca: SimulationResult) {
  const difference = cdb.finalAmount - poupanca.finalAmount;
  const percentageDifference = ((difference / poupanca.finalAmount) * 100);

  return {
    cdbAmount: cdb.finalAmount,
    poupancaAmount: poupanca.finalAmount,
    difference,
    percentageDifference,
    cdbBetter: difference > 0,
  };
}
