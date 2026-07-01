import { useCallback, useState } from "react";
import { useLoaderData } from "react-router";

import BuyMhMixGrid from "~/components/BuyMhMixGrid";
import MixSearchFilter from "~/components/MixSearchFilter";
import { fetchAllProducts } from "~/lib/fetchApi.server";

import buyMhMixCss from "~/styles/buy-mh-mix.css?url";
import cartCss from "~/styles/cart.css?url";

export const links = () => [
  { rel: "stylesheet", href: buyMhMixCss },
  { rel: "stylesheet", href: cartCss },
];

const HERO_STATS = [
  { icon: "bi-flower2", label: "50+ Healing Blends" },
  { icon: "bi-tag", label: "38% OFF Every Mix" },
  { icon: "bi-truck", label: "Cash on Delivery" },
];

export async function loader({ request }) {
  const products = (await fetchAllProducts("published=true", { request })).sort(
    (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)
  );
  return { products };
}

export default function BuyMhMix() {
  const { products } = useLoaderData();
  const [filteredProducts, setFilteredProducts] = useState(products);

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
            Bach Flower Remedies
          </span>

          <h1 className="bmm-hero-title">
            Choose &amp; Order Your Mind Heal Mix
          </h1>

          <p className="bmm-hero-lead">
            Your healing partner with authentic Bach Flower blends — pick the
            remedy that feels right for you or your loved one.
          </p>

          <div className="bmm-hero-stats">
            {HERO_STATS.map((stat) => (
              <span className="bmm-stat" key={stat.label}>
                <i className={`bi ${stat.icon}`} />
                {stat.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bmm-catalog-intro">
        <div className="container">
          <div className="bmm-catalog-head">
            <span className="bmm-catalog-eyebrow">Our Collection</span>
            <h2>Find the Perfect Mix Made Just for You</h2>
            <p>
              Search by emotional need, browse all blends, and add your favourites
              to cart in seconds.
            </p>
          </div>

          <div className="bmm-offer-bar">
            <span className="bmm-offer-item">
              <i className="bi bi-tag-fill" />
              MRP <strong>₹400</strong>
            </span>
            <span className="bmm-offer-divider" aria-hidden />
            <span className="bmm-offer-item">
              <i className="bi bi-lightning-fill" />
              Special Offer <strong>₹250</strong>
            </span>
            <span className="bmm-offer-divider" aria-hidden />
            <span className="bmm-offer-item">
              <i className="bi bi-percent" />
              Save <strong>38%</strong> on every mix
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
