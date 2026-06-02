export default function Services() {
  return (
    <section className="services-section" id="services">
      <div className="services-header">
      
        <h1 className="section-title">What We Build</h1>
        <p className="services-subtext">
          Intelligent systems, cinematic AI content, automation workflows
          and futuristic websites built to grow modern brands.
        </p>
      </div>

      {/* ↓ YE WRAPPER ADD KARO — iske andar sab cards rakho */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>

        <div className="service-card">
          <div className="service-icon">⚡</div>
          <h3>AI Automation</h3>
          <p>Smart workflows that save time and scale businesses.</p>
        </div>

        <div className="service-card">
          <div className="service-icon">🎥</div>
          <h3>AI UGC Ads</h3>
          <p>High-converting AI generated ad creatives for brands.</p>
        </div>

        <div className="service-card">
          <div className="service-icon">🌐</div>
          <h3> Websites</h3>
          <p>Modern futuristic websites with premium UI experience.</p>
        </div>

        <div className="service-card">
          <div className="service-icon">🤖</div>
          <h3>AI Bots</h3>
          <p>Intelligent chatbots and lead generation systems.</p>
        </div>

      </div>
    </section>
  );
}