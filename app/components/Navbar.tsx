"use client";

import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">

      <div className="logo">
        <Image
          src="/logo-icon.png"
          alt="Aarqo"
          width={70}
          height={70}
          priority
        />
      </div>

      

      <div
        className="menu-icon"
        onClick={() => setOpen(!open)}
      >
        ☰
      </div>

      <div className={`nav-links ${open ? "active" : ""}`}>
  <a href="#about" onClick={() => setOpen(false)}>
  About
</a>
  <a href="#services" onClick={() => setOpen(false)}>
  Services
</a>
 <a href="#contact" onClick={() => setOpen(false)}>
  Contact
</a>
</div>
    </nav>
  );
}