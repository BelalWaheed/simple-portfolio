/* ═══════════════════════════════════════════════════
   PORTFOLIO JS — Belal Waheed
   ═══════════════════════════════════════════════════ */

document.addEventListener("DOMContentLoaded", () => {
  // ── Navbar Scroll Effect ──
  const navbar = document.getElementById("navbar");
  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  // ── Mobile Menu Toggle ──
  const mobileToggle = document.getElementById("mobile-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileIcon = mobileToggle.querySelector("i");

  mobileToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
    if (mobileMenu.classList.contains("hidden")) {
      mobileIcon.className = "ph ph-list";
    } else {
      mobileIcon.className = "ph ph-x";
    }
  });

  // Close mobile menu on link click
  document.querySelectorAll(".mobile-link").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      mobileIcon.className = "ph ph-list";
    });
  });

  // ── Scroll Reveal Animation ──
  const revealElements = document.querySelectorAll(".section-reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -60px 0px",
    },
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // ── Active Nav Link Highlighting ──
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  const activateNavLink = () => {
    const scrollY = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("text-primary-400");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("text-primary-400");
          }
        });
      }
    });
  };

  window.addEventListener("scroll", activateNavLink, { passive: true });

  // ── Cursor Glow Effect (Desktop) ──
  if (window.matchMedia("(pointer: fine)").matches) {
    const glow = document.createElement("div");
    glow.className = "cursor-glow";
    document.body.appendChild(glow);

    let mouseX = 0,
      mouseY = 0;
    let glowX = 0,
      glowY = 0;

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      glow.classList.add("visible");
    });

    document.addEventListener("mouseleave", () => {
      glow.classList.remove("visible");
    });

    const animateGlow = () => {
      glowX += (mouseX - glowX) * 0.15;
      glowY += (mouseY - glowY) * 0.15;
      glow.style.left = glowX + "px";
      glow.style.top = glowY + "px";
      requestAnimationFrame(animateGlow);
    };
    animateGlow();
  }

  // ── Staggered Skill Card Animation ──
  const skillCards = document.querySelectorAll(".skill-card");
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = parseInt(entry.target.dataset.delay) || 0;
          setTimeout(() => {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }, delay);
          skillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  skillCards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    skillObserver.observe(card);
  });

  // ── Typing Effect for Hero (Subtle) ──
  const tagline = document.querySelector("#hero p:last-of-type");
  if (tagline) {
    tagline.style.opacity = "0";
    setTimeout(() => {
      tagline.style.transition = "opacity 0.8s ease";
      tagline.style.opacity = "1";
    }, 800);
  }
});
