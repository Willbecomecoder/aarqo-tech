"use client";

import { useEffect, useRef, useState } from "react";


const STEPS = ["Plan", "Build", "Automate", "Scale"];

export default function About() {
  const [active, setActive] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % STEPS.length);
    }, 1200);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    

    <section className="about-section" id="about">
      <div className="about-box">

        {/* Left — About Text */}
        <div className="about-left">
          <h2 className="about-title">About Aarqo.Tech</h2>
          <p className="about-desc">
            We build high-converting websites, AI automations, intelligent bots,
            and AI-generated UGC ads that help businesses attract customers,
            automate repetitive work, and scale efficiently.
          </p>
        </div>

        {/* Divider */}
        <div className="about-divider" />

        {/* Right — Animated Steps */}
        <div className="about-right">
          <p className="about-approach-label">Our Approach</p>
          <div className="steps-row">
            {STEPS.map((step, i) => (
              <div key={step} className="step-item">
                <span className={`step-text ${active === i ? "step-active" : ""}`}>
                  {step}
                </span>
                {i < STEPS.length - 1 && (
                  <span className={`step-arrow ${active === i ? "arrow-active" : ""}`}>→</span>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

      <style jsx>{`
        .about-section {
          background: #050816;
          padding: 15px 20px;
        }

        .about-box {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 0;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 140, 0, 0.15);
          border-radius: 24px;
          padding: 40px 48px;
          backdrop-filter: blur(12px);
          box-shadow: 0 0 40px rgba(255, 140, 0, 0.06);
        }

        .about-left {
          flex: 1.4;
          padding-right: 40px;
        }

        .about-title {
          color: #ffffff;
          font-size: 1.6rem;
          font-weight: 800;
          margin-bottom: 14px;
          letter-spacing: -0.02em;
        }

        .about-desc {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.95rem;
          line-height: 1.8;
          margin: 0;
        }

        .about-divider {
          width: 1px;
          align-self: stretch;
          background: rgba(255, 140, 0, 0.2);
          margin: 0 40px;
          flex-shrink: 0;
        }

        .about-right {
          flex: 1;
        }

        .about-approach-label {
          color: #ff8c00;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin: 0 0 18px 0;
        }

        .steps-row {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .step-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .step-text {
          font-size: 1rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.3);
          transition: color 0.4s ease, text-shadow 0.4s ease;
          white-space: nowrap;
        }

        .step-active {
          color: #ff8c00;
          text-shadow: 0 0 18px rgba(255, 140, 0, 0.7);
        }

        .step-arrow {
          color: rgba(255, 255, 255, 0.15);
          font-size: 1rem;
          transition: color 0.4s ease;
        }

        .arrow-active {
          color: #ff8c00;
        }

        /* Mobile */
        @media (max-width: 768px) {
          .about-box {
            flex-direction: column;
            padding: 20px 24px;
            gap: 28px;
          }

          .about-left {
            padding-right: 0;
          }

          .about-divider {
            width: 100%;
            height: 1px;
            margin: 0;
          }

          .steps-row {
            gap: 6px;
          }

          .step-text {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </section>
  );
}