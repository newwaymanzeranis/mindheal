import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

/* import "./tailwind.css"; */

export const links: LinksFunction = () => [
   { rel: "icon", href: "/assets/img/favicon.png" },
  { rel: "apple-touch-icon", href: "/assets/img/apple-touch-icon.png" },

  // 🎨 Fonts
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&family=Marcellus:wght@400&display=swap",
  },

  // 🔥 Vendor CSS
  { rel: "stylesheet", href: "/assets/vendor/bootstrap-icons/bootstrap-icons.css" },
  { rel: "stylesheet", href: "/assets/vendor/aos/aos.css" },
  /* { rel: "stylesheet", href: "/assets/vendor/swiper/swiper-bundle.min.css" }, */
  { rel: "stylesheet", href: "/assets/vendor/glightbox/css/glightbox.min.css" },
  
  { rel: "stylesheet", href: "/assets/vendor/bootstrap/css/bootstrap.min.css" },
  // 🌟 Main CSS
  { rel: "stylesheet", href: "/assets/css/main.css" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
