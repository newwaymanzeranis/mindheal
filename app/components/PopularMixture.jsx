

export default function PopularMixture(){
  
    return(
      <>
        <section id="services-2" className="services-2 section dark-background">
      <div className="container section-title">
        <h2>Popular Mixture</h2>
        <p>Mostly Prescribe Mixture And Popular Mixture</p>
      </div>

      <div className="services-carousel-wrap">
        <div className="container">
          <div className="swiper init-swiper">
            <button className="navigation-prev js-custom-prev">
              <i className="bi bi-arrow-left-short"></i>
            </button>
            <button className="navigation-next js-custom-next">
              <i className="bi bi-arrow-right-short"></i>
            </button>
            <div className="swiper-wrapper">
              {[
                { title: "Obsessive-Compulsive Disorder (OCD)", img: "bach/no01.jpeg" },
                { title: "Social/Emotional issues", img: "bach/no02.jpeg" },
                { title: "Hyperactivity & concentration problems", img: "bach/no03.jpeg" },
                { title: "Exam stress", img: "bach/no04.png" },
                { title: "General phobia", img: "bach/no05.jpeg" },
                { title: "Comitment phobia", img: "bach/no06.jpeg" },
                { title: "Separation anxiety", img: "bach/no07.jpeg" },
                { title: "Quit Smoking", img: "bach/no08.jpeg" },
              ].map((service, index) => (
                <div className="swiper-slide" key={index}>
                  <div className="service-item">
                    <div className="service-item-contents">
                      <a href="#">
                        <span className="service-item-category">Our Popular Mixture</span>
                        <h2 className="service-item-title">{service.title}</h2>
                      </a>
                    </div>
                    <img
                      src={`/assets/img/${service.img}`}
                      alt="Service"
                      className="img-fluid"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="swiper-pagination"></div>
          </div>
        </div>
      </div>
    </section>

    {/* Testimonials Section */}
      
      </>

    )


}