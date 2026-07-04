import { useEffect } from "react";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
  useRouteLoaderData,
} from "react-router";
import type { LinksFunction, LoaderFunctionArgs } from "react-router";

import Footer from "~/components/Footer";
import Header from "~/components/Header";
import CartToast from "~/components/CartToast";
import NavigationLoader from "~/components/NavigationLoader";
import { AuthProvider } from "~/context/AuthContext";
import { CartProvider } from "~/context/CartContext";
import { LanguageProvider } from "~/context/LanguageContext";
import { DEFAULT_LANG } from "~/i18n";
import { getLangFromRequest } from "~/lib/lang.server";
import { useSiteScripts } from "~/hooks/useSiteScripts";
import { initAOS, refreshAOS } from "~/utils/siteInit";

import cartCss from "~/styles/cart.css?url";
import headerNavCss from "~/styles/header-nav.css?url";
import langSwitchCss from "~/styles/lang-switch.css?url";

/* import "./tailwind.css"; */

export const links: LinksFunction = () => [
  { rel: "icon", href: "/assets/img/favicon.png" },
  { rel: "apple-touch-icon", href: "/assets/img/apple-touch-icon.png" },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&family=Marcellus:wght@400&display=swap",
  },
  {
    rel: "stylesheet",
    href: "/assets/vendor/bootstrap-icons/bootstrap-icons.css",
  },
  { rel: "stylesheet", href: "/assets/vendor/aos/aos.css" },
  { rel: "stylesheet", href: "/assets/vendor/glightbox/css/glightbox.min.css" },
  { rel: "stylesheet", href: "/assets/vendor/bootstrap/css/bootstrap.min.css" },
  { rel: "stylesheet", href: "/assets/css/main.css" },
  { rel: "stylesheet", href: cartCss },
  { rel: "stylesheet", href: headerNavCss },
  { rel: "stylesheet", href: langSwitchCss },
];

export async function loader({ request }: LoaderFunctionArgs) {
  return { lang: getLangFromRequest(request) };
}

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useRouteLoaderData("root") as { lang?: string } | undefined;
  const lang = data?.lang ?? DEFAULT_LANG;

  return (
    <html lang={lang}>
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
  const { lang } = useLoaderData<typeof loader>();
  const { pathname } = useLocation();
  const isAdminRoute = pathname.startsWith("/admin");
  const isHome = pathname === "/";
  const scriptsReady = useSiteScripts();

  useEffect(() => {
    if (!scriptsReady || isAdminRoute) return;

    if (!isHome) {
      initAOS();
      refreshAOS();
    }
  }, [scriptsReady, isHome, isAdminRoute, pathname]);

  if (isAdminRoute) {
    return (
      <>
        <NavigationLoader />
        <Outlet />
      </>
    );
  }

  return (
    <LanguageProvider initialLang={lang}>
      <AuthProvider>
        <CartProvider>
          <NavigationLoader />
          <CartToast />
          <div className={`site-layout${isHome ? " index-page" : ""}`}>
            <Header />
            <Outlet />
            <Footer />
            <a
              href="#"
              id="scroll-top"
              className="scroll-top d-flex align-items-center justify-content-center"
            >
              <i className="bi bi-arrow-up-short" />
            </a>
          </div>
        </CartProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
