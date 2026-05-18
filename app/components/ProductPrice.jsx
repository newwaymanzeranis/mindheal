import { getProductPricing } from "~/utils/pricing";
import { formatPrice } from "~/utils/format";

export default function ProductPrice({ product, size = "md" }) {
  const { mrp, salePrice, discountPercent } = getProductPricing(product);

  return (
    <div className={`product-price product-price--${size}`}>
      <div className="product-price-row">
        <span className="product-price-mrp">{formatPrice(mrp)}</span>
        <span className="product-price-sale">{formatPrice(salePrice)}</span>
      </div>
      {discountPercent > 0 && (
        <span className="product-price-badge">{discountPercent}% OFF</span>
      )}
    </div>
  );
}
