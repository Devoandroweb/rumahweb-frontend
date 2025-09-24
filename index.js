// MEGA MENU
const megaMenu = document.getElementsByName("mega-menu-trigger");
// event click pada javascript
document.querySelectorAll(".mega-menu-trigger > button").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.stopPropagation();
    // Tutup semua mega menu lain
    document.querySelectorAll(".mega-menu-container").forEach((menu) => {
      if (!btn.parentElement.contains(menu)) menu.classList.add("hidden");
    });
    // Toggle menu terkait
    const menu = btn.parentElement.querySelector(".mega-menu-container");
    if (menu) menu.classList.toggle("hidden");
    document.querySelectorAll(".mega-menu-trigger svg").forEach((icon) => {
      icon.classList.remove("rotate-180");
    });
    const svg = btn.querySelector("svg");
    if (svg) {
      svg.classList.toggle("rotate-180");
    }
    if (menu && menu.classList.contains("hidden")) {
      if (svg) svg.classList.remove("rotate-180");
    }
  });
});
// Tutup mega menu jika klik di luar
document.addEventListener("click", function () {
  document.querySelectorAll(".mega-menu-container").forEach((menu) => {
    menu.classList.add("hidden");
  });
  document.querySelectorAll(".mega-menu-trigger svg").forEach((icon) => {
    icon.classList.remove("rotate-180");
  });
});

// MOBILE MENU TOGGLE
const iconMenu = document.querySelector(".lucide-menu");
const iconX = document.querySelector(".lucide-x");
const mobileMenuBtn = document.querySelector(
  'button[aria-label="Toggle mobile menu"]',
);
const desktopNav = document.querySelector(".mobile-menu");
mobileMenuBtn?.addEventListener("click", function (e) {
  e.stopPropagation();
  if (desktopNav) {
    desktopNav.classList.toggle("hidden");
  }
  if (iconMenu) iconMenu.classList.toggle("hidden");
  if (iconX) iconX.classList.toggle("hidden");
});
// Close mobile menu when clicking outside
document.addEventListener("click", function (e) {
  if (
    desktopNav &&
    !desktopNav.contains(e.target) &&
    !mobileMenuBtn.contains(e.target)
  ) {
    if (window.innerWidth < 768) {
      desktopNav.classList.add("hidden");
    }
    if (iconX) iconX.classList.add("hidden");
    if (iconMenu) iconMenu.classList.remove("hidden");
  }
});
document.querySelectorAll(".mobile-menu-trigger").forEach((trigger) => {
  const mainBtn = trigger.querySelector(".flex > button:first-child");
  const iconBtn = trigger.querySelector(".flex > button:not(:first-child)");
  const menu = trigger.querySelector(".mobile-menu-container");
  const iconSvg = iconBtn?.querySelector("svg");

  if (mainBtn && iconBtn && menu) {
    // Toggle menu on either button click
    [mainBtn, iconBtn].forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        // Close all other mobile menus
        document.querySelectorAll(".mobile-menu-container").forEach((m) => {
          if (m !== menu) m.classList.add("hidden");
        });
        document
          .querySelectorAll(
            ".mobile-menu-trigger .icon svg, .mobile-menu-trigger > .flex > button:not(:first-child) svg",
          )
          .forEach((svg) => {
            if (svg !== iconSvg) svg.classList.remove("rotate-180");
          });
        // Toggle current menu
        menu.classList.toggle("hidden");
        iconSvg?.classList.toggle(
          "rotate-180",
          !menu.classList.contains("hidden"),
        );
      });
    });
  }
});
// Tutup mobile menu jika klik di luar
document.addEventListener("click", function () {
  document.querySelectorAll(".mobile-menu-container").forEach((menu) => {
    menu.classList.add("hidden");
  });
  document.querySelectorAll(".mobile-menu-trigger svg").forEach((icon) => {
    icon.classList.remove("rotate-180");
  });
});

// TABS
const tabs = document.querySelectorAll(".tab-btn");
const contents = document.querySelectorAll(".tab-content");
// tabs functionality
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) =>
      t.classList.remove(
        "bg-gradient-to-r",
        "from-blue-600",
        "to-sky-600",
        "text-white",
        "shadow-sm",
      ),
    );
    tabs.forEach((t) =>
      t.classList.add("text-slate-600", "hover:text-slate-600"),
    );

    contents.forEach((c) => c.classList.add("hidden"));

    tab.classList.remove("text-slate-600", "hover:text-slate-600");
    tab.classList.add(
      "bg-gradient-to-r",
      "from-blue-600",
      "to-sky-600",
      "text-white",
      "shadow-sm",
    );

    document.getElementById(tab.dataset.tab).classList.remove("hidden");
  });
});
// accordion functionality
document.querySelectorAll(".accordion-header").forEach((header) => {
  header.addEventListener("click", () => {
    const body = header.nextElementSibling;
    const chevron = header.querySelector(".lucide-chevron-down");
    if (chevron) {
      chevron.classList.toggle("rotate-180");
    }
    document.querySelectorAll(".accordion-body").forEach((b) => {
      if (b !== body) b.classList.add("hidden");
    });
    body.classList.toggle("hidden");
  });
});
// carousel functionality
const items = document.querySelectorAll("#carousel > div");
const carouselM = document.getElementById("carouselM");
const itemsM = document.querySelectorAll("#carouselM > div");

let activeIndex = 0;
let activeIndexM = 0;
let translateCM = 0;

function updateCarousel() {
  items.forEach((item, i) => {
    const offset = (i - activeIndex + items.length) % items.length;
    item.style.transition = "all 1s ease";
    const indicators = document.querySelectorAll(".carousel-indicator button");

    if (offset === 0) {
      item.style.transform = "translate(-50%, -30%) translateX(0%) scale(1.3)";
      item.style.zIndex = 3;
      item.style.opacity = 1;
    } else if (offset === 1 || offset === -(items.length - 1)) {
      item.style.transform =
        "translate(-50%, -30%) translateX(100%) scale(0.75)";
      item.style.zIndex = 2;
      item.style.opacity = 0.6;
    } else if (offset === items.length - 1 || offset === -1) {
      item.style.transform =
        "translate(-50%, -30%) translateX(-100%) scale(0.75)";
      item.style.zIndex = 2;
      item.style.opacity = 0.6;
    } else {
      item.style.transform = "translate(-50%, -30%) translateX(0%) scale(0.75)";
      item.style.zIndex = 1;
      item.style.opacity = 0;
    }
    if (indicators.length) {
      indicators.forEach((btn, idx) => {
        if (idx === activeIndex) {
          btn.classList.add("w-8", "opacity-100");
          btn.classList.remove("w-2.5", "opacity-50");
        } else {
          btn.classList.remove("w-8", "opacity-100");
          btn.classList.add("w-2.5", "opacity-50");
        }
      });
    }
  });
}
function updateCarouselM() {
  const totalM = itemsM.length;
  const translateValue = -activeIndexM * 100;
  carouselM.style.transform = `translateX(${translateValue}%)`;
}
function nextSlide() {
  activeIndex = (activeIndex + 1) % items.length;
  updateCarousel();
}
function nextSlideM() {
  activeIndexM = (activeIndexM + 1) % itemsM.length;

  updateCarouselM();
}

updateCarousel();
updateCarouselM();
let slideInterval = setInterval(nextSlide, 3000);
let slideIntervalM = setInterval(nextSlideM, 3000);

const prevSlideBtn = document.getElementById("previous-slide");
if (prevSlideBtn) {
  prevSlideBtn.addEventListener("click", function () {
    console.log("Previous slide clicked");
    clearInterval(slideInterval);
    activeIndex = (activeIndex - 1 + items.length) % items.length;
    updateCarousel();
  });
}
const nextSlideBtn = document.getElementById("next-slide");
if (nextSlideBtn) {
  nextSlideBtn.addEventListener("click", function () {
    clearInterval(slideInterval);
    nextSlide();
  });
}
// mobile carousel
const prevSlideBtnM = document.getElementById("mobile-previous-slide");
if (prevSlideBtnM) {
  prevSlideBtnM.addEventListener("click", function () {
    clearInterval(slideIntervalM);
    activeIndexM = (activeIndexM - 1 + itemsM.length) % itemsM.length;
    updateCarouselM();
  });
}
const nextSlideBtnM = document.getElementById("mobile-next-slide");
if (nextSlideBtnM) {
  nextSlideBtnM.addEventListener("click", function () {
    clearInterval(slideIntervalM);
    nextSlideM();
  });
}