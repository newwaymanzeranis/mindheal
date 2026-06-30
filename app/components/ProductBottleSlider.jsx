import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";

import { useCart } from "~/context/CartContext";
import {
  bottleImageSrc,
  cleanProductName,
  formatPrice,
  productMindHealLabel,
} from "~/utils/format";
import { getProductPricing } from "~/utils/pricing";

export default function ProductBottleSlider({ products = [] }) {
  const containerRef = useRef(null);
  const swiperRef = useRef(null);
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !products.length) return;

    const nextEl = container.querySelector(".js-bottle-next");
    const prevEl = container.querySelector(".js-bottle-prev");

    swiperRef.current = new Swiper(container, {
      loop: products.length > 6,
      speed: 700,
      grabCursor: true,
      simulateTouch: true,
      autoplay: {
        delay: 2800,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      slidesPerView: 2,
      spaceBetween: 16,
      navigation: { nextEl, prevEl },
      breakpoints: {
        576: { slidesPerView: 3, spaceBetween: 16 },
        768: { slidesPerView: 4, spaceBetween: 18 },
        992: { slidesPerView: 5, spaceBetween: 20 },
        1200: { slidesPerView: 6, spaceBetween: 22 },
      },
      observer: true,
      observeParents: true,
    });

    return () => {
      swiperRef.current?.destroy(true, true);
      swiperRef.current = null;
    };
  }, [products]);

  if (!products.length) return null;

  const handleAdd = (product) => {
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <section className="bottle-slider-section">
      <div className="container">
        <div className="bottle-slider-head">
          <h3 className="bottle-slider-title">Shop Our Bach Flower Remedies</h3>
          <p className="bottle-slider-subtitle">
            Hand-picked remedies, ready to bring calm and balance to your day
          </p>
        </div>

        <div ref={containerRef} className="swiper bottle-slider">
          <button
            type="button"
            className="bottle-nav bottle-nav--prev js-bottle-prev"
            aria-label="Previous products"
          >
            <i className="bi bi-chevron-left" />
          </button>
          <button
            type="button"
            className="bottle-nav bottle-nav--next js-bottle-next"
            aria-label="Next products"
          >
            <i className="bi bi-chevron-right" />
          </button>

          <div className="swiper-wrapper">
            {products.map((product) => {
              const { mrp, salePrice, discountPercent } =
                getProductPricing(product);
              return (
                <div className="swiper-slide" key={product.id}>
                  <article className="bottle-card">
                    {discountPercent > 0 && (
                      <span className="bottle-card-discount">
                        {discountPercent}% OFF
                      </span>
                    )}
                    <div className="bottle-card-media">
                      <img
                        src={bottleImageSrc(product)}
                        alt={product.name}
                        className="bottle-card-img"
                        draggable={false}
                        loading="lazy"
                      />
                      <div className="bottle-card-overlay">
                        <button
                          type="button"
                          className={`bottle-card-cart ${
                            addedId === product.id
                              ? "bottle-card-cart--added"
                              : ""
                          }`}
                          onClick={() => handleAdd(product)}
                          aria-label={`Add ${product.name} to cart`}
                        >
                          <i
                            className={`bi ${
                              addedId === product.id
                                ? "bi-check-lg"
                                : "bi-cart-plus"
                            }`}
                          />
                          <span>
                            {addedId === product.id ? "Added" : "Add to Cart"}
                          </span>
                        </button>
                        <Link
                          to={`/products/${product.slug}`}
                          className="bottle-card-view"
                        >
                          <i className="bi bi-eye" />
                          <span>View Details</span>
                        </Link>
                      </div>
                    </div>
                    <div className="bottle-card-body">
                      <span className="bottle-card-no">
                        {productMindHealLabel(
                          product.mindHealNo,
                          product.sortOrder
                        )}
                      </span>
                      <h4 className="bottle-card-name">
                        {cleanProductName(product.name)}
                      </h4>
                      <div className="bottle-card-price">
                        <span className="bottle-card-sale">
                          {formatPrice(salePrice)}
                        </span>
                        {mrp > salePrice && (
                          <span className="bottle-card-mrp">
                            {formatPrice(mrp)}
                          </span>
                        )}
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
