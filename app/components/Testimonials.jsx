import { imageSrc } from "~/utils/format";

export default function Testimonials({ items = [] }) {
  if (!items.length) return null;

  return (
    <section className="testimonials-12 testimonials section" id="testimonials">
      <div className="container section-title" data-aos="fade-up">
        <h2>TESTIMONIALS</h2>
        <p>What Our Happy Clients Say</p>
      </div>
      <div className="testimonial-wrap">
        <div className="container">
          <div className="row">
            {items.map((item) => (
              <div className="col-md-6 mb-4 mb-md-4" key={item.id}>
                <div className="testimonial">
                  <img
                    src={imageSrc(item.image)}
                    alt={item.name}
                    onError={(e) => {
                      e.currentTarget.src = "/assets/img/testimonials/testi1.png";
                    }}
                  />
                  <blockquote>
                    <p>{item.content}</p>
                  </blockquote>
                  <p className="client-name">{item.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
