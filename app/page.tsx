"use client";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import CTA from "./components/CTA";
import ReviewsSection from "./components/Reviewsection";

import Footer from "./components/Footer";


export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <About />
      <CTA />
      <ReviewsSection />
      <Footer />
    </>
  );
}