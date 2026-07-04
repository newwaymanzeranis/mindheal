import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";

import ProductEmotionalTags from "~/components/ProductEmotionalTags";
import { useCart } from "~/context/CartContext";
import { useLang } from "~/context/LanguageContext";
import {
  bottleImageSrc,
  cleanProductName,
  formatPrice,
  productMindHealLabel,
} from "~/utils/format";
import { getProductPricing } from "~/utils/pricing";

export default function PopularMixture({ products = [] }) {
  const { t, tc } = useLang();
  const swiperContainerRef = useRef(null);
  const swiperRef = useRef(null);
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState(null);

  useEffect(() => {
    const container = swiperContainerRef.current;
    if (!container || !products.length) return;

    const paginationEl = container.querySelector(".swiper-pagination");
    const nextEl = container.querySelector(".js-custom-next");
    const prevEl = container.querySelector(".js-custom-prev");

    swiperRef.current = new Swiper(container, {
      loop: products.length > 4,
      speed: 600,
      grabCursor: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      slidesPerView: 1,
      spaceBetween: 24,
      pagination: {
        el: paginationEl,
        type: "bullets",
        clickable: true,
      },
      navigation: { nextEl, prevEl },
      breakpoints: {
        576: { slidesPerView: 2, spaceBetween: 24 },
        992: { slidesPerView: 4, spaceBetween: 24 },
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
    <section id="services-2" className="services-2 section pm-section">
      <div className="container pm-head">
        <span className="pm-eyebrow">{t("home.popular.eyebrow")}</span>
        <h2 className="pm-title">{t("home.popular.title")}</h2>
        <p className="pm-subtitle">{t("home.popular.subtitle")}</p>
      </div>

      <div className="container">
        <div ref={swiperContainerRef} className="swiper pm-swiper">
          <button
            type="button"
            className="pm-nav pm-nav--prev js-custom-prev"
            aria-label="Previous slide"
          >
            <i className="bi bi-chevron-left" />
          </button>
          <button
            type="button"
            className="pm-nav pm-nav--next js-custom-next"
            aria-label="Next slide"
          >
            <i className="bi bi-chevron-right" />
          </button>

          <div className="swiper-wrapper">
            {products.map((product) => {
              const { mrp, salePrice, discountPercent } =
                getProductPricing(product);
              return (
                <div className="swiper-slide" key={product.id}>
                  <article className="pm-card">
                    <div className="pm-card-media">
                      <span className="pm-card-pill">
                        <i className="bi bi-star-fill" /> {t("home.popular.pill")}
                      </span>
                      {discountPercent > 0 && (
                        <span className="pm-card-discount">
                          {discountPercent}% {t("common.off")}
                        </span>
                      )}
                      <img
                        src={bottleImageSrc(product)}
                        alt={tc(product, "name")}
                        className="pm-card-img"
                        draggable={false}
                        loading="lazy"
                      />
                    </div>
                    <div className="pm-card-body">
                      <span className="pm-card-no">
                        {productMindHealLabel(
                          product.mindHealNo,
                          product.sortOrder
                        )}
                      </span>
                      <h3 className="pm-card-name">
                        {cleanProductName(tc(product, "name"))}
                      </h3>
                      <ProductEmotionalTags
                        emotionalTags={product.emotionalTags}
                        emotionalTagsHi={product.emotionalTagsHi}
                        className="mb-2 gap-0"
                      />
                      <div className="pm-card-price">
                        <span className="pm-card-sale">
                          {formatPrice(salePrice)}
                        </span>
                        {mrp > salePrice && (
                          <span className="pm-card-mrp">{formatPrice(mrp)}</span>
                        )}
                      </div>
                      <div className="pm-card-actions">
                        <button
                          type="button"
                          className={`pm-card-cart ${
                            addedId === product.id ? "pm-card-cart--added" : ""
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
                          {addedId === product.id
                            ? t("common.added")
                            : t("common.addToCart")}
                        </button>
                        <Link
                          to={`/products/${product.slug}`}
                          className="pm-card-view"
                        >
                          <i className="bi bi-eye" />
                          {t("common.view")}
                        </Link>
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>

          <div className="swiper-pagination" />
        </div>
      </div>
    </section>
  );
}
