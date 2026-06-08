export default function Hero() {
  return (
    <section className="hero-section" id="hero">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/videos/poster.jpg"
        className="hero-video"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>
      <a
href="https://wa.me/919012245439?text=👋%20Namaste!%0A%0AAapka%20AarqoTech%20me%20swagat%20hai.%20😊%0A%0AKripya%20niche%20di%20gayi%20details%20share%20karein:%0A%0A👤%20Aapka%20Naam:%0A%0A🏢%20Aapke%20Business%20%2F%20Brand%20ka%20Naam:%0A%0A💻%20Aapko%20kis%20service%20ki%20zarurat%20hai%3F%0A(Website%2C%20AI%20Automation%2C%20AI%20Chatbot%2C%20ya%20kuch%20aur)%0A%0A📝%20Apne%20project%20ke%20baare%20me%20thoda%20batayein:%0A%0A💰%20Approx%20Budget:%0A%0AJaise%20hi%20hume%20aapki%20details%20milengi%2C%20hum%20jaldi%20aapse%20contact%20karenge.%20🚀%0A%0ADhanyavaad!%20🙌"  
  className="whatsapp-card"
>
  <div className="wa-dot"></div>

  <div>
    <p className="wa-label">Available Now</p>
    <h4>Chat on WhatsApp</h4>
  </div>
</a>
    </section>
  );
}