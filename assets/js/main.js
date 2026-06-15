/* ==========================================================================
   Nails Lindes — interactions
   Depends on config.js (window.NL_CONFIG) and i18n.js (window.NL).
   ========================================================================== */
(function () {
  "use strict";
  var CFG = window.NL_CONFIG || {};

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else { fn(); }
  }

  /* ---- Inject configurable values --------------------------------------- */
  function applyConfig() {
    // Booking links
    document.querySelectorAll("[data-book]").forEach(function (a) {
      if (CFG.bookingUrl) {
        a.setAttribute("href", CFG.bookingUrl);
        a.setAttribute("target", "_blank");
        a.setAttribute("rel", "noopener");
      }
    });

    // Contact details
    var map = {
      phone:     { val: CFG.phone,     href: CFG.phone ? "tel:" + CFG.phone.replace(/\s+/g, "") : null },
      email:     { val: CFG.email,     href: CFG.email ? "mailto:" + CFG.email : null },
      address:   { val: CFG.address,   href: null },
      instagram: { val: "@" + (CFG.instagram || "").split("/").filter(Boolean).pop(), href: CFG.instagram },
      whatsapp:  { val: "WhatsApp",    href: CFG.whatsapp }
    };
    document.querySelectorAll("[data-config]").forEach(function (el) {
      var key = el.getAttribute("data-config");
      var entry = map[key];
      if (!entry) return;
      // Only set text on leaf elements so icons / nested markup are preserved.
      if (entry.val && el.children.length === 0) el.textContent = entry.val;
      if (entry.href && el.tagName === "A") el.setAttribute("href", entry.href);
    });

    // Map embed
    var frame = document.querySelector("[data-map]");
    if (frame && CFG.mapEmbed) frame.setAttribute("src", CFG.mapEmbed);

    // Established year token
    document.querySelectorAll("[data-year-est]").forEach(function (el) {
      if (CFG.established) el.textContent = CFG.established;
    });
    // Current year
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  /* ---- Mobile navigation ------------------------------------------------ */
  function initNav() {
    var burger = document.querySelector(".burger");
    var nav = document.querySelector(".nav");
    if (!burger || !nav) return;

    var backdrop = document.createElement("div");
    backdrop.className = "nav-backdrop";
    document.body.appendChild(backdrop);

    function setOpen(open) {
      nav.classList.toggle("is-open", open);
      backdrop.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    }

    burger.addEventListener("click", function () {
      setOpen(burger.getAttribute("aria-expanded") !== "true");
    });
    backdrop.addEventListener("click", function () { setOpen(false); });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setOpen(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 940) setOpen(false);
    });
  }

  /* ---- Marquee: duplicate content for a seamless loop ------------------- */
  function initMarquee() {
    document.querySelectorAll(".marquee__track").forEach(function (track) {
      if (track.dataset.cloned) return;
      track.innerHTML += track.innerHTML; // duplicate once -> 50% translate loops seamlessly
      track.dataset.cloned = "1";
    });
  }

  /* ---- Reveal on scroll ------------------------------------------------- */
  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || !els.length) {
      els.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---- Pricing tabs ----------------------------------------------------- */
  function initPriceTabs() {
    var tabs = document.querySelectorAll(".price-tab");
    if (!tabs.length) return;
    var panels = document.querySelectorAll("[data-price-panel]");

    function select(name) {
      tabs.forEach(function (t) { t.setAttribute("aria-selected", String(t.getAttribute("data-tab") === name)); });
      panels.forEach(function (p) { p.classList.toggle("hidden", p.getAttribute("data-price-panel") !== name); });
    }
    tabs.forEach(function (t) {
      t.addEventListener("click", function () { select(t.getAttribute("data-tab")); });
    });
    select(tabs[0].getAttribute("data-tab"));
  }

  /* ---- Gallery filter --------------------------------------------------- */
  function initGalleryFilter() {
    var filters = document.querySelectorAll(".price-tab[data-filter]");
    if (!filters.length) return;
    var items = document.querySelectorAll("[data-cat]");

    function select(cat) {
      filters.forEach(function (f) { f.setAttribute("aria-selected", String(f.getAttribute("data-filter") === cat)); });
      items.forEach(function (it) {
        var show = cat === "all" || it.getAttribute("data-cat") === cat;
        it.classList.toggle("hidden", !show);
      });
    }
    filters.forEach(function (f) {
      f.addEventListener("click", function () { select(f.getAttribute("data-filter")); });
    });
    // Honour a ?cat= param so the chooser page can deep-link into a specialty
    var initial = "all";
    try {
      var cat = new URLSearchParams(window.location.search).get("cat");
      if (cat && document.querySelector('.price-tab[data-filter="' + cat + '"]')) initial = cat;
    } catch (e) {}
    select(initial);
  }

  /* ---- Contact form (demo, no backend) ---------------------------------- */
  function initContactForm() {
    var form = document.querySelector("form[data-demo-form]");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var note = form.querySelector("[data-form-result]");
      if (note) {
        note.textContent = window.NL ? window.NL.t("contact.thanks") : "Thank you.";
        note.classList.remove("hidden");
      }
      form.reset();
    });
    // Re-translate the result note if the language changes while shown
    document.addEventListener("nl:langchange", function () {
      var note = form.querySelector("[data-form-result]");
      if (note && !note.classList.contains("hidden") && window.NL) {
        note.textContent = window.NL.t("contact.thanks");
      }
    });
  }

  /* ---- Testimonials carousel -------------------------------------------- */
  function initTestimonials() {
    document.querySelectorAll(".testi").forEach(function (root) {
      var viewport = root.querySelector(".testi-viewport");
      var prev = root.querySelector("[data-testi-prev]");
      var next = root.querySelector("[data-testi-next]");
      var card = root.querySelector(".testi-card");
      if (!viewport || !card) return;

      function step() {
        return viewport.clientWidth + 2;
      }
      function update() {
        if (!prev || !next) return;
        var maxScroll = viewport.scrollWidth - viewport.clientWidth - 2;
        prev.disabled = viewport.scrollLeft <= 2;
        next.disabled = viewport.scrollLeft >= maxScroll;
      }
      if (prev) prev.addEventListener("click", function () { viewport.scrollBy({ left: -step(), behavior: "smooth" }); });
      if (next) next.addEventListener("click", function () { viewport.scrollBy({ left: step(), behavior: "smooth" }); });
      viewport.addEventListener("scroll", function () { window.requestAnimationFrame(update); }, { passive: true });
      window.addEventListener("resize", update);
      update();
    });
  }

  /* ---- Demo bar: publish its height so layout can offset for it ---------- */
  function initDemoBar() {
    var bar = document.querySelector(".demo-bar");
    if (!bar) return;
    function setH() {
      document.documentElement.style.setProperty("--demo-h", bar.offsetHeight + "px");
    }
    setH();
    window.addEventListener("resize", setH);
    document.addEventListener("nl:langchange", setH);
  }

  /* ---- Header: transparent over hero, solid on scroll ------------------- */
  function initHeaderScroll() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    function update() {
      header.classList.toggle("is-scrolled", window.scrollY > 40);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  /* ---- Year is set in applyConfig --------------------------------------- */
  ready(function () {
    applyConfig();
    initNav();
    initMarquee();
    initReveal();
    initPriceTabs();
    initGalleryFilter();
    initContactForm();
    initTestimonials();
    initDemoBar();
    initHeaderScroll();
  });
})();
