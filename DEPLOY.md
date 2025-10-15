# 🚀 Deploy - Calculadora de Renda Fixa

## Opção 1: Deploy no Vercel (Recomendado) ⭐

### Por que Vercel?
- ✅ Plataforma oficial do Next.js
- ✅ Deploy automático em cada push
- ✅ Free tier generoso
- ✅ Performance otimizada
- ✅ SSL automático
- ✅ Analytics incluído

### Passo 1: Prepare o Repositório
```bash
cd calculadora-renda-fixa
git remote -v  # Confirmar que está no GitHub
```

### Passo 2: Acesse Vercel
1. Vá para https://vercel.com
2. Clique em "Sign Up" (use GitHub)
3. Autorize acesso ao GitHub

### Passo 3: Importe o Projeto
1. Clique em "New Project"
2. Selecione `calculadora-renda-fixa`
3. Configure as variáveis de ambiente:
   ```
   NEXT_PUBLIC_BACEN_API=https://www.bcb.gov.br/api/dados/serie/bcdata.sgs
   NEXT_PUBLIC_ENVIRONMENT=production
   ```
4. Clique em "Deploy"

### Passo 4: Pronto! 🎉
- URL: `https://calculadora-renda-fixa.vercel.app`
- Deploy automático em cada push para `main`
- Logs em tempo real

---

## Opção 2: Deploy no Heroku

### Passo 1: Instale Heroku CLI
```bash
# Windows
choco install heroku-cli

# Mac
brew tap heroku/brew && brew install heroku

# Linux
curl https://cli-assets.heroku.com/install.sh | sh
```

### Passo 2: Login no Heroku
```bash
heroku login
```

### Passo 3: Crie a Aplicação
```bash
heroku create calculadora-renda-fixa
```

### Passo 4: Configure Variáveis
```bash
heroku config:set NEXT_PUBLIC_ENVIRONMENT=production
```

### Passo 5: Deploy
```bash
git push heroku main
```

### Passo 6: Abra a Aplicação
```bash
heroku open
```

---

## Opção 3: Deploy com Docker

### Passo 1: Crie Dockerfile
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

### Passo 2: Build da Imagem
```bash
docker build -t calculadora-renda-fixa:latest .
```

### Passo 3: Teste Localmente
```bash
docker run -p 3000:3000 calculadora-renda-fixa:latest
```

### Passo 4: Deploy (Escolha um)

**Docker Hub**:
```bash
docker tag calculadora-renda-fixa:latest seu-usuario/calculadora-renda-fixa:latest
docker push seu-usuario/calculadora-renda-fixa:latest
```

**AWS ECS**:
```bash
# Configure AWS CLI
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin seu-repo.dkr.ecr.us-east-1.amazonaws.com
```

---

## Opção 4: Deploy no Railway

### Passo 1: Conecte o GitHub
1. Vá para https://railway.app
2. Clique em "Create New"
3. Selecione "GitHub Repo"
4. Autorize e selecione o repositório

### Passo 2: Configure
1. Railway detectará Next.js automaticamente
2. Adicione variáveis de ambiente se necessário
3. Clique em "Deploy"

---

## Opção 5: Deploy na AWS

### Com Amplify
```bash
npm install -g @aws-amplify/cli
amplify configure
amplify init
amplify add hosting
amplify publish
```

### Com Elastic Beanstalk
```bash
eb init -p node.js-18 calculadora-renda-fixa
eb create prod-env
eb deploy
```

---

## Checklist Pré-Deployment

- [ ] Testes locais executados
- [ ] Build local sucesso: `npm run build`
- [ ] Sem erros no console
- [ ] Variáveis de ambiente configuradas
- [ ] `.env.local` não está no Git
- [ ] Documentação atualizada
- [ ] README reflete mudanças

---

## Testes Antes do Deploy

### 1. Build de Produção
```bash
npm run build
npm start
```
Acesse: http://localhost:3000

### 2. Lighthouse
```bash
# Chrome DevTools → Lighthouse
# Ou use CLI
npm install -g lighthouse
lighthouse http://localhost:3000
```

### 3. Testes Manuais
- [ ] Carregam os índices?
- [ ] Simulação funciona?
- [ ] Gráficos renderizam?
- [ ] Tabela mostra dados?
- [ ] Mobile responsivo?

---

## Performance em Produção

### Otimizações Já Implementadas
- ✅ Next.js SSR/SSG
- ✅ Code splitting automático
- ✅ CSS minificado com Tailwind
- ✅ Caching de índices (1h)
- ✅ Compressão gzip

### Monitorar Performance
```bash
# Sentry (para erros)
npm install @sentry/nextjs

# Google Analytics
npm install next-google-analytics
```

---

## Domínio Customizado

### Vercel
1. Settings → Domains
2. Adicione seu domínio
3. Configure DNS records

### Outros Provedores
```
Exemplo com GoDaddy:
├── A Record: 76.76.19.5 (Vercel)
├── CNAME: yourdomain.com → cname.vercel-dns.com
└── Aguarde propagação (até 48h)
```

---

## CI/CD Pipeline

### GitHub Actions
Crie `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run lint
      - run: npm run build
      - run: npm test
```

---

## Monitoramento Pós-Deploy

### Uptime
- [Pingdom](https://www.pingdom.com)
- [StatusPage.io](https://www.statuspage.io)
- [Uptime Robot](https://uptimerobot.com)

### Erros
- [Sentry](https://sentry.io)
- [Rollbar](https://rollbar.com)
- [Raygun](https://raygun.com)

### Performance
- [DataDog](https://www.datadoghq.com)
- [New Relic](https://newrelic.com)
- [Vercel Analytics](https://vercel.com)

### Logs
```bash
# Vercel
vercel logs

# Heroku
heroku logs --tail

# Docker
docker logs <container_id>
```

---

## Rollback (Desfazer Deployment)

### Vercel
1. Deployments → Selecione versão anterior
2. Clique em "Promote to Production"

### Heroku
```bash
heroku releases
heroku rollback v123
```

### Docker
```bash
docker run -p 3000:3000 calculadora-renda-fixa:anterior
```

---

## Backup e Recuperação

### Dados
```bash
# Neste projeto, não há banco de dados
# Simulações são calculadas em tempo real
# Mas você pode fazer backup do código
git tag v0.1.0-prod
git push origin v0.1.0-prod
```

### Banco de Dados (Futuro)
```bash
# Quando implementar backend
# Use serviços gerenciados:
# - MongoDB Atlas
# - Firebase
# - AWS RDS
```

---

## Custos Estimados

### Gratuito
- ✅ Vercel (até 100GB/mês)
- ✅ Railway (até $5/mês)
- ✅ Heroku (sem free tier novo)

### Pago (Opcional)
- Vercel Pro: $20/mês
- Railway: Pague conforme usa
- AWS: Varia

---

## Troubleshooting Deployment

### Erro: "Build failed"
```bash
# Verifique localmente
npm run build

# Limpe cache
rm -rf .next node_modules
npm install
npm run build
```

### Erro: "Port already in use"
- Vercel não usa porta fixa
- Heroku expõe $PORT

### Erro: "Cannot find module"
```bash
# Reinstale dependências no servidor
npm ci
```

### Erro: "ENOSPC: no space left"
- Aumente espaço de armazenamento
- Delete arquivos não utilizados

---

## Próximos Passos Após Deploy

1. **Monitorar**
   - [ ] Uptime
   - [ ] Performance
   - [ ] Erros

2. **Coletar Feedback**
   - [ ] User Analytics
   - [ ] Error Reports
   - [ ] Feature Requests

3. **Melhorias**
   - [ ] Otimizações baseadas em dados
   - [ ] Correção de bugs
   - [ ] Novas features

4. **Marketing**
   - [ ] SEO
   - [ ] Social Media
   - [ ] Documentação

---

## URLs Úteis

| Serviço | URL |
|---------|-----|
| Vercel | https://vercel.com |
| Heroku | https://heroku.com |
| Railway | https://railway.app |
| AWS | https://aws.amazon.com |
| Docker Hub | https://hub.docker.com |
| GitHub Actions | https://github.com/features/actions |

---

## Checklist Pós-Deploy

- [ ] Site acessível
- [ ] HTTPS funcionando
- [ ] Índices carregam
- [ ] Simulação funciona
- [ ] Mobile responsivo
- [ ] Sem erros no console
- [ ] Performance aceitável
- [ ] Monitoramento ativo
- [ ] Backup configurado
- [ ] CI/CD funcionando

---

## Suporte

Dúvidas sobre deploy?
- 📖 Documentação Vercel: https://vercel.com/docs
- 📖 Documentação Next.js: https://nextjs.org/docs/deployment
- 🐛 GitHub Issues: https://github.com/Freitassync/calculadora-renda-fixa/issues

---

**Boa sorte com o deployment! 🚀**

Qualquer dúvida, consulte a documentação ou abra uma issue.
