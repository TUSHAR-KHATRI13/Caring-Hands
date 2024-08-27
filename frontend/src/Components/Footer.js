import React from 'react';
import '../App.css';

function Footerr() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <p>Regards, caring hands team</p>
        </div>
        <div className="footer-links">
          <a href="/">Home</a>
         
          <a href="/services">Services</a>
          <a href="/contact">Contact</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
}
export default Footerr;