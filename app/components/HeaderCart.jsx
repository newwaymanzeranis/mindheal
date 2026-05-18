import { Link } from "react-router";

import { useCart } from "~/context/CartContext";
export default function HeaderCart() {
  const { cartCount, hydrated } = useCart();

  return (
    <Link to="/cart" className="header-cart" aria-label={`Cart, ${cartCount} items`}>
      <i className="bi bi-cart3" />
      {hydrated && cartCount > 0 && (
        <span className="header-cart-count">{cartCount > 99 ? "99+" : cartCount}</span>
      )}
    </Link>
  );
}
