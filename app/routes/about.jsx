




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
  <div className="page-title dark-background" data-aos="fade" style={{backgroundImage: 'url(assets/img/page-title-bg.webp)'}}>
    <div className="container position-relative">
      <h1>About</h1>
      <p>Your Healing Partner with Bach Flower Remedies - We provide professionally pre-mixed Bach Flower Remedies </p>
      <nav className="breadcrumbs">
        <ol>
          <li><a href="index.html">Home</a></li>
          <li className="current">About</li>
        </ol>
      </nav>
    </div>
  </div>{/* End Page Title */}
  {/* About 3 Section */}
  <section id="about-3" className="about-3 section" style={{'padding-bottom':'0px'}}>
    <div className="container">
      <div className='row'>
      <h2 className="text-center">MIND HEAL is your Healing Partner with Bach Flower Remedies</h2>
      </div>
      <div className="row gy-4 justify-content-between align-items-center">
        <div className="col-lg-6 order-lg-2 position-relative" data-aos="zoom-out">
          <img src={`/assets/img/img_sq_1.jpeg`} alt="Image" className="img-fluid" />
          <a href="https://www.youtube.com/watch?v=Y7f98aduVJ8" className="glightbox pulsating-play-btn">
            <span className="play"><i className="bi bi-play-fill" /></span>
          </a>
        </div>
        <div className="col-lg-5 order-lg-1" data-aos="fade-up" data-aos-delay={100}>
          
          <p className="mb-4 mt-5">
          Welcome to MIND HEAL, your trusted source for Pre-Mixed Bach Flower Remedies designed to support your emotional and mental well-being naturally and gently.
          At our clinic, we understand that life's emotional challenges—like anxiety, fear, grief, stress, confusion, or mood swings—can deeply affect your overall health. That’s why we specialize in personalized Bach Flower therapy, a safe, non-habit forming, and holistic system discovered by Dr. Edward Bach.
          </p>
          <h4>We provide professionally pre-mixed Bach Flower Remedies tailored to specific emotional states such as:</h4>
          <br />
          <ul className="list-unstyled list-check mb-2" >
            <li>Exam stress and mental blocks</li>
            <li>Relationship issues</li>
            <li>Anxiety and panic</li>
            <li>Mood swings or sadness</li>
            <li>Lack of focus or motivation</li>
            <li>Fear, anger, jealousy, guilt</li>
            <li>Sleeplessness and restlessness</li>
          </ul>
          <a href="#"><h3>See All Products ➤</h3></a>
          <br />

         {/*  <p><a href="#" className="btn-cta">Get in touch</a></p> */}
        </div>
      </div>
    </div>
  </section>{/* /About 3 Section */}
  {/* Team Section */}
  <section className="team-15 team section" id="team" style={{'padding-top':'0px'}}>
    {/* Section Title */}
    <div className="container section-title" data-aos="fade-up">
      <h2>MIND HEAL TEAM</h2>
      <h5>Meet the Caring Experts Behind Your Emotional and Mental Wellness Journey</h5>
    </div>{/* End Section Title */}
    <div className="content">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6 mb-4">
            <div className="person">
              <figure>
                <img src="assets/img/doctors/dr_zulfequar.jpg" alt="Image" className="img-fluid" />
                <div className="social">
                  <a href="#"><span className="bi bi-facebook" /></a>
                  <a href="#"><span className="bi bi-twitter-x" /></a>
                  <a href="#"><span className="bi bi-linkedin" /></a>
                </div>
              </figure>
              <div className="person-contents">
                <h3>Dr. Zulfequar</h3>
                <span className="position">BHMS. M.D. (25Y- Exp.)</span>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-4">
            <div className="person">
              <figure>
                <img src="assets/img/doctors/dr_zahir.jpg" alt="Image" className="img-fluid" />
                <div className="social">
                  <a href="#"><span className="bi bi-facebook" /></a>
                  <a href="#"><span className="bi bi-twitter-x" /></a>
                  <a href="#"><span className="bi bi-linkedin" /></a>
                </div>
              </figure>
              <div className="person-contents">
                <h3>Dr. Zahir</h3>
                <span className="position">BHMS (10Y Exp.)</span>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-4">
            <div className="person">
              <figure>
                <img src="assets/img/doctors/dr_talha.jpeg" alt="Image" className="img-fluid" />
                <div className="social">
                  <a href="#"><span className="bi bi-facebook" /></a>
                  <a href="#"><span className="bi bi-twitter-x" /></a>
                  <a href="#"><span className="bi bi-linkedin" /></a>
                </div>
              </figure>
              <div className="person-contents">
                <h3>Dr. Talha</h3>
                <span className="position">BHMS. M.D. (10Y Exp.)</span>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-4">
            <div className="person">
              <figure>
                <img src="assets/img/team/team4.jpg" alt="Image" className="img-fluid" />
                <div className="social">
                  <a href="#"><span className="bi bi-facebook" /></a>
                  <a href="#"><span className="bi bi-twitter-x" /></a>
                  <a href="#"><span className="bi bi-linkedin" /></a>
                </div>
              </figure>
              <div className="person-contents">
                <h3>Manzer Anis</h3>
                <span className="position">A Level Certificate (5Y Exp.)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>{/* /Team Section */}
  {/* Services Section */}
  <section id="services" className="services section">
    {/* Section Title */}
    <div className="container section-title" data-aos="fade-up">
      <h2>SERVICES</h2>
      <p>Providing Fresh Produce Every Single Day</p>
    </div>{/* End Section Title */}
    <div className="content">
      <div className="container">
        <div className="row g-0">
          <div className="col-lg-3 col-md-6">
            <div className="service-item">
              
              <div className="service-item-icon text-center">
                <img src="/assets/img/services/consultent.jpg" alt="Free Consult" style={{'width':'150px', 'height':'102px'}} />
              </div>
              <div className="service-item-content">
                <h3 className="service-heading">Free Consult</h3>
                <p>
                <h6>Start Your Healing Journey with a Free Consultation</h6>
<p>Get expert guidance on which remedies are right for your emotional needs. We'll listen, understand, 
and create a personalized healing path — completely free.</p>
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="service-item">
              
              <div className="service-item-icon text-center">
              <img src="/assets/img/services/discus.jpg" alt="Free Discussion" style={{'width':'150px', 'height':'102px'}} />
              </div>
              <div className="service-item-content">
                <h3 className="service-heading">Free Discussion</h3>
                <h6>Let's Talk - Your Emotions Matter Freely</h6>
                <p>A safe space where you can share your thoughts, feelings, 
                  and emotional struggles freely. No pressure — just understanding and gentle guidance. <br /><br /></p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="service-item">
             
              <div className="service-item-icon text-center">
              <img src="/assets/img/services/mixup.jpg" alt="Free Mixing Help" style={{'width':'150px', 'height':'102px'}} />
              </div>
              <div className="service-item-content">
                <h3 className="service-heading">Free Mixing Help</h3>
                <h6>We'll Prepare Your Custom Remedy Blend for Free</h6>
                <p>
                Got the remedy list but unsure how to mix them? 
                We'll help you create your perfect personalized blend in the right dosage and proportion — without any extra charge.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="service-item">
              
              <div className="service-item-icon text-center">
              <img src="/assets/img/services/eqtest.jpg" alt="Free Emotional Test" style={{'width':'150px', 'height':'102px'}} />
              </div>
              <div className="service-item-content">
                <h3 className="service-heading">Free Emotional Test</h3>
                <h6>Understand What Your Mind & Emotions Are Telling You</h6>
                <p>
                Are you feeling anxious, sad, confused, angry, or just lost — but not sure why?
                Our Free Emotional Test is designed to help you clearly identify the emotions you're struggling with.
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  </section>{/* /Services Section */}
  {/* Call To Action Section */}
  <section id="call-to-action" className="call-to-action section light-background">
    <div className="content">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-12">
            <h4>Healing doesn't mean the damage never existed.
It means the pain no longer controls your life.
Start your journey with MIND HEAL — your mind deserves peace.</h4>
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