# 🚀 Deploy na Vercel - Guia Completo

## 🔑 **Variáveis de Ambiente Obrigatórias**

Configure estas variáveis no painel da **Vercel** (Settings → Environment Variables):

```bash
# API do Brevo (obrigatória)
BREVO_API_KEY=xkeysib-SUA_API_KEY_REAL_DO_BREVO_AQUI

# Configurações de Email (obrigatórias)
BREVO_SENDER_EMAIL=contato.agencia@intelligentdevsolutions.com
BREVO_SENDER_NAME=Tenorio AI Solutions

# Newsletter (obrigatória)
BREVO_NEWSLETTER_LIST_ID=1

# Email de destino dos formulários (obrigatória)
CONTACT_TO_EMAIL=contato.agencia@intelligentdevsolutions.com
```

## 📁 **Estrutura para Vercel**

```
seu-projeto/
├── api/
│   ├── contact.js       # API Route para formulário
│   └── newsletter.js    # API Route para newsletter
├── index.html          # Página principal
├── style.css           # Estilos
├── script-vercel.js    # JavaScript para Vercel
├── images/            # Logo e imagens
└── vercel.json        # Configuração da Vercel (opcional)
```

## 🔧 **Passos para Deploy**

### 1. **Conectar Repositório**

1. Acesse [vercel.com](https://vercel.com)
2. Clique em **"New Project"**
3. Conecte seu repositório do GitHub
4. Selecione o repositório `Agencia_Chat`

### 2. **Configurar as Variáveis**

No painel da Vercel:

1. Vá em **Settings** → **Environment Variables**
2. Adicione cada variável listada acima
3. Defina para **Production**, **Preview** e **Development**

### 3. **Obter Credenciais do Brevo**

1. **Login**: [app.brevo.com](https://app.brevo.com)
2. **API Key**: Account → SMTP & API → API Keys → Create
3. **Lista Newsletter**: Contacts → Lists → Criar/Anotar ID

### 4. **Configurar Arquivos para Vercel**

#### **Opção A: Usar API Routes (Recomendada)**

1. **Copie** os arquivos `api/contact.js` e `api/newsletter.js`
2. **Substitua** `script.js` por `script-vercel.js` no `index.html`:

```html
<script src="script-vercel.js"></script>
```

3. **Remova** referências ao `env-loader.js` e `config.js`

#### **Opção B: Método Simples (Menos Segura)**

1. **Configure** as variáveis na Vercel
2. **Mantenha** o código atual
3. ⚠️ **Atenção**: API Keys ficarão expostas no frontend

## 📝 **Configuração Vercel.json (Opcional)**

```json
{
  "functions": {
    "api/contact.js": {
      "maxDuration": 10
    },
    "api/newsletter.js": {
      "maxDuration": 10
    }
  },
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        },
        {
          "key": "Access-Control-Allow-Methods",
          "value": "GET, POST, PUT, DELETE, OPTIONS"
        },
        {
          "key": "Access-Control-Allow-Headers",
          "value": "Content-Type, Authorization"
        }
      ]
    }
  ]
}
```

## ✅ **Checklist de Deploy**

- [ ] Variáveis configuradas na Vercel
- [ ] API Key do Brevo válida
- [ ] Lista de newsletter criada no Brevo
- [ ] Arquivos API routes adicionados
- [ ] Script atualizado para script-vercel.js
- [ ] Deploy realizado com sucesso
- [ ] Formulários testados em produção

## 🔍 **Testar em Produção**

1. **Acesse** seu site na URL da Vercel
2. **Teste o formulário** de contato
3. **Teste a newsletter** no footer
4. **Verifique no Brevo** se chegaram os dados
5. **Monitore os logs** da Vercel (Functions tab)

## 🚨 **Solução de Problemas**

### **Erro 500 nas API Routes:**

- Verifique se as variáveis estão configuradas
- Confirme se a API Key do Brevo é válida
- Verifique os logs da função na Vercel

### **CORS Errors:**

- Adicione o arquivo `vercel.json` com headers CORS
- Verifique se o domínio está autorizado no Brevo

### **Formulário não envia:**

- Confirme se está usando `script-vercel.js`
- Verifique se as rotas `/api/contact` e `/api/newsletter` existem
- Teste as APIs diretamente

## 📈 **Monitoramento**

### **Logs da Vercel:**

- Functions → Ver logs das execuções
- Analytics → Métricas de uso

### **Painel Brevo:**

- Emails enviados: Campaigns → Email
- Contatos newsletter: Contacts → Lists

## 🔒 **Segurança em Produção**

✅ **Com API Routes:**

- ✅ Credenciais protegidas no servidor
- ✅ Validação no backend
- ✅ Rate limiting automático da Vercel

⚠️ **Sem API Routes:**

- ❌ Credenciais expostas no frontend
- ❌ Vulnerável a ataques
- ❌ Não recomendado para produção

---

🎉 **Com essa configuração, sua landing page estará totalmente funcional e segura na Vercel!**
