// Configurações para integração com Brevo e outros serviços
// IMPORTANTE: Este é um arquivo de exemplo.
// Em produção, mantenha as credenciais em variáveis de ambiente (.env)

const CONFIG = {
  // Credenciais do Brevo (carregadas do .env ou variáveis de ambiente)
  brevo: {
    apiKey:
      window.BREVO_API_KEY ||
      "xkeysib-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-xxxxxxxx",
    senderEmail:
      window.BREVO_SENDER_EMAIL ||
      "contato.agencia@intelligentdevsolutions.com",
    senderName: window.BREVO_SENDER_NAME || "Tenorio AI Solutions",
    newsletterListId: window.BREVO_NEWSLETTER_LIST_ID || 1,
  },

  // Configurações de contato
  contact: {
    toEmail: "contato.agencia@intelligentdevsolutions.com",
    fromEmail: "noreply@tenorioai.com",
  },

  // Configurações SMTP
  smtp: {
    host: "smtp-relay.brevo.com",
    port: 587,
    user: "contato.agencia@intelligentdevsolutions.com",
    password: "sua_senha_smtp_aqui",
  },

  // URLs da aplicação
  app: {
    url: "https://tenorioai.com",
    name: "Tenorio AI Solutions",
  },

  // Analytics (opcional)
  analytics: {
    googleAnalyticsId: "G-XXXXXXXXXX",
    facebookPixelId: "1234567890123456",
  },
};

// Exemplo de função para integrar com Brevo API
async function subscribeToNewsletter(email) {
  try {
    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-key": CONFIG.brevo.apiKey,
      },
      body: JSON.stringify({
        email: email,
        listIds: [CONFIG.brevo.newsletterListId],
        attributes: {
          FNAME: "", // Nome se disponível
          LNAME: "", // Sobrenome se disponível
        },
      }),
    });

    if (response.ok) {
      return { success: true, message: "Email inscrito com sucesso!" };
    } else {
      throw new Error("Erro na inscrição");
    }
  } catch (error) {
    console.error("Erro ao inscrever email:", error);
    return {
      success: false,
      message: "Erro ao inscrever email. Tente novamente.",
    };
  }
}

// Exemplo de função para enviar email de contato
async function sendContactEmail(formData) {
  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-key": CONFIG.brevo.apiKey,
      },
      body: JSON.stringify({
        sender: {
          name: CONFIG.brevo.senderName,
          email: CONFIG.brevo.senderEmail,
        },
        to: [
          {
            email: CONFIG.contact.toEmail,
            name: "Tenorio AI Solutions",
          },
        ],
        subject: `Novo contato do site - ${formData.tipoNegocio}`,
        htmlContent: `
          <h2>Novo contato do site</h2>
          <p><strong>Nome:</strong> ${formData.nome}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>WhatsApp:</strong> ${formData.whatsapp}</p>
          <p><strong>Tipo de Negócio:</strong> ${formData.tipoNegocio}</p>
          <p><strong>Data:</strong> ${new Date().toLocaleString("pt-BR")}</p>
        `,
      }),
    });

    if (response.ok) {
      return { success: true, message: "Mensagem enviada com sucesso!" };
    } else {
      throw new Error("Erro no envio");
    }
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    return {
      success: false,
      message: "Erro ao enviar mensagem. Tente novamente.",
    };
  }
}

// Exportar configurações e funções (se usando módulos)
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    CONFIG,
    subscribeToNewsletter,
    sendContactEmail,
  };
}
