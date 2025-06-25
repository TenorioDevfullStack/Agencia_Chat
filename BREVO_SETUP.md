# 📧 Configuração do Brevo para Tenorio AI Solutions

## 🚀 Integração Completa Implementada

O formulário de contato e newsletter estão **prontos para usar o Brevo**! Aqui está como configurar:

## 🔑 1. Configurar Credenciais

### Opção A: Editar diretamente o `env-loader.js`

Abra o arquivo `env-loader.js` e substitua pelas suas credenciais reais:

```javascript
window.BREVO_API_KEY = "xkeysib-SUA_API_KEY_AQUI";
window.BREVO_SENDER_EMAIL = "contato.agencia@intelligentdevsolutions.com";
window.BREVO_SENDER_NAME = "Tenorio AI Solutions";
window.BREVO_NEWSLETTER_LIST_ID = 1; // ID da sua lista no Brevo
```

### Opção B: Usar Backend (Recomendado para produção)

1. Crie um endpoint no seu backend que leia o `.env`
2. Remova o `env-loader.js`
3. Carregue as credenciais via API (exemplo no arquivo)

## 🎯 2. Obter Credenciais do Brevo

### API Key:

1. Faça login no [Brevo](https://app.brevo.com)
2. Vá em **Account** → **SMTP & API** → **API Keys**
3. Crie uma nova API Key com permissões de **Email**

### Lista de Newsletter:

1. No Brevo, vá em **Contacts** → **Lists**
2. Crie uma lista para newsletter (anote o ID)
3. Substitua o `BREVO_NEWSLETTER_LIST_ID`

## ✅ 3. Funcionalidades Implementadas

### 📝 Formulário de Contato:

- ✅ Validação completa dos campos
- ✅ Envio real via API Brevo
- ✅ Email formatado com todas as informações
- ✅ Feedback de sucesso/erro
- ✅ Tracking de eventos

### 📬 Newsletter:

- ✅ Inscrição automática na lista do Brevo
- ✅ Validação de email
- ✅ Feedback visual com spinner
- ✅ Tratamento de erros

## 🔧 4. Testando a Integração

1. **Configure as credenciais** reais no `env-loader.js`
2. **Abra a página** no navegador
3. **Preencha o formulário** de contato
4. **Teste a newsletter** no footer
5. **Verifique no Brevo** se chegaram os emails/contatos

## 📊 5. Monitoramento

### Console do Navegador:

- Logs de sucesso/erro nas chamadas da API
- Tracking de eventos para analytics

### Painel Brevo:

- Emails enviados em **Campaigns** → **Email**
- Contatos da newsletter em **Contacts** → **Lists**

## ⚠️ 6. Importante para Produção

### Segurança:

- **NUNCA** exponha a API Key no frontend em produção
- Use um backend para fazer as chamadas do Brevo
- Implemente rate limiting para evitar spam

### CORS:

- Configure o CORS no Brevo se necessário
- Adicione seu domínio nas configurações

## 🛠️ 7. Estrutura dos Arquivos

```
├── index.html          # Página principal
├── env-loader.js       # Carrega variáveis (EDITE AQUI)
├── config.js           # Configurações e funções do Brevo
├── script.js           # JavaScript principal (já atualizado)
└── BREVO_SETUP.md     # Esta documentação
```

## 📞 8. Suporte

Se tiver problemas:

1. **Verifique o console** do navegador para erros
2. **Teste a API Key** no Postman primeiro
3. **Confira as permissões** da API Key no Brevo
4. **Verifique o CORS** se hospedar em domínio

---

🎉 **Agora seus formulários estão conectados ao Brevo e funcionais!**
