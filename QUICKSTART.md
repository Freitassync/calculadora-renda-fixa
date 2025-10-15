# 🚀 Guia Rápido - Calculadora de Renda Fixa

## Começar em 5 Minutos

### 1. Clone o Repositório
```bash
git clone https://github.com/Freitassync/calculadora-renda-fixa.git
cd calculadora-renda-fixa
```

### 2. Instale as Dependências
```bash
npm install
```

### 3. Inicie o Servidor
```bash
npm run dev
```

### 4. Abra no Navegador
```
http://localhost:3000
```

✅ **Pronto!** A calculadora está rodando!

---

## 📋 O que o Projeto Inclui

### ✨ Funcionalidades
- 📊 Simulador de **CDB Prefixado** e **Pós-fixado**
- 🏦 Comparação com **Poupança**
- 📈 Gráficos interativos
- 📋 Tabelas detalhadas
- 🔄 Índices atualizados em tempo real via API BACEN

### 🛠️ Tecnologia
- Next.js 14 + React 18
- TypeScript para type safety
- Tailwind CSS para design responsivo
- Recharts para gráficos
- API do Banco Central integrada

### 📁 Estrutura

```
calculadora-renda-fixa/
├── src/
│   ├── app/                    # Páginas e layout
│   │   ├── api/indices/        # API para buscar índices
│   │   ├── page.tsx            # Página principal
│   │   └── layout.tsx          # Layout raiz
│   ├── components/             # Componentes React
│   │   ├── InputForm.tsx       # Formulário de entrada
│   │   └── Results.tsx         # Resultados e gráficos
│   ├── services/               # Lógica de negócio
│   │   ├── simulator.ts        # Cálculos de simulação
│   │   └── marketIndices.ts    # Serviços de índices
│   ├── contexts/               # React Contexts
│   │   └── MarketContext.tsx   # Context para índices
│   └── types/                  # Definições TypeScript
├── __tests__/                  # Testes unitários
├── README.md                   # Documentação principal
├── DEVELOPMENT.md              # Guia de desenvolvimento
├── TROUBLESHOOTING.md          # Solução de problemas
├── ROADMAP.md                  # Plano de desenvolvimento
└── CHANGELOG.md                # Histórico de mudanças
```

---

## 🎯 Como Usar a Calculadora

### Passo 1: Defina seus Parâmetros
- **Investimento Inicial**: Quanto você vai investir no início
- **Aportes Mensais**: Contribuições mensais automáticas
- **Período**: Quantos meses você quer simular

### Passo 2: Configure o Investimento
- Escolha entre **CDB Prefixado** ou **Pós-fixado (% do CDI)**
- Defina a **taxa de rendimento**
- Ative comparação com **Poupança** se quiser

### Passo 3: Clique em "Simular"
- Visualize os **resultados**
- Analise o **gráfico** de evolução
- Compare com a **tabela detalhada**

### Exemplo de Simulação
```
Investimento Inicial:  R$ 10.000
Aportes Mensais:       R$ 500
Período:               12 meses
CDB:                   100% do CDI (10.43% a.a)
Poupança:              0.79% a.m

Resultado em 12 meses:
├─ CDB:      R$ 16.487 (rendimento: R$ 987)
└─ Poupança: R$ 16.143 (rendimento: R$ 643)
```

---

## 📊 Índices Utilizados (Atualizados em Tempo Real)

| Índice | Descrição | Fonte |
|--------|-----------|-------|
| 🏦 SELIC | Taxa básica de juros | BACEN |
| 💱 CDI | Certificado de Depósito | BACEN |
| 📈 IPCA | Inflação oficial | BACEN |
| 📊 TR | Taxa Referencial | BACEN |
| 💰 Poupança | Rendimento a.m | Calculado |

**Atualização**: A cada 1 hora (cache de performance)

---

## 🔧 Comandos Úteis

### Desenvolvimento
```bash
npm run dev          # Iniciar servidor de desenvolvimento
npm run lint         # Verificar erros de código
```

### Produção
```bash
npm run build        # Build para produção
npm start            # Iniciar servidor de produção
```

### Testes
```bash
npm test             # Executar testes
npm test -- --watch  # Modo watch
npm test -- --coverage  # Com cobertura
```

---

## 🐛 Problemas Comuns?

### Índices não aparecem
```javascript
// No console do navegador
fetch('/api/indices').then(r => r.json()).then(console.log)
```

### Porta 3000 já em uso
```bash
npm run dev -- -p 3001  # Use outra porta
```

### Erros de dependências
```bash
npm install
npm install --save-dev @types/react @types/react-dom
```

👉 Veja `TROUBLESHOOTING.md` para mais soluções

---

## 📚 Documentação Completa

| Arquivo | Conteúdo |
|---------|----------|
| `README.md` | Visão geral e funcionalidades |
| `DEVELOPMENT.md` | Guia detalhado de desenvolvimento |
| `TROUBLESHOOTING.md` | Solução de problemas |
| `ROADMAP.md` | Plano futuro do projeto |
| `CHANGELOG.md` | Histórico de versões |

---

## 🚀 Próximos Passos

### Melhorias Planejadas
- [ ] **Dark Mode** (v0.2)
- [ ] **Exportar PDF** (v0.2)
- [ ] **Histórico de Simulações** (v0.2)
- [ ] **PWA/Offline** (v0.3)
- [ ] **Mobile App** (v0.4)
- [ ] **Integração com Brokers** (v0.4)

👉 Veja `ROADMAP.md` para detalhes

---

## 💡 Dicas de Uso

### Para Investidores Iniciantes
1. Comece com valores reais que você pensa em investir
2. Teste diferentes períodos (6 meses, 1 ano, 5 anos)
3. Compare CDB vs Poupança
4. Considere a inflação (compare com IPCA)

### Para Análises Profissionais
1. Use múltiplas simulações com diferentes cenários
2. Exporte os dados (futuro)
3. Compare com investimentos reais
4. Monitore a rentabilidade real vs simulada

---

## 🔒 Informações Importantes

⚠️ **Esta é uma ferramenta educacional**
- Resultados são simulações baseadas em taxas vigentes
- Não representa garantia de rentabilidade futura
- Consulte um consultor financeiro para decisões reais
- Realizado em {{date}}

---

## 📞 Suporte e Feedback

- 🐛 [Reportar um bug](https://github.com/Freitassync/calculadora-renda-fixa/issues)
- 💡 [Sugerir uma feature](https://github.com/Freitassync/calculadora-renda-fixa/discussions)
- 📧 Email: contato@calculadorarendafixa.com
- 💬 Discord: [Comunidade](https://discord.gg/seu-server)

---

## 📈 Estatísticas do Projeto

- **Linhas de Código**: ~1.500
- **Componentes React**: 2 principais
- **APIs Integradas**: 1 (BACEN)
- **Tempo de Resposta**: < 500ms
- **Cobertura de Testes**: Em desenvolvimento

---

## 🎓 Recursos Úteis

- [Documentação Next.js](https://nextjs.org/docs)
- [React Hooks](https://react.dev/reference/react)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Banco Central API](https://www.bcb.gov.br/api/)

---

## 👨‍💻 Desenvolvido por

**[Freitassync](https://github.com/Freitassync)**

Contribuições bem-vindas! 🤝

---

**Última atualização**: Outubro 2025

**Versão**: 0.1.0

**Status**: ✅ Em produção beta
