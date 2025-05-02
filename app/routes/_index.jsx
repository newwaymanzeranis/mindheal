import { useEffect } from "react";
import { Link } from "@remix-run/react";

import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import Header from '~/components/Header';
import HeaderSlider from '~/components/HeadSlider';
import BFMixture from '~/components/BFMixture';
import WhyChooseUs from '~/components/WhyChooseUs';
import RemediesExpert from '~/components/RemediesExpert';
import PopularMixture from '~/components/PopularMixture';
import Testimonials from '~/components/Testimonials';
import RecentPosts from '~/components/RecentPosts';
import Footer from '~/components/Footer';
/* import AOS from "aos";
import "aos/dist/aos.css"; */ 
export default function Index() {
  useEffect(() => {
    const scripts = [
      "/assets/vendor/bootstrap/js/bootstrap.bundle.min.js",
      "/assets/vendor/aos/aos.js",
      /* "/assets/vendor/swiper/swiper-bundle.min.js", */
      "/assets/vendor/glightbox/js/glightbox.min.js",
      "/assets/js/main.js",
    ];

    let loadedScripts = 0;

    scripts.forEach((src) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;

      script.onload = () => {
        loadedScripts++;
        console.log(`${src} loaded`);

        // Initialize AOS **only after** its script is loaded
        if (src.includes("aos.js") && window.AOS) {
          window.AOS.init();
          console.log("AOS initialized!");
        }
      };

      script.onerror = () => console.error(`Failed to load ${src}`);

      document.body.appendChild(script);
    });

    return () => {
      scripts.forEach((src) => {
        const script = document.querySelector(`script[src="${src}"]`);
        if (script) document.body.removeChild(script);
      });
    };

  }, []);

  useEffect(() => {
    const swiper = new Swiper(".init-swiper", {
      loop: true,
      speed: 600,
      autoplay: {
        delay: 5000,
      },
      slidesPerView: "auto",
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
        clickable: true,
      },
      navigation: {
        nextEl: ".js-custom-next",
        prevEl: ".js-custom-prev",
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 40,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
      },
    });

    return () => {
      swiper.destroy();
    };
  }, []);

  return (
    <div className="index-page">
      {/* Header */}
      <Header />
       {/* Hero Section */}
      <HeaderSlider />
     {/* Services Section */}
      
     <BFMixture /> 

{/* About Section */}
      <WhyChooseUs />


{/* About 3 Section */}
 <RemediesExpert />
{/* Services 2 Section */}
<PopularMixture />
{/* testimonial Section */}
<Testimonials />

{/* Recent Posts Section */}
<RecentPosts />
      {/* Footer */}
      <Footer />

      {/* Scroll to Top Button */}
      <a href="#" id="scroll-top" className="scroll-top d-flex align-items-center justify-content-center">
        <i className="bi bi-arrow-up-short"></i>
      </a>
    </div>
  );
}
