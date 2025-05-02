




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
      <h1>Services</h1>
      <p>Your Healing Partner with Bach Flower Remedies - We provide professionally pre-mixed Bach Flower Remedies </p>
      <nav className="breadcrumbs">
        <ol>
          <li><a href="index.html">Home</a></li>
          <li className="current">Services</li>
        </ol>
      </nav>
    </div>
  </div>{/* End Page Title */}
  
  {/* services Section */}
  <section className="testimonials-12 testimonials section" id="testimonials">
  {/* Section Title */}
  <div className="container section-title" data-aos="fade-up">
  <h2 className="text-center">MIND HEAL is your Healing Partner - Services</h2>
    <p>Full List of Services - Simple, Gentle & Supportive</p>
  </div>{/* End Section Title */}
  <div className="testimonial-wrap">
    <div className="container">
      <div className="row">
        <div className="col-md-6 mb-4 mb-md-4">
          <div className="testimonial">
            <h4>Free Support Services</h4>
            <hr />
            <blockquote>
              <ol>
                <li><b>Free Consult - </b> Personalized guidance to choose the right remedies.</li>
                <li><b>Free Discussion  - </b> Open talk to understand your emotions deeply.</li>
                <li><b>Free Mixing Help  - </b> Help in preparing the right blend of remedies.</li>
                <li><b>Free Emotional Test / Quiz  - </b>  Find your emotional type via simple questions.</li>
                <li><b>Reminder Setup - </b> Get gentle reminders for follow-ups or refills.</li>
                <li><b>WhatsApp Support - </b> Quick emotional support and remedy help anytime.</li>
              </ol>
            </blockquote>
            
          </div>
        </div>
        <div className="col-md-6 mb-4 mb-md-4">
          <div className="testimonial">
          <h4>Personal Support Services</h4>
            <hr />
            <blockquote>
              <ol>
                <li><b>Direct Meet  - </b> Face-to-face session at our center.</li>
                <li><b>Telephonic Support  - </b> Talk to us from home for support and guidance.</li>
                <li><b>Follow-Up Check   - </b> We check your progress and suggest changes if needed.</li>
                <li><b>Emotion Tracker Help    - </b> Track your emotions daily with our simple guidance.</li>
              </ol>
            </blockquote>
          </div>
        </div>
        <div className="col-md-6 mb-4 mb-md-4">
          <div className="testimonial">
          <h4>Remedy & Delivery Services</h4>
            <hr />
            <blockquote>
              <ol>
                <li><b>Remedy Suggestion Only  - </b>  Just tell your problem, we'll suggest a mix.</li>
                <li><b>Repeat Blend Service   - </b> Reorder your previous remedy easily.</li>
                <li><b>Remedy Delivery   - </b> Get your remedy delivered to your doorstep.</li>
                <li><b>Custom Combo Packs  - </b>  Pre-made mixes for focus, sleep, stress, exams, etc.</li>
                <li><b>Emergency Care Drop  - </b> Quick support for sudden stress or anxiety.</li>
                
              </ol>
            </blockquote>
          </div>
        </div>
        <div className="col-md-6 mb-4 mb-md-4">
          <div className="testimonial">
          <h4>Child & Parent Care</h4>
            <hr />
            <blockquote>
              <ol>
                <li><b>Child Behavior Support   - </b>  Care plans for hyper, fearful, or emotional kids.</li>
                <li><b>ReParent Guidance Session    - </b> Helping parents manage emotional situations calmly.</li>
                
                
              </ol>
            </blockquote>
          </div>
        </div>
        <div className="col-md-6 mb-4 mb-md-4">
          <div className="testimonial">
          <h4>Group & Emotional Growth Services</h4>
            <hr />
            <blockquote>
              <ol>
                <li><b>Group Healing Session   - </b>  Join group talks or workshops for emotional healing.</li>
                <li><b>Stress Release Circle     - </b> Gentle group sharing and Bach support for stress relief.</li>
                <li><b>Inner Peace Session      - </b> Guided talk + remedy suggestions for calming the mind.</li>
                <li><b>Confidence Rebuild Session       - </b> Specially for self-doubt, fear, stage fright, etc.</li>
                <li><b>Grief & Loss Care        - </b> Emotional support after loss, breakups, or deep sadness.</li>
                <li><b>Anger Balance Care         - </b> Help for uncontrolled anger, frustration, or irritation.</li>
                
                
              </ol>
            </blockquote>
          </div>
        </div>
        <div className="col-md-6 mb-4 mb-md-4">
          <div className="testimonial">
          <h4>Special Add-On Services</h4>
            <hr />
            <blockquote>
              <ol>
                <li><b>Pre-Made Kids Kits   - </b>  Gentle remedy kits for school stress, tantrums, fears.</li>
                <li><b>Exam Calm Packs    - </b> Remedy sets for students under exam pressure.</li>
                <li><b>Daily Positivity Reminder    - </b> We send short, positive healing quotes/messages.</li>
                <li><b>Couple Harmony Support     - </b> Bach blends and talks for emotional connection.</li>
                <li><b>Healing Routine Setup    - </b> Help in making a daily wellness habit with remedies.</li>
                <li><b>Quick Mood Check    - </b> Send your emotion, get a quick remedy reply.</li>
                
                
              </ol>
            </blockquote>
          </div>
        </div>

      </div>
    </div>
  </div>
</section>{/* /Services Section */}
  {/* Services Section */}
  
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