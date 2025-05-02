
export default function Testimonials(){
  return(
    <>
     <section className="testimonials-12 testimonials section" id="testimonials">
  {/* Section Title */}
  <div className="container section-title" data-aos="fade-up">
    <h2>TESTIMONIALS</h2>
    <p>What Our Happy Clients Say</p>
  </div>{/* End Section Title */}
  <div className="testimonial-wrap">
    <div className="container">
      <div className="row">
        <div className="col-md-6 mb-4 mb-md-4">
          <div className="testimonial">
            <img src="assets/img/testimonials/testi1.png" alt="Testimonial author" />
            <blockquote>
              <p>
              🌿 "Life-Changing Experience!"
              "After using the customized Bach Flower blend, I feel more balanced and stress-free. Truly a natural miracle!" 
             
              </p>
            </blockquote>
            <p className="client-name">Aisha K.</p>
          </div>
        </div>
        <div className="col-md-6 mb-4 mb-md-4">
          <div className="testimonial">
            <img src="assets/img/testimonials/testi2.png" alt="Testimonial author" />
            <blockquote>
              <p>
              🌸 "Peace & Positivity Restored!"
              "I struggled with anxiety for years, but these remedies have brought so much calm into my life. Highly recommended!"
              </p>
            </blockquote>
            <p className="client-name">Rohit M.</p>
          </div>
        </div>
        <div className="col-md-6 mb-4 mb-md-4">
          <div className="testimonial">
            <img src="assets/img/testimonials/testi3.png" alt="Testimonial author" />
            <blockquote>
              <p>
              💖 "Gentle & Effective for My Child"
              "My son's emotional meltdowns have reduced significantly. The remedy worked wonders without any side effects!" 
              </p>
            </blockquote>
            <p className="client-name">Neha S.</p>
          </div>
        </div>
        <div className="col-md-6 mb-4 mb-md-4">
          <div className="testimonial">
            <img src="assets/img/testimonials/testi4.png" alt="Testimonial author" />
            <blockquote>
              <p>
              🌱 "A Natural Path to Healing!"
              "I was skeptical at first, but after a month, I feel happier and more at peace. Thank you!"
              </p>
            </blockquote>
            <p className="client-name">Arjuna</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>{/* /Testimonials Section */}
    </>
  )


}