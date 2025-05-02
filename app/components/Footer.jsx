import { Link } from "@remix-run/react";


export default function Footer(){
  
    return(
      <>
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
                  <p><strong>Phone:</strong> +7457988355</p>
                  <p><strong>Email:</strong> newway.manzer@gmail.com</p>
                </div>
              </div>
              <div className="col-lg-2 col-md-3 footer-links">
                <h4>Useful Links</h4>
                <ul>
                  <li><a href="#">Home</a></li>
                  <li><a href="#">About us</a></li>
                  <li><a href="#">Services</a></li>
                  <li><a href="#">Terms of service</a></li>
                  <li><a href="#">Privacy policy</a></li>
                </ul>
              </div>
              <div className="col-lg-2 col-md-3 footer-links">
            <h4>Our Services</h4>
            <ul>
              <li><a href="#">Free Consult</a></li>
              <li><a href="#">Free Discussion</a></li>
              <li><a href="#">Free Mixing Help</a></li>
              <li><a href="#">Free Emotional Test</a></li>
              <li><a href="#">Follow-Up Check</a></li>
              
            </ul>
          </div>

          <div className="col-lg-2 col-md-3 footer-links">
            
          </div>

          <div className="col-lg-2 col-md-3 footer-links">
           
          </div>
            </div>
          </div>
        </div>

        <div className="copyright text-center">
          <div className="container d-flex flex-column flex-lg-row justify-content-center justify-content-lg-between align-items-center">
            <div className="d-flex flex-column align-items-center align-items-lg-start">
              <div>© Copyright <strong><span>Mind Heal</span></strong>. All Rights Reserved</div>
            </div>
            <div className="social-links order-first order-lg-last mb-3 mb-lg-0">
              <a href="#"><i className="bi bi-twitter-x"></i></a>
              <a href="#"><i className="bi bi-facebook"></i></a>
              <a href="#"><i className="bi bi-instagram"></i></a>
              <a href="#"><i className="bi bi-linkedin"></i></a>
            </div>
          </div>
        </div>
      </footer>
      
      </>


    )


}