# Calculadora de Renda Fixa

Uma aplicação web moderna para simular investimentos em produtos de renda fixa como CDB e Poupança.

## 🎯 Funcionalidades

### Parâmetros de Simulação
- **Investimento Inicial**: Defina o valor inicial de investimento
- **Aportes Mensais**: Configure contribuições mensais automáticas
- **Período de Aplicação**: Defina o período em meses

### Índices de Mercado (Atualizados Automaticamente)
- **SELIC Efetiva a.a**: Taxa SELIC anual
- **CDI a.a**: CDI anual
- **IPCA a.a**: Inflação anual
- **TR a.m**: Taxa Referencial mensal
- **Rendimento da Poupança a.m**: Taxa de rendimento da poupança

### Simulações
- **CDB Prefixado**: Investimento com taxa prefixada ao ano
- **CDB Pós-fixado**: Investimento amarrado a percentual do CDI
- **Poupança**: Comparação com rendimento da poupança

### Resultados
- **Gráfico de Evolução**: Visualize o crescimento do seu investimento ao longo do tempo
- **Tabela Detalhada**: Demonstrativo mês a mês com saldos e rendimentos
- **Comparação**: Análise comparativa entre diferentes produtos

## 🚀 Tecnologias

- **Next.js 14**: Framework React com SSR
- **TypeScript**: Type safety em todo o projeto
- **Tailwind CSS**: Estilização moderna
- **Recharts**: Gráficos interativos
- **API Banco Central**: Dados de índices em tempo real

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/Freitassync/calculadora-renda-fixa.git
cd calculadora-renda-fixa
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## 📦 Build para Produção

```bash
npm run build
npm start
```

## 🔌 APIs Utilizadas

A aplicação utiliza a API gratuita do **Banco Central do Brasil** para obter dados atualizados dos índices:

- SELIC
- CDI
- IPCA
- TR

Os dados são cacheados por 1 hora para otimizar performance e respeitar os limites de rate limiting.

## 📊 Como Usar

1. **Preencha os Parâmetros**:
   - Defina o investimento inicial
   - Configure os aportes mensais
   - Escolha o período

2. **Configure a Simulação**:
   - Escolha entre CDB prefixado ou pós-fixado
   - Defina a taxa de rendimento
   - Ative a comparação com poupança se desejar

3. **Clique em Simular**:
   - Visualize os resultados em gráfico
   - Analise a tabela detalhada
   - Compare os produtos

## 💡 Exemplos de Cálculo

### CDB Prefixado
- Investimento Inicial: R$ 10.000
- Aportes Mensais: R$ 500
- Período: 12 meses
- Taxa: 11% a.a

### CDB Pós-fixado
- Investimento Inicial: R$ 10.000
- Aportes Mensais: R$ 500
- Período: 12 meses
- Taxa: 100% do CDI

## 📝 Fórmulas Utilizadas

### Rentabilidade Mensal
$$r_{mensal} = (1 + r_{anual})^{1/12} - 1$$

### Saldo Mensal (CDB)
$$S_n = S_{n-1} \times (1 + r_{mensal}) + A_n$$

Onde:
- $S_n$ = Saldo no mês n
- $r_{mensal}$ = Taxa mensal
- $A_n$ = Aporte no mês n

## 🤝 Contribuindo

Sugestões de melhorias são bem-vindas! Por favor:

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 👨‍💻 Autor

Desenvolvido por [Freitassync](https://github.com/Freitassync)

## ⚠️ Aviso Importante

Esta é uma ferramenta de simulação educacional. Os resultados são baseados em taxas vigentes e não representam garantias de rentabilidade futura. Consulte um consultor financeiro antes de fazer investimentos reais.

## 📞 Suporte

Para dúvidas ou reportar bugs, abra uma issue no repositório.

---

**Última atualização**: Outubro 2025
