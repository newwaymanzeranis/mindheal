import { useCallback, useState } from "react";
import { Link } from "react-router";

import MixSearchFilter from "~/components/MixSearchFilter";
import ProductBottleSlider from "~/components/ProductBottleSlider";
import ProductEmotionalTags from "~/components/ProductEmotionalTags";
import { useCart } from "~/context/CartContext";
import { useLang } from "~/context/LanguageContext";
import { formatPrice, imageSrc, productMixLabel } from "~/utils/format";
import { getProductPricing } from "~/utils/pricing";

const DISPLAY_LIMIT = 16;

export default function BFMixture({ products = [] }) {
  const { t, tc } = useLang();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState(null);

  const handleFilteredChange = useCallback((next) => {
    setFilteredProducts(next);
  }, []);

  const handleAdd = (product) => {
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  if (!products.length) return null;

  const displayProducts = filteredProducts.slice(0, DISPLAY_LIMIT);
  const hasMore = filteredProducts.length > DISPLAY_LIMIT;

  return (
    <section id="services" className="services section bfm-section">
      <div className="container bfm-head">
        <span className="bfm-eyebrow">{t("home.bfm.eyebrow")}</span>
        <p className="bfm-lead">{t("home.bfm.lead")}</p>
        <Link to="/buy_mh_mix" className="bfm-explore">
          {t("home.bfm.explore")}
          <i className="bi bi-arrow-right" />
        </Link>
        <MixSearchFilter products={products} onFilteredChange={handleFilteredChange} />
      </div>
      <ProductBottleSlider products={filteredProducts} />
      <div className="content">
        <div className="container">
          {!filteredProducts.length ? (
            <p className="text-center text-muted py-4">
              {t("home.bfm.noMatch")}
            </p>
          ) : (
          <>
          <div className="bfm-grid-head">
            <span className="bfm-grid-eyebrow">{t("home.bfm.gridEyebrow")}</span>
            <h3 className="bfm-grid-title">{t("home.bfm.gridTitle")}</h3>
            <p className="bfm-grid-sub">{t("home.bfm.gridSub")}</p>
          </div>
          <div className="row g-0">
            {displayProducts.map((product) => (
              <div className="col-lg-3 col-md-6" key={product.id}>
                <div className="service-item">
                  <div className="number">
                    <div style={{ padding: "10px" }}>
                      {productMixLabel(product.mindHealNo, product.sortOrder)}
                    </div>
                    <div className="service-item-icon bf-mixture-img">
                      <img
                        src={imageSrc(product.image)}
                        alt={tc(product, "name")}
                      />
                    </div>
                  </div>
                  <div className="service-item-content">
                    <h3 className="service-heading">{tc(product, "name")}</h3>
                    <ProductEmotionalTags
                      emotionalTags={product.emotionalTags}
                      emotionalTagsHi={product.emotionalTagsHi}
                      className="mb-2 gap-0"
                    />
                    <div className="mix-grid-price">
                      <span className="mix-grid-sale">
                        {formatPrice(getProductPricing(product).salePrice)}
                      </span>
                      {getProductPricing(product).mrp >
                        getProductPricing(product).salePrice && (
                        <span className="mix-grid-mrp">
                          {formatPrice(getProductPricing(product).mrp)}
                        </span>
                      )}
                    </div>
                    <div className="mix-grid-actions">
                      <button
                        type="button"
                        className={`mix-grid-cart ${
                          addedId === product.id ? "mix-grid-cart--added" : ""
                        }`}
                        onClick={() => handleAdd(product)}
                      >
                        <i
                          className={`bi ${
                            addedId === product.id
                              ? "bi-check-lg"
                              : "bi-cart-plus"
                          }`}
                        />
                        {addedId === product.id
                          ? t("common.added")
                          : t("common.addToCart")}
                      </button>
                      <Link
                        to={`/products/${product.slug}`}
                        className="mix-grid-view"
                      >
                        <i className="bi bi-eye" />
                        {t("common.viewDetails")}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          </>
          )}
          {hasMore && (
            <p className="text-center mt-4 mb-0">
              <Link to="/buy_mh_mix" className="fw-semibold text-success">
                {t("home.bfm.viewAll", { count: filteredProducts.length })}
              </Link>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
