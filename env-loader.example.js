// env-loader.example.js
// ARQUIVO DE EXEMPLO - Copie para env-loader.js e configure suas credenciais
// IMPORTANTE: O arquivo env-loader.js está no .gitignore e não será enviado ao repositório

// ⚠️  SUBSTITUA pelas suas credenciais reais do Brevo:
window.BREVO_API_KEY = "xkeysib-SUA_API_KEY_REAL_AQUI";
window.BREVO_SENDER_EMAIL = "contato.agencia@intelligentdevsolutions.com";
window.BREVO_SENDER_NAME = "Tenorio AI Solutions";
window.BREVO_NEWSLETTER_LIST_ID = 1; // Substitua pelo ID real da sua lista
window.CONTACT_TO_EMAIL = "contato.agencia@intelligentdevsolutions.com";

// 📋 COMO CONFIGURAR:
// 1. Copie este arquivo para env-loader.js
// 2. Obtenha sua API Key no Brevo (Account → SMTP & API → API Keys)
// 3. Substitua "SUA_API_KEY_REAL_AQUI" pela sua API Key real
// 4. Configure o ID da lista de newsletter no Brevo
// 5. Teste o formulário na sua página

// 🔒 SEGURANÇA:
// - NUNCA faça commit do arquivo env-loader.js com credenciais reais
// - Em produção, use variáveis de ambiente do servidor
// - Este método é apenas para desenvolvimento local

console.log("⚠️  Configure suas credenciais reais no env-loader.js");
