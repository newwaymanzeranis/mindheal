




import Header from '../components/Header';
import Footer from '../components/Footer';
import { useEffect } from "react";

export default function about(){

  useEffect(() => {
    const scripts = [
      "/assets/vendor/aos/aos.js",
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

return (
  <> 
        {/* Header */}
        <Header />
       
     {/* Services Section */}
     <main className="main">
  {/* Page Title */}
  <div className="page-title dark-background" data-aos="fade" style={{backgroundImage: 'url(assets/img/page-title-bg.jpg)'}}>
    <div className="container position-relative">
      <h1>Blogs</h1>
      <p>Your Healing Partner with Bach Flower Remedies -Learn & Thrive with the Wisdom of Our Experience! </p>
      <nav className="breadcrumbs">
        <ol>
          <li><a href="index.html">Home</a></li>
          <li className="current">Blogs</li>
        </ol>
      </nav>
    </div>
  </div>{/* End Page Title */}
  
  {/* Blog Section */}
  
  <section id="blog-posts-2" className="blog-posts-2 section">
  <div className="container">
  <h2 className="text-center">MIND HEAL is your Healing Partner - Blogs</h2>
  <p className='text-center' style={{'font-family':'var(--heading-font)','font-size':'32px'}}>Learn & Thrive with the Wisdom of Our Experience!</p>
    <div className="row gy-4">
      <div className="col-lg-4">
        <article className="position-relative h-100">
          <div className="post-img position-relative overflow-hidden">
            <img src="assets/img/blog/blog4.png" className="img-fluid" alt />
          </div>
          <div className="meta d-flex align-items-end">
            <span className="post-date"><span>12</span>December</span>
            <div className="d-flex align-items-center">
              <i className="bi bi-person" /> <span className="ps-2">Manzer Anis</span>
            </div>
            
          </div>
          <div className="post-content d-flex flex-column">
            <h3 className="post-title">Bach Flower Remedies: Ek Natural Healing Ka Jadoo</h3>
            <a href="blog-details.html" className="readmore stretched-link"><span>Read More</span><i className="bi bi-arrow-right" /></a>
          </div>
        </article>
      </div>{/* End post list item */}
      <div className="col-lg-4">
        <article className="position-relative h-100">
          <div className="post-img position-relative overflow-hidden">
            <img src="assets/img/blog/blog5.jpeg" className="img-fluid" alt />
          </div>
          <div className="meta d-flex align-items-end">
            <span className="post-date"><span>19</span>March</span>
            <div className="d-flex align-items-center">
              <i className="bi bi-person" /> <span className="ps-2">Manzer Anis</span>
            </div>
            
          </div>
          <div className="post-content d-flex flex-column">
            <h3 className="post-title">Bach Flower Medicine Kya Hai aur Kaise Kaam Karti Hai?</h3>
            <a href="blog-details.html" className="readmore stretched-link"><span>Read More</span><i className="bi bi-arrow-right" /></a>
          </div>
        </article>
      </div>{/* End post list item */}
      <div className="col-lg-4">
        <article className="position-relative h-100">
          <div className="post-img position-relative overflow-hidden">
            <img src="assets/img/blog/blog6.jpeg" className="img-fluid" alt />
          </div>
          <div className="meta d-flex align-items-end">
            <span className="post-date"><span>24</span>June</span>
            <div className="d-flex align-items-center">
              <i className="bi bi-person" /> <span className="ps-2">Manzer Anis</span>
            </div>
            
          </div>
          <div className="post-content d-flex flex-column">
            <h3 className="post-title">38 Bach Flower Remedies: Har Emotion ke liye Ek Healing Drop</h3>
            <a href="blog-details.html" className="readmore stretched-link"><span>Read More</span><i className="bi bi-arrow-right" /></a>
          </div>
        </article>
      </div>{/* End post list item */}
      <div className="col-lg-4">
        <article className="position-relative h-100">
          <div className="post-img position-relative overflow-hidden">
            <img src="assets/img/blog/blog5.jpeg" className="img-fluid" alt />
          </div>
          <div className="meta d-flex align-items-end">
            <span className="post-date"><span>05</span>August</span>
            <div className="d-flex align-items-center">
              <i className="bi bi-person" /> <span className="ps-2">Manzer Anis</span>
            </div>
           
          </div>
          <div className="post-content d-flex flex-column">
            <h3 className="post-title">Kaise Choose Karein Sahi Bach Flower Remedy Apne Symptoms ke Liye?</h3>
            <a href="blog-details.html" className="readmore stretched-link"><span>Read More</span><i className="bi bi-arrow-right" /></a>
          </div>
        </article>
      </div>{/* End post list item */}
      <div className="col-lg-4">
        <article className="position-relative h-100">
          <div className="post-img position-relative overflow-hidden">
            <img src="assets/img/blog/blog3.jpeg" className="img-fluid" alt />
          </div>
          <div className="meta d-flex align-items-end">
            <span className="post-date"><span>17</span>September</span>
            <div className="d-flex align-items-center">
              <i className="bi bi-person" /> <span className="ps-2">Manzer Anis</span>
            </div>
            
          </div>
          <div className="post-content d-flex flex-column">
            <h3 className="post-title">Mind Heal with Flowers: Bach Flower Therapy for Overthinking, Fear & Anxiety</h3>
            <a href="blog-details.html" className="readmore stretched-link"><span>Read More</span><i className="bi bi-arrow-right" /></a>
          </div>
        </article>
      </div>{/* End post list item */}
      <div className="col-lg-4">
        <article className="position-relative h-100">
          <div className="post-img position-relative overflow-hidden">
            <img src="assets/img/blog/blog8.jpeg" className="img-fluid" alt />
          </div>
          <div className="meta d-flex align-items-end">
            <span className="post-date"><span>07</span>December</span>
            <div className="d-flex align-items-center">
              <i className="bi bi-person" /> <span className="ps-2">Manzer Anis</span>
            </div>
            
          </div>
          <div className="post-content d-flex flex-column">
            <h3 className="post-title">Bach Flower No. 01 to No. 38: Ek Ek Remedy Ki Asaan Bhasha Mein Pehchaan</h3>
            <a href="blog-details.html" className="readmore stretched-link"><span>Read More</span><i className="bi bi-arrow-right" /></a>
          </div>
        </article>
      </div>{/* End post list item */}
    </div>
  </div>
</section>{/* /Blog Posts 2 Section */}

{/* Blog Pagination Section */}
<section id="blog-pagination" className="blog-pagination section">
  <div className="container">
    <div className="d-flex justify-content-center">
      <ul>
        <li><a href="#"><i className="bi bi-chevron-left" /></a></li>
        <li><a href="#">1</a></li>
        <li><a href="#" className="active">2</a></li>
        <li><a href="#">3</a></li>
        <li><a href="#">4</a></li>
        <li>...</li>
        <li><a href="#">10</a></li>
        <li><a href="#"><i className="bi bi-chevron-right" /></a></li>
      </ul>
    </div>
  </div>
</section>{/* /Blog Pagination Section */}


  {/* Blog Section */}
  
  {/* Call To Action Section */}
  <section id="call-to-action" className="call-to-action section light-background">
    <div className="content">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-12">
            <h4>No pressure. Just gentle healing.
            Your feelings are valid. We're here to support you.
            Let's talk, not just treat.</h4>
            <p className="opacity-50">
            Begin with calm. Heal with care. Grow with love.
            </p>
          </div>
          
        </div>
      </div>
    </div>
  </section>{/* /Call To Action Section */}
</main>
<Footer />
  </>

)


}