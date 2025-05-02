

export default function RecentPosts(){
return(
<>
<section id="recent-posts" className="recent-posts section">
  {/* Section Title */}
  <div className="container section-title" data-aos="fade-up">
    <h2>RECENT POSTS</h2>
    <p>Learn & Thrive with the Wisdom of Our Experience!</p>
  </div>{/* End Section Title */}
  <div className="container">
    <div className="row gy-5">
      <div className="col-xl-4 col-md-6">
        <div className="post-item position-relative h-100" data-aos="fade-up" data-aos-delay={100}>
          <div className="post-img position-relative overflow-hidden">
            <img src="assets/img/blog/blog1.png" className="img-fluid" alt />
            <span className="post-date">December 12</span>
          </div>
          <div className="post-content d-flex flex-column">
            <h3 className="post-title">A Natural Path to Emotional Healing</h3>
            <div className="meta d-flex align-items-center">
              <div className="d-flex align-items-center">
                <i className="bi bi-person" /> <span className="ps-2">Dr. Zulfequar</span>
              </div>
              <span className="px-3 text-black-50">/</span>
              <div className="d-flex align-items-center">
                <i className="bi bi-folder2" /> <span className="ps-2">Health</span>
              </div>
            </div>
            <hr />
            <a href="#" className="readmore stretched-link"><span>Read More</span><i className="bi bi-arrow-right" /></a>
          </div>
        </div>
      </div>{/* End post item */}
      <div className="col-xl-4 col-md-6">
        <div className="post-item position-relative h-100" data-aos="fade-up" data-aos-delay={200}>
          <div className="post-img position-relative overflow-hidden">
            <img src="assets/img/blog/blog2.jpg" className="img-fluid" alt />
            <span className="post-date">Jan 17</span>
          </div>
          <div className="post-content d-flex flex-column">
            <h3 className="post-title">Remedy for Your Emotional Needs</h3>
            <div className="meta d-flex align-items-center">
              <div className="d-flex align-items-center">
                <i className="bi bi-person" /> <span className="ps-2">Dr. Zahir</span>
              </div>
              <span className="px-3 text-black-50">/</span>
              <div className="d-flex align-items-center">
                <i className="bi bi-folder2" /> <span className="ps-2">Health</span>
              </div>
            </div>
            <hr />
            <a href="#" className="readmore stretched-link"><span>Read More</span><i className="bi bi-arrow-right" /></a>
          </div>
        </div>
      </div>{/* End post item */}
      <div className="col-xl-4 col-md-6" data-aos="fade-up" data-aos-delay={300}>
        <div className="post-item position-relative h-100">
          <div className="post-img position-relative overflow-hidden">
            <img src="assets/img/blog/blog3.jpeg" className="img-fluid" alt />
            <span className="post-date">Feb 05</span>
          </div>
          <div className="post-content d-flex flex-column">
            <h3 className="post-title">Remedies for Stress and Anxiety Relief</h3>
            <div className="meta d-flex align-items-center">
              <div className="d-flex align-items-center">
                <i className="bi bi-person" /> <span className="ps-2">Dr. Zahir</span>
              </div>
              <span className="px-3 text-black-50">/</span>
              <div className="d-flex align-items-center">
                <i className="bi bi-folder2" /> <span className="ps-2">Health</span>
              </div>
            </div>
            <hr />
            <a href="blog-details.html" className="readmore stretched-link"><span>Read More</span><i className="bi bi-arrow-right" /></a>
          </div>
        </div>
      </div>{/* End post item */}
    </div>
  </div>
</section>{/* /Recent Posts Section */}


</>

)



}