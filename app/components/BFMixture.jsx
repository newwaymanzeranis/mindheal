import { Link } from "react-router";

import { imageSrc, productMixLabel } from "~/utils/format";

export default function BFMixture({ products = [] }) {
  if (!products.length) return null;

  return (
    <section id="services" className="services section">
      <div className="container section-title"  >
        <h2>BACH FLOWER COMBINATION PRODUCTS</h2>
        <h1>
          <blink>
            <Link to="/buy_mh_mix"> EXPLORE ALL COMBINATIONS ➤</Link>
          </blink>
        </h1>
        <p>Providing Pre-Mixed Bach Flower Remedies for Your Well-Being</p>
      </div>
      <div className="content">
        <div className="container">
          <div className="row g-0">
            {products.map((product) => (
              <div className="col-lg-3 col-md-6" key={product.id}>
                <div className="service-item">
                  <div className="number">
                    <div style={{ padding: "10px" }}>
                      {productMixLabel(product.mindHealNo, product.sortOrder)}
                    </div>
                    <div className="service-item-icon">
                      <img
                        src={imageSrc(product.image)}
                        alt={product.name}
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                  <div className="service-item-content">
                    <h3 className="service-heading">{product.name}</h3>
                    <h6 className="text-right">
                      <Link to={`/products/${product.slug}`}>Read More...</Link>
                    </h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
