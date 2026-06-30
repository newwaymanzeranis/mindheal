import { useCallback, useState } from "react";
import { Link } from "react-router";

import MixSearchFilter from "~/components/MixSearchFilter";
import ProductBottleSlider from "~/components/ProductBottleSlider";
import ProductEmotionalTags from "~/components/ProductEmotionalTags";
import { useCart } from "~/context/CartContext";
import { formatPrice, imageSrc, productMixLabel } from "~/utils/format";
import { getProductPricing } from "~/utils/pricing";

const DISPLAY_LIMIT = 16;

export default function BFMixture({ products = [] }) {
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
    <section id="services" className="services section">
      <div className="container section-title"  style={{'padding-bottom': '0px'}} >
        <h2>BACH FLOWER COMBINATION PRODUCTS</h2>
        <h1>
          <blink>
            <Link to="/buy_mh_mix"> EXPLORE ALL COMBINATIONS ➤</Link>
          </blink>
        </h1>
        <p>Providing Pre-Mixed Bach Flower Remedies for Your Well-Being </p>
        <MixSearchFilter products={products} onFilteredChange={handleFilteredChange} />
      </div>
      <ProductBottleSlider products={filteredProducts} />
      <div className="content">
        <div className="container">
          <div className="bottle-slider-head">
            <h3 className="bottle-slider-title">Explore All Bach Flower Combinations</h3>
            <p className="bottle-slider-subtitle">
              Browse our complete range of pre-mixed remedies for every emotional need
            </p>
          </div>
          {!filteredProducts.length ? (
            <p className="text-center text-muted py-4">
              No mixes match your search. Try different tags or clear filters.
            </p>
          ) : (
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
                        alt={product.name}
                      />
                    </div>
                  </div>
                  <div className="service-item-content">
                    <h3 className="service-heading">{product.name}</h3>
                    <ProductEmotionalTags
                      emotionalTags={product.emotionalTags}
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
                        {addedId === product.id ? "Added" : "Add to Cart"}
                      </button>
                      <Link
                        to={`/products/${product.slug}`}
                        className="mix-grid-view"
                      >
                        <i className="bi bi-eye" />
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          )}
          {hasMore && (
            <p className="text-center mt-4 mb-0">
              <Link to="/buy_mh_mix" className="fw-semibold text-success">
                View all {filteredProducts.length} mixes →
              </Link>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
