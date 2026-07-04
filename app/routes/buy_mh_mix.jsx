import { useCallback, useState } from "react";
import { useLoaderData } from "react-router";

import BuyMhMixGrid from "~/components/BuyMhMixGrid";
import MixSearchFilter from "~/components/MixSearchFilter";
import { useLang } from "~/context/LanguageContext";
import { fetchAllProducts } from "~/lib/fetchApi.server";

import buyMhMixCss from "~/styles/buy-mh-mix.css?url";
import cartCss from "~/styles/cart.css?url";

export const links = () => [
  { rel: "stylesheet", href: buyMhMixCss },
  { rel: "stylesheet", href: cartCss },
];

const HERO_STAT_ICONS = ["bi-flower2", "bi-tag", "bi-truck"];

export async function loader({ request }) {
  const products = (await fetchAllProducts("published=true", { request })).sort(
    (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)
  );
  return { products };
}

export default function BuyMhMix() {
  const { t } = useLang();
  const { products } = useLoaderData();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const heroStats = t("buyMhMix.stats");

  const handleFilteredChange = useCallback((next) => {
    setFilteredProducts(next);
  }, []);

  return (
    <main className="main buy-mh-mix-page">
      <section className="bmm-hero">
        <div className="bmm-hero-glow" aria-hidden />
        <div className="container">
          <div className="bmm-hero-logo" aria-hidden>
            <img
              src="/assets/img/mind-heal-logo-vertical-white.png"
              alt=""
            />
          </div>

          <span className="bmm-eyebrow">
            <i className="bi bi-flower1" />
            {t("buyMhMix.eyebrow")}
          </span>

          <h1 className="bmm-hero-title">{t("buyMhMix.heroTitle")}</h1>

          <p className="bmm-hero-lead">{t("buyMhMix.heroLead")}</p>

          <div className="bmm-hero-stats">
            {(Array.isArray(heroStats) ? heroStats : []).map((label, index) => (
              <span className="bmm-stat" key={label}>
                <i className={`bi ${HERO_STAT_ICONS[index] ?? "bi-flower2"}`} />
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bmm-catalog-intro">
        <div className="container">
          <div className="bmm-catalog-head">
            <span className="bmm-catalog-eyebrow">
              {t("buyMhMix.catalogEyebrow")}
            </span>
            <h2>{t("buyMhMix.catalogTitle")}</h2>
            <p>{t("buyMhMix.catalogSubtitle")}</p>
          </div>

          <div className="bmm-offer-bar">
            <span className="bmm-offer-item">
              <i className="bi bi-tag-fill" />
              {t("buyMhMix.offerMrp")} <strong>₹400</strong>
            </span>
            <span className="bmm-offer-divider" aria-hidden />
            <span className="bmm-offer-item">
              <i className="bi bi-lightning-fill" />
              {t("buyMhMix.offerSpecial")} <strong>₹250</strong>
            </span>
            <span className="bmm-offer-divider" aria-hidden />
            <span className="bmm-offer-item">
              <i className="bi bi-percent" />
              {t("buyMhMix.offerSave")} <strong>38%</strong>{" "}
              {t("buyMhMix.offerSaveSuffix")}
            </span>
          </div>
        </div>
      </section>

      <section id="blog-posts-2" className="blog-posts-2 section pt-0">
        <div className="container">
          <MixSearchFilter products={products} onFilteredChange={handleFilteredChange} />
          <BuyMhMixGrid products={filteredProducts} />
        </div>
      </section>
    </main>
  );
}
