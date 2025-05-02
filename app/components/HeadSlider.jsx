



export default function Headerslider(){

     return(
         <>
            {/* Hero Section */}
      <section id="hero" className="hero section dark-background">
        <div id="hero-carousel" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="5000">
          {[
            { img: "hero_1.jpeg", title: "Harmonizing the Mind - Emotional Balance and Inner Peace", 
                text: "Harmonizing the Mind: Bach Flower Remedies for Emotional Balance and Inner Peace" },
            { img: "hero_2.png", title: "Bach Flowers Restore Mental Clarity and Calm", text: "Nature's Emotional Alchemy: How Bach Flowers Restore Mental Clarity and Calm" },
            { img: "hero_3.png", title: "Gentle Healing - Bach Flower Medicine for Modern Mental Health", 
                text: "Gentle Healing, Profound Results: Bach Flower Medicine for Modern Mental Health" },
          ].map((slide, index) => (
            <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={index}>
              <img src={`/assets/img/${slide.img}`} alt="" />
              <div className="carousel-container">
                <h2>{slide.title}</h2>
                <p>{slide.text}</p>
              </div>
            </div>
          ))}

          <a className="carousel-control-prev" href="#hero-carousel" role="button" data-bs-slide="prev">
            <span className="carousel-control-prev-icon bi bi-chevron-left" aria-hidden="true"></span>
          </a>
          <a className="carousel-control-next" href="#hero-carousel" role="button" data-bs-slide="next">
            <span className="carousel-control-next-icon bi bi-chevron-right" aria-hidden="true"></span>
          </a>

          {/* <ol className="carousel-indicators"></ol> */}
        </div>
      </section>
         
         
         </>

     )
 

}