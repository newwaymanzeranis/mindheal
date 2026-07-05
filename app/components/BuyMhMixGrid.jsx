import { useState } from "react";
import { Link } from "react-router";

import ProductEmotionalTags from "~/components/ProductEmotionalTags";
import ProductPrice from "~/components/ProductPrice";
import { useCart } from "~/context/CartContext";
import { useLang } from "~/context/LanguageContext";
import { imageSrc, productMindHealLabel } from "~/utils/format";
import { parseProductTags } from "~/utils/seo";

export default function BuyMhMixGrid({ products = [] }) {
  const { t, tc, lang } = useLang();
  const { addToCart, items, hydrated } = useCart();
  const [addedId, setAddedId] = useState(null);

  const handleAdd = (product) => {
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  if (!products.length) {
    return (
      <p className="text-center text-muted py-5">{t("home.bfm.noMatch")}</p>
    );
  }

  return (
    <div className="row gy-4">
      {products.map((product) => {
        const inCartQty =
          items.find((item) => item.id === product.id)?.quantity ?? 0;
        const name = tc(product, "name");
        const tags = parseProductTags(product, lang);
        const imageAlt = tags.length
          ? `${name} — Bach Flower Remedy for ${tags.join(", ")}`
          : `${name} — Mind Heal Bach Flower Remedy`;

        return (
        <div className="col-lg-4 col-md-6" key={product.id}>
          <article className="mix-product-card h-100">
            <div className="mix-product-img">
              <span className="mix-product-badge">
                {productMindHealLabel(product.mindHealNo, product.sortOrder)}
              </span>
              <img src={imageSrc(product.image)} className="img-fluid" alt={imageAlt} />
            </div>
            <div className="mix-product-body">
              <h3 className="mix-product-title">{tc(product, "name")}</h3>
              {tc(product, "shortDescription") && (
                <p className="mix-product-short-desc text-muted small mb-2">
                  {tc(product, "shortDescription")}
                </p>
              )}
              <ProductEmotionalTags
                emotionalTags={product.emotionalTags}
                emotionalTagsHi={product.emotionalTagsHi}
                className="mb-2"
              />
              <ProductPrice product={product} size="lg" />
              <div className="mix-product-actions">
                <button
                  type="button"
                  className={`btn btn-success mix-btn-cart ${
                    addedId === product.id ? "mix-btn-cart--added" : ""
                  }`}
                  onClick={() => handleAdd(product)}
                >
                  <i
                    className={`bi ${
                      addedId === product.id ? "bi-check-lg" : "bi-cart-plus"
                    }`}
                  />
                  {addedId === product.id
                    ? t("common.added")
                    : t("common.addToCart")}
                  {hydrated && inCartQty > 0 && (
                    <span className="mix-btn-cart-badge" aria-hidden>
                      {inCartQty > 99 ? "99+" : inCartQty}
                    </span>
                  )}
                </button>
                <Link
                  to={`/products/${product.slug}`}
                  className="btn btn-outline-success mix-btn-detail"
                >
                  {t("common.details")}
                </Link>
              </div>
            </div>
          </article>
        </div>
        );
      })}
    </div>
  );
}
