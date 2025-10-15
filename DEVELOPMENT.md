# Guia de Desenvolvimento

## 🛠️ Setup do Ambiente

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env.local`:

```bash
cp .env.example .env.local
```

### 3. Iniciar o Servidor de Desenvolvimento

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3000`

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── api/
│   │   └── indices/
│   │       └── route.ts          # API para buscar índices do BACEN
│   ├── globals.css               # Estilos globais
│   ├── layout.tsx                # Layout raiz
│   └── page.tsx                  # Página principal
├── components/
│   ├── InputForm.tsx             # Formulário de entrada
│   └── Results.tsx               # Componente de resultados
├── contexts/
│   └── MarketContext.tsx         # Contexto para índices de mercado
├── services/
│   ├── marketIndices.ts          # Serviços de índices
│   └── simulator.ts              # Lógica de simulação
└── types/
    └── index.ts                  # Definições de tipos
```

## 🔄 Fluxo de Dados

```
Page (page.tsx)
├── Fetch indices (useEffect)
├── InputForm (componente)
│   ├── Recebe indices como prop
│   ├── Estado local do formulário
│   └── Callback onSimulate
├── Results (componente)
│   ├── Recebe resultados
│   ├── Renderiza gráficos
│   └── Renderiza tabelas
└── Services
    ├── simulator.ts (cálculos)
    └── /api/indices (dados)
```

## 📊 Algoritmos de Simulação

### CDB Prefixado

```
Taxa Mensal = (1 + Taxa Anual) ^ (1/12) - 1

Para cada mês:
  Saldo = Saldo Anterior × (1 + Taxa Mensal) + Aporte
```

### CDB Pós-fixado (% do CDI)

```
CDI Mensal = (1 + CDI Anual) ^ (1/12) - 1
Taxa Mensal = CDI Mensal × (% do CDI)

Para cada mês:
  Saldo = Saldo Anterior × (1 + Taxa Mensal) + Aporte
```

### Poupança

```
Taxa Mensal = Taxa Mensal da Poupança (obtida via API)

Para cada mês:
  Saldo = Saldo Anterior × (1 + Taxa Mensal) + Aporte
```

## 🔌 Integração com API do BACEN

A aplicação integra-se com a API pública do Banco Central via rota `/api/indices`:

### Séries de Dados

| Série | Descrição |
|-------|-----------|
| 432 | SELIC a.a |
| 12 | CDI a.a |
| 433 | IPCA a.a |
| 226 | TR a.m |

### Caching

Os dados são cacheados por **1 hora** (`revalidate: 3600`) para:
- Melhorar performance
- Respeitar rate limiting da API
- Reduzir latência de requisições

### Fallback

Se a API do BACEN estiver indisponível, valores padrão são retornados:

```json
{
  "selicEfetiva": 10.5,
  "cdi": 10.43,
  "ipca": 4.78,
  "tr": 0.2,
  "poupancaRendimento": 0.79
}
```

## 🎨 Customização de Estilos

O projeto utiliza **Tailwind CSS**. Para customizar:

1. Edite `tailwind.config.js`
2. Use classes Tailwind nos componentes
3. Para estilos globais, edite `src/app/globals.css`

### Cores do Tema

- **Primário**: `#1e40af` (Blue 800)
- **Secundário**: `#0891b2` (Cyan 600)

## 🧪 Testando Localmente

### Simular com Dados Diferentes

Edite os valores padrão em `src/app/page.tsx`:

```typescript
const [initialInvestment, setInitialInvestment] = useState<number>(1000);
const [monthlyContribution, setMonthlyContribution] = useState<number>(500);
const [period, setPeriod] = useState<number>(12);
```

### Forçar Refresh de Índices

No console do navegador:
```javascript
fetch('/api/indices').then(r => r.json()).then(console.log)
```

## 🐛 Debugging

### Logs de Desenvolvimento

```typescript
console.log('Simulação:', simulationResult);
console.log('Índices:', indices);
```

### VS Code Debug

Crie um arquivo `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/next/dist/bin/next",
      "args": ["dev"],
      "runtimeVersion": "18"
    }
  ]
}
```

## 📦 Build para Produção

```bash
npm run build
npm start
```

## 🚀 Deploy

### Vercel (Recomendado)

1. Conecte seu repositório GitHub
2. Vercel detectará Next.js automaticamente
3. Deploy automático em cada push para `main`

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

```bash
docker build -t calculadora-renda-fixa .
docker run -p 3000:3000 calculadora-renda-fixa
```

## 📝 Commit Message Convention

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: Nova feature
- `fix`: Bug fix
- `docs`: Documentação
- `style`: Formatação
- `refactor`: Refatoração
- `test`: Testes
- `chore`: Build, deps, etc

### Exemplos

```
feat(simulator): add comparison between CDB and savings
fix(api): handle BACEN API rate limiting
docs: update README with installation steps
```

## 🔒 Variáveis de Ambiente

| Variável | Descrição | Padrão |
|----------|-----------|--------|
| `NEXT_PUBLIC_BACEN_API` | URL da API do BACEN | https://www.bcb.gov.br/api/dados/serie/bcdata.sgs |
| `NEXT_PUBLIC_ENVIRONMENT` | Ambiente | development |

## 📚 Recursos Úteis

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Recharts](https://recharts.org)
- [Banco Central API](https://www.bcb.gov.br/api/)
- [TypeScript](https://www.typescriptlang.org)

## 🤝 Contribuindo

1. Crie uma branch para sua feature: `git checkout -b feature/nova-feature`
2. Faça suas mudanças
3. Teste localmente: `npm run dev`
4. Commit com mensagem clara: `git commit -m "feat: descrição"`
5. Push: `git push origin feature/nova-feature`
6. Abra um Pull Request

## ⚡ Performance

### Otimizações Implementadas

- ✅ Next.js SSR para SEO
- ✅ Code splitting automático
- ✅ Caching de dados da API
- ✅ Componentes lazy loading via dynamic imports
- ✅ Tailwind CSS purging

### Melhorias Futuras

- [ ] Memoização de resultados de simulação
- [ ] PWA (Progressive Web App)
- [ ] Suporte offline
- [ ] Animações mais fluidas
- [ ] Dark mode

## 📞 Suporte

Para dúvidas, abra uma issue no repositório com:
- Descrição clara do problema
- Passos para reproduzir
- Screenshots (se aplicável)
- Versão do Node.js e navegador
