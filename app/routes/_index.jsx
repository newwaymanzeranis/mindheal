import { useEffect } from "react";
import { useLoaderData } from "react-router";

import BFMixture from "~/components/BFMixture";
import HeaderSlider from "~/components/HeadSlider";
import HomeDisclaimer from "~/components/HomeDisclaimer";
import PopularMixture from "~/components/PopularMixture";
import RecentPosts from "~/components/RecentPosts";
import RemediesExpert from "~/components/RemediesExpert";
import Testimonials from "~/components/Testimonials";
import WhyChooseUs from "~/components/WhyChooseUs";
import { useSiteScripts } from "~/hooks/useSiteScripts";
import {
  fetchAllProducts,
  fetchHomeSlides,
  fetchPosts,
  fetchTestimonials,
} from "~/lib/fetchApi.server";
import { initHomePage } from "~/utils/siteInit";
import {
  buildPageMeta,
  getSiteUrl,
  organizationJsonLd,
  websiteJsonLd,
} from "~/utils/seo";
import productSliderCss from "~/styles/product-slider.css?url";
import whyChooseUsCss from "~/styles/why-choose-us.css?url";
import remediesExpertCss from "~/styles/remedies-expert.css?url";
import popularMixtureCss from "~/styles/popular-mixture.css?url";
import testimonialsCss from "~/styles/testimonials.css?url";

export const links = () => [
  { rel: "stylesheet", href: productSliderCss },
  { rel: "stylesheet", href: whyChooseUsCss },
  { rel: "stylesheet", href: remediesExpertCss },
  { rel: "stylesheet", href: popularMixtureCss },
  { rel: "stylesheet", href: testimonialsCss },
];

function pickRandomProducts(products, count = 8) {
  if (products.length <= count) return products;

  const shuffled = [...products];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled.slice(0, count);
}

export async function loader({ request }) {
  const opts = { request };
  const [slides, posts, products, testimonials] = await Promise.all([
    fetchHomeSlides(opts),
    fetchPosts("published=true&limit=3&categorySlug=bach-flower", opts),
    fetchAllProducts("published=true", opts),
    fetchTestimonials(opts),
  ]);

  const sortedProducts = products.sort(
    (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)
  );

  return {
    slides,
    posts,
    products: sortedProducts,
    popularProducts: pickRandomProducts(sortedProducts, 8),
    testimonials,
  };
}

export function meta() {
  const siteUrl = getSiteUrl();

  return buildPageMeta({
    title: "Mind Heal — Bach Flower Remedies for Emotional Wellness",
    description:
      "Mind Heal offers 75+ pre-mixed Bach Flower remedy blends for anxiety, stress, OCD, exam pressure, sleep issues and emotional balance. 100% natural, expert-crafted, Cash on Delivery across India.",
    path: "/",
    image: "/android-chrome-512x512.png",
    imageAlt: "Mind Heal — Bach Flower Remedies for Emotional Wellness",
    siteUrl,
    jsonLd: [organizationJsonLd(siteUrl), websiteJsonLd(siteUrl)],
  });
}

export default function Index() {
  const { slides, posts, products, popularProducts, testimonials } = useLoaderData();
  const scriptsReady = useSiteScripts();

  useEffect(() => {
    if (!scriptsReady) return;

    let cleanup = () => {};

    const frame = requestAnimationFrame(() => {
      cleanup = initHomePage() ?? (() => {});
    });

    return () => {
      cancelAnimationFrame(frame);
      cleanup();
    };
  }, [scriptsReady]);

  return (
    <main className="main">
      <HeaderSlider slides={slides} />
      <BFMixture products={products} />
      <WhyChooseUs />
      <RemediesExpert />
      <PopularMixture products={popularProducts} />
      <Testimonials items={testimonials} />
      <RecentPosts posts={posts} />
      <HomeDisclaimer />
    </main>
  );
}
