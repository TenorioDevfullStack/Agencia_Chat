// api/contact.js - Vercel Serverless Function
export default async function handler(req, res) {
  // Verificar método
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { nome, email, whatsapp, tipoNegocio } = req.body;

    // Validação básica
    if (!nome || !email || !whatsapp || !tipoNegocio) {
      return res.status(400).json({
        success: false,
        message: "Todos os campos são obrigatórios",
      });
    }

    // Enviar via Brevo API
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: {
          name: process.env.BREVO_SENDER_NAME || "Tenorio AI Solutions",
          email:
            process.env.BREVO_SENDER_EMAIL ||
            "contato.agencia@intelligentdevsolutions.com",
        },
        to: [
          {
            email:
              process.env.CONTACT_TO_EMAIL ||
              "contato.agencia@intelligentdevsolutions.com",
            name: "Tenorio AI Solutions",
          },
        ],
        subject: `Novo contato do site - ${tipoNegocio}`,
        htmlContent: `
          <h2>🚀 Novo Lead do Site!</h2>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; font-family: Arial, sans-serif;">
            <p><strong>📋 Dados do Lead:</strong></p>
            <ul style="list-style: none; padding: 0;">
              <li><strong>👤 Nome:</strong> ${nome}</li>
              <li><strong>📧 Email:</strong> ${email}</li>
              <li><strong>📱 WhatsApp:</strong> ${whatsapp}</li>
              <li><strong>🏢 Tipo de Negócio:</strong> ${tipoNegocio}</li>
              <li><strong>🕐 Data:</strong> ${new Date().toLocaleString(
                "pt-BR"
              )}</li>
            </ul>
            <hr style="margin: 20px 0;">
            <p><em>📈 Lead gerado pela landing page Tenorio AI Solutions</em></p>
          </div>
        `,
      }),
    });

    if (response.ok) {
      res.status(200).json({
        success: true,
        message: "Contato enviado com sucesso!",
      });
    } else {
      throw new Error("Erro na API do Brevo");
    }
  } catch (error) {
    console.error("Erro no envio:", error);
    res.status(500).json({
      success: false,
      message: "Erro interno do servidor",
    });
  }
}
