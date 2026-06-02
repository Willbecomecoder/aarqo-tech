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
  href="https://wa.me/91YOURNUMBER"
  target="_blank"
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