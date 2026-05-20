import { useState } from "react";
import { Link } from "react-router";

import ProductPrice from "~/components/ProductPrice";
import { useCart } from "~/context/CartContext";
import { imageSrc, productMindHealLabel } from "~/utils/format";

export default function BuyMhMixGrid({ products = [] }) {
  const { addToCart, cartCount, hydrated } = useCart();
  const [addedId, setAddedId] = useState(null);

  const handleAdd = (product) => {
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <div className="row gy-4">
      {products.map((product) => (
        <div className="col-lg-4 col-md-6" key={product.id}>
          <article className="mix-product-card h-100">
            <div className="mix-product-img">
              <span className="mix-product-badge">
                {productMindHealLabel(product.mindHealNo, product.sortOrder)}
              </span>
              <img src={imageSrc(product.image)} className="img-fluid" alt={product.name} />
            </div>
            <div className="mix-product-body">
              <h3 className="mix-product-title">{product.name}</h3>
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
                  {addedId === product.id ? "Added" : "Add to Cart"}
                  {hydrated && cartCount > 0 && (
                    <span className="mix-btn-cart-badge" aria-hidden>
                      {cartCount > 99 ? "99+" : cartCount}
                    </span>
                  )}
                </button>
                <Link
                  to={`/products/${product.slug}`}
                  className="btn btn-outline-success mix-btn-detail"
                >
                  Details
                </Link>
              </div>
            </div>
          </article>
        </div>
      ))}
    </div>
  );
}
