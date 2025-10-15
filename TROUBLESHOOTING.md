# Troubleshooting

## Problemas Comuns e Soluções

### 1. Erro "Cannot find module 'react'"

**Problema**: TypeScript não encontra a dependência do React

**Solução**:
```bash
npm install
npm install --save-dev @types/react @types/react-dom @types/node
```

### 2. Índices não atualizam

**Problema**: Os índices do BACEN não aparecem ou aparecem valores padrão

**Possíveis Causas**:
- Conexão com internet indisponível
- API do BACEN fora
- Rate limiting ativo

**Solução**:
1. Verifique a conexão com internet
2. Teste a API manualmente:
   ```bash
   curl "https://www.bcb.gov.br/api/dados/serie/bcdata.sgs/432/dados?formato=json"
   ```
3. Aguarde 1 hora para refresh automático
4. Ou force refresh manualmente no console:
   ```javascript
   fetch('/api/indices').then(r => r.json()).then(console.log)
   ```

### 3. Erro "CORS" ao acessar a API

**Problema**: Erro de Cross-Origin Resource Sharing

**Solução**:
- Este erro não deve ocorrer pois a API do BACEN é chamada do servidor Next.js
- Se ocorrer, verifique se está usando a rota `/api/indices` correta

### 4. Gráfico não renderiza

**Problema**: O Recharts não mostra o gráfico

**Possíveis Causas**:
- Dados vazios
- Tamanho do container inválido
- Erro de TypeScript

**Solução**:
1. Verifique no console do navegador se há erros
2. Certifique-se de que `cdbResult` ou `poupancaResult` não é undefined
3. Teste com dados de exemplo:
   ```typescript
   const mockData = [
     { mes: 1, cdbSaldo: 10000, poupancaSaldo: 10000 }
   ];
   ```

### 5. Valores negativos nos cálculos

**Problema**: Resultados mostram valores negativos

**Causa**: Erro na lógica de cálculo ou taxa negativa

**Solução**:
1. Verifique se as taxas são positivas
2. Revise `src/services/simulator.ts`
3. Adicione validação nos inputs:
   ```typescript
   if (input.cdbRate < 0) throw new Error('Taxa não pode ser negativa');
   ```

### 6. Erro "Port 3000 already in use"

**Problema**: Porta 3000 já está em uso

**Solução**:
```bash
# Opção 1: Usar outra porta
npm run dev -- -p 3001

# Opção 2: Encontrar e matar o processo
# Windows PowerShell
Get-Process -Name "node" | Stop-Process -Force

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

### 7. Build falha com erro de TypeScript

**Problema**: `npm run build` gera erros

**Solução**:
1. Limpe o cache:
   ```bash
   rm -rf .next
   ```
2. Reinstale dependências:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```
3. Execute build novamente:
   ```bash
   npm run build
   ```

### 8. Responsividade não funciona no mobile

**Problema**: Layout não se adapta bem em celulares

**Solução**:
1. Verifique o viewport meta tag em `src/app/layout.tsx`:
   ```tsx
   <meta name="viewport" content="width=device-width, initial-scale=1" />
   ```
2. Teste com ferramentas de desenvolvimento:
   - Chrome DevTools (F12 → Device Toggle)
   - Firefox DevTools (Ctrl+Shift+M)

### 9. Tabela não mostra todos os dados

**Problema**: Apenas 12 primeiros meses aparecem

**Comportamento Esperado**: A tabela mostra apenas os 12 primeiros meses para não sobrecarregar
- Se deseja ver todos: Implemente scroll ou paginação
- Verifique a variável `slice(0, 12)` em `Results.tsx`

### 10. Valores muito grandes causam erro

**Problema**: Números muito grandes (bilhões) causam comportamento estranho

**Solução**:
1. Adicione validação:
   ```typescript
   if (initialInvestment > 999999999) {
     throw new Error('Valor máximo excedido');
   }
   ```
2. Implemente formatação numérica apropriada

---

## Performance

### Otimizações

Se a aplicação está lenta:

1. **Verifique o Network Tab**:
   - Procure por requisições lentas
   - Veja o tempo de resposta da API

2. **Otimize Componentes**:
   ```typescript
   import { memo } from 'react';
   const InputForm = memo(({ onSimulate, indices, loading }) => {
     // ...
   });
   ```

3. **Use React DevTools Profiler**:
   - Chrome DevTools → React tab → Profiler
   - Identifique re-renders desnecessários

### Métricas de Performance

Monitore usando:
- Lighthouse (Chrome DevTools)
- Web Vitals
- NextAnalytics

---

## Debugging Avançado

### Logs Estruturados

```typescript
const log = (message: string, data?: any) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[${new Date().toISOString()}] ${message}`, data);
  }
};
```

### Usar VS Code Debugger

Crie `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/.bin/next",
      "args": ["dev"],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```

### Network Throttling

Chrome DevTools → Network → Throttling
- Teste com 3G, 4G lento
- Verifique carregamento de dados

---

## Problemas de Deploy

### Vercel

```bash
# Verificar logs
vercel logs

# Deploy manual
vercel deploy --prod
```

### Docker

```bash
# Verificar se a imagem está correta
docker build -t calculadora:latest .
docker run -p 3000:3000 calculadora:latest

# Logs
docker logs <container_id>
```

---

## Suporte Adicional

Se o problema persistir:

1. Verifique as [Issues do GitHub](https://github.com/Freitassync/calculadora-renda-fixa/issues)
2. Crie uma nova issue com:
   - Descrição detalhada
   - Passos para reproduzir
   - Logs de erro
   - Versão do Node.js: `node -v`
   - Sistema operacional
3. Entre em contato com o desenvolvedor

---

## Checklist de Diagnóstico

- [ ] Node.js 18+ instalado? (`node -v`)
- [ ] npm atualizado? (`npm -v`)
- [ ] `npm install` executado?
- [ ] Variáveis de ambiente configuradas? (`.env.local`)
- [ ] Porta 3000 disponível?
- [ ] Internet conectada?
- [ ] API do BACEN respondendo?
- [ ] Sem erros no console?

Se nenhuma solução funcionou, verifique:
- Stack trace completo
- Ambiente de execução
- Última mudança que causou o problema
