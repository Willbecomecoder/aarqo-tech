
export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer-copy">
© {new Date().getFullYear()} AarqoTech.com All rights reserved.      </p>

      <div className="footer-links">
        <a href="/privacy-policy">Privacy Policy</a>
        <a href="/terms">Terms & Conditions</a>
      </div>
    </footer>
  );
}
