import { simulateCDB, simulatePoupanca } from '../src/services/simulator';
import { SimulationInput } from '../src/types';

describe('Simulator', () => {
  const baseInput: SimulationInput = {
    initialInvestment: 10000,
    monthlyContribution: 500,
    period: 12,
    cdbType: 'prefixado',
    cdbRate: 11,
    simulatePoupanca: true,
  };

  describe('CDB Prefixado', () => {
    test('should calculate correct final amount for 12 months', () => {
      const result = simulateCDB(baseInput, 10.43);
      
      // Verificar estrutura do resultado
      expect(result).toHaveProperty('finalAmount');
      expect(result).toHaveProperty('totalInvested');
      expect(result).toHaveProperty('totalEarnings');
      expect(result).toHaveProperty('monthly');

      // Verificar que o valor final é maior que o investido
      expect(result.finalAmount).toBeGreaterThan(result.totalInvested);
      
      // Total investido deve ser: 10000 + (500 * 11) = 15500
      expect(result.totalInvested).toBe(15500);
    });

    test('should have correct number of monthly records', () => {
      const result = simulateCDB(baseInput, 10.43);
      expect(result.monthly).toHaveLength(12);
    });

    test('should have increasing balances', () => {
      const result = simulateCDB(baseInput, 10.43);
      
      for (let i = 1; i < result.monthly.length; i++) {
        expect(result.monthly[i].cdbSaldo).toBeGreaterThanOrEqual(result.monthly[i - 1].cdbSaldo);
      }
    });
  });

  describe('CDB Pós-fixado', () => {
    test('should calculate with CDI percentage', () => {
      const input: SimulationInput = {
        ...baseInput,
        cdbType: 'pos-fixado',
        cdbRate: 100, // 100% do CDI
      };

      const result = simulateCDB(input, 10.43); // CDI = 10.43% a.a
      
      expect(result).toHaveProperty('finalAmount');
      expect(result.finalAmount).toBeGreaterThan(result.totalInvested);
    });

    test('should respect different CDI percentages', () => {
      const input100: SimulationInput = {
        ...baseInput,
        cdbType: 'pos-fixado',
        cdbRate: 100,
      };

      const input50: SimulationInput = {
        ...baseInput,
        cdbType: 'pos-fixado',
        cdbRate: 50, // 50% do CDI
      };

      const result100 = simulateCDB(input100, 10.43);
      const result50 = simulateCDB(input50, 10.43);

      // 100% do CDI deve render mais que 50%
      expect(result100.finalAmount).toBeGreaterThan(result50.finalAmount);
    });
  });

  describe('Poupança', () => {
    test('should calculate correct savings amount', () => {
      const result = simulatePoupanca(baseInput, 0.79); // 0.79% a.m
      
      expect(result).toHaveProperty('finalAmount');
      expect(result).toHaveProperty('totalInvested');
      expect(result).toHaveProperty('totalEarnings');
      expect(result.type).toBe('poupanca');
    });

    test('should have lower earnings than CDB', () => {
      const cdbResult = simulateCDB(baseInput, 10.43);
      const savingsResult = simulatePoupanca(baseInput, 0.79);

      expect(savingsResult.finalAmount).toBeLessThan(cdbResult.finalAmount);
    });
  });

  describe('Edge Cases', () => {
    test('should handle zero monthly contributions', () => {
      const input: SimulationInput = {
        ...baseInput,
        monthlyContribution: 0,
      };

      const result = simulateCDB(input, 10.43);
      
      expect(result).toHaveProperty('finalAmount');
      expect(result.totalInvested).toBe(input.initialInvestment);
    });

    test('should handle single month period', () => {
      const input: SimulationInput = {
        ...baseInput,
        period: 1,
      };

      const result = simulateCDB(input, 10.43);
      
      expect(result.monthly).toHaveLength(1);
      expect(result.finalAmount).toBeGreaterThan(input.initialInvestment);
    });

    test('should handle long period (10 years)', () => {
      const input: SimulationInput = {
        ...baseInput,
        period: 120,
      };

      const result = simulateCDB(input, 10.43);
      
      expect(result.monthly).toHaveLength(120);
      expect(result.finalAmount).toBeGreaterThan(baseInput.initialInvestment * 10);
    });

    test('should handle zero interest rate', () => {
      const result = simulateCDB(baseInput, 0);
      
      // Sem juros, o valor final deve ser igual ao total investido
      expect(result.finalAmount).toBe(result.totalInvested);
      expect(result.totalEarnings).toBe(0);
    });
  });

  describe('Accuracy', () => {
    test('should have totalEarnings equal to finalAmount - totalInvested', () => {
      const result = simulateCDB(baseInput, 10.43);
      const expectedEarnings = result.finalAmount - result.totalInvested;
      
      expect(result.totalEarnings).toBeCloseTo(expectedEarnings, 2);
    });

    test('should sum monthly earnings correctly', () => {
      const result = simulateCDB(baseInput, 10.43);
      const sumMonthlyEarnings = result.monthly.reduce((acc, month) => acc + month.cdbRendimento, 0);
      
      expect(result.totalEarnings).toBeCloseTo(sumMonthlyEarnings, 2);
    });
  });
});
