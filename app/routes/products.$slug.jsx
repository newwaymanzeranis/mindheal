import { useEffect, useRef, useState } from "react";
import { Link, useLoaderData } from "react-router";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";

import ProductEmotionalTags from "~/components/ProductEmotionalTags";
import ProductPrice from "~/components/ProductPrice";
import { useCart } from "~/context/CartContext";
import { fetchAllProducts, fetchProductBySlug } from "~/lib/fetchApi.server";
import {
  bottleImageSrc,
  formatPrice,
  imageSrc,
  productMindHealLabel,
} from "~/utils/format";
import { getProductPricing } from "~/utils/pricing";

import productDetailCss from "~/styles/product-detail.css?url";
import productSliderCss from "~/styles/product-slider.css?url";

export const links = () => [
  { rel: "stylesheet", href: productDetailCss },
  { rel: "stylesheet", href: productSliderCss },
];

const TRUST_ITEMS = [
  {
    icon: "bi-flower1",
    title: "Bach Flower Remedies",
    text: "Authentic Dr. Bach flower essences in every blend",
  },
  {
    icon: "bi-droplet",
    title: "100% Natural",
    text: "Gentle, plant-based support with no harsh chemicals",
  },
  {
    icon: "bi-patch-check",
    title: "Expert Curated",
    text: "Formulated by Mind Heal practitioners for real needs",
  },
  {
    icon: "bi-heart-pulse",
    title: "Emotional Wellness",
    text: "Designed to restore calm, balance, and inner peace",
  },
];

function pickRandomProducts(products, count = 20) {
  if (products.length <= count) return products;

  const shuffled = [...products];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled.slice(0, count);
}

export async function loader({ params, request }) {
  const opts = { request };
  const [product, allProducts] = await Promise.all([
    fetchProductBySlug(params.slug, opts),
    fetchAllProducts("published=true", opts),
  ]);

  if (!product) {
    throw new Response("Product not found", { status: 404 });
  }

  const relatedProducts = pickRandomProducts(
    allProducts.filter((item) => item.slug !== params.slug),
    20
  );

  return { product, relatedProducts };
}

export function meta({ data }) {
  const product = data?.product;
  if (!product) return [{ title: "Product | Mind Heal" }];
  return [
    { title: `${product.name} | Mind Heal` },
    {
      name: "description",
      content:
        product.shortDescription ||
        product.description ||
        `Shop ${product.name} — Bach Flower remedy by Mind Heal`,
    },
  ];
}

export default function ProductDetail() {
  const { product, relatedProducts } = useLoaderData();
  const showHealingNote =
    product.description &&
    product.description.trim() !== (product.shortDescription || "").trim();

  return (
    <main className="main product-detail-page">
      <section className="pd-hero">
        <div className="pd-hero-glow" aria-hidden />
        <div className="pd-hero-glow pd-hero-glow--left" aria-hidden />
        <div className="container">
          <Link to="/buy_mh_mix" className="pd-back">
            <i className="bi bi-arrow-left" />
            Back to All Mixes
          </Link>

          <div className="pd-hero-grid">
            <div className="pd-showcase">
              <div className="pd-showcase-logo" aria-hidden>
                <img
                  src="/assets/img/mind-heal-logo-vertical-white.png"
                  alt=""
                />
              </div>
              <div className="pd-showcase-frame">
                <img
                  src={imageSrc(product.image)}
                  alt={product.name}
                  className="pd-showcase-scene"
                />
              </div>
              <img
                src={bottleImageSrc(product)}
                alt={`${product.name} bottle`}
                className="pd-showcase-bottle"
              />
            </div>

            <div className="pd-hero-content">
              <span className="pd-eyebrow">
                <i className="bi bi-flower2" />
                {productMindHealLabel(product.mindHealNo, product.sortOrder)}
              </span>

              <h1 className="pd-title">{product.name}</h1>

              {product.shortDescription && (
                <p className="pd-lead">{product.shortDescription}</p>
              )}

              <div className="pd-hero-tags">
                <ProductEmotionalTags emotionalTags={product.emotionalTags} />
              </div>

              <div className="pd-price-card">
                <ProductPrice product={product} size="lg" />
                <p className="pd-price-note">
                  Inclusive pricing · Cash on delivery available
                </p>
              </div>

              <ProductDetailActions product={product} />
            </div>
          </div>
        </div>
      </section>

      <section className="pd-trust">
        <div className="container">
          <div className="pd-trust-grid">
            {TRUST_ITEMS.map((item) => (
              <article className="pd-trust-item" key={item.title}>
                <span className="pd-trust-icon">
                  <i className={`bi ${item.icon}`} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {showHealingNote && (
        <section className="pd-healing">
          <div className="container">
            <article className="pd-healing-card">
              <span className="pd-healing-icon" aria-hidden>
                <i className="bi bi-journal-richtext" />
              </span>
              <div>
                <h2>Healing Note</h2>
                <p className="pd-healing-text">{product.description}</p>
              </div>
            </article>
          </div>
        </section>
      )}

      {relatedProducts.length > 0 && (
        <RelatedProducts products={relatedProducts} />
      )}
    </main>
  );
}

function RelatedProducts({ products }) {
  const containerRef = useRef(null);
  const swiperRef = useRef(null);
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !products.length) return undefined;

    const nextEl = container.querySelector(".js-pd-related-next");
    const prevEl = container.querySelector(".js-pd-related-prev");

    swiperRef.current = new Swiper(container, {
      loop: products.length > 4,
      speed: 700,
      grabCursor: true,
      simulateTouch: true,
      autoplay: {
        delay: 2800,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      slidesPerView: 1.15,
      spaceBetween: 16,
      navigation: { nextEl, prevEl },
      breakpoints: {
        576: { slidesPerView: 2, spaceBetween: 16 },
        768: { slidesPerView: 3, spaceBetween: 18 },
        992: { slidesPerView: 4, spaceBetween: 20 },
      },
      observer: true,
      observeParents: true,
    });

    return () => {
      swiperRef.current?.destroy(true, true);
      swiperRef.current = null;
    };
  }, [products]);

  const handleAdd = (item) => {
    addToCart(item);
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <section className="pd-related">
      <div className="container">
        <div className="pd-related-head">
          <span className="pd-related-eyebrow">You may also like</span>
          <h2>Explore More Remedies</h2>
          <p>Discover other Bach Flower blends crafted for emotional balance</p>
        </div>

        <div ref={containerRef} className="swiper pd-related-slider bottle-slider">
          <button
            type="button"
            className="bottle-nav bottle-nav--prev js-pd-related-prev"
            aria-label="Previous products"
          >
            <i className="bi bi-chevron-left" />
          </button>
          <button
            type="button"
            className="bottle-nav bottle-nav--next js-pd-related-next"
            aria-label="Next products"
          >
            <i className="bi bi-chevron-right" />
          </button>

          <div className="swiper-wrapper">
            {products.map((item) => {
              const { mrp, salePrice, discountPercent } = getProductPricing(item);
              return (
                <div className="swiper-slide" key={item.id}>
                  <article className="bottle-card pd-related-card">
                    <div className="bottle-card-media">
                      {discountPercent > 0 && (
                        <span className="bottle-card-discount">
                          {discountPercent}% OFF
                        </span>
                      )}
                      <img
                        src={bottleImageSrc(item)}
                        alt={item.name}
                        className="bottle-card-img"
                        loading="lazy"
                        draggable={false}
                      />
                    </div>
                    <div className="bottle-card-body">
                      <span className="bottle-card-no">
                        {productMindHealLabel(item.mindHealNo, item.sortOrder)}
                      </span>
                      <h3 className="bottle-card-name pd-related-name">
                        {item.name}
                      </h3>
                      <div className="bottle-card-price">
                        <span className="bottle-card-sale">
                          {formatPrice(salePrice)}
                        </span>
                        {mrp > salePrice && (
                          <span className="bottle-card-mrp">{formatPrice(mrp)}</span>
                        )}
                      </div>
                      <div className="mix-grid-actions pd-related-actions">
                        <button
                          type="button"
                          className={`mix-grid-cart ${
                            addedId === item.id ? "mix-grid-cart--added" : ""
                          }`}
                          onClick={() => handleAdd(item)}
                        >
                          <i
                            className={`bi ${
                              addedId === item.id ? "bi-check-lg" : "bi-cart-plus"
                            }`}
                          />
                          {addedId === item.id ? "Added" : "Add to Cart"}
                        </button>
                        <Link
                          to={`/products/${item.slug}`}
                          className="mix-grid-view"
                        >
                          <i className="bi bi-eye" />
                          View
                        </Link>
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center">
          <Link to="/buy_mh_mix" className="pd-related-cta">
            View All Mixes
            <i className="bi bi-arrow-right" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProductDetailActions({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <>
      <div className="pd-actions">
        <button
          type="button"
          className={`pd-btn pd-btn--primary ${added ? "pd-btn--added" : ""}`}
          onClick={handleAdd}
        >
          <i className={`bi ${added ? "bi-check-lg" : "bi-cart-plus"}`} />
          {added ? "Added to Cart" : "Add to Cart"}
        </button>
        <Link to="/cart" className="pd-btn pd-btn--ghost">
          <i className="bi bi-cart3" />
          View Cart
        </Link>
      </div>
      <Link to="/contact" className="pd-help-link">
        Need help finding the right remedy? Talk to us
        <i className="bi bi-arrow-right" />
      </Link>
    </>
  );
}
