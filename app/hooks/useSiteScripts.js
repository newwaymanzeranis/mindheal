import { useEffect, useState } from "react";

const SCRIPT_URLS = [
  "/assets/vendor/bootstrap/js/bootstrap.bundle.min.js",
  "/assets/vendor/aos/aos.js",
  "/assets/vendor/glightbox/js/glightbox.min.js",
  "/assets/js/main.js",
];

let loadPromise = null;

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      if (existing.dataset.loaded === "true") {
        resolve();
        return;
      }
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error(`Failed to load ${src}`)), {
        once: true,
      });
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = false;
    script.onload = () => {
      script.dataset.loaded = "true";
      resolve();
    };
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.body.appendChild(script);
  });
}

export function loadSiteScripts() {
  if (typeof document === "undefined") {
    return Promise.resolve();
  }

  if (!loadPromise) {
    loadPromise = SCRIPT_URLS.reduce(
      (chain, src) => chain.then(() => loadScript(src)),
      Promise.resolve()
    );
  }

  return loadPromise;
}

export function useSiteScripts() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    loadSiteScripts()
      .then(() => {
        if (!cancelled) setReady(true);
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return ready;
}
