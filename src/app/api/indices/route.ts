import { NextRequest, NextResponse } from 'next/server';

// API route para obter os índices de mercado
export async function GET(request: NextRequest) {
  try {
    // Para evitar rate limiting da API do BACEN, vamos usar cache
    const response = await fetch('https://www.bcb.gov.br/api/dados/serie/bcdata.sgs/432/dados?formato=json', {
      next: { revalidate: 3600 } // Cache por 1 hora
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar dados do BACEN');
    }

    const selicData = await response.json();
    const selicEfetiva = parseFloat(selicData[selicData.length - 1].valor);

    // Fetch CDI
    const cdiResponse = await fetch('https://www.bcb.gov.br/api/dados/serie/bcdata.sgs/12/dados?formato=json', {
      next: { revalidate: 3600 }
    });
    const cdiData = await cdiResponse.json();
    const cdi = parseFloat(cdiData[cdiData.length - 1].valor);

    // Fetch IPCA
    const ipcaResponse = await fetch('https://www.bcb.gov.br/api/dados/serie/bcdata.sgs/433/dados?formato=json', {
      next: { revalidate: 3600 }
    });
    const ipcaData = await ipcaResponse.json();
    const ipca = parseFloat(ipcaData[ipcaData.length - 1].valor);

    // Fetch TR
    const trResponse = await fetch('https://www.bcb.gov.br/api/dados/serie/bcdata.sgs/226/dados?formato=json', {
      next: { revalidate: 3600 }
    });
    const trData = await trResponse.json();
    const tr = parseFloat(trData[trData.length - 1].valor);

    // Rentabilidade Poupança (SELIC - 0.5% a.a convertido para a.m)
    const selicAm = (selicEfetiva / 100 / 12) * 100;
    const poupancaRendimento = Math.max(0.5, selicAm - 0.5);

    return NextResponse.json({
      selicEfetiva,
      cdi,
      ipca,
      tr,
      poupancaRendimento,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Erro na API de índices:', error);
    
    // Retornar valores padrão em caso de erro
    return NextResponse.json({
      selicEfetiva: 10.5,
      cdi: 10.43,
      ipca: 4.78,
      tr: 0.2,
      poupancaRendimento: 0.79,
      updatedAt: new Date().toISOString(),
    });
  }
}
