import { useEffect, useRef } from "react";
import { Link } from "react-router";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";

import ProductEmotionalTags from "~/components/ProductEmotionalTags";
import { imageSrc } from "~/utils/format";

export default function PopularMixture({ products = [] }) {
  const swiperContainerRef = useRef(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    const container = swiperContainerRef.current;
    if (!container || !products.length) return;

    const paginationEl = container.querySelector(".swiper-pagination");
    const nextEl = container.querySelector(".js-custom-next");
    const prevEl = container.querySelector(".js-custom-prev");

    swiperRef.current = new Swiper(container, {
      loop: products.length > 1,
      speed: 600,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      slidesPerView: 1,
      spaceBetween: 30,
      pagination: {
        el: paginationEl,
        type: "bullets",
        clickable: true,
      },
      navigation: { nextEl, prevEl },
      breakpoints: {
        768: { slidesPerView: 2, spaceBetween: 30 },
        1200: { slidesPerView: 3, spaceBetween: 40 },
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

  return (
    <section id="services-2" className="services-2 section dark-background">
      <div className="container section-title">
        <h2>Popular Mixture</h2>
        <p>Mostly Prescribe Mixture And Popular Mixture</p>
      </div>

      <div className="services-carousel-wrap">
        <div className="container">
          <div ref={swiperContainerRef} className="swiper popular-mixture-swiper">
            <button
              type="button"
              className="navigation-prev js-custom-prev"
              aria-label="Previous slide"
            >
              <i className="bi bi-arrow-left-short" />
            </button>
            <button
              type="button"
              className="navigation-next js-custom-next"
              aria-label="Next slide"
            >
              <i className="bi bi-arrow-right-short" />
            </button>

            <div className="swiper-wrapper">
              {products.map((product) => (
                <div className="swiper-slide" key={product.id}>
                  <div className="service-item">
                    <div className="service-item-contents">
                      <Link to={`/products/${product.slug}`}>
                        <span className="service-item-category">Our Popular Mixture</span>
                        <h2 className="service-item-title">{product.name}</h2>
                        <ProductEmotionalTags
                          emotionalTags={product.emotionalTags}
                          className="mt-2"
                        />
                      </Link>
                    </div>
                    <img
                      src={imageSrc(product.image)}
                      alt={product.name}
                      className="img-fluid"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="swiper-pagination" />
          </div>
        </div>
      </div>
    </section>
  );
}
