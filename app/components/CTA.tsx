
"use client";

export default function CTA() {
  return (
    <section className="cta-section" id="contact">
      <div className="cta-box">
        <div className="cta-left">
          <span className="cta-badge">FREE CONSULTATION</span>
          <h2 className="cta-title">Ready to Grow<br />With AI?</h2>
          <p className="cta-sub">
            Book a free 15-min call — no commitment
          </p>
        </div>

        <div className="cta-buttons">
          <a
          href="https://wa.me/919012245439?text=👋%20Namaste!%0A%0AAapka%20AarqoTech%20me%20swagat%20hai.%20😊%0A%0AKripya%20niche%20di%20gayi%20details%20share%20karein:%0A%0A👤%20Aapka%20Naam:%0A%0A🏢%20Aapke%20Business%20%2F%20Brand%20ka%20Naam:%0A%0A💻%20Aapko%20kis%20service%20ki%20zarurat%20hai%3F%0A(Website%2C%20AI%20Automation%2C%20AI%20Chatbot%2C%20ya%20kuch%20aur)%0A%0A📝%20Apne%20project%20ke%20baare%20me%20thoda%20batayein:%0A%0A💰%20Approx%20Budget:%0A%0AJaise%20hi%20hume%20aapki%20details%20milengi%2C%20hum%20jaldi%20aapse%20contact%20karenge.%20🚀%0A%0ADhanyavaad!%20🙌"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-btn cta-btn--wa"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="#25D366"/>
              <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.417A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" stroke="#25D366" strokeWidth="1.5" fill="none"/>
            </svg>
              Chat On WhatsApp
          </a>
          <a href="#work" className="cta-btn cta-btn--outline">
          See Portfolio
          </a>
        </div>
      </div>

      <style jsx>{`
        .cta-section {
          background: #050816;
          padding: 40px 24px 60px;
        }

        .cta-box {
          max-width: 1100px;
          margin: 0 auto;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 140, 0, 0.2);
          border-radius: 28px;
          padding: 52px 56px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
          box-shadow:
            0 0 60px rgba(255, 140, 0, 0.07),
            0 0 0 1px rgba(255,255,255,0.03) inset;
          backdrop-filter: blur(12px);
        }

        .cta-badge {
          display: inline-block;
          background: rgba(255, 140, 0, 0.1);
          border: 1px solid rgba(255, 140, 0, 0.3);
          color: #ff8c00;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          padding: 6px 14px;
          border-radius: 999px;
          margin-bottom: 18px;
        }

        .cta-title {
          color: #ffffff;
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          font-weight: 900;
          line-height: 1.1;
          margin: 0 0 14px 0;
          letter-spacing: -0.02em;
        }

        .cta-sub {
          color: rgba(255, 255, 255, 0.5);
          font-size: 1rem;
          margin: 0;
          line-height: 1.6;
        }

        .cta-buttons {
          display: flex;
          flex-direction: column;
          gap: 14px;
          flex-shrink: 0;
        }

        .cta-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 14px 28px;
          border-radius: 999px;
          font-weight: 700;
          font-size: 0.95rem;
          text-decoration: none;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          white-space: nowrap;
          min-width: 200px;
        }

        .cta-btn:hover {
          transform: translateY(-2px);
        }

        .cta-btn--wa {
          background: linear-gradient(135deg, #25D366, #1da851);
          color: #ffffff;
          box-shadow: 0 0 28px rgba(37, 211, 102, 0.3);
        }

        .cta-btn--wa:hover {
          box-shadow: 0 0 40px rgba(37, 211, 102, 0.45);
        }

        .cta-btn--outline {
          background: rgba(255, 140, 0, 0.08);
          color: #ff8c00;
          border: 1px solid rgba(255, 140, 0, 0.3);
        }

        .cta-btn--outline:hover {
          background: rgba(255, 140, 0, 0.14);
          border-color: rgba(255, 140, 0, 0.5);
        }

        /* Mobile */
        @media (max-width: 768px) {
          .cta-box {
            flex-direction: column;
            padding: 36px 24px;
            text-align: center;
            gap: 32px;
          }

          .cta-buttons {
            width: 100%;
          }

          .cta-btn {
            width: 100%;
            min-width: unset;
          }
        }
      `}</style>
    </section>
  );
}