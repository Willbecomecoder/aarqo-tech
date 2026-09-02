"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const faqs = [
  {
    question: "Can AI answer phone calls for my restaurant?",
    answer:
      "Yes. Our AI calling agents can answer inbound calls, take reservations, answer common questions and qualify leads for your restaurant — 24/7, without extra staff.",
  },
  {
    question: "Do you build websites for salons and spas?",
    answer:
      "Yes. We design modern, high-converting websites for salons and spas with online booking, so customers can find you and book appointments directly.",
  },
  {
    question: "Can I automate WhatsApp messages to customers?",
    answer:
      "Yes. We set up automated WhatsApp workflows for appointment reminders, order updates and customer follow-ups so you save time on repetitive messaging.",
  },
  {
    question: "Do you offer chatbots for restaurant or salon websites?",
    answer:
      "Yes. We build chatbots and WhatsApp bots that handle customer questions, capture leads and manage salon or restaurant appointments automatically.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative w-full py-28 px-6 sm:px-12 lg:px-20 z-10 bg-[#030712]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />

      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <span className="px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-extrabold text-xs tracking-widest uppercase backdrop-blur-md">
            FAQ
          </span>
          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase">
            FREQUENTLY ASKED{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
              QUESTIONS
            </span>
          </h2>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className="bg-[#0B0F19]/70 backdrop-blur-xl border border-white/10 hover:border-cyan-500/50 rounded-3xl p-8 sm:p-10 transition-all duration-500"
              >
                <h3 className="text-lg sm:text-xl font-black text-white tracking-wide">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    className="w-full flex items-center justify-between gap-4 text-left cursor-pointer"
                  >
                    {faq.question}
                    <svg
                      className={`w-5 h-5 shrink-0 text-cyan-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-normal pt-3">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
