document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("header");
  let lastScrollY = 0;

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
    lastScrollY = currentScrollY;
  };

  window.addEventListener("scroll", handleScroll, { passive: true });

  // Mobile Navigation
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav__link");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("active");
      navMenu.classList.toggle("active");
      document.body.style.overflow = navMenu.classList.contains("active")
        ? "hidden"
        : "";
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navToggle.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.style.overflow = "";
      });
    });
  }

  // Scroll Reveal Animation
  const revealElements = () => {
    const elements = document.querySelectorAll(
      ".immersion__text, .immersion__image, " +
        ".features__header, .feature-card, " +
        ".specs__header, .specs__grid, " +
        ".pricing__card, " +
        ".cta__title, .cta__description, .cta__link",
    );

    elements.forEach((el, index) => {
      if (!el.classList.contains("reveal")) {
        el.classList.add("reveal");
        const delayClass = "reveal-delay-" + ((index % 5) + 1);
        el.classList.add(delayClass);
      }
    });
  };

  revealElements();

  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".reveal").forEach((el) => {
    revealObserver.observe(el);
  });

  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href");
      if (targetId === "#") return;
      e.preventDefault();
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = header.offsetHeight;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.scrollY -
          headerHeight -
          20;
        window.scrollTo({ top: targetPosition, behavior: "smooth" });
      }
    });
  });

  // Parallax on Hero Image
  const heroImg = document.getElementById("hero-img");
  if (heroImg) {
    window.addEventListener(
      "scroll",
      () => {
        const scrolled = window.scrollY;
        const heroSection = document.getElementById("hero");
        const heroHeight = heroSection ? heroSection.offsetHeight : 800;
        if (scrolled < heroHeight) {
          const parallaxOffset = scrolled * 0.15;
          heroImg.style.transform = "translateY(" + parallaxOffset + "px)";
        }
      },
      { passive: true },
    );
  }

  // Feature Cards Tilt Effect
  const featureCards = document.querySelectorAll(".feature-card");
  featureCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -3;
      const rotateY = ((x - centerX) / centerX) * 3;
      card.style.transform =
        "perspective(1000px) rotateX(" +
        rotateX +
        "deg) rotateY(" +
        rotateY +
        "deg) translateY(-4px)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
    });
  });

  // Pricing Glow Follow Mouse
  const pricingCard = document.querySelector(".pricing__card");
  const pricingGlow = document.querySelector(".pricing__glow");
  if (pricingCard && pricingGlow) {
    pricingCard.addEventListener("mousemove", (e) => {
      const rect = pricingCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      pricingGlow.style.left = x + "px";
      pricingGlow.style.top = y + "px";
      pricingGlow.style.transform = "translate(-50%, -50%)";
      pricingGlow.style.opacity = "1";
    });
    pricingCard.addEventListener("mouseleave", () => {
      pricingGlow.style.left = "50%";
      pricingGlow.style.top = "-100px";
      pricingGlow.style.transform = "translateX(-50%)";
      pricingGlow.style.opacity = "0.5";
    });
  }

  // Active Nav on Scroll
  const sections = document.querySelectorAll("section[id]");
  const highlightNav = () => {
    const scrollY = window.scrollY;
    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute("id");
      const navLink = document.querySelector(
        '.nav__link[href="#' + sectionId + '"]',
      );
      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.style.color = "var(--accent-primary)";
        } else {
          navLink.style.color = "";
        }
      }
    });
  };
  window.addEventListener("scroll", highlightNav, { passive: true });

  // ====== MODAL ======
  const modal = document.getElementById("modal-form");
  const openBtn = document.getElementById("pricing-buy-btn");
  const closeBtn = document.getElementById("modal-close");

  // Abrir modal ao clicar no botão
  openBtn.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "flex";
  });

  // Fechar ao clicar no X
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Fechar ao clicar fora da caixa
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // Fechar com ESC
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "flex") {
      modal.style.display = "none";
    }
  });

  console.log(
    "%c Aura Sonic — Sonic Zenith",
    "color: #4dc9f6; font-size: 18px; font-weight: bold;",
  );
});
