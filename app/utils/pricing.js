/** Fallbacks only when DB values are missing (legacy rows). */
const FALLBACK_MRP = 400;
const FALLBACK_SALE = 250;

export function getProductPricing(product) {
  const mrp =
    product?.mrp != null && product.mrp !== ""
      ? Number(product.mrp)
      : FALLBACK_MRP;
  const salePrice =
    product?.price != null && product.price !== ""
      ? Number(product.price)
      : FALLBACK_SALE;
  const discount = mrp > salePrice ? mrp - salePrice : 0;
  const discountPercent = mrp > 0 ? Math.round((discount / mrp) * 100) : 0;

  return { mrp, salePrice, discount, discountPercent };
}
