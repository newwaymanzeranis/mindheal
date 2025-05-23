




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
      <h1>Choose and Order Your Own Mind Heal Mix</h1>
      <p>Your Healing Partner with Bach Flower Remedies -Choose and Order Your Own Mind Heal Mix! </p>
      <nav className="breadcrumbs">
        <ol>
          <li><a href="index.html">Home</a></li>
          <li className="current">Buy Mind Heal Mix</li>
        </ol>
      </nav>
    </div>
  </div>{/* End Page Title */}
  
  {/* Blog Section */}
  
  <section id="blog-posts-2" className="blog-posts-2 section">
  <div className="container">
  <h2 className="text-center">Find the Perfect Mind Heal Mix Made Just for You</h2>
  <p className='text-center' style={{'font-family':'var(--heading-font)','font-size':'32px'}}>
    Pick the Healing Blend That Feels Right for You or Your Loved One</p>
    <div className="row gy-4">
      <div className="col-lg-4">
        <article className="position-relative h-100">
          <div className="post-img position-relative overflow-hidden">
            <img src="assets/img/blog/blog4.png" className="img-fluid" alt />
          </div>
          <div className="meta d-flex align-items-end">
           {/*  <span className="post-date"><span>12</span>December</span>
            <div className="d-flex align-items-center">
              <i className="bi bi-person" /> <span className="ps-2">Manzer Anis</span>
            </div> */}
            <div className='post-date' style={{'width':'100%', 'margin-right':'0px','font-weight':'bold','font-size':'18px'}}> MIND HEAL NO. 01</div>
          </div>
          <div className="post-content d-flex flex-column">
            <h3 className="post-title">Obsessive-Compulsive Disorder (OCD)</h3>
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
          <div className='post-date' style={{'width':'100%', 'margin-right':'0px','font-weight':'bold','font-size':'18px'}}> MIND HEAL NO. 02</div>
            
          </div>
          <div className="post-content d-flex flex-column">
            <h3 className="post-title">Social/Emotional issues  </h3>
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
          <div className='post-date' style={{'width':'100%', 'margin-right':'0px','font-weight':'bold','font-size':'18px'}}> MIND HEAL NO. 03</div>
            
          </div>
          <div className="post-content d-flex flex-column">
            <h3 className="post-title">Hyperactivity & concentration problems</h3>
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
          <div className='post-date' style={{'width':'100%', 'margin-right':'0px','font-weight':'bold','font-size':'18px'}}> MIND HEAL NO. 04</div>
           
          </div>
          <div className="post-content d-flex flex-column">
            <h3 className="post-title">Exam stress</h3>
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
          <div className='post-date' style={{'width':'100%', 'margin-right':'0px','font-weight':'bold','font-size':'18px'}}> MIND HEAL NO. 05</div>
            
          </div>
          <div className="post-content d-flex flex-column">
            <h3 className="post-title">General phobia</h3>
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
          <div className='post-date' style={{'width':'100%', 'margin-right':'0px','font-weight':'bold','font-size':'18px'}}> MIND HEAL NO. 06</div>
            
          </div>
          <div className="post-content d-flex flex-column">
            <h3 className="post-title">Comitment phobia</h3>
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