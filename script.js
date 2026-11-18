// DLTECH Academy Abuja — small site interactions
const menuButton = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

if (menuButton && mainNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
    });
  });
}

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// Highlight the navigation item for the section currently in view.
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".main-nav a");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  sections.forEach((section) => observer.observe(section));
}


// DLTECH Academy About page interactions
const toggle = document.querySelector('.menu');
const nav = document.querySelector('.nav nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
}
year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
const play = document.getElementById('play');
const note = document.getElementById('video-note');
if (play && note) play.addEventListener('click', () => {
  note.textContent = 'Video placeholder selected. Add an approved school video URL or MP4 file to enable playback.';
});


/* DLTECH Academy Abuja | Admissions page interactions */
(() => {
  "use strict";

  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".main-nav");

  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navigation.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation");
      });
    });
  }

  year = document.getElementById("current-year");
  if (year) year.textContent = new Date().getFullYear();

  // The video poster is intentionally a visual placeholder until the school supplies its video.
  const videoPoster = document.querySelector(".video-poster");
  if (videoPoster) {
    videoPoster.addEventListener("click", () => {
      window.alert("Video placeholder: add the approved DLTECH Academy Abuja community video before publishing.");
    });
  }
})();


/* DLTECH Academy Abuja | Campus Life interactions */
document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".primary-nav");

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    }));
  }

  const searchToggle = document.querySelector(".search-toggle");
  const searchPanel = document.querySelector(".search-panel");
  const searchInput = document.querySelector("#search-input");
  const searchFeedback = document.querySelector(".search-feedback");

  if (searchToggle && searchPanel) {
    searchToggle.addEventListener("click", () => {
      const opening = searchPanel.hidden;
      searchPanel.hidden = !opening;
      searchToggle.setAttribute("aria-expanded", String(opening));
      if (opening) searchInput?.focus();
    });
  }

  searchPanel?.addEventListener("submit", event => {
    event.preventDefault();
    const query = searchInput.value.trim().toLowerCase();
    if (!query) {
      searchFeedback.textContent = "Enter a word or phrase to search this page.";
      return;
    }
    const searchable = [...document.querySelectorAll("main h1, main h2, main h3, main p, main li")];
    const match = searchable.find(element => element.textContent.toLowerCase().includes(query));
    if (match) {
      match.scrollIntoView({ behavior: "smooth", block: "center" });
      match.setAttribute("tabindex", "-1");
      match.focus({ preventScroll: true });
      searchFeedback.textContent = `Found: ${match.textContent.trim().slice(0, 80)}`;
    } else {
      searchFeedback.textContent = "No matching text found on this page.";
    }
  });

  // Gallery shows three images on larger screens and one on small screens.
  const slides = [...document.querySelectorAll(".gallery-slide")];
  const dotsContainer = document.querySelector(".gallery-dots");
  const count = document.querySelector(".gallery-count");
  let current = 0;
  const visibleCount = () => window.matchMedia("(max-width: 480px)").matches ? 1 :
    window.matchMedia("(max-width: 760px)").matches ? 2 : 3;

  function renderGallery() {
    const visible = visibleCount();
    slides.forEach((slide, index) => {
      const relative = (index - current + slides.length) % slides.length;
      slide.style.order = String(relative);
      slide.style.display = relative < visible ? "block" : "none";
      slide.classList.toggle("active", index === current);
    });
    if (count) count.textContent = `${String(current + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
    dotsContainer?.querySelectorAll("button").forEach((dot, index) => {
      dot.setAttribute("aria-current", String(index === current));
    });
  }

  slides.forEach((slide, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Show campus image ${index + 1}`);
    dot.addEventListener("click", () => { current = index; renderGallery(); });
    dotsContainer?.appendChild(dot);
  });

  document.querySelector(".gallery-prev")?.addEventListener("click", () => {
    current = (current - 1 + slides.length) % slides.length;
    renderGallery();
  });
  document.querySelector(".gallery-next")?.addEventListener("click", () => {
    current = (current + 1) % slides.length;
    renderGallery();
  });
  window.addEventListener("resize", renderGallery);
  renderGallery();

  const year = document.querySelector("#current-year");
  if (year) year.textContent = new Date().getFullYear();
});



/* DLTECH Academy Abuja | Teaching & Learning page interactions */
(() => {
  "use strict";

  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".main-nav");

  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navigation.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation");
      });
    });
  }

  const year = document.getElementById("current-year");
  if (year) year.textContent = new Date().getFullYear();
})();
