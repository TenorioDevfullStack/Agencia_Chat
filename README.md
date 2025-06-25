# 🤖 Tenorio AI Solutions - Landing Page

Landing page profissional para agência de chatbots com IA para WhatsApp, atendendo diversos segmentos de negócios.

## 🎯 Funcionalidades

- ✅ **Design responsivo** (mobile-first)
- ✅ **Formulário de contato** integrado com Brevo
- ✅ **Newsletter** funcional
- ✅ **FAQ interativo** com accordion
- ✅ **Animações suaves** ao scroll
- ✅ **SEO otimizado** com meta tags
- ✅ **Acessibilidade** completa
- ✅ **Modais** para Política de Privacidade e Termos de Uso

## 🚀 Configuração Rápida

### 1. Clone o repositório

```bash
git clone https://github.com/TenorioDevfullStack/Agencia_Chat.git
cd Agencia_Chat
```

### 2. Configure as credenciais do Brevo

```bash
# Copie o arquivo de exemplo
cp env-loader.example.js env-loader.js

# Edite e configure suas credenciais reais
# Substitua SUA_API_KEY_REAL_AQUI pela sua API Key do Brevo
```

### 3. Abra no navegador

```bash
# Abra o arquivo index.html no seu navegador
# Ou use um servidor local como Live Server (VS Code)
```

## 🔑 Configuração do Brevo

### Obter credenciais:

1. **Login no Brevo**: [https://app.brevo.com](https://app.brevo.com)
2. **API Key**: Account → SMTP & API → API Keys
3. **Lista Newsletter**: Contacts → Lists → Criar nova lista

### Configurar no projeto:

Edite o arquivo `env-loader.js` (criado a partir do exemplo):

```javascript
window.BREVO_API_KEY = "xkeysib-SUA_API_KEY_REAL_AQUI";
window.BREVO_NEWSLETTER_LIST_ID = 1; // ID da sua lista
```

## 📁 Estrutura do Projeto

```
├── index.html              # Página principal
├── style.css               # Estilos CSS
├── script.js               # JavaScript principal
├── config.js               # Configurações da API
├── env-loader.example.js   # Exemplo de configuração
├── env-loader.js           # Suas credenciais (não versionado)
├── BREVO_SETUP.md         # Documentação detalhada do Brevo
├── images/                # Logo e imagens
│   └── logo.png
└── README.md              # Esta documentação
```

## 🎨 Customização

### Cores (CSS Variables em style.css):

```css
:root {
  --primary-blue: #1a365d;
  --accent-cyan: #00d4aa;
  --accent-green: #48bb78;
}
```

### Logo:

Substitua `images/logo.png` pela sua logo (recomendado: PNG transparente)

### Conteúdo:

Edite `index.html` para personalizar textos, links e informações

## 🔒 Segurança

- ✅ **Credenciais protegidas** (.gitignore)
- ✅ **Validação de formulários** frontend
- ✅ **Tratamento de erros** robusto
- ⚠️ **Para produção**: Use backend para API calls

## 📊 Analytics

O projeto inclui tracking de eventos para:

- Cliques nos CTAs
- Envio de formulários
- Scroll depth
- Newsletter signup

Configure Google Analytics ou Facebook Pixel no `config.js`.

## 🚀 Deploy

### Netlify/Vercel (Recomendado):

1. Conecte seu repositório GitHub
2. Configure as variáveis de ambiente:
   - `BREVO_API_KEY`
   - `BREVO_NEWSLETTER_LIST_ID`
3. Deploy automático

### Servidor tradicional:

1. Upload dos arquivos via FTP
2. Configure `env-loader.js` no servidor
3. Teste os formulários

## 📞 Suporte

Para questões técnicas:

- 📧 Email: contato.agencia@intelligentdevsolutions.com
- 📱 WhatsApp: (11) 96637-3319

## 📄 Licença

Este projeto é proprietário da Tenorio AI Solutions.

---

🎉 **Landing page pronta para gerar leads!**
