/**
 * KIFY HOSPITAL - CORE SCRIPTING & CONFIGURATION
 * Vanilla JavaScript (No heavy framework dependencies, fully compatible with GitHub Pages)
 */

// 1. VERIFIED SITE CONFIGURATION
const SITE_CONFIG = {
  hospitalName: "Kify Hospital",
  tagline: "Your Health. Our Responsibility.",
  primaryPhoneDisplay: "85000 23456",
  primaryPhoneLink: "+918500023456",
  dentalPhoneDisplay: "8500 345 678",
  dentalPhoneLink: "+918500345678",
  email: "kify@kifyhospital.com",

  address: {
    line1: "Near Nune Ganuga",
    line2: "Danavaipeta",
    city: "Rajahmundry",
    postalCode: "533103",
    state: "Andhra Pradesh",
    country: "India"
  },

  doctorImage: {
    primary: "https://drive.google.com/uc?export=view&id=1Etljs67DlMKpj_f5QGeG_bO6nal_SuiI",
    fallback: "https://drive.google.com/thumbnail?id=1Etljs67DlMKpj_f5QGeG_bO6nal_SuiI&sz=w1600"
  },

  logoImage: {
    primary: "https://drive.google.com/uc?export=view&id=1yU5iigx4YXyVDHaWjerKksEokldjdhNp",
    fallback: "https://drive.google.com/thumbnail?id=1yU5iigx4YXyVDHaWjerKksEokldjdhNp&sz=w1600"
  },

  whatsappNumber: "918500023456",
  googleMapsUrl: "https://maps.app.goo.gl/doxc8uL46F49zQxG9",
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3815.1102919106093!2d81.78248557597143!3d17.018318112635955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a37a3de4c7c8c3b%3A0xe104332d78dfcb7b!2sKIFY%20HOSPITAL!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin",
  googleReviewsUrl: "https://g.page/KifyHospital",
  facebookUrl: "https://www.facebook.com/kifyhospital",
  youtubeUrl: "https://www.youtube.com/@kifyhospital",
  instagramUrl: "https://www.instagram.com/kifyhospital",
  canonicalSiteUrl: "https://suryateja.github.io/KIFY"
};

// 2. DYNAMIC CONTENT INJECTION
function injectConfigData() {
  // Injects values like phone numbers, emails, addresses into marked elements to ensure single-source-of-truth updates.
  document.querySelectorAll("[data-config-phone]").forEach(el => {
    const textTarget = el.querySelector("[data-phone-text]");
    if (textTarget) {
      textTarget.textContent = SITE_CONFIG.primaryPhoneDisplay;
    } else if (el.childElementCount === 0) {
      el.textContent = SITE_CONFIG.primaryPhoneDisplay;
    }
    if (el.tagName === "A") el.href = `tel:${SITE_CONFIG.primaryPhoneLink}`;
  });

  document.querySelectorAll("[data-config-dental-phone]").forEach(el => {
    const textTarget = el.querySelector("[data-phone-text]");
    if (textTarget) {
      textTarget.textContent = SITE_CONFIG.dentalPhoneDisplay;
    } else if (el.childElementCount === 0) {
      el.textContent = SITE_CONFIG.dentalPhoneDisplay;
    }
    if (el.tagName === "A") el.href = `tel:${SITE_CONFIG.dentalPhoneLink}`;
  });

  document.querySelectorAll("[data-config-email]").forEach(el => {
    const textTarget = el.querySelector("[data-email-text]");
    if (textTarget) {
      textTarget.textContent = SITE_CONFIG.email;
    } else if (el.childElementCount === 0) {
      el.textContent = SITE_CONFIG.email;
    }
    if (el.tagName === "A") el.href = `mailto:${SITE_CONFIG.email}`;
  });

  document.querySelectorAll("[data-config-address]").forEach(el => {
    if (el.childElementCount === 0) {
      el.textContent = `${SITE_CONFIG.address.line1}, ${SITE_CONFIG.address.line2}, ${SITE_CONFIG.address.city}`;
    }
  });

  document.querySelectorAll("[data-config-maps-link]").forEach(el => {
    if (el.tagName === "A") el.href = SITE_CONFIG.googleMapsUrl;
  });

  // Inject current year in footer copyright
  const footerYear = document.getElementById("footer-year");
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }
}

// 3. RESILIENT IMAGE LOADING WITH GOOGLE DRIVE FALLBACKS
function initResilientImages() {
  // Handles logos
  const logos = document.querySelectorAll(".dynamic-logo");
  logos.forEach(logo => {
    loadResilientImage(logo, SITE_CONFIG.logoImage.primary, SITE_CONFIG.logoImage.fallback, "assets/icons/favicon.svg");
  });

  // Handles Dr. Subrahmanyam's images
  const docImages = document.querySelectorAll(".dynamic-doctor-image");
  docImages.forEach(img => {
    loadResilientImage(img, SITE_CONFIG.doctorImage.primary, SITE_CONFIG.doctorImage.fallback, "assets/images/doctor-fallback.svg");
  });
}

function loadResilientImage(imgElement, primaryUrl, fallbackUrl, localAssetPath) {
  let attempt = 1;

  imgElement.onload = () => {
    // Loaded successfully
  };

  imgElement.onerror = () => {
    if (attempt === 1) {
      // Primary failed, try Drive thumbnail fallback
      attempt = 2;
      imgElement.src = fallbackUrl;
    } else if (attempt === 2) {
      // Drive thumbnail failed, load the local SVG mockup
      attempt = 3;
      // Adjust path for blog sub-directory if necessary
      const isBlogSubDir = window.location.pathname.includes("/blog/");
      const prefix = isBlogSubDir ? "../" : "";
      imgElement.src = prefix + localAssetPath;
    } else {
      // All failed, hide breaking indicator
      imgElement.style.display = "none";
    }
  };

  // Trigger load
  imgElement.src = primaryUrl;
}

// 4. SCROLL UTILITIES & HEADER TRANSITIONS
function initScrollHandler() {
  const header = document.querySelector(".main-header");
  const backToTopBtn = document.querySelector(".back-to-top");
  
  if (!header && !backToTopBtn) return;

  window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY;

    if (header) {
      if (scrollPos > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }

    if (backToTopBtn) {
      if (scrollPos > 400) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}

// 5. ANIMATIONS SYSTEM (Intersection Observer)
function initRevealAnimations() {
  const revealElements = document.querySelectorAll(".reveal, .reveal-left, .reveal-scale");
  if (revealElements.length === 0) return;

  // Respect user preference for reduced motion
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) {
    revealElements.forEach(el => el.classList.add("active"));
    return;
  }

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target); // Trigger only once
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
  });

  revealElements.forEach(el => revealObserver.observe(el));
}

// 6. ACCESSIBLE NAVIGATION DRAWER (Mobile Hamburger Menu)
function initMobileNavigation() {
  const toggleBtn = document.getElementById("mobile-menu-toggle");
  const navDrawer = document.getElementById("mobile-nav-drawer");
  const backdrop = document.getElementById("mobile-nav-backdrop");
  
  if (!toggleBtn || !navDrawer || !backdrop) return;

  const closeMenu = () => {
    toggleBtn.setAttribute("aria-expanded", "false");
    navDrawer.classList.remove("open");
    backdrop.classList.remove("open");
    document.body.style.overflow = "";
    toggleBtn.focus();
  };

  const openMenu = () => {
    toggleBtn.setAttribute("aria-expanded", "true");
    navDrawer.classList.add("open");
    backdrop.classList.add("open");
    document.body.style.overflow = "hidden"; // lock page scroll
    
    // Focus first link in drawer
    const firstLink = navDrawer.querySelector("a");
    if (firstLink) setTimeout(() => firstLink.focus(), 100);
  };

  toggleBtn.addEventListener("click", () => {
    const isOpen = toggleBtn.getAttribute("aria-expanded") === "true";
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  backdrop.addEventListener("click", closeMenu);

  // Close when navigating via drawer links
  navDrawer.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => closeMenu());
  });

  // Close on ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navDrawer.classList.contains("open")) {
      closeMenu();
    }
  });

  // Focus trap in mobile menu
  navDrawer.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      const focusables = navDrawer.querySelectorAll("a, button");
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        last.focus();
        e.preventDefault();
      } else if (!e.shiftKey && document.activeElement === last) {
        first.focus();
        e.preventDefault();
      }
    }
  });
}

// 7. DYNAMIC ACCORDION (For FAQ & Doctor Page Credentials)
function initAccordions() {
  const headers = document.querySelectorAll(".accordion-header");
  headers.forEach(header => {
    header.addEventListener("click", () => {
      const item = header.parentElement;
      const isActive = item.classList.contains("active");

      // Close other accordions in the same group (optional, we allow multi-expand for better readability)
      const siblingItems = item.parentElement.querySelectorAll(".accordion-item");
      siblingItems.forEach(sib => {
        if (sib !== item) {
          sib.classList.remove("active");
          const sibContent = sib.querySelector(".accordion-content");
          if (sibContent) sibContent.style.maxHeight = null;
        }
      });

      // Toggle current
      item.classList.toggle("active");
      const content = item.querySelector(".accordion-content");
      
      if (item.classList.contains("active")) {
        content.style.maxHeight = content.scrollHeight + "px";
        header.setAttribute("aria-expanded", "true");
      } else {
        content.style.maxHeight = null;
        header.setAttribute("aria-expanded", "false");
      }
    });
  });
}

// 8. GLOBAL APPOINTMENT DIALOG MODAL WITH FOCUS TRAP & WHATSAPP
let lastActiveElement = null; // Store trigger for accessibility restore focus

function initAppointmentModal() {
  const modal = document.getElementById("appointment-modal");
  const modalBackdrop = document.getElementById("modal-backdrop-el");
  const closeBtn = document.getElementById("modal-close-btn");
  const form = document.getElementById("modal-appointment-form");
  const triggers = document.querySelectorAll("[data-open-modal]");

  if (!modal || !modalBackdrop || !closeBtn) return;

  const openModal = (triggerEl) => {
    lastActiveElement = triggerEl;
    modalBackdrop.classList.add("open");
    document.body.style.overflow = "hidden";
    
    // Auto-select department if trigger contains data-department
    const dept = triggerEl.getAttribute("data-department");
    if (dept) {
      const deptSelect = document.getElementById("modal-dept");
      if (deptSelect) deptSelect.value = dept;
    }

    modal.focus();
  };

  const closeModal = () => {
    modalBackdrop.classList.remove("open");
    document.body.style.overflow = "";
    if (lastActiveElement) lastActiveElement.focus();
  };

  triggers.forEach(trigger => {
    trigger.addEventListener("click", () => openModal(trigger));
  });

  closeBtn.addEventListener("click", closeModal);
  modalBackdrop.addEventListener("click", (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalBackdrop.classList.contains("open")) {
      closeModal();
    }
  });

  // Focus trap inside Modal
  modal.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      const focusables = modal.querySelectorAll("input, select, textarea, button");
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        last.focus();
        e.preventDefault();
      } else if (!e.shiftKey && document.activeElement === last) {
        first.focus();
        e.preventDefault();
      }
    }
  });

  // WhatsApp Compiler Form Submissions (Static backend mockup)
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("modal-name").value.trim();
      const phone = document.getElementById("modal-phone").value.trim();
      const dept = document.getElementById("modal-dept").value;
      const date = document.getElementById("modal-date").value;
      const time = document.getElementById("modal-time").value;
      const msg = document.getElementById("modal-message").value.trim();

      if (!name || !phone || !dept || !date) {
        alert("Please fill in all required fields.");
        return;
      }

      // Build message block
      const whatsappText = `Hello Kify Hospital, I would like to request an appointment.

Name: ${name}
Phone: ${phone}
Department: ${dept}
Preferred Date: ${date}
Preferred Time: ${time || "Not specified"}
Message: ${msg || "No message"}`;

      const encodedText = encodeURIComponent(whatsappText);
      const url = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodedText}`;

      // Open in new tab safely
      window.open(url, "_blank", "noopener,noreferrer");
      
      // Cleanup & Close
      form.reset();
      closeModal();
    });
  }
}

// 9. CONTACT FORM REDIRECT TO WHATSAPP
function initContactForm() {
  const contactForm = document.getElementById("contact-appointment-form");
  if (!contactForm) return;

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("contact-name").value.trim();
    const phone = document.getElementById("contact-phone").value.trim();
    const email = document.getElementById("contact-email").value.trim();
    const dept = document.getElementById("contact-dept").value;
    const date = document.getElementById("contact-date").value;
    const time = document.getElementById("contact-time").value;
    const msg = document.getElementById("contact-message").value.trim();

    if (!name || !phone || !dept || !date) {
      alert("Please fill in all required fields.");
      return;
    }

    const whatsappText = `Hello Kify Hospital, I would like to request an appointment.

Name: ${name}
Phone: ${phone}
Email: ${email || "Not provided"}
Department: ${dept}
Preferred Date: ${date}
Preferred Time: ${time || "Not specified"}
Message: ${msg || "No message"}`;

    const encodedText = encodeURIComponent(whatsappText);
    const url = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodedText}`;

    window.open(url, "_blank", "noopener,noreferrer");
    contactForm.reset();
  });
}

// 10. ACCESSIBLE GALLERY LIGHTBOX
let currentGalleryItems = [];
let currentImageIndex = 0;

function initGalleryLightbox() {
  const galleryGrid = document.querySelector(".gallery-grid");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  
  if (!galleryGrid || !lightbox || !lightboxImg || !lightboxCaption) return;

  const items = Array.from(galleryGrid.querySelectorAll(".gallery-item"));
  currentGalleryItems = items;

  const openLightbox = (index) => {
    currentImageIndex = index;
    const targetItem = currentGalleryItems[currentImageIndex];
    const imgSrc = targetItem.getAttribute("data-large") || targetItem.querySelector("img").src;
    const imgCaption = targetItem.querySelector(".gallery-title").innerText;

    lightboxImg.src = imgSrc;
    lightboxCaption.innerText = imgCaption;
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";

    // Set focus to Close Button
    const closeBtn = lightbox.querySelector(".lightbox-close");
    if (closeBtn) closeBtn.focus();
  };

  const closeLightbox = () => {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
    // Restore focus to item clicked
    const currentItem = currentGalleryItems[currentImageIndex];
    if (currentItem) currentItem.focus();
  };

  const showNext = () => {
    currentImageIndex = (currentImageIndex + 1) % currentGalleryItems.length;
    openLightbox(currentImageIndex);
  };

  const showPrev = () => {
    currentImageIndex = (currentImageIndex - 1 + currentGalleryItems.length) % currentGalleryItems.length;
    openLightbox(currentImageIndex);
  };

  items.forEach((item, index) => {
    item.addEventListener("click", () => openLightbox(index));
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(index);
      }
    });
  });

  // Bind navigation
  const closeBtn = lightbox.querySelector(".lightbox-close");
  const prevBtn = lightbox.querySelector(".lightbox-prev");
  const nextBtn = lightbox.querySelector(".lightbox-next");

  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
  if (prevBtn) prevBtn.addEventListener("click", showPrev);
  if (nextBtn) nextBtn.addEventListener("click", showNext);

  // Close on Backdrop click
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox || e.target.classList.contains("lightbox-content-wrapper")) {
      closeLightbox();
    }
  });

  // Keyboard support inside lightbox
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("open")) return;
    
    if (e.key === "Escape") {
      closeLightbox();
    } else if (e.key === "ArrowRight") {
      showNext();
    } else if (e.key === "ArrowLeft") {
      showPrev();
    } else if (e.key === "Tab") {
      const focusables = lightbox.querySelectorAll("button");
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        last.focus();
        e.preventDefault();
      } else if (!e.shiftKey && document.activeElement === last) {
        first.focus();
        e.preventDefault();
      }
    }
  });
}

// 11. GENERAL SEARCH & TAB FILTERS (Services, Gallery, Testimonials)
function initTabFilters() {
  const tabs = document.querySelectorAll(".filter-tab[data-filter]");
  if (tabs.length === 0) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const filterTokens = new WeakMap();

  const applyFilter = (grid, targetCategory) => {
    const items = grid.querySelectorAll("[data-category]");
    const token = (filterTokens.get(grid) || 0) + 1;
    filterTokens.set(grid, token);

    items.forEach((item, index) => {
      const itemCategories = (item.getAttribute("data-category") || "").split(" ");
      const matches = targetCategory === "all" || itemCategories.includes(targetCategory);

      item.classList.add("filter-item");

      if (matches) {
        item.classList.remove("is-hidden");
        if (prefersReduced) {
          item.classList.remove("is-hiding");
          item.style.display = "";
          return;
        }
        item.classList.add("is-hiding");
        item.style.display = "";
        requestAnimationFrame(() => {
          setTimeout(() => {
            if (filterTokens.get(grid) !== token) return;
            item.classList.remove("is-hiding");
          }, Math.min(index * 35, 280));
        });
      } else {
        if (prefersReduced) {
          item.style.display = "none";
          item.classList.add("is-hidden");
          return;
        }
        item.classList.add("is-hiding");
        setTimeout(() => {
          if (filterTokens.get(grid) !== token) return;
          if (item.classList.contains("is-hiding")) {
            item.classList.add("is-hidden");
            item.style.display = "none";
          }
        }, 220);
      }
    });

    // Update current gallery items list if filtering gallery page
    if (grid.id === "gallery-items-grid") {
      currentGalleryItems = Array.from(grid.querySelectorAll(".gallery-item")).filter(el => {
        return el.style.display !== "none" && !el.classList.contains("is-hidden");
      });
    }
  };

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const targetCategory = tab.getAttribute("data-filter");
      const siblings = tab.parentElement.querySelectorAll(".filter-tab[data-filter]");
      siblings.forEach(s => {
        s.classList.remove("active");
        s.setAttribute("aria-selected", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");

      // Smooth scroll active tab into view on mobile
      tab.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", inline: "center", block: "nearest" });

      const gridId = tab.parentElement.getAttribute("data-filter-grid");
      const grid = document.getElementById(gridId);
      if (!grid) return;

      applyFilter(grid, targetCategory);
    });
  });

  // Ensure tabs are keyboard accessible role
  document.querySelectorAll(".filter-tabs[data-filter-grid]").forEach(nav => {
    nav.setAttribute("role", "tablist");
    nav.querySelectorAll(".filter-tab[data-filter]").forEach(tab => {
      tab.setAttribute("role", "tab");
      tab.setAttribute("aria-selected", tab.classList.contains("active") ? "true" : "false");
    });
  });
}

// Services search bar logic
function initServicesSearch() {
  const searchInput = document.getElementById("services-search");
  const servicesGrid = document.getElementById("services-directory-grid");
  if (!searchInput || !servicesGrid) return;

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();
    const cards = servicesGrid.querySelectorAll(".service-card");

    cards.forEach(card => {
      const title = card.querySelector(".service-card-title").innerText.toLowerCase();
      const desc = card.querySelector(".service-card-desc").innerText.toLowerCase();

      if (title.includes(query) || desc.includes(query)) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  });
}

// Blog search & filter logic (Includes Language selector)
function initBlogFilters() {
  const searchInput = document.getElementById("blog-search");
  const langTabs = document.querySelectorAll("[data-blog-lang]");
  const catTabs = document.querySelectorAll("[data-blog-cat]");
  const blogGrid = document.getElementById("blog-list-grid");

  if (!blogGrid) return;

  let activeLang = "all";
  let activeCat = "all";
  let activeSearch = "";

  const applyBlogFilters = () => {
    const cards = blogGrid.querySelectorAll(".blog-card");
    let visibleCount = 0;

    cards.forEach(card => {
      const lang = card.getAttribute("data-lang");
      const cat = card.getAttribute("data-category");
      const title = card.querySelector(".blog-card-title").innerText.toLowerCase();
      const excerpt = card.querySelector(".blog-card-excerpt").innerText.toLowerCase();

      const matchesLang = (activeLang === "all" || lang === activeLang);
      const matchesCat = (activeCat === "all" || cat === activeCat);
      const matchesSearch = (activeSearch === "" || title.includes(activeSearch) || excerpt.includes(activeSearch));

      if (matchesLang && matchesCat && matchesSearch) {
        card.style.display = "";
        visibleCount++;
      } else {
        card.style.display = "none";
      }
    });

    // Handle Empty State
    const emptyState = document.getElementById("blog-empty-state");
    if (emptyState) {
      emptyState.style.display = visibleCount === 0 ? "block" : "none";
    }
  };

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      activeSearch = e.target.value.toLowerCase().trim();
      applyBlogFilters();
    });
  }

  if (langTabs) {
    langTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        langTabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        activeLang = tab.getAttribute("data-blog-lang");
        applyBlogFilters();
      });
    });
  }

  if (catTabs) {
    catTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        catTabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        activeCat = tab.getAttribute("data-blog-cat");
        applyBlogFilters();
      });
    });
  }
}

// 12. INITIALIZATION ON DOM CONTENT LOADED
document.addEventListener("DOMContentLoaded", () => {
  injectConfigData();
  initResilientImages();
  initScrollHandler();
  initRevealAnimations();
  initMobileNavigation();
  initAccordions();
  initAppointmentModal();
  initContactForm();
  initGalleryLightbox();
  initTabFilters();
  initServicesSearch();
  initBlogFilters();
});
