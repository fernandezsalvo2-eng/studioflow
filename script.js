// ============================================================
// STUDIOFLOW — MOTORE DEL SITO
// Normalmente NON serve modificare questo file.
// Per cambiare testi, servizi, portfolio e contatti usa config.js.
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  const c = SITE_CONFIG;

  document.title = c.pageTitle;
  document.querySelectorAll('[data-config="brandName"]').forEach(e => e.textContent = c.brandName);
  document.querySelectorAll('[data-config="eyebrow"]').forEach(e => e.textContent = c.eyebrow);
  document.querySelector('[data-config="heroTitle"]').childNodes[0].textContent = c.heroTitle + " ";
  document.querySelector('[data-config="heroAccent"]').textContent = c.heroAccent;
  document.querySelector('[data-config="heroText"]').textContent = c.heroText;
  document.querySelector('[data-config="cta"]').textContent = c.cta;
  document.querySelector('[data-config="portfolioLink"]').textContent = c.portfolioLink;

  // Servizi
  const services = document.querySelector("#services-container");
  services.innerHTML = c.services.map(s => `
    <div class="service-card reveal">
      <div class="icon">${s.icon}</div>
      <h3>${s.title}</h3>
      <p>${s.text}</p>
    </div>
  `).join("");

  // Portfolio heading
  document.querySelector('[data-config="portfolioEyebrow"]').textContent = c.portfolioEyebrow;
  const pTitle = document.querySelector('[data-config="portfolioTitle"]');
  pTitle.childNodes[0].textContent = c.portfolioTitle + " ";
  pTitle.querySelector("span").textContent = c.portfolioAccent;
  document.querySelector('[data-config="portfolioText"]').textContent = c.portfolioText;

  // Portfolio cards
  const portfolio = document.querySelector("#portfolio-container");
  portfolio.innerHTML = c.portfolio.map((p, i) => `
    <article class="work ${i === 0 ? "work-large" : ""} reveal">
      <div class="work-art ${p.type}"></div>
      <div class="work-info"><small>${p.category}</small><b>${p.title}</b></div>
      <button class="play-btn" data-project="${p.title}">▶</button>
    </article>
  `).join("");

  // About
  const aboutTitle = document.querySelector('[data-config="aboutTitle"]');
  aboutTitle.childNodes[0].textContent = c.aboutTitle + " ";
  aboutTitle.querySelector("span").textContent = c.aboutAccent;
  document.querySelector('[data-config="aboutText"]').textContent = c.aboutText;

  // Contact
  document.querySelector('[data-config="contactEyebrow"]').textContent = c.contactEyebrow;
  const contactTitle = document.querySelector('[data-config="contactTitle"]');
  contactTitle.childNodes[0].textContent = c.contactTitle + " ";
  contactTitle.querySelector("span").textContent = c.contactAccent;
  // The original markup has only one span, so append ending safely.
  contactTitle.querySelector("span").insertAdjacentText("afterend", " " + c.contactTitleEnd);
  document.querySelector('[data-config="contactText"]').textContent = c.contactText;

  const wa = document.querySelector("#whatsapp-link");
  wa.href = `https://wa.me/${c.whatsappNumber}?text=${encodeURIComponent(c.whatsappMessage)}`;

  const email = document.querySelector("#email-link");
  email.href = `mailto:${c.email}?subject=${encodeURIComponent(c.emailSubject)}`;

  document.querySelector('[data-config="footerLine"]').textContent = c.footerLine;
  document.querySelector("#year").textContent = new Date().getFullYear();

  // Menu
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  menuToggle?.addEventListener("click", () => {
    const open = nav.classList.toggle("mobile");
    menuToggle.setAttribute("aria-expanded", open);
  });
  document.querySelectorAll(".nav a").forEach(link => {
    link.addEventListener("click", () => nav.classList.remove("mobile"));
  });

  // Animazioni
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  // Portfolio modal
  const modal = document.querySelector("#projectModal");
  const modalTitle = document.querySelector("#modalTitle");
  document.querySelectorAll(".play-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      modalTitle.textContent = btn.dataset.project;
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
    });
  });
  document.querySelector(".modal-close").addEventListener("click", closeModal);
  modal.addEventListener("click", e => {
    if (e.target === modal) closeModal();
  });
  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  }

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // Glow del mouse
  const cursorGlow = document.querySelector(".cursor-glow");
  window.addEventListener("pointermove", e => {
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
  });
});
