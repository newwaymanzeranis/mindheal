import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="footer dark-background">
      <div className="footer-top">
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-4 col-md-6 footer-about">
              <Link to="/" className="logo d-flex align-items-center">
                <span className="sitename">Mind Heal</span>
              </Link>
              <div className="footer-contact pt-3">
                <p>Lucknow Kursi Road</p>
                <p>U.P., INDIA 226022</p>
                <p>
                  <strong>Phone:</strong> +7457988355
                </p>
                <p>
                  <strong>Email:</strong> newway.manzer@gmail.com
                </p>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 footer-links">
              <h4>Useful Links</h4>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">About us</Link>
                </li>
                <li>
                  <Link to="/services">Services</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
                <li>
                  <Link to="/blog">Blog</Link>
                </li>
              </ul>
            </div>
            <div className="col-lg-2 col-md-3 footer-links">
              <h4>Our Services</h4>
              <ul>
                <li>
                  <Link to="/services">Free Consult</Link>
                </li>
                <li>
                  <Link to="/services">Free Discussion</Link>
                </li>
                <li>
                  <Link to="/services">Free Mixing Help</Link>
                </li>
                <li>
                  <Link to="/services">Free Emotional Test</Link>
                </li>
                <li>
                  <Link to="/services">Follow-Up Check</Link>
                </li>
              </ul>
            </div>
            <div className="col-lg-2 col-md-3 footer-links" />
            <div className="col-lg-2 col-md-3 footer-links" />
          </div>
        </div>
      </div>
      <div className="copyright text-center">
        <div className="container d-flex flex-column flex-lg-row justify-content-center justify-content-lg-between align-items-center">
          <div className="d-flex flex-column align-items-center align-items-lg-start">
            <div>
              © Copyright <strong><span>Mind Heal</span></strong>. All Rights
              Reserved
            </div>
          </div>
          <div className="social-links order-first order-lg-last mb-3 mb-lg-0">
            <a href="#" aria-label="Twitter">
              <i className="bi bi-twitter-x" />
            </a>
            <a href="#" aria-label="Facebook">
              <i className="bi bi-facebook" />
            </a>
            <a href="#" aria-label="Instagram">
              <i className="bi bi-instagram" />
            </a>
            <a href="#" aria-label="LinkedIn">
              <i className="bi bi-linkedin" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
