import { useCallback, useState } from "react";
import { useLoaderData } from "react-router";

import BuyMhMixGrid from "~/components/BuyMhMixGrid";
import MixSearchFilter from "~/components/MixSearchFilter";
import PageTitle from "~/components/PageTitle";
import { fetchAllProducts } from "~/lib/fetchApi.server";

import cartCss from "~/styles/cart.css?url";

export const links = () => [{ rel: "stylesheet", href: cartCss }];

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
    <main className="main">
      <PageTitle
        title="Choose and Order Your Own Mind Heal Mix"
        description="Your Healing Partner with Bach Flower Remedies -Choose and Order Your Own Mind Heal Mix!"
        current="Buy Mind Heal Mix"
        backgroundImage="/assets/img/page-title-bg.jpg"
      />

      <section id="blog-posts-2" className="blog-posts-2 section">
        <div className="container">
          <h2 className="text-center">Find the Perfect Mind Heal Mix Made Just for You</h2>
          <p
            className="text-center text-muted mb-2"
            style={{ fontFamily: "var(--heading-font)", fontSize: "1.25rem" }}
          >
            Pick the Healing Blend That Feels Right for You or Your Loved One
          </p>
          <p className="text-center mb-3">
            <span className="badge bg-success-subtle text-success border border-success-subtle px-3 py-2">
              MRP ₹400 · Special offer ₹250 · 38% OFF on every mix
            </span>
          </p>
          <MixSearchFilter products={products} onFilteredChange={handleFilteredChange} />
          <BuyMhMixGrid products={filteredProducts} />
        </div>
      </section>
    </main>
  );
}
