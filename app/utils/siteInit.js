const SWIPER_CONFIG = {
  loop: true,
  speed: 600,
  autoplay: { delay: 5000 },
  slidesPerView: "auto",
  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
    clickable: true,
  },
  navigation: {
    nextEl: ".js-custom-next",
    prevEl: ".js-custom-prev",
  },
  breakpoints: {
    320: { slidesPerView: 1, spaceBetween: 40 },
    1200: { slidesPerView: 3, spaceBetween: 40 },
  },
};

export function initAOS() {
  if (typeof window !== "undefined" && window.AOS) {
    window.AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
}

export function refreshAOS() {
  if (typeof window !== "undefined" && window.AOS) {
    window.AOS.refresh();
  }
}

export function initHeroCarousel() {
  const el = document.getElementById("hero-carousel");
  if (!el || !window.bootstrap?.Carousel) return null;

  const existing = window.bootstrap.Carousel.getInstance(el);
  if (existing) existing.dispose();

  return window.bootstrap.Carousel.getOrCreateInstance(el, {
    interval: 5000,
    ride: "carousel",
  });
}

export async function initHomeSwiper() {
  const { default: Swiper } = await import("swiper/bundle");
  await import("swiper/css/bundle");

  const elements = document.querySelectorAll(".init-swiper");
  const instances = [];

  elements.forEach((element) => {
    if (element.swiper) {
      element.swiper.destroy(true, true);
    }
    instances.push(new Swiper(element, SWIPER_CONFIG));
  });

  return instances;
}

let glightboxInstance = null;

export function initGLightbox(selector = ".glightbox") {
  if (typeof window === "undefined" || !window.GLightbox) {
    return null;
  }

  glightboxInstance?.destroy?.();
  glightboxInstance = window.GLightbox({ selector });
  return glightboxInstance;
}

export function destroyGLightbox() {
  glightboxInstance?.destroy?.();
  glightboxInstance = null;
}

export function initHomePage() {
  initAOS();
  initHeroCarousel();
  initGLightbox();
  refreshAOS();

  let swipers = [];
  let swiperReady = false;

  initHomeSwiper().then((instances) => {
    swipers = instances;
    swiperReady = true;
    refreshAOS();
  });

  return () => {
    if (swiperReady) {
      swipers.forEach((swiper) => swiper.destroy(true, true));
    }
  };
}
