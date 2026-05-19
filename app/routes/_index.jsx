import { useEffect } from "react";
import { useLoaderData } from "react-router";

import BFMixture from "~/components/BFMixture";
import HeaderSlider from "~/components/HeadSlider";
import PopularMixture from "~/components/PopularMixture";
import RecentPosts from "~/components/RecentPosts";
import RemediesExpert from "~/components/RemediesExpert";
import Testimonials from "~/components/Testimonials";
import WhyChooseUs from "~/components/WhyChooseUs";
import { useSiteScripts } from "~/hooks/useSiteScripts";
import {
  fetchHomeSlides,
  fetchPosts,
  fetchProducts,
  fetchTestimonials,
} from "~/lib/fetchApi.server";
import { initHomePage } from "~/utils/siteInit";

export async function loader({ request }) {
  const opts = { request };
  const [slides, posts, products, testimonials] = await Promise.all([
    fetchHomeSlides(opts),
    fetchPosts("published=true&limit=3&categorySlug=bach-flower", opts),
    fetchProducts("published=true&limit=50", opts),
    fetchTestimonials(opts),
  ]);

  return { slides, posts, products, testimonials };
}

export default function Index() {
  const { slides, posts, products, testimonials } = useLoaderData();
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
      <PopularMixture products={products} />
      <Testimonials items={testimonials} />
      <RecentPosts posts={posts} />
    </main>
  );
}
