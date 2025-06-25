// api/newsletter.js - Vercel Serverless Function
export default async function handler(req, res) {
  // Verificar método
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { email } = req.body;

    // Validação básica
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email é obrigatório",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Email inválido",
      });
    }

    // Adicionar à lista do Brevo
    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        email: email,
        listIds: [parseInt(process.env.BREVO_NEWSLETTER_LIST_ID) || 1],
        attributes: {
          NOME: "",
          ORIGEM: "Landing Page Footer",
        },
      }),
    });

    if (response.ok || response.status === 400) {
      // Status 400 pode ser "contato já existe", que é OK
      res.status(200).json({
        success: true,
        message: "Email inscrito com sucesso!",
      });
    } else {
      throw new Error("Erro na API do Brevo");
    }
  } catch (error) {
    console.error("Erro na newsletter:", error);
    res.status(500).json({
      success: false,
      message: "Erro interno do servidor",
    });
  }
}
