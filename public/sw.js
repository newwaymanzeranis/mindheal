// Empty service worker — prevents 404 noise from crawlers probing /sw.js
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", () => self.clients.claim());
