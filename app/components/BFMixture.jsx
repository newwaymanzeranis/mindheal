import { useCallback, useState } from "react";
import { Link } from "react-router";

import MixSearchFilter from "~/components/MixSearchFilter";
import ProductEmotionalTags from "~/components/ProductEmotionalTags";
import { imageSrc, productMixLabel } from "~/utils/format";

const DISPLAY_LIMIT = 16;

export default function BFMixture({ products = [] }) {
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleFilteredChange = useCallback((next) => {
    setFilteredProducts(next);
  }, []);

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
      <div className="content">
        <div className="container">
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
                    <h6 className="text-right">
                      <Link to={`/products/${product.slug}`}>Read More....</Link>
                    </h6>
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
