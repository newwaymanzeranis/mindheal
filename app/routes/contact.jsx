




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
      <h1>Contact</h1>
      <p>Your Healing Partner with Bach Flower Remedies -Your Healing Starts with a Message </p>
      <nav className="breadcrumbs">
        <ol>
          <li><a href="index.html">Home</a></li>
          <li className="current">Contact</li>
        </ol>
      </nav>
    </div>
  </div>{/* End Page Title */}
  
  {/* Contact Section */}
  
  <section id="contact" className="contact section">
  <h2 className="text-center">MIND HEAL is your Healing Partner - Contact Us</h2>
  <p className='text-center' style={{'font-family':'var(--heading-font)','font-size':'32px'}}>Your Healing Starts with a Message</p>
  <div className="mb-5">
    <iframe style={{width: '100%', height: 400}} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3914.1487758210487!2d80.95561882410848!3d26.907787495698997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399957bf17d5cee9%3A0xe3d4fb0de752fd8d!2sTedhi%20Pulia%2C%20Adil%20Nagar%2C%20Lucknow%2C%20Uttar%20Pradesh%20226022!5e1!3m2!1sen!2sin!4v1744911510772!5m2!1sen!2sin" frameBorder={0} allowFullScreen />
  </div>{/* End Google Maps */}
  <div className="container" data-aos="fade">
    <div className="row gy-5 gx-lg-5">
      <div className="col-lg-4">
        <div className="info">
          <h3>Get in touch</h3>
          <h5>We're here to listen, guide, and support you.</h5>
          <p>Whether you have a question, need help choosing the right remedy, or just want to share your story — feel free to reach out to us anytime. Your emotional wellness matters, and we're just a message away.</p>
          <div className="info-item d-flex">
            <i className="bi bi-geo-alt flex-shrink-0" />
            <div>
              <h4>Location:</h4>
              <p>Aadil Nagar Tehri Pulia Lucknow</p>
            </div>
          </div>{/* End Info Item */}
          <div className="info-item d-flex">
            <i className="bi bi-envelope flex-shrink-0" />
            <div>
              <h4>Email:</h4>
              <p>mindheal@gmail.com</p>
            </div>
          </div>{/* End Info Item */}
          <div className="info-item d-flex">
            <i className="bi bi-phone flex-shrink-0" />
            <div>
              <h4>Call:</h4>
              <p>+91 7457988355</p>
            </div>
          </div>{/* End Info Item */}
        </div>
      </div>
      <div className="col-lg-8">
        <form action="forms/contact.php" method="post" role="form" className="php-email-form">
          <div className="row">
            <div className="col-md-6 form-group">
              <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" required />
            </div>
            <div className="col-md-6 form-group mt-3 mt-md-0">
              <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" required />
            </div>
          </div>
          <div className="form-group mt-3">
            <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" required />
          </div>
          <div className="form-group mt-3">
            <textarea className="form-control" name="message" placeholder="Message" required defaultValue={""} />
          </div>
          <div className="my-3">
            <div className="loading">Loading</div>
            <div className="error-message" />
            <div className="sent-message">Your message has been sent. Thank you!</div>
          </div>
          <div className="text-center"><button type="submit">Send Message</button></div>
        </form>
      </div>{/* End Contact Form */}
    </div>
  </div>
</section>{/* /Contact Section */}

  



  {/* Contact  Section */}
  
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