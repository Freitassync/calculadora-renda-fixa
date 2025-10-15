# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [0.1.0] - 2025-10-15

### Adicionado

- ✨ **Estrutura Inicial Next.js**: Configuração completa com TypeScript
- 📊 **Simulador de CDB Prefixado**: Cálculos com taxa fixa anual
- 📊 **Simulador de CDB Pós-fixado**: Cálculos amarrados ao percentual do CDI
- 🏦 **Simulador de Poupança**: Comparação com rendimento da poupança
- 📈 **Gráficos Interativos**: Visualização com Recharts
- 📋 **Tabelas Detalhadas**: Demonstrativo mês a mês
- 🔄 **API do BACEN Integrada**: 
  - SELIC Efetiva a.a
  - CDI a.a
  - IPCA a.a
  - TR a.m
  - Rendimento Poupança a.m
- 🎨 **Design Responsivo**: Mobile-first com Tailwind CSS
- 📝 **Documentação Completa**: README e guia de desenvolvimento
- 🧪 **Testes Unitários**: Suite de testes para simulador

### Funcionalidades

- Investimento Inicial configurável
- Aportes Mensais configuráveis
- Período da aplicação flexível
- Alternância entre CDB prefixado e pós-fixado
- Taxa de CDB personalizável
- Comparação automática com poupança
- Caching de dados (1 hora)
- Fallback com valores padrão
- Responsividade em todos os dispositivos

### Tecnologia

- Next.js 14
- React 18
- TypeScript 5.3
- Tailwind CSS 3.3
- Recharts 2.10
- Axios 1.6
- Lucide React (ícones)

## [Próximas Versões Planejadas]

### v0.2.0 - Aprimoramentos

- [ ] Dark Mode
- [ ] PWA (Progressive Web App)
- [ ] Exportar simulação em PDF
- [ ] Histórico de simulações (localStorage)
- [ ] Mais tipos de investimento (Tesouro Direto, Fundo DI)
- [ ] Gráficos comparativos adicionais
- [ ] Modo offline

### v0.3.0 - Performance e UX

- [ ] Otimização de performance
- [ ] Animações mais suaves
- [ ] Carregamento progressivo
- [ ] Melhorias no mobile
- [ ] Temas customizáveis

### v0.4.0 - Funcionalidades Avançadas

- [ ] API com autenticação (salvar simulações)
- [ ] Compartilhamento de simulações
- [ ] Notificações de mudanças de índices
- [ ] Análise de volatilidade
- [ ] Projeções com inflação

---

## Notas de Desenvolvimento

### v0.1.0 - Primeira Release

Esta é a primeira release da Calculadora de Renda Fixa. O projeto implementa as funcionalidades básicas de simulação com integração em tempo real com os índices do Banco Central.

#### Pontos Técnicos

1. **Integração com BACEN**: Implementada via API REST pública
2. **Caching Inteligente**: Utiliza Next.js Incremental Static Regeneration
3. **Type Safety**: Fully typed com TypeScript
4. **Responsividade**: Mobile-first approach com Tailwind CSS
5. **Performance**: Otimizada para produção com Next.js

#### Limitações Conhecidas

1. Sem persistência de dados (localStorage em v0.2)
2. Sem modo offline (PWA em v0.2)
3. Sem exportação de relatórios (PDF em v0.2)

#### Próximos Passos

- Implementar testes de integração
- Adicionar mais tipos de investimento
- Melhorar UX com mais interatividade
- Preparar para deploy em produção

---

**Mantido por**: [Freitassync](https://github.com/Freitassync)
