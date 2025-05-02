import { Link } from "@remix-run/react";

export default function Header(){
return(
    <>
<header id="header" className="header d-flex align-items-center position-relative">
        <div className="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
          <Link to="/" className="logo d-flex align-items-center">
            <img src="/assets/img/logo.png" alt="AgriCulture" />
          </Link>
          <nav className="navmenu">
            <ul>
              <li><Link to="/" className="active">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Our Services</Link></li>
              <li><Link to="/healing_stories">Healing Stories</Link></li>
              <li><Link to="/buy_mh_mix">Buy MH Mix</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              {/* <li className="dropdown">
                <a href="#"><span>Dropdown</span> <i className="bi bi-chevron-down toggle-dropdown"></i></a>
                <ul>
                  <li><a href="#">Dropdown 1</a></li>
                  <li className="dropdown">
                    <a href="#"><span>Deep Dropdown</span> <i className="bi bi-chevron-down toggle-dropdown"></i></a>
                    <ul>
                      <li><a href="#">Deep Dropdown 1</a></li>
                      <li><a href="#">Deep Dropdown 2</a></li>
                    </ul>
                  </li>
                  <li><a href="#">Dropdown 2</a></li>
                </ul>
              </li> */}
              <li><Link to="/contact">Contact</Link></li>
            </ul>
            <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
          </nav>
        </div>
      </header>
      </>
)
}