// script-vercel.js - Versão otimizada para Vercel com API Routes seguras
// Substitua script.js por este arquivo na Vercel

// Navegação Mobile
document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");
      navToggle.classList.toggle("active");
    });

    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        navToggle.classList.remove("active");
      });
    });
  }

  // Smooth scroll para âncoras
  const anchors = document.querySelectorAll('a[href^="#"]');
  anchors.forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // FAQ Accordion
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Fechar todos os outros itens
      faqItems.forEach((otherItem) => {
        otherItem.classList.remove("active");
      });

      // Abrir o item clicado se não estava ativo
      if (!isActive) {
        item.classList.add("active");
      }
    });
  });

  // Formulário de Contato - VERSÃO VERCEL COM API ROUTE
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      // Validação básica
      const nome = document.getElementById("nome").value.trim();
      const email = document.getElementById("email").value.trim();
      const tipoNegocio = document.getElementById("tipo-negocio").value;
      const whatsapp = document.getElementById("whatsapp").value.trim();

      // Verificar se todos os campos estão preenchidos
      if (!nome || !email || !tipoNegocio || !whatsapp) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
      }

      // Validação de email simples
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Por favor, insira um email válido.");
        return;
      }

      // Validação de WhatsApp (números e alguns caracteres especiais)
      const whatsappRegex = /^[\d\s\(\)\-\+]+$/;
      if (!whatsappRegex.test(whatsapp)) {
        alert("Por favor, insira um número de WhatsApp válido.");
        return;
      }

      // Envio via API Route da Vercel
      const submitButton = contactForm.querySelector(".cta-button");
      const originalText = submitButton.textContent;

      submitButton.textContent = "ENVIANDO...";
      submitButton.disabled = true;

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nome: nome,
            email: email,
            whatsapp: whatsapp,
            tipoNegocio: tipoNegocio,
          }),
        });

        const result = await response.json();

        if (result.success) {
          alert(
            "Obrigado! Entraremos em contato em breve para agendar seu diagnóstico gratuito."
          );
          contactForm.reset();
          trackEvent("contact_form_success", { nome, email, tipoNegocio });
        } else {
          alert(
            result.message ||
              "Houve um erro ao enviar sua mensagem. Tente novamente."
          );
          trackEvent("contact_form_error", { error: result.message });
        }
      } catch (error) {
        console.error("Erro no envio:", error);
        alert(
          "Houve um erro ao enviar sua mensagem. Tente novamente ou entre em contato diretamente."
        );
        trackEvent("contact_form_error", { error: error.message });
      } finally {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }
    });
  }

  // Newsletter Form - VERSÃO VERCEL COM API ROUTE
  const newsletterForm = document.getElementById("newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const email = document.getElementById("newsletter-email").value.trim();

      if (!email) {
        alert("Por favor, insira um email válido.");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Por favor, insira um email válido.");
        return;
      }

      const submitButton = newsletterForm.querySelector(".newsletter-btn");
      const originalHtml = submitButton.innerHTML;

      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
      submitButton.disabled = true;

      try {
        const response = await fetch("/api/newsletter", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email }),
        });

        const result = await response.json();

        if (result.success) {
          alert("Obrigado! Você foi inscrito em nossa newsletter.");
          newsletterForm.reset();
          trackEvent("newsletter_signup", { email: email });
        } else {
          alert(result.message || "Erro ao inscrever email. Tente novamente.");
          trackEvent("newsletter_error", { error: result.message });
        }
      } catch (error) {
        console.error("Erro na inscrição:", error);
        alert("Erro ao inscrever email. Tente novamente.");
        trackEvent("newsletter_error", { error: error.message });
      } finally {
        submitButton.innerHTML = originalHtml;
        submitButton.disabled = false;
      }
    });
  }

  // Restante do código permanece igual...
  // Animação de entrada para elementos ao scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Aplicar animação aos cards e seções
  const animatedElements = document.querySelectorAll(
    ".problem-card, .solution-item, .audience-card, .step"
  );

  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

  // Header scroll effect e botão voltar ao topo
  let lastScrollTop = 0;
  const header = document.querySelector(".header");
  const backToTopButton = document.getElementById("back-to-top");

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Header effect
    if (scrollTop > 100) {
      header.style.background = "rgba(255, 255, 255, 0.95)";
      header.style.backdropFilter = "blur(10px)";
    } else {
      header.style.background = "rgba(255, 255, 255, 1)";
      header.style.backdropFilter = "none";
    }

    // Botão voltar ao topo
    if (backToTopButton) {
      if (scrollTop > 300) {
        backToTopButton.classList.add("show");
      } else {
        backToTopButton.classList.remove("show");
      }
    }

    lastScrollTop = scrollTop;
  });

  // Funcionalidade do botão voltar ao topo
  if (backToTopButton) {
    backToTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      // Tracking do evento
      trackEvent("back_to_top_click");
    });
  }

  // Máscara para campo de telefone/WhatsApp
  const whatsappInput = document.getElementById("whatsapp");
  if (whatsappInput) {
    whatsappInput.addEventListener("input", function (e) {
      let value = e.target.value.replace(/\D/g, "");

      if (value.length >= 11) {
        value = value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
      } else if (value.length >= 7) {
        value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
      } else if (value.length >= 3) {
        value = value.replace(/(\d{2})(\d{0,5})/, "($1) $2");
      }

      e.target.value = value;
    });
  }

  // Modais
  const privacyLink = document.getElementById("privacy-link");
  const termsLink = document.getElementById("terms-link");
  const privacyModal = document.getElementById("privacy-modal");
  const termsModal = document.getElementById("terms-modal");
  const closeBtns = document.querySelectorAll(".close");

  // Abrir modais
  if (privacyLink) {
    privacyLink.addEventListener("click", function (e) {
      e.preventDefault();
      privacyModal.style.display = "block";
      document.body.style.overflow = "hidden";
      trackEvent("privacy_policy_view");
    });
  }

  if (termsLink) {
    termsLink.addEventListener("click", function (e) {
      e.preventDefault();
      termsModal.style.display = "block";
      document.body.style.overflow = "hidden";
      trackEvent("terms_of_use_view");
    });
  }

  // Fechar modais
  closeBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const modalId = this.getAttribute("data-modal");
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });
  });

  // Fechar modal clicando fora
  window.addEventListener("click", function (e) {
    if (e.target.classList.contains("modal")) {
      e.target.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  // Fechar modal com ESC
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      const modals = document.querySelectorAll(".modal");
      modals.forEach((modal) => {
        if (modal.style.display === "block") {
          modal.style.display = "none";
          document.body.style.overflow = "auto";
        }
      });
    }
  });

  // CSS para animação ripple
  const style = document.createElement("style");
  style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        .cta-button {
            position: relative;
            overflow: hidden;
        }
    `;
  document.head.appendChild(style);
});

// Função para tracking de eventos (Google Analytics, etc.)
function trackEvent(eventName, parameters = {}) {
  // Implementar tracking aqui
  console.log("Event tracked:", eventName, parameters);

  // Exemplo para Google Analytics 4
  if (typeof gtag !== "undefined") {
    gtag("event", eventName, parameters);
  }

  // Exemplo para Facebook Pixel
  if (typeof fbq !== "undefined") {
    fbq("track", eventName, parameters);
  }
}

// Aplicar tracking aos botões principais
document.addEventListener("DOMContentLoaded", function () {
  const ctaButtons = document.querySelectorAll(".cta-button");
  ctaButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      trackEvent("cta_click", {
        button_position: index + 1,
        button_text: button.textContent.trim(),
      });
    });
  });

  // Track scroll depth
  let maxScroll = 0;
  const milestones = [25, 50, 75, 100];

  window.addEventListener("scroll", () => {
    const scrollPercent = Math.round(
      (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
    );

    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent;

      milestones.forEach((milestone) => {
        if (scrollPercent >= milestone && maxScroll < milestone + 1) {
          trackEvent("scroll_depth", {
            percent: milestone,
          });
        }
      });
    }
  });
});
