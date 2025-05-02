




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
      <h1>Healing Stories</h1>
      <p>Your Healing Partner with Bach Flower Remedies - Your Journey to Emotional Wellness Starts Here </p>
      <nav className="breadcrumbs">
        <ol>
          <li><a href="index.html">Home</a></li>
          <li className="current">Healing Stories</li>
        </ol>
      </nav>
    </div>
  </div>{/* End Page Title */}
  
  {/* services Section */}
  <section className="testimonials-12 testimonials section" id="testimonials">
  {/* Section Title */}
  <div className="container section-title" data-aos="fade-up">
  <h2 className="text-center">MIND HEAL is your Healing Partner - Healing Stories</h2>
    <p>Your Emotions, Our Care — After Healing, We Honor and Share Every Emotional Story</p>
  </div>{/* End Section Title */}
  <div className="testimonial-wrap">
    <div className="container">
      <div className="row">
        <div className="col-md-6 mb-4 mb-md-4">
          <div className="healing_stories">
            <h4>OCD से आज़ादी - मेरी सच्ची कहानी | Mind Heal No.01</h4>
            <hr />
            <blockquote>
                <b>"Main har cheez bar bar check karta tha..."</b>
                <p>Mujhe har waqt lagta tha ki main door properly band ki ya nahi. Main ghar se nikalta, 
                    5 minute baad wapas aata aur fir se check karta - "Kahi lock to open nahi reh gaya?"</p>
                    <p>Haath dhona meri aadat nahi, majboori ban chuki thi. Kabhi kuch chhota sa bhi chhoo leta, 
                        toh itna ganda feel hota ki main baar baar sabun lagake haath dho leta… kabhi kabhi toh 20-25 baar din mein!</p>

                  <p>Mujhe sab kuch control mein chahiye hota tha. Remote kaha hai, light off ki ya nahi, 
                    fan band kiya ya nahi… sab kuch meri aankhon ke saamne hona chahiye tha.</p>

              <p> Main khud bhi thak gaya tha. Dimaag rukta hi nahi tha.</p>
              <p>Fir maine suna <b>Mind Heal No.01</b> ke baare mein - ek gentle Bach Flower Remedy 
                jo OCD jaise repetitive thoughts ke liye specially mix ki gayi thi.</p>
                <p>Koi chemical nahi, koi side effect nahi… bas flowers ki energy.</p>
                <p>Main ne use lena start kiya - din mein 4 baar, paani ke saath. Dheere dheere meri soch change hone lagi.</p>
                <ul>
                    <li>Bar bar check karna kam hua.</li>

                    <li>Haath dhone ka darr control hua.</li>

                    <li>Dimaag thoda halka feel hone laga.</li>

                    <li>Aur sabse badi baat - mujhe lagne laga ki main apne mind ka malik hoon… OCD nahi!</li>
                </ul>
                <p>Ab mujhe freedom feel hoti hai. Ab main jee raha hoon, repeat nahi kar raha.</p>
                <p><b>Agar aap bhi bar bar check karte hain, ya OCD jaisa feel hota hai - toh ek baar <b> Mind Heal No.01 </b>try karke dekhiye</b></p>
                <p><i>“Kuch badlav bahut shant hote hain, par unka asar zindagi bhar rehta hai.”</i></p>
            </blockquote>
            
          </div>
        </div>
        <div className="col-md-6 mb-4 mb-md-4">
          <div className="healing_stories">
          <h4>My Child's Slow World - And How We Found Hope</h4>
            <hr />
            <blockquote>
              <p>Mera beta bahut hi pyaara hai. Uska dil bohot soft hai. Lekin ek dikkat thi jo mujhe andar se toda ja rahi thi.</p>
              <p>Woh bahut lazy tha. Kisi kaam mein usko excitement hi nahi hota tha. Jab main usse padhne ke liye kehta, toh woh dheere-dheere likhta, baar-baar galti karta.</p>
              <b>Reading slow, writing slow. Har cheez mein dheere.</b>
              <p>Main har din sochta - “Kya main galat father hoon? Kya main kuch miss kar raha hoon?”
Woh emotional bhi bahut tha. Chhoti baat pe ro padta, ya chup ho jaata.
Mujhe uske liye dard hota tha.</p>
<p>Phir ek din maine suna <b> Mind Heal No. 02</b> ke baare mein. Ek friend ne bola,

"Bhai, try kar. Yeh energy based healing hai. Mind ko relax karta hai, balance deta hai."</p>
<p>Mujhe laga - ek chance deke dekhte hain.
Maine use daily 10 minute dena start kiya. Simple se method follow kiya. Aur fir dheere-dheere ek chamatkaar dikhne laga.</p>
<ul>
    <li>Woh thoda active hone laga</li>
    <li> Uski writing better ho gayi</li>
    <li> Reading mein interest dikhane laga</li>
    <li> Repeat galtiyan kam ho gayi</li>
    <li> Repeat galtiyan kam ho gayi</li>
    <li> Aur sabse zaroori - uski aankhon mein umeed dikhi</li>
</ul>
<p>Main janta hoon abhi bhi raasta lamba hai. Lekin <b>Mind Heal No. 02</b> ne hume ek new shuruaat di.</p>
<p>Main sab parents ko kehna chahta hoon - agar aapka bachcha bhi slow, emotional, ya confused hai…
Toh please try karo. Kabhi-kabhi hum medicines nahi, mind ke healing energy se kaam chalu kar sakte hain.</p>
<p><i>"Itna hi chahiye hota hai - thoda pyaar, thoda patience… aur <b> Mind Heal No. 02</b>" </i></p>
            </blockquote>
          </div>
        </div>
        <div className="col-md-6 mb-4 mb-md-4">
          <div className="healing_stories">
          <h4>Mera Chanchal Baccha - Jab Shanti Wapas Aayi</h4>
            <hr />
            <blockquote>
              <p>Mera beta ek dum rocket jaisa hai. Jahaan le jao, usko koi farak nahi padta. Bus bhaagna hota hai, daudna, girna, uthna - fir se bhaagna!</p>
<p>Kahi bhi le jao - mall, school ya park… Woh rukta hi nahi.</p>
<p>Bed pe jump karta rehta hai Sofa pe chadh jaata hai Darwaza khol ke bhaag jaata hai</p>
<p>Aur har waqt mujhe dar lagta tha - kahin gir na jaaye, kahin chot na lag jaye.</p>
<p>Woh bahut sensitive bhi hai. Chhoti si baat pe ro padta hai. Kabhi hasi, kabhi rona - uska mood kabhi stable nahi hota.</p>
<p>Main har waqt uske peeche rehta. Usko pakadta, sambhalta, lekin woh rukta hi nahi tha. Main andar se toot raha tha.</p>
<p>Soche ja raha tha - “Kya ye normal hai? Kya main akela hoon jiska baccha aisa hai?” Phir mujhe kisi ne bataya <b> Mind Heal No. 03 </b> ke baare mein.</p>
<p>Bola - "Yeh un bachcho ke liye hai jo hyper hote hain, jinko shaanti nahi milti."</p>
<p>Maine socha - ek baar try karne mein kya jaata hai? Maine <b>Mind Heal No. 03</b> use karna start kiya. Roz thoda time diya - sirf 10 minute.</p>
<p>Aur fir kuch magical hua...</p>
<ul>
    <li>Woh thoda slow hone laga</li>
    <li>Jumping kam ho gayi</li>
    <li>Bed pe peacefully letna shuru kiya</li>
    <li>Roona kam hua</li>
    <li>Daudna bhagna kam hua jiski wajah se girna kam hua</li>
</ul>
<p>Woh chanchal baccha, jo kabhi ek jagah rukta nahi tha… Aaj mere paas baitha tha - shaant, relaxed, aur muskurata hua.</p>
<p><b>Mind Heal No. 03 </b> ne mera ghar badal diya.</p>
<p>Ab main parents se kehna chahta hoon - Agar aapka baccha bhi unstoppable, hyper, ya emotional hai... Toh ek baar try karo. Kabhi-kabhi healing sirf medicine se nahi, energy se bhi hoti hai.</p>
<p><i>"<b>Mind Heal No. 03</b> ne mujhe aur mere bacche ko ek naya raasta diya.
Shukriya dil se"</i></p>
            </blockquote>
          </div>
        </div>
        <div className="col-md-6 mb-4 mb-md-4">
          <div className="healing_stories">
          <h4> Jab Mera Beta Exam Se Darna Band Kiya</h4>
            <hr />
            <blockquote>
              <p>Mera beta bohot mehnat karta tha. Roz padhta tha, likhta tha, revise karta tha. Main khud uske saath baithta tha.</p>
              <p>Lekin jaise hi exam ka time aata,  Uska chehra bilkul dar se bhar jaata.</p>
              <p>Exam hall mein jaate hi - Jo kuch bhi usne yaad kiya hota… Sab wipe out ho jaata.</p>
              <p>Poora dimaag blank ho jaata tha. Chahe usne 10 baar padha ho, Lekin paper ke samne sab gayab!</p>
              <p>Main samajh nahi paata tha ki kya karoon. Woh ro padta tha, bolta - “Papa, mujhe sab aata tha… lekin yaad hi nahi aaya…”</p>
              <p>Dant padti thi, marks kam aate the, Aur woh aur zyada tut jaata tha. Uska self-confidence zero ho gaya tha.</p>
              <p>Main bhi pareshan tha. Ek helpless father - jo sirf dekh sakta tha. Phir kisi ne mujhe suggest kiya - <b> Mind Heal No. 04.</b></p>
              <p>Unhone bola, <i>“Yeh specially exam fear aur memory block ke liye bana hai.” </i></p>
              <p>Main ne bina soch-vichar ke try kiya. Aur dheere-dheere ek miracle hone laga…</p>
              <ul>
                <li>Uska dar kam hone laga</li>
                <li>Uska chehra relax dikhne laga</li>
                <li>Paper ke samay dimaag blank nahi hota tha</li>
                <li>Usne poore answers likhne start kiye</li>
                <li>Aur sabse pyari baat - marks improve hone lage</li>
                </ul>  
                <p>Ek din usne exam ke baad muskurake bola, “Papa, is baar sab yaad tha. Maine pura paper likha!”</p>
                <p>Uski aankhon mein confidence tha. Mujhe laga - mera beta jeet gaya. <b>Mind Heal No. 04 </b>ne sirf uska nahi, mera bhi dard kam kar diya.</p>
                <p>Ab main har parent se kehna chahta hoon - Agar aapke bacche ko bhi exam ka dar, memory block ya sudden wipe out hota hai… Toh please ek baar <b> Mind Heal No. 04 </b> try karo.</p>
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