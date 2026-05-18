import { useState } from "react";
import { Link } from "react-router";

import { useCart } from "~/context/CartContext";

export default function ProductAddToCart({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="product-detail-actions mt-4">
      <button
        type="button"
        className={`btn btn-success btn-lg me-2 mb-2 ${added ? "mix-btn-cart--added" : ""}`}
        onClick={handleAdd}
      >
        <i className={`bi ${added ? "bi-check-lg" : "bi-cart-plus"} me-1`} />
        {added ? "Added to Cart" : "Add to Cart"}
      </button>
      <Link to="/cart" className="btn btn-outline-success btn-lg mb-2 me-2">
        <i className="bi bi-cart3 me-1" />
        View Cart
      </Link>
      <Link to="/buy_mh_mix" className="btn btn-outline-secondary btn-lg mb-2">
        All Mixes
      </Link>
    </div>
  );
}
