import axios from 'axios';
import { MarketIndex } from '@/types';

// Usando a API gratuita do Banco Central do Brasil (BACEN)
const BACEN_API_BASE = 'https://www.bcb.gov.br/api/dados/serie/bcdata.sgs';

// Séries BACEN:
// 432 = SELIC a.a
// 12 = CDI a.a
// 433 = IPCA a.a
// 226 = TR a.m

export async function getMarketIndices(): Promise<MarketIndex> {
  try {
    const today = new Date();
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const endDate = lastDay.toLocaleDateString('pt-BR');
    const startDate = new Date(today.getFullYear(), today.getMonth(), 1).toLocaleDateString('pt-BR');

    // Fetch SELIC
    const selicResponse = await axios.get(`${BACEN_API_BASE}/432/dados?formato=json`);
    const selicData = selicResponse.data[selicResponse.data.length - 1];
    const selicEfetiva = parseFloat(selicData.valor);

    // Fetch CDI
    const cdiResponse = await axios.get(`${BACEN_API_BASE}/12/dados?formato=json`);
    const cdiData = cdiResponse.data[cdiResponse.data.length - 1];
    const cdi = parseFloat(cdiData.valor);

    // Fetch IPCA
    const ipcaResponse = await axios.get(`${BACEN_API_BASE}/433/dados?formato=json`);
    const ipcaData = ipcaResponse.data[ipcaResponse.data.length - 1];
    const ipca = parseFloat(ipcaData.valor);

    // Fetch TR
    const trResponse = await axios.get(`${BACEN_API_BASE}/226/dados?formato=json`);
    const trData = trResponse.data[trResponse.data.length - 1];
    const tr = parseFloat(trData.valor);

    // Rentabilidade Poupança (aproximadamente SELIC - 0.5% a.a convertido para a.m)
    const poupancaRendimento = (selicEfetiva / 100 / 12);

    return {
      selicEfetiva,
      cdi,
      ipca,
      tr,
      poupancaRendimento: poupancaRendimento * 100,
      updatedAt: new Date(),
    };
  } catch (error) {
    console.error('Erro ao buscar índices do mercado:', error);
    // Retornar valores padrão em caso de erro
    return {
      selicEfetiva: 10.5,
      cdi: 10.43,
      ipca: 4.78,
      tr: 0.2,
      poupancaRendimento: 0.79,
      updatedAt: new Date(),
    };
  }
}

// Função auxiliar para buscar dados históricos
export async function getHistoricalIndices(series: string, days: number = 30): Promise<any[]> {
  try {
    const response = await axios.get(`${BACEN_API_BASE}/${series}/dados?formato=json`);
    return response.data.slice(-days);
  } catch (error) {
    console.error(`Erro ao buscar dados históricos da série ${series}:`, error);
    return [];
  }
}
